import cv2
import numpy as np

img = cv2.imread('public/sprout-garden-path.jpg')
h, w, _ = img.shape
b, g, r = img[:, :, 0].astype(int), img[:, :, 1].astype(int), img[:, :, 2].astype(int)

# Detect pink dots
is_pink = (r > 195) & (r > g + 24) & (r > b + 24) & (g > 115) & (b > 105)
num_labels, labels, stats, centroids = cv2.connectedComponentsWithStats(is_pink.astype(np.uint8))

dots = []
for i in range(1, num_labels):
    area = stats[i, cv2.CC_STAT_AREA]
    if 8 <= area <= 180:
        cx, cy = centroids[i]
        dots.append((float(cx), float(cy)))

print(f"Total dots: {len(dots)}")

# Filter dots that are on the trail:
# Trail path starts around bottom right/center (x ~ 390, y ~ 450)
# or let's find the nearest neighbor chain starting from (390, 440):
start_pt = (390.0, 440.0)

# Sort dots by travelling salesman / nearest neighbor along the trail
remaining = list(dots)
chain = []

# Find closest dot to start_pt
dists = [np.hypot(d[0]-start_pt[0], d[1]-start_pt[1]) for d in remaining]
idx = np.argmin(dists)
chain.append(remaining.pop(idx))

while remaining:
    curr = chain[-1]
    # Find closest next dot within reasonable distance (< 65 px)
    dists = [np.hypot(d[0]-curr[0], d[1]-curr[1]) for d in remaining]
    min_dist = min(dists)
    if min_dist > 65:
        # End of continuous trail
        break
    best_idx = np.argmin(dists)
    chain.append(remaining.pop(best_idx))

print(f"Chained {len(chain)} dots along the trail from start to end!")

# Pick 15 evenly spaced points along the chain
n = len(chain)
indices = np.linspace(0, n - 1, 15, dtype=int)
exact_15_waypoints = [chain[i] for i in indices]

print("EXACT 15 WAYPOINTS:")
for i, (wx, wy) in enumerate(exact_15_waypoints):
    print(f"WP {i}: x={int(round(wx))}, y={int(round(wy))}")

# Draw them on a verification image
vis = img.copy()
# Draw all chain dots in blue
for dx, dy in chain:
    cv2.circle(vis, (int(round(dx)), int(round(dy))), 4, (255, 100, 0), -1)
# Draw the 15 selected milestone waypoints in bright yellow with black border
for i, (wx, wy) in enumerate(exact_15_waypoints):
    cv2.circle(vis, (int(round(wx)), int(round(wy))), 8, (0, 0, 0), -1)
    cv2.circle(vis, (int(round(wx)), int(round(wy))), 6, (0, 255, 255), -1)
    cv2.putText(vis, str(i), (int(round(wx))-4, int(round(wy))+4), cv2.FONT_HERSHEY_SIMPLEX, 0.4, (0, 0, 0), 1)

cv2.imwrite('scripts/exact_15_waypoints.jpg', vis)
print("Saved scripts/exact_15_waypoints.jpg")
