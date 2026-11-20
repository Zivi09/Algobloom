import cv2
import numpy as np

img = cv2.imread('public/sprout-garden-path.jpg')
h, w, _ = img.shape

# The path is characterized by a cream/light sand color:
# Path color: R: 235..255, G: 220..245, B: 180..215
# Pink dots: R: 215..255, G: 145..195, B: 135..185
b, g, r = img[:, :, 0].astype(int), img[:, :, 1].astype(int), img[:, :, 2].astype(int)

# Detect pink dots on path
is_pink = (r > 195) & (r > g + 24) & (r > b + 24) & (g > 115) & (b > 105)

# Find connected components of pink dots
num_labels, labels, stats, centroids = cv2.connectedComponentsWithStats(is_pink.astype(np.uint8))

pink_centers = []
for i in range(1, num_labels):
    area = stats[i, cv2.CC_STAT_AREA]
    if 8 <= area <= 180: # filtering noise and large flowers
        cx, cy = centroids[i]
        pink_centers.append((cx, cy, area))

print(f"Found {len(pink_centers)} pink stepping stone dots on the path!")

# Sort pink dots along the journey:
# Start at bottom-center (x ~ 390..340, y ~ 450..420)
# Winding around pond to left: (390 -> 340 -> 280 -> 210 -> 160 -> 120 -> 90)
# Going up left ridge: (80..110, y: 380 -> 300 -> 230 -> 180)
# Going across top: (x: 120 -> 180 -> 250 -> 320 -> 390 -> 450)
# Going down right: (x: 450 -> 520 -> 580 -> 640, y: 180 -> 230 -> 280 -> 320)

# Also detect trail region (sand color)
is_trail = (r > 230) & (g > 215) & (b > 170) & (abs(r - g) < 28) & ((g - b) > 20) & ((g - b) < 60)

# Let's save a visualization where detected dots are marked
debug_img = img.copy()
for cx, cy, area in pink_centers:
    cv2.circle(debug_img, (int(cx), int(cy)), 3, (0, 255, 0), -1)

cv2.imwrite('scripts/debug_pink_dots.jpg', debug_img)
print("Saved scripts/debug_pink_dots.jpg")
