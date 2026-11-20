import cv2
import numpy as np

img = cv2.imread('public/sprout-garden-path.jpg')
h, w, _ = img.shape

# Let's inspect the actual image and select the 15 exact stepping stones along the main trail:
# 1. Start at entrance (bottom right of pond):
# WP 0: Entrance Gate
# Let's verify the exact coordinates of the trail:

# Let's list the candidate positions on the actual cobblestone trail with pink dots:
# Path segment 1: Bottom loop (entrance moving left below pond)
# Path segment 2: Lower-left curve around pond
# Path segment 3: Middle-left ridge
# Path segment 4: Upper-left bend
# Path segment 5: Top ridge curving right
# Path segment 6: Upper-middle path
# Path segment 7: Downhill slope towards right
# Path segment 8: Path ending at floating petals

# Let's test these candidate points against the actual image:
candidates = [
    (372, 447), # WP 0: Gate entrance (has pink dot)
    (320, 405), # WP 1: Lower meadow trail (has pink dot)
    (251, 419), # WP 2: Basin trail (has pink dot)
    (178, 419), # WP 3: Pond bank walkway (has pink dot)
    (125, 365), # WP 4: Left shore curve
    (85, 295),  # WP 5: West ridge ascent
    (78, 175),  # WP 6: West ridge top curve
    (115, 145), # WP 7: North-west hill path (has pink dot)
    (176, 150), # WP 8: North slope (has pink dot)
    (244, 176), # WP 9: Upper glade (has pink dot)
    (302, 203), # WP 10: Glade approach (has pink dot)
    (366, 220), # WP 11: Mid-slope descent (has pink dot)
    (433, 250), # WP 12: East trail curve (has pink dot)
    (519, 280), # WP 13: Lower-east trail (has pink dot)
    (583, 294), # WP 14: Final trail terminus (has pink dot)
]

vis = img.copy()
for i, (cx, cy) in enumerate(candidates):
    # Check if candidate is on the trail (sand color or pink dot)
    b, g, r = vis[int(cy), int(cx)].astype(int)
    print(f"Candidate {i} ({cx}, {cy}): RGB=({r}, {g}, {b})")
    cv2.circle(vis, (int(cx), int(cy)), 7, (0, 0, 255), -1)
    cv2.circle(vis, (int(cx), int(cy)), 5, (255, 255, 255), -1)
    cv2.putText(vis, str(i), (int(cx)-4, int(cy)+4), cv2.FONT_HERSHEY_SIMPLEX, 0.4, (0, 0, 0), 1)

cv2.imwrite('scripts/verify_candidates.jpg', vis)
print("Saved scripts/verify_candidates.jpg")
