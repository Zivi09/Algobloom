import cv2
import numpy as np
from PIL import Image, ImageFilter

def main():
    # Load the clean background
    base = Image.open('public/sprout-garden-path-clean.jpg').convert('RGBA')
    w, h = base.size
    print(f"Base size: {w}x{h}")

    # Extract actual watercolor elements from the left side:
    # 1. The top-left watercolor trees (x: 95..245, y: 45..155)
    # 2. The mid-left meadow tree (x: 20..80, y: 230..320)
    # 3. Soft watercolor grass / hill patch (x: 140..280, y: 50..140)
    # 4. Lush flowering bushes (x: 500..600, y: 350..450 or left pond shrubs)
    
    # Let's extract Tree 1 (Large left hill tree):
    # Center around x: 145, y: 95, size ~ 75x90
    tree1_crop = base.crop((100, 45, 175, 145))
    
    # Tree 2 (Second left hill tree):
    # Center around x: 200, y: 105, size ~ 65x80
    tree2_crop = base.crop((170, 60, 240, 145))
    
    # Tree 3 (West meadow tree):
    # Center around x: 50, y: 275, size ~ 55x75
    tree3_crop = base.crop((20, 235, 75, 310))

    # Rolling green hill patch (x: 140..260, y: 80..160)
    hill_patch = base.crop((140, 70, 270, 160)).resize((260, 130), Image.Resampling.BILINEAR)

    # Lower meadow grass patch (x: 440..560, y: 340..440)
    meadow_patch = base.crop((440, 340, 560, 440)).resize((240, 150), Image.Resampling.BILINEAR)

    # Function to create an elliptical feathered alpha mask
    def make_feathered_mask(size, feather_radius=12):
        mw, mh = size
        mask = Image.new('L', (mw, mh), 0)
        draw_arr = np.zeros((mh, mw), dtype=np.uint8)
        
        y_coords, x_coords = np.ogrid[:mh, :mw]
        cx, cy = mw / 2, mh / 2
        rx, ry = (mw / 2) - feather_radius, (mh / 2) - feather_radius
        
        inside = ((x_coords - cx)**2 / max(1, rx)**2 + (y_coords - cy)**2 / max(1, ry)**2) <= 1.0
        draw_arr[inside] = 255
        
        mask_pil = Image.fromarray(draw_arr).filter(ImageFilter.GaussianBlur(radius=feather_radius))
        return mask_pil

    # 1. Composite rolling watercolor hill onto top-right beige area (x: 600..857, y: 50..170)
    hill_mask = make_feathered_mask(hill_patch.size, feather_radius=16)
    # Blend with 70% opacity
    hill_mask_arr = np.array(hill_mask, dtype=np.float32) * 0.75
    hill_patch.putalpha(Image.fromarray(hill_mask_arr.astype(np.uint8)))
    base.paste(hill_patch, (600, 45), hill_patch)

    # 2. Composite lower meadow watercolor grass onto bottom-right beige area (x: 620..857, y: 320..460)
    meadow_mask = make_feathered_mask(meadow_patch.size, feather_radius=18)
    meadow_mask_arr = np.array(meadow_mask, dtype=np.float32) * 0.70
    meadow_patch.putalpha(Image.fromarray(meadow_mask_arr.astype(np.uint8)))
    base.paste(meadow_patch, (625, 315), meadow_patch)

    # 3. Composite Tree 1 onto the upper-right hill (x: 720, y: 55)
    t1_mask = make_feathered_mask(tree1_crop.size, feather_radius=8)
    tree1_crop.putalpha(t1_mask)
    base.paste(tree1_crop, (720, 50), tree1_crop)

    # 4. Composite Tree 2 next to Tree 1 (x: 780, y: 65)
    t2_mask = make_feathered_mask(tree2_crop.size, feather_radius=7)
    tree2_crop.putalpha(t2_mask)
    base.paste(tree2_crop, (780, 60), tree2_crop)

    # 5. Composite Tree 3 onto mid-right slope (x: 760, y: 200)
    t3_mask = make_feathered_mask(tree3_crop.size, feather_radius=6)
    tree3_crop.putalpha(t3_mask)
    base.paste(tree3_crop, (760, 195), tree3_crop)

    # Convert back to RGB and save
    final_img = base.convert('RGB')
    final_img.save('public/sprout-garden-path-clean.jpg', quality=95)
    final_img.save('dist/sprout-garden-path-clean.jpg', quality=95)
    print("Watercolor composite on right side completed! Saved to public and dist.")

if __name__ == '__main__':
    main()
