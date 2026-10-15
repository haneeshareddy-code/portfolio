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

# Let's create two contact sheets:
# Sheet 1: frames 8 to 79 (every 2 frames: 36 frames, 6x6)
# Sheet 2: frames 78 to 149 (every 2 frames: 36 frames, 6x6)

def make_grid(start_f, step, rows, cols, out_name):
    small_w, small_h = 213, 120
    sheet = np.zeros((rows * small_h, cols * small_w, 3), dtype=np.uint8)
    for idx in range(rows * cols):
        f_idx = start_f + idx * step
        if f_idx >= len(frames):
            break
        f = frames[f_idx]
        small = cv2.resize(f, (small_w, small_h))
        cv2.putText(small, f"#{f_idx}", (8, 26), cv2.FONT_HERSHEY_SIMPLEX, 0.7, (255, 255, 255), 2)
        r = idx // cols
        c = idx % cols
        sheet[r*small_h:(r+1)*small_h, c*small_w:(c+1)*small_w] = small
    cv2.imwrite(out_name, sheet)

make_grid(8, 2, 6, 6, r"c:\Users\Haneesha\Desktop\Root folder\grid_part1.jpg")
make_grid(78, 2, 6, 6, r"c:\Users\Haneesha\Desktop\Root folder\grid_part2.jpg")
print("Saved grid_part1.jpg and grid_part2.jpg")
