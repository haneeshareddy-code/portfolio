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

compass_frames = {
    "UP": 16,
    "UP_RIGHT": 38,
    "RIGHT": 57,
    "DOWN_RIGHT": 74,
    "DOWN": 87,
    "DOWN_LEFT": 108,
    "LEFT": 119,
    "UP_LEFT": 129,
    "CENTER": 172
}

# Create a single image showing all 8 compass directions + center
h, w, _ = frames[0].shape
sw, sh = 280, 158

# 3x3 layout
# UP_LEFT, UP, UP_RIGHT
# LEFT, CENTER, RIGHT
# DOWN_LEFT, DOWN, DOWN_RIGHT

layout = [
    ["UP_LEFT", "UP", "UP_RIGHT"],
    ["LEFT", "CENTER", "RIGHT"],
    ["DOWN_LEFT", "DOWN", "DOWN_RIGHT"]
]

comp_img = np.zeros((3 * sh, 3 * sw, 3), dtype=np.uint8)

for r in range(3):
    for c in range(3):
        dir_name = layout[r][c]
        f_num = compass_frames[dir_name]
        f = frames[f_num].copy()
        small = cv2.resize(f, (sw, sh))
        cv2.putText(small, f"{dir_name} (#{f_num})", (10, 30), cv2.FONT_HERSHEY_SIMPLEX, 0.7, (255, 255, 255), 2)
        comp_img[r*sh:(r+1)*sh, c*sw:(c+1)*sw] = small

cv2.imwrite(r"c:\Users\Haneesha\Desktop\Root folder\compass_check.jpg", comp_img)
print("Saved compass_check.jpg")
