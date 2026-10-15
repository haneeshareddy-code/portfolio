import cv2
import numpy as np

video_path = r"c:\Users\Haneesha\Desktop\Root folder\public\character.mp4"
cap = cv2.VideoCapture(video_path)
total_frames = int(cap.get(cv2.CAP_PROP_FRAME_COUNT))

# Let's inspect the motion across the video
prev_gray = None
diffs = []

for i in range(total_frames):
    ret, frame = cap.read()
    if not ret:
        break
    gray = cv2.cvtColor(frame, cv2.COLOR_BGR2GRAY)
    if prev_gray is not None:
        diff = cv2.absdiff(gray, prev_gray)
        diffs.append((i, np.mean(diff)))
    prev_gray = gray

cap.release()

print("Top 10 highest motion frames:")
for f, d in sorted(diffs, key=lambda x: x[1], reverse=True)[:10]:
    print(f"  Frame {f}: diff {d:.2f}")

print("\n10 lowest motion frames:")
for f, d in sorted(diffs, key=lambda x: x[1])[:10]:
    print(f"  Frame {f}: diff {d:.2f}")
