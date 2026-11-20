import numpy as np
from PIL import Image, ImageFilter

def main():
    bg_img = Image.open('public/sprout-garden-path.jpg').convert('RGB')
    bg_arr = np.array(bg_img, dtype=np.float32)

    crop_img = Image.open('C:/Users/Ziven/.gemini/antigravity/brain/1af44b46-f165-43d9-bf0b-2c083570c50e/.user_uploaded/media_1795167876188_62ae7866.png').convert('RGB')
    crop_arr = np.array(crop_img, dtype=np.float32)

    ch, cw, _ = crop_arr.shape
    bh, bw, _ = bg_arr.shape

    # Find best match position
    # Subsample search for speed
    best_diff = float('inf')
    best_y, best_x = 0, 0

    # Search in upper-middle area where Sprout is expected (y: 80..220, x: 300..450)
    for y in range(80, 220):
        for x in range(300, 450):
            patch = bg_arr[y:y+ch, x:x+cw]
            if patch.shape == crop_arr.shape:
                diff = np.mean(np.abs(patch - crop_arr))
                if diff < best_diff:
                    best_diff = diff
                    best_y, best_x = y, x

    print(f"Best match at y={best_y}, x={best_x} with diff={best_diff}")

    # Extract Sprout with transparency mask
    # Sprout character consists of:
    # - Green leaves (hue green)
    # - Green/yellow head (RGB ~ 210..245, 220..250, 120..170)
    # - Black eyes & mouth
    # - Green overalls & feet
    # - White stone held in hand
    # Background is parchment cream / pale watercolor grass:
    # Color difference from background:
    sprout_crop = bg_img.crop((best_x, best_y, best_x + cw, best_y + ch)).convert('RGBA')
    sprout_arr = np.array(sprout_crop)

    # We also have media_1795167876188_62ae7866.png which is the user's uploaded crop
    user_crop = Image.open('C:/Users/Ziven/.gemini/antigravity/brain/1af44b46-f165-43d9-bf0b-2c083570c50e/.user_uploaded/media_1795167876188_62ae7866.png').convert('RGBA')
    user_arr = np.array(user_crop)

    # Let's segment the character cleanly:
    # The character boundary:
    # Find background color around the edges of user_arr
    # Edge pixels:
    edge_pixels = np.concatenate([
        user_arr[0, :, :3],
        user_arr[-1, :, :3],
        user_arr[:, 0, :3],
        user_arr[:, -1, :3]
    ])
    bg_color_mean = np.mean(edge_pixels, axis=0) # ~ [235, 225, 175]
    print(f"Estimated background color: {bg_color_mean}")

    # Color distance from edge background
    diff_rgb = np.sqrt(np.sum((user_arr[:, :, :3].astype(np.float32) - bg_color_mean)**2, axis=2))
    
    # Also check greenness (g - r) and (g - b) or darkness (for eyes/outlines)
    r = user_arr[:, :, 0].astype(np.float32)
    g = user_arr[:, :, 1].astype(np.float32)
    b = user_arr[:, :, 2].astype(np.float32)

    # Sprout's head and body have high green relative to blue, or dark outlines
    green_tint = (g - b) > 30
    dark_outline = (r < 180) & (g < 190) & (b < 160)
    green_leaves = (g > r + 15) & (g > b + 25)
    white_stone = (r > 240) & (g > 235) & (b > 220) & (diff_rgb > 15)

    # Mask combination:
    mask = (diff_rgb > 18) | green_tint | dark_outline | green_leaves

    # Clean up mask with flood fill from corners to only remove outer background
    from scipy.ndimage import binary_fill_holes
    # If scipy is not present, use PIL
    try:
        from scipy.ndimage import binary_fill_holes
        filled_mask = binary_fill_holes(mask)
    except:
        filled_mask = mask

    # Set alpha
    alpha = np.zeros((ch, cw), dtype=np.uint8)
    alpha[filled_mask] = 255
    # Smooth edges with Gaussian blur on mask
    mask_img = Image.fromarray(alpha).filter(ImageFilter.GaussianBlur(radius=0.7))
    user_crop.putalpha(mask_img)
    user_crop.save('public/sprout-character.png')
    print("Saved public/sprout-character.png")

    # Inpaint background: heal the spot where Sprout was walking
    # The path continues from left of Sprout (x: best_x - 30 .. best_x) to right (best_x + cw .. best_x + cw + 30)
    # The hill grass is above (y: best_y - 20) and meadow is below (y: best_y + ch)
    # Let's clone the empty path from just ahead on the trail:
    clean_bg = bg_img.copy()
    
    # We can sample the path and grass from nearby areas
    # Path just ahead of sprout (x + cw + 15):
    ahead_patch = bg_img.crop((best_x + cw + 10, best_y, best_x + cw + 10 + cw, best_y + ch))
    behind_patch = bg_img.crop((best_x - cw - 10, best_y, best_x - 10, best_y + ch))
    
    # Blend them into the spot
    # Or smoothly blend texture
    for row in range(ch):
        for col in range(cw):
            py = best_y + row
            px = best_x + col
            # If inside the character mask
            if alpha[row, col] > 10:
                # Interpolate from adjacent clean background pixels (left/right or top/bottom)
                t = col / cw
                left_px = clean_bg.getpixel((best_x - 5, py))
                right_px = clean_bg.getpixel((min(bw - 1, best_x + cw + 15), py))
                blended = tuple(int((1 - t) * left_px[i] + t * right_px[i]) for i in range(3))
                clean_bg.putpixel((px, py), blended)

    # Smooth the patched region with a light blur
    patch_box = (best_x - 8, best_y - 8, best_x + cw + 8, best_y + ch + 8)
    smoothed_patch = clean_bg.crop(patch_box).filter(ImageFilter.GaussianBlur(radius=1.2))
    clean_bg.paste(smoothed_patch, patch_box)

    clean_bg.save('public/sprout-garden-path-clean.jpg', quality=95)
    print("Saved public/sprout-garden-path-clean.jpg")

if __name__ == '__main__':
    main()
