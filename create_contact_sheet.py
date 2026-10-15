import cv2
import numpy as np
import os

video_path = r"c:\Users\Haneesha\Desktop\Root folder\public\character.mp4"
cap = cv2.VideoCapture(video_path)
total_frames = int(cap.get(cv2.CAP_PROP_FRAME_COUNT))

frames = []
for i in range(total_frames):
    ret, frame = cap.read()
    if not ret:
        break
    frames.append(frame)

cap.release()

# Let's save a summary contact sheet of 24 representative frames (every 8 frames)
rows = 4
cols = 6
h, w, _ = frames[0].shape
small_w = 240
small_h = 135

sheet = np.zeros((rows * small_h, cols * small_w, 3), dtype=np.uint8)

step = total_frames // (rows * cols)
for idx in range(rows * cols):
    f_idx = min(idx * step, total_frames - 1)
    f = frames[f_idx]
    small = cv2.resize(f, (small_w, small_h))
    cv2.putText(small, f"#{f_idx}", (10, 30), cv2.FONT_HERSHEY_SIMPLEX, 0.9, (255, 255, 255), 2)
    
    r = idx // cols
    c = idx % cols
    sheet[r*small_h:(r+1)*small_h, c*small_w:(c+1)*small_w] = small

cv2.imwrite(r"c:\Users\Haneesha\Desktop\Root folder\contact_sheet.jpg", sheet)
print("Saved contact_sheet.jpg")
