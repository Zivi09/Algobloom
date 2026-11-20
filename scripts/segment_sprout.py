from PIL import Image, ImageFilter
import numpy as np
from collections import deque

def segment_sprout():
    # Load user's uploaded crop
    img = Image.open('C:/Users/Ziven/.gemini/antigravity/brain/1af44b46-f165-43d9-bf0b-2c083570c50e/.user_uploaded/media_1795167876188_62ae7866.png').convert('RGBA')
    arr = np.array(img)
    h, w, _ = arr.shape

    # Edge colors are the parchment / grass background
    # Sprout character is in the center
    # Background color is roughly cream/pale olive
    # Let's compute color distance from corner pixels:
    # Corner seeds for background flood fill:
    # We flood fill all pixels that match the outer background texture
    # Sprout has a prominent dark outline and distinct colors:
    # - Dark outline (dark brown/olive stroke around head, leaves, body): R<170, G<185, B<150
    # - Green leaves: G > R + 10 and G > B + 20
    # - Light green head: R ~ 210..245, G ~ 220..255, B ~ 120..180
    # - Overalls: dark green R ~ 110..160, G ~ 150..195, B ~ 70..115
    # - Black eyes: R < 70, G < 70, B < 70
    # - Cheeks: pink R > 230, G < 210, B < 190
    
    # Outer background is cream/beige:
    # R: 230..250, G: 220..245, B: 170..210 (small g-b difference ~ 30..45, whereas sprout has g-b > 65)
    
    is_sprout = np.zeros((h, w), dtype=bool)
    
    r = arr[:, :, 0].astype(np.float32)
    g = arr[:, :, 1].astype(np.float32)
    b = arr[:, :, 2].astype(np.float32)

    # Character traits:
    leaf_green = (g > 140) & (g > r + 5) & (g > b + 25)
    body_green = (g > 120) & (g > b + 20) & (r < 185) # overalls
    head_yellow_green = (r > 190) & (g > 200) & (b < 175) & ((g - b) > 52)
    dark_features = (r < 160) & (g < 170) & (b < 140) # outline, eyes, mouth
    cheeks = (r > 220) & (g < 200) & (b < 180) # pink blush
    white_stone = (r > 240) & (g > 235) & (b > 220) & ((g - b) < 25) # holding white stone

    is_character_core = leaf_green | body_green | head_yellow_green | dark_features | cheeks

    # We want a clean flood fill of the background:
    # Background starts at all 4 corners and borders
    is_bg = np.zeros((h, w), dtype=bool)
    visited = np.zeros((h, w), dtype=bool)
    q = deque()

    # Add border pixels that are not character core
    for y in range(h):
        for x in [0, w-1]:
            if not is_character_core[y, x]:
                q.append((y, x))
                visited[y, x] = True
                is_bg[y, x] = True
    for x in range(w):
        for y in [0, h-1]:
            if not is_character_core[y, x] and not visited[y, x]:
                q.append((y, x))
                visited[y, x] = True
                is_bg[y, x] = True

    # Flood fill background
    while q:
        cy, cx = q.popleft()
        for dy, dx in [(-1, 0), (1, 0), (0, -1), (0, 1)]:
            ny, nx = cy + dy, cx + dx
            if 0 <= ny < h and 0 <= nx < w and not visited[ny, nx]:
                visited[ny, nx] = True
                # If this pixel is not part of the character core, it's background
                if not is_character_core[ny, nx]:
                    is_bg[ny, nx] = True
                    q.append((ny, nx))

    # Any pixel not flooded as background is Sprout!
    sprout_mask = ~is_bg

    # Create alpha channel: 255 for Sprout, 0 for background
    alpha = np.zeros((h, w), dtype=np.uint8)
    alpha[sprout_mask] = 255

    # Smooth the alpha mask slightly for antialiasing
    mask_pil = Image.fromarray(alpha).filter(ImageFilter.GaussianBlur(radius=0.6))

    img.putalpha(mask_pil)
    # Trim empty transparent padding
    bbox = img.getbbox()
    trimmed = img.crop(bbox)
    trimmed.save('public/sprout-character.png')
    print(f"Trimmed Sprout saved: size={trimmed.size}, bbox={bbox}")

segment_sprout()
