import { Server as HttpServer } from 'node:http';
import { WebSocketServer, WebSocket } from 'ws';
import { db } from '../db/index.js';
import { getLessonQuiz } from '../curriculum/quizData.js';

interface RacePlayer {
  userId: string;
  username: string;
  score: number;
  questionIndex: number;
  progressPercent: number;
  finished: boolean;
  finishedAt?: number;
  ws: WebSocket;
}

interface RaceRoom {
  roomCode: string;
  algorithmId: string;
  status: 'waiting' | 'in_progress' | 'finished';
  hostId: string;
  players: Map<string, RacePlayer>;
  questions: Array<{ id: string; question: string; options: string[] }>;
  startTime?: number;
}

export class AlgoRaceSocketManager {
  private wss: WebSocketServer;
  private rooms: Map<string, RaceRoom> = new Map();

  constructor(server: HttpServer) {
    this.wss = new WebSocketServer({ noServer: true });

    server.on('upgrade', (request, socket, head) => {
      const pathname = request.url ? new URL(request.url, `http://${request.headers.host}`).pathname : '';
      if (pathname === '/ws/algo-race' || pathname.startsWith('/ws/algo-race')) {
        this.wss.handleUpgrade(request, socket, head, (ws) => {
          this.wss.emit('connection', ws, request);
        });
      }
    });

    this.wss.on('connection', (ws: WebSocket) => {
      this.handleConnection(ws);
    });
  }

