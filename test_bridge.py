import cv2
import numpy as np

video_path = r"c:\Users\Haneesha\Desktop\Root folder\public\character.mp4"
cap = cv2.VideoCapture(video_path)
frames = []
while True:
    ret, frame = cap.read()
    if not ret:
        break
    frames.append(frame)
cap.release()

sw, sh = 280, 158
indices = [132, 133, 134, 14, 15, 16, 17, 18, 19, 20]
img = np.zeros((2 * sh, 5 * sw, 3), dtype=np.uint8)

for i, f_num in enumerate(indices):
    r = i // 5
    c = i % 5
    f = frames[f_num].copy()
    small = cv2.resize(f, (sw, sh))
    cv2.putText(small, f"#{f_num}", (15, 30), cv2.FONT_HERSHEY_SIMPLEX, 0.8, (255, 255, 255), 2)
    img[r*sh:(r+1)*sh, c*sw:(c+1)*sw] = small

cv2.imwrite(r"c:\Users\Haneesha\Desktop\Root folder\seamless_bridge.jpg", img)
print("Saved seamless_bridge.jpg")
