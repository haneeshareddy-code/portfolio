import cv2
import os

video_path = r"c:\Users\Haneesha\Desktop\Root folder\public\character.mp4"
output_dir = r"c:\Users\Haneesha\Desktop\Root folder\frame_analysis"
os.makedirs(output_dir, exist_ok=True)

cap = cv2.VideoCapture(video_path)
total_frames = int(cap.get(cv2.CAP_PROP_FRAME_COUNT))

# Save every 4th frame, plus the last 20 frames every 1 frame, stamped with frame number
for i in range(total_frames):
    ret, frame = cap.read()
    if not ret:
        break
    
    # Save every 2nd frame or all frames in smaller size
    if i % 3 == 0 or i >= total_frames - 24:
        stamped = frame.copy()
        cv2.putText(stamped, f"F: {i}", (30, 60), cv2.FONT_HERSHEY_SIMPLEX, 1.5, (255, 255, 255), 3)
        # Resize to save disk/processing
        small = cv2.resize(stamped, (640, 360))
        cv2.imwrite(os.path.join(output_dir, f"frame_{i:03d}.jpg"), small)

cap.release()
print(f"Extracted analysis frames to {output_dir}")
