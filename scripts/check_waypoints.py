import cv2
import numpy as np

img = cv2.imread('public/sprout-garden-path.jpg')
h, w, _ = img.shape

# Pink dots on the trail:
# In RGB: Red is high, Green and Blue are lower: R > G + 30, R > B + 30, R > 190
b, g, r = img[:, :, 0].astype(int), img[:, :, 1].astype(int), img[:, :, 2].astype(int)

pink_mask = (r > 190) & (r > g + 28) & (r > b + 28) & (g > 110) & (b > 100)

# Also find white dots in the user's current PATH_WAYPOINTS
# Let's inspect current PATH_WAYPOINTS
current_waypoints = [
    (350, 440),
    (290, 448),
    (230, 442),
    (170, 418),
    (120, 372),
    (95, 310),
    (105, 245),
    (140, 190),
    (195, 165),
    (260, 175),
    (330, 195),
    (405, 170),
    (480, 230),
    (560, 275),
    (640, 300),
]

print("Sampling colors around current waypoints:")
for i, (wx, wy) in enumerate(current_waypoints):
    patch = img[max(0, wy-10):min(h, wy+10), max(0, wx-10):min(w, wx+10)]
    # Check if there is trail or pink dots nearby
    local_b, local_g, local_r = patch[:, :, 0], patch[:, :, 1], patch[:, :, 2]
    is_pink = (local_r > 185) & (local_r > local_g + 20) & (local_r > local_b + 20)
    has_pink = np.any(is_pink)
    print(f"WP {i} ({wx}, {wy}): has_pink_nearby={has_pink}")