  private generateRoomCode(): string {
    const chars = 'ABCDEFGHJKLMNPQRSTUVWXYZ23456789';
    let code = '';
    for (let i = 0; i < 6; i++) {
      code += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    return code;
  }

  private broadcastToRoom(room: RaceRoom, message: object): void {
    const payload = JSON.stringify(message);
    room.players.forEach((player) => {
      if (player.ws.readyState === WebSocket.OPEN) {
        player.ws.send(payload);
      }
    });
  }

  private getRoomPlayerList(room: RaceRoom) {
    return Array.from(room.players.values()).map((p) => ({
      userId: p.userId,
      username: p.username,
      score: p.score,
      progressPercent: p.progressPercent,
      questionIndex: p.questionIndex,
      finished: p.finished,
    }));
  }

  private handleConnection(ws: WebSocket): void {
    let currentRoomCode: string | null = null;
    let currentUserId: string | null = null;

    ws.on('message', (data: string) => {
      try {
        const message = JSON.parse(data.toString());
        const { type, payload } = message;

        switch (type) {
          case 'CREATE_ROOM': {
            const { algorithmId = 'binary-search', username = 'Botanist', userId } = payload || {};
            const roomCode = payload?.roomCode || this.generateRoomCode();
            const actualUserId = userId || `usr-${Date.now()}`;

            const quiz = getLessonQuiz(algorithmId) || getLessonQuiz('binary-search');
            const safeQuestions = (quiz?.questions || []).map((q) => ({
              id: q.id,
              question: q.question,
              options: q.options,
            }));

            const room: RaceRoom = {
              roomCode,
              algorithmId,
              status: 'waiting',
              hostId: actualUserId,
              players: new Map(),
              questions: safeQuestions,
            };

            const player: RacePlayer = {
              userId: actualUserId,
              username,
              score: 0,
              questionIndex: 0,
              progressPercent: 0,
              finished: false,
              ws,
            };

            room.players.set(actualUserId, player);
            this.rooms.set(roomCode, room);

            currentRoomCode = roomCode;
            currentUserId = actualUserId;

            // Also persist in db
            db.createAlgoRace(algorithmId, roomCode);
            db.addRaceParticipant(roomCode, actualUserId);

            ws.send(
              JSON.stringify({
                type: 'ROOM_CREATED',
                payload: {
                  roomCode,
                  algorithmId,
                  hostId: actualUserId,
                  players: this.getRoomPlayerList(room),
                },
              })
            );
            break;
          }

          case 'JOIN_ROOM':
          case 'RACE_JOIN': {
            const { roomCode, username = 'Racer', userId } = payload || {};
            const cleanCode = (roomCode || '').toUpperCase().trim();
            const room = this.rooms.get(cleanCode);

            if (!room) {
              ws.send(
                JSON.stringify({
                  type: 'ERROR',
                  payload: { message: `Room "${cleanCode}" not found` },
                })
              );
              return;
            }

            if (room.status === 'in_progress') {
              ws.send(
                JSON.stringify({
                  type: 'ERROR',
                  payload: { message: 'Race is already in progress' },
                })
              );
              return;
            }

            const actualUserId = userId || `usr-${Date.now()}`;
            currentRoomCode = cleanCode;
            currentUserId = actualUserId;

            const player: RacePlayer = {
              userId: actualUserId,
              username,
              score: 0,
              questionIndex: 0,
              progressPercent: 0,
              finished: false,
              ws,
            };

            room.players.set(actualUserId, player);
            db.addRaceParticipant(room.roomCode, actualUserId);

            this.broadcastToRoom(room, {
              type: 'ROOM_UPDATED',
              payload: {
                roomCode: room.roomCode,
                algorithmId: room.algorithmId,
                hostId: room.hostId,
                players: this.getRoomPlayerList(room),
              },
            });
            break;
          }

          case 'START_RACE': {
            if (!currentRoomCode) return;
            const room = this.rooms.get(currentRoomCode);
            if (!room) return;

            room.status = 'in_progress';
            room.startTime = Date.now();
            db.updateRaceStatus(room.roomCode, 'in_progress');

            this.broadcastToRoom(room, {
              type: 'RACE_START',
              payload: {
                countdown: 3,
                algorithmId: room.algorithmId,
                questions: room.questions,
                startTime: room.startTime,
              },
            });
            break;
          }

          case 'SUBMIT_STEP':
          case 'PLAYER_PROGRESS': {
            if (!currentRoomCode || !currentUserId) return;
            const room = this.rooms.get(currentRoomCode);
            if (!room) return;

            const player = room.players.get(currentUserId);
            if (!player) return;

            const { questionIndex, correct, scoreDelta = 20 } = payload || {};
            player.questionIndex = (questionIndex ?? player.questionIndex) + 1;
            if (correct) {
              player.score += scoreDelta;
            }

            const total = room.questions.length || 5;
            player.progressPercent = Math.min(100, Math.round((player.questionIndex / total) * 100));

            if (player.questionIndex >= total) {
              player.finished = true;
              player.finishedAt = Date.now();
            }

            this.broadcastToRoom(room, {
              type: 'LEADERBOARD_UPDATE',
              payload: {
                players: this.getRoomPlayerList(room),
              },
            });

            // Check if all finished
            const allFinished = Array.from(room.players.values()).every((p) => p.finished);
            if (allFinished) {
              this.finishRace(room);
            }
            break;
          }

          case 'RACE_FINISH': {
            if (!currentRoomCode || !currentUserId) return;
            const room = this.rooms.get(currentRoomCode);
            if (!room) return;

            const player = room.players.get(currentUserId);
            if (player) {
              player.finished = true;
              player.finishedAt = Date.now();
              if (typeof payload?.finalScore === 'number') {
                player.score = payload.finalScore;
              }
            }
            this.finishRace(room);
            break;
          }

          default:
            break;
        }
      } catch (err) {
        console.error('Error handling WebSocket message', err);
      }
    });

    ws.on('close', () => {
      if (currentRoomCode && currentUserId) {
        const room = this.rooms.get(currentRoomCode);
        if (room) {
          room.players.delete(currentUserId);
          if (room.players.size === 0) {
            this.rooms.delete(currentRoomCode);
          } else {
            this.broadcastToRoom(room, {
              type: 'PLAYER_LEFT',
              payload: {
                userId: currentUserId,
                players: this.getRoomPlayerList(room),
              },
            });
          }
        }
      }
    });
  }

  private finishRace(room: RaceRoom): void {
    if (room.status === 'finished') return;
    room.status = 'finished';
    db.updateRaceStatus(room.roomCode, 'finished');

    const playersArray = Array.from(room.players.values());
    playersArray.sort((a, b) => {
      if (b.score !== a.score) return b.score - a.score;
      return (a.finishedAt || 0) - (b.finishedAt || 0);
    });

    const rankings = playersArray.map((p, index) => {
      db.updateRaceParticipant(room.roomCode, p.userId, {
        final_score: p.score,
        rank: index + 1,
        finished_at: p.finishedAt ? new Date(p.finishedAt).toISOString() : new Date().toISOString(),
      });

      return {
        rank: index + 1,
        userId: p.userId,
        username: p.username,
        score: p.score,
        finishedAt: p.finishedAt,
      };
    });

    const winner = rankings[0] || null;

    this.broadcastToRoom(room, {
      type: 'RACE_FINISH',
      payload: {
        winnerId: winner?.userId,
        winnerName: winner?.username,
        rankings,
      },
    });
  }
}
