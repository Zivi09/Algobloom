from PIL import Image, ImageFilter
import numpy as np

def refine_clean_map():
    orig = Image.open('public/sprout-garden-path.jpg').convert('RGB')
    w, h = orig.size
    
    # Sprout was at x: 309..392, y: 101..226
    # Let's cleanly patch this region:
    # 1. The trail runs horizontally with a slight curve from x: 250..450, y: 150..220
    # 2. Above the trail (y < 150) is the pale green hill.
    # 3. Below the trail (y > 200) is the green meadow with scattered flowers.
    
    clean = orig.copy()
    
    # We can clone clean trail slices from x: 220..270 and x: 410..460
    # Inpainting using bilateral/patch blending:
    left_sample = orig.crop((260, 100, 310, 230))
    right_sample = orig.crop((390, 100, 440, 230))
    
    # Sprout area to cover: x: 310 to 395, y: 105 to 225
    pw = 395 - 310
    ph = 225 - 105
    
    patch = np.zeros((ph, pw, 3), dtype=np.float32)
    
    l_arr = np.array(left_sample.resize((pw, ph)), dtype=np.float32)
    r_arr = np.array(right_sample.resize((pw, ph)), dtype=np.float32)
    
    for c in range(pw):
        t = c / pw
        patch[:, c] = (1 - t) * l_arr[:, c] + t * r_arr[:, c]
        
    patch_img = Image.fromarray(np.clip(patch, 0, 255).astype(np.uint8))
    
    # Create soft feathered mask for seamless blend
    feather_mask = Image.new('L', (pw, ph), 255)
    feather_mask = feather_mask.filter(ImageFilter.GaussianBlur(radius=4))
    
    clean.paste(patch_img, (310, 105))
    
    # Soften transition edges
    border_box = (305, 100, 400, 230)
    blurred_border = clean.crop(border_box).filter(ImageFilter.GaussianBlur(radius=0.9))
    clean.paste(blurred_border, border_box)
    
    clean.save('public/sprout-garden-path-clean.jpg', quality=95)
    print("Refined public/sprout-garden-path-clean.jpg created successfully!")

refine_clean_map()
