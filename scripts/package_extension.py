#!/usr/bin/env python3
"""
TradeCopilot Extension Packager
Packages the Chrome extension into a clean, store-ready ZIP archive:
- site/downloads/tradecopilot-extension.zip (for landing page direct download)
- dist/tradecopilot-v1.0.0.zip (for Chrome Web Store Developer Console submission)
"""

import os
import zipfile

def package_extension():
    root_dir = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
    ext_dir = os.path.join(root_dir, "extension")
    dist_dir = os.path.join(root_dir, "dist")
    site_dl_dir = os.path.join(root_dir, "site", "downloads")

    os.makedirs(dist_dir, exist_ok=True)
    os.makedirs(site_dl_dir, exist_ok=True)

    dist_zip = os.path.join(dist_dir, "tradecopilot-v1.0.0.zip")
    site_zip = os.path.join(site_dl_dir, "tradecopilot-extension.zip")

    target_files = [
        "manifest.json",
        "background.js",
        "content.js",
        "hud.css",
        "popup.html",
        "popup.js",
        os.path.join("icons", "icon16.png"),
        os.path.join("icons", "icon48.png"),
        os.path.join("icons", "icon128.png"),
    ]

    for dest_path in [dist_zip, site_zip]:
        with zipfile.ZipFile(dest_path, "w", zipfile.ZIP_DEFLATED) as zipf:
            for rel in target_files:
                src = os.path.join(ext_dir, rel)
                if os.path.exists(src):
                    zipf.write(src, arcname=rel.replace("\\", "/"))
                else:
                    print(f"[WARN] Missing file: {src}")
        size_kb = os.path.getsize(dest_path) / 1024
        print(f"[OK] Packaged extension archive: {dest_path} ({size_kb:.1f} KB)")

if __name__ == "__main__":
    package_extension()
