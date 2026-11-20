import cv2
import numpy as np

def clean_sprout_completely():
    orig = cv2.imread('public/sprout-garden-path.jpg')
    h, w, _ = orig.shape

    # Sprout was matched at x=309, y=101, w=83, h=125
    # But Sprout's leaves reach up to y ~ 85!
    # Let's inspect the region y: 80..230, x: 300..400
    crop = cv2.imread('C:/Users/Ziven/.gemini/antigravity/brain/1af44b46-f165-43d9-bf0b-2c083570c50e/.user_uploaded/media_1795167876188_62ae7866.png')
    ch, cw, _ = crop.shape

    res = cv2.matchTemplate(orig, crop, cv2.TM_CCOEFF_NORMED)
    _, _, _, max_loc = cv2.minMaxLoc(res)
    sx, sy = max_loc
    
    # Expand bounding box to fully encompass the leaves at the top and feet at bottom
    top_y = max(0, sy - 18) # Include top leaf tips!
    bot_y = min(h, sy + ch + 5)
    left_x = max(0, sx - 4)
    right_x = min(w, sx + cw + 4)

    # Sample local clean background (trail and grass)
    clean_strip_left = orig[top_y:bot_y, max(0, left_x - 20):left_x]
    clean_strip_right = orig[top_y:bot_y, right_x:min(w, right_x + 20)]
    
    # Create mask covering Sprout completely
    mask = np.zeros((h, w), dtype=np.uint8)
    
    # Center and radius of Sprout
    cx = (left_x + right_x) // 2
    cy = (top_y + bot_y) // 2
    rx = (right_x - left_x) // 2 + 2
    ry = (bot_y - top_y) // 2 + 2

    y_coords, x_coords = np.ogrid[:h, :w]
    inside = ((x_coords - cx)**2 / rx**2 + (y_coords - cy)**2 / ry**2) <= 1.0

    # Also detect any strong green (leaf tips, overalls) or dark outline in that area
    roi = orig[top_y:bot_y, left_x:right_x]
    b, g, r = roi[:, :, 0], roi[:, :, 1], roi[:, :, 2]
    
    # Green pixels or dark outline
    is_sprout_color = ((g > b + 15) & (g > r - 10)) | (r < 170) | ((r > 200) & (g > 200) & (b < 180) & (g - b > 40))
    
    mask_roi = np.zeros((bot_y - top_y, right_x - left_x), dtype=np.uint8)
    mask_roi[is_sprout_color] = 255
    
    # Ellipse shape constraint
    mask[top_y:bot_y, left_x:right_x] = mask_roi
    mask = (mask > 0) & inside
    
    # Dilate by 3 pixels to ensure NO leaf tips or fringes remain
    kernel = cv2.getStructuringElement(cv2.MORPH_ELLIPSE, (7, 7))
    dilated = cv2.dilate(mask.astype(np.uint8) * 255, kernel, iterations=1)
    
    # Inpaint using Telea
    inpainted = cv2.inpaint(orig, dilated, 7, cv2.INPAINT_TELEA)

    cv2.imwrite('public/sprout-garden-path-clean.jpg', inpainted, [cv2.IMWRITE_JPEG_QUALITY, 96])
    cv2.imwrite('dist/sprout-garden-path-clean.jpg', inpainted, [cv2.IMWRITE_JPEG_QUALITY, 96])
    print("Sprout completely and cleanly inpainted with leaf tips included!")

clean_sprout_completely()
