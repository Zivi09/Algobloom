import cv2
import numpy as np
from PIL import Image

def main():
    # Load pristine original background
    orig = cv2.imread('public/sprout-garden-path.jpg')
    h, w, _ = orig.shape
    print(f"Loaded image size: {w}x{h}")

    # Load user's crop of Sprout to find exact location
    crop = cv2.imread('C:/Users/Ziven/.gemini/antigravity/brain/1af44b46-f165-43d9-bf0b-2c083570c50e/.user_uploaded/media_1795167876188_62ae7866.png')
    ch, cw, _ = crop.shape

    # Template matching to find exact location of Sprout
    res = cv2.matchTemplate(orig, crop, cv2.TM_CCOEFF_NORMED)
    min_val, max_val, min_loc, max_loc = cv2.minMaxLoc(res)
    sx, sy = max_loc
    print(f"Sprout exact location: x={sx}, y={sy}, w={cw}, h={ch}, match score={max_val:.3f}")

    # Create a tight, precise mask covering ONLY Sprout's pixels inside (sx, sy, cw, ch)
    # Background in this area is:
    # - Trail: cream/sand color ~ BGR (175, 225, 235)
    # - Grass: pale yellow-green ~ BGR (160, 215, 210)
    # Sprout pixels:
    # - Leaves & Overalls: strong green BGR (50..120, 130..190, 80..160)
    # - Head: lime green BGR (120..170, 210..245, 195..240)
    # - Outlines & eyes: dark BGR (<140, <150, <150)
    
    sprout_region = orig[sy:sy+ch, sx:sx+cw]
    
    # Precise color difference from local background
    # Sample clean trail background just to the left and right of Sprout
    clean_left = orig[sy+40:sy+ch-20, max(0, sx-15):sx]
    clean_right = orig[sy+40:sy+ch-20, sx+cw:min(w, sx+cw+15)]
    local_bg_color = np.median(np.vstack([clean_left.reshape(-1, 3), clean_right.reshape(-1, 3)]), axis=0)
    print(f"Local background BGR: {local_bg_color}")

    # Compute color distance from local background
    diff = np.linalg.norm(sprout_region.astype(np.float32) - local_bg_color, axis=2)

    # Sprout mask: pixels that differ significantly from background, restricted inside Sprout's bounding ellipse
    mask = np.zeros((h, w), dtype=np.uint8)
    
    # Bounding ellipse for Sprout: center around (sx + cw//2 - 2, sy + ch//2 + 5), radius (cw//2 - 4, ch//2 - 2)
    cx, cy = sx + cw // 2 - 2, sy + ch // 2 + 3
    rx, ry = cw // 2 - 4, ch // 2 - 4
    
    y_coords, x_coords = np.ogrid[:h, :w]
    inside_sprout_ellipse = ((x_coords - cx)**2 / rx**2 + (y_coords - cy)**2 / ry**2) <= 1.0

    # Only mark pixels inside the ellipse that are Sprout (diff > 18 or dark outline or strong green)
    sprout_pixels = np.zeros((h, w), dtype=bool)
    sprout_pixels[sy:sy+ch, sx:sx+cw] = (diff > 16)
    
    # Combine
    final_mask = (inside_sprout_ellipse & sprout_pixels).astype(np.uint8) * 255
    
    # Dilate mask by 2 pixels to cover antialiased dark edges
    kernel = cv2.getStructuringElement(cv2.MORPH_ELLIPSE, (5, 5))
    dilated_mask = cv2.dilate(final_mask, kernel, iterations=1)

    # Inpaint using Telea method (smooth gradient propagation)
    inpainted = cv2.inpaint(orig, dilated_mask, 5, cv2.INPAINT_TELEA)

    # Save to public and dist
    cv2.imwrite('public/sprout-garden-path-clean.jpg', inpainted, [cv2.IMWRITE_JPEG_QUALITY, 96])
    cv2.imwrite('dist/sprout-garden-path-clean.jpg', inpainted, [cv2.IMWRITE_JPEG_QUALITY, 96])
    print("Seamless inpaint completed! Saved to public/sprout-garden-path-clean.jpg and dist/sprout-garden-path-clean.jpg")

if __name__ == '__main__':
    main()
