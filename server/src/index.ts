import http from 'node:http';
import { createApp } from './app.js';
import { CONFIG } from './config.js';
import { AlgoRaceSocketManager } from './ws/algoRaceSocket.js';

const app = createApp();
const server = http.createServer(app);

// Initialize AlgoRace WebSocket engine
const socketManager = new AlgoRaceSocketManager(server);

server.listen(CONFIG.PORT, () => {
  console.log(`🌸 AlgoBloom 2.0 Backend Service running on port ${CONFIG.PORT}`);
  console.log(`🌸 REST API ready at http://localhost:${CONFIG.PORT}/api/v1/`);
  console.log(`🌸 AlgoRace Realtime WebSocket at ws://localhost:${CONFIG.PORT}/ws/algo-race`);
});

export { server, socketManager };
