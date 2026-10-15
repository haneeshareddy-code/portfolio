import cv2
import numpy as np
import os
import json

video_path = r"c:\Users\Haneesha\Desktop\Root folder\public\character.mp4"
cap = cv2.VideoCapture(video_path)

if not cap.isOpened():
    print(f"Error opening video {video_path}")
    exit(1)

total_frames = int(cap.get(cv2.CAP_PROP_FRAME_COUNT))
fps = cap.get(cv2.CAP_PROP_FPS)
width = int(cap.get(cv2.CAP_PROP_FRAME_WIDTH))
height = int(cap.get(cv2.CAP_PROP_FRAME_HEIGHT))
duration = total_frames / fps if fps > 0 else 0

print(f"Video Info:")
print(f"  Total Frames: {total_frames}")
print(f"  FPS: {fps}")
print(f"  Resolution: {width}x{height}")
print(f"  Duration: {duration:.2f}s")

# Sample background color from corners of frames
corner_colors = []
for f_idx in [0, total_frames // 4, total_frames // 2, 3 * total_frames // 4, total_frames - 1]:
    cap.set(cv2.CAP_PROP_POS_FRAMES, f_idx)
    ret, frame = cap.read()
    if ret:
        # Sample 4 corners (top-left, top-right, bottom-left, bottom-right)
        c1 = frame[5:25, 5:25]
        c2 = frame[5:25, width-25:width-5]
        corner_colors.append(c1.mean(axis=(0,1)))
        corner_colors.append(c2.mean(axis=(0,1)))

avg_bgr = np.mean(corner_colors, axis=0)
b, g, r = int(avg_bgr[0]), int(avg_bgr[1]), int(avg_bgr[2])
hex_color = f"#{r:02x}{g:02x}{b:02x}"
print(f"Detected Background Color: RGB({r}, {g}, {b}) -> {hex_color}")

cap.release()
