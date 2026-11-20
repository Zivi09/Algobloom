from PIL import Image, ImageFilter
import numpy as np

def clean_sprout():
    img = Image.open('C:/Users/Ziven/.gemini/antigravity/brain/1af44b46-f165-43d9-bf0b-2c083570c50e/.user_uploaded/media_1795167876188_62ae7866.png').convert('RGBA')
    arr = np.array(img)
    h, w, _ = arr.shape

    r = arr[:, :, 0].astype(np.float32)
    g = arr[:, :, 1].astype(np.float32)
    b = arr[:, :, 2].astype(np.float32)

    # Sprout character mask:
    # 1. Leaves (y: 0..50): Green pixels
    leaves = (g > 115) & (g > r + 3) & (g > b + 20) & (arr[:, :, 1] > 100)
    
    # 2. Head (y: 30..85, x: 10..75): Light olive green / yellow
    head = (r > 190) & (g > 200) & (b < 185) & ((g - b) > 45)

    # 3. Eyes & Mouth: Very dark pixels within head region
    eyes = (r < 110) & (g < 110) & (b < 100) & (np.arange(h)[:, None] < 85)

    # 4. Cheeks: Pink
    cheeks = (r > 215) & (g < 205) & (b < 175) & (np.arange(h)[:, None] < 85) & (np.arange(h)[:, None] > 55)

    # 5. Overalls / Body (y: 70..115, x: 15..68): Dark green
    overalls = (g > 100) & (g > b + 15) & (r < 185) & (np.arange(h)[:, None] > 70) & (np.arange(w)[None, :] < 68)

    # 6. Arms and legs
    limbs = (g > 130) & (g > b + 25) & (np.arange(w)[None, :] < 68)

    # 7. Pearl/disc held in hand (x: 12..32, y: 75..95)
    ys, xs = np.indices((h, w))
    disc = (xs >= 12) & (xs <= 32) & (ys >= 75) & (ys <= 95) & (r > 230) & (g > 225) & (b > 215)

    sprout_mask = (leaves | head | eyes | cheeks | overalls | limbs | disc) & (xs < 70) & (xs > 4)

    # Morphological close: fill small holes inside head and body
    from scipy.ndimage import binary_closing, binary_fill_holes
    try:
        closed = binary_closing(sprout_mask, structure=np.ones((4, 4)))
        filled = binary_fill_holes(closed)
    except:
        filled = sprout_mask

    # Limit to sprout bounding area to prevent catching background
    filled = filled & (xs < 68) & (xs > 6) & (ys < 120) & (ys > 2)

    alpha = np.zeros((h, w), dtype=np.uint8)
    alpha[filled] = 255

    # Antialias edges with subtle blur
    mask_pil = Image.fromarray(alpha).filter(ImageFilter.GaussianBlur(radius=0.7))
    img.putalpha(mask_pil)

    # Crop to content
    bbox = img.getbbox()
    final_sprout = img.crop(bbox)
    final_sprout.save('public/sprout-character.png')
    print(f"Final clean Sprout saved: size={final_sprout.size}")

clean_sprout()
