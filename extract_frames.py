import cv2
import numpy as np
import os
import json

video_path = r"c:\Users\Haneesha\Desktop\Root folder\public\character.mp4"
frames_dir = r"c:\Users\Haneesha\Desktop\Root folder\public\frames"
os.makedirs(frames_dir, exist_ok=True)

cap = cv2.VideoCapture(video_path)
total_frames = int(cap.get(cv2.CAP_PROP_FRAME_COUNT))

all_frames = []
while True:
    ret, frame = cap.read()
    if not ret:
        break
    all_frames.append(frame)
cap.release()

print(f"Loaded {len(all_frames)} frames from video.")

# Measure exact background color across corners of all frames
corner_pixels = []
for f in all_frames:
    h, w, _ = f.shape
    corner_pixels.append(f[0:15, 0:15])
    corner_pixels.append(f[0:15, w-15:w])
    corner_pixels.append(f[h-15:h, 0:15])
    corner_pixels.append(f[h-15:h, w-15:w])

corner_pixels = np.array(corner_pixels)
avg_bgr = np.mean(corner_pixels, axis=(0, 1, 2))
b, g, r = int(round(avg_bgr[0])), int(round(avg_bgr[1])), int(round(avg_bgr[2]))
hex_color = f"#{r:02x}{g:02x}{b:02x}"
print(f"Calculated Background Hex: {hex_color} (RGB: {r}, {g}, {b})")

# 8 compass anchor angles and video frame mappings:
# Index 0 is 0 deg (RIGHT)
# Index 8 is 45 deg (DOWN-RIGHT)
# Index 16 is 90 deg (DOWN)
# Index 24 is 135 deg (DOWN-LEFT)
# Index 32 is 180 deg (LEFT)
# Index 40 is 225 deg (UP-LEFT)
# Index 48 is 270 deg (UP)
# Index 56 is 315 deg (UP-RIGHT)
# Index 64 wraps to 0 (360 deg, RIGHT)

# Map all 64 indices
frame_indices = []

# Segment 0: 0..8 (RIGHT -> DOWN-RIGHT) [57 -> 74]
for i in range(8):
    f_num = int(round(57 + (74 - 57) * (i / 8.0)))
    frame_indices.append(f_num)

# Segment 1: 8..16 (DOWN-RIGHT -> DOWN) [74 -> 87]
for i in range(8):
    f_num = int(round(74 + (87 - 74) * (i / 8.0)))
    frame_indices.append(f_num)

# Segment 2: 16..24 (DOWN -> DOWN-LEFT) [87 -> 108]
for i in range(8):
    f_num = int(round(87 + (108 - 87) * (i / 8.0)))
    frame_indices.append(f_num)

# Segment 3: 24..32 (DOWN-LEFT -> LEFT) [108 -> 119]
for i in range(8):
    f_num = int(round(108 + (119 - 108) * (i / 8.0)))
    frame_indices.append(f_num)

# Segment 4: 32..40 (LEFT -> UP-LEFT) [119 -> 129]
for i in range(8):
    f_num = int(round(119 + (129 - 119) * (i / 8.0)))
    frame_indices.append(f_num)

# Segment 5: 40..48 (UP-LEFT -> UP) [129..134 -> 14..16]
# 8 frames: 129, 130, 131, 132, 133, 134, 14, 15
seg5 = [129, 130, 131, 132, 133, 134, 14, 15]
frame_indices.extend(seg5)

# Segment 6: 48..56 (UP -> UP-RIGHT) [16 -> 38]
for i in range(8):
    f_num = int(round(16 + (38 - 16) * (i / 8.0)))
    frame_indices.append(f_num)

# Segment 7: 56..64 (UP-RIGHT -> RIGHT) [38 -> 57]
for i in range(8):
    f_num = int(round(38 + (57 - 38) * (i / 8.0)))
    frame_indices.append(f_num)

print(f"Total mapped indices: {len(frame_indices)}")
assert len(frame_indices) == 64

# Save each of the 64 frames as WebP
webp_quality = [cv2.IMWRITE_WEBP_QUALITY, 96]

for idx, f_num in enumerate(frame_indices):
    f = all_frames[f_num]
    out_path = os.path.join(frames_dir, f"frame_{idx:02d}.webp")
    cv2.imwrite(out_path, f, webp_quality)

# Save center neutral frame (frame #172)
center_frame = all_frames[172]
cv2.imwrite(os.path.join(frames_dir, "center.webp"), center_frame, webp_quality)
cv2.imwrite(r"c:\Users\Haneesha\Desktop\Root folder\public\center.webp", center_frame, webp_quality)

metadata = {
    "total_frames": 64,
    "step_degrees": 360.0 / 64.0,
    "background_hex": hex_color,
    "background_rgb": [r, g, b],
    "compass_directions": {
        "RIGHT": {"index": 0, "angle": 0.0, "video_frame": 57},
        "DOWN_RIGHT": {"index": 8, "angle": 45.0, "video_frame": 74},
        "DOWN": {"index": 16, "angle": 90.0, "video_frame": 87},
        "DOWN_LEFT": {"index": 24, "angle": 135.0, "video_frame": 108},
        "LEFT": {"index": 32, "angle": 180.0, "video_frame": 119},
        "UP_LEFT": {"index": 40, "angle": 225.0, "video_frame": 129},
        "UP": {"index": 48, "angle": 270.0, "video_frame": 16},
        "UP_RIGHT": {"index": 56, "angle": 315.0, "video_frame": 38},
        "CENTER": {"video_frame": 172}
    },
    "frame_indices": frame_indices
}

with open(os.path.join(frames_dir, "metadata.json"), "w") as f:
    json.dump(metadata, f, indent=2)

print("Successfully extracted 64 WebP frames + center.webp and metadata.json!")
