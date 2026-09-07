#!/usr/bin/env python3
"""
Generate Chrome Extension PNG icons for TradeCopilot.
Creates 16x16, 48x48, and 128x128 icons with amber shield and pilot HUD crosshair.
"""
import os
from PIL import Image, ImageDraw

def create_icon(size, output_path):
    img = Image.new("RGBA", (size, size), (0, 0, 0, 0))
    draw = ImageDraw.Draw(img)

    # Background rounded container / shield
    padding = size * 0.08
    box = [padding, padding, size - padding, size - padding]
    
    # Dark slate background #16171b
    draw.rounded_rectangle(box, radius=size*0.22, fill=(22, 23, 27, 255), outline=(232, 160, 32, 255), width=max(1, int(size*0.06)))

    # Central chevron / radar compass
    cx, cy = size / 2, size / 2
    r = size * 0.28
    
    # Amber radar circle #e8a020
    draw.ellipse([cx - r, cy - r, cx + r, cy + r], outline=(232, 160, 32, 200), width=max(1, int(size*0.04)))
    
    # Compass / crosshair ticks
    tick_len = size * 0.1
    draw.line([cx, cy - r - tick_len*0.3, cx, cy - r + tick_len], fill=(232, 160, 32, 255), width=max(1, int(size*0.05)))
    draw.line([cx, cy + r - tick_len, cx, cy + r + tick_len*0.3], fill=(232, 160, 32, 255), width=max(1, int(size*0.05)))
    draw.line([cx - r - tick_len*0.3, cy, cx - r + tick_len, cy], fill=(232, 160, 32, 255), width=max(1, int(size*0.05)))
    draw.line([cx + r - tick_len, cy, cx + r + tick_len*0.3, cy], fill=(232, 160, 32, 255), width=max(1, int(size*0.05)))

    # Center dot / pilot triangle
    tri_h = size * 0.16
    tri_w = size * 0.14
    draw.polygon([
        (cx, cy - tri_h),
        (cx - tri_w, cy + tri_h*0.8),
        (cx, cy + tri_h*0.3),
        (cx + tri_w, cy + tri_h*0.8)
    ], fill=(247, 121, 44, 255))

    os.makedirs(os.path.dirname(output_path), exist_ok=True)
    img.save(output_path, "PNG")
    print(f"Generated icon: {output_path} ({size}x{size})")

if __name__ == "__main__":
    base_dir = os.path.join(os.path.dirname(__file__), "..", "extension", "icons")
    create_icon(16, os.path.join(base_dir, "icon16.png"))
    create_icon(48, os.path.join(base_dir, "icon48.png"))
    create_icon(128, os.path.join(base_dir, "icon128.png"))
