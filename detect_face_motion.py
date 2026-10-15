import cv2
import numpy as np
import json
import math

# We want to analyze each frame of character.mp4 to determine:
# - head rotation angle (yaw/pitch or compass angle)
# - distance/neutral pose

video_path = r"c:\Users\Haneesha\Desktop\Root folder\public\character.mp4"
cap = cv2.VideoCapture(video_path)
total_frames = int(cap.get(cv2.CAP_PROP_FRAME_COUNT))

# We can also track facial features using OpenCV:
# Face cascade
face_cascade = cv2.CascadeClassifier(cv2.data.haarcascades + 'haarcascade_frontalface_default.xml')
eye_cascade = cv2.CascadeClassifier(cv2.data.haarcascades + 'haarcascade_eye.xml')

frame_stats = []

for i in range(total_frames):
    ret, frame = cap.read()
    if not ret:
        break
    gray = cv2.cvtColor(frame, cv2.COLOR_BGR2GRAY)
    faces = face_cascade.detectMultiScale(gray, 1.1, 4)
    face_info = None
    if len(faces) > 0:
        # Pick largest face
        f = max(faces, key=lambda x: x[2] * x[3])
        face_info = [int(f[0]), int(f[1]), int(f[2]), int(f[3])]
    frame_stats.append({
        "frame": i,
        "face": face_info
    })

cap.release()

with open(r"c:\Users\Haneesha\Desktop\Root folder\face_stats.json", "w") as f:
    json.dump(frame_stats, f, indent=2)

print("Face stats saved!")
