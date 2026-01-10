import os

directory = "."
html_content = """
<!DOCTYPE html>
<html>
<head>
    <style>
        body { font-family: sans-serif; }
        .container { display: flex; flex-wrap: wrap; gap: 10px; }
        .item { border: 1px solid #ccc; padding: 5px; width: 220px; text-align: center; }
        img, video { max-width: 100%; height: auto; display: block; margin: 0 auto; }
        .name { margin-top: 5px; font-size: 12px; word-break: break-all; }
    </style>
</head>
<body>
    <h1>Media Gallery</h1>
    <div class="container">
"""

files = sorted(os.listdir(directory))
images = [f for f in files if f.startswith("whatsapp_image_") and f.endswith((".jpeg", ".jpg", ".png"))]
videos = [f for f in files if f.startswith("whatsapp_video_") and f.endswith(".mp4")]

for img in images:
    html_content += f"""
        <div class="item">
            <img src="{img}" loading="lazy" alt="{img}">
            <div class="name">{img}</div>
        </div>
    """

for vid in videos:
    html_content += f"""
        <div class="item">
            <video src="{vid}" controls muted loop playsinline onmouseover="this.play()" onmouseout="this.pause()"></video>
            <div class="name">{vid}</div>
        </div>
    """

html_content += """
    </div>
</body>
</html>
"""

with open("temp_gallery.html", "w") as f:
    f.write(html_content)

print("Gallery generated: temp_gallery.html")
