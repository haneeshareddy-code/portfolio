import cv2
import mediapipe as mp
import numpy as np
import json
import math

video_path = r"c:\Users\Haneesha\Desktop\Root folder\public\character.mp4"
cap = cv2.VideoCapture(video_path)
total_frames = int(cap.get(cv2.CAP_PROP_FRAME_COUNT))

mp_face_mesh = mp.solutions.face_mesh
face_mesh = mp_face_mesh.FaceMesh(
    static_image_mode=False,
    max_num_faces=1,
    refine_landmarks=True,
    min_detection_confidence=0.5,
    min_tracking_confidence=0.5
)

results = []

for i in range(total_frames):
    ret, frame = cap.read()
    if not ret:
        break
    h, w, _ = frame.shape
    rgb = cv2.cvtColor(frame, cv2.COLOR_BGR2RGB)
    mesh_results = face_mesh.process(rgb)
    
    if mesh_results.multi_face_landmarks:
        landmarks = mesh_results.multi_face_landmarks[0].landmark
        
        # Key landmark points:
        # Nose tip: 1
        # Chin: 152
        # Left eye outer: 33
        # Right eye outer: 263
        # Forehead / between eyes: 168
        # Left ear: 234
        # Right ear: 454
        nose = landmarks[1]
        chin = landmarks[152]
        forehead = landmarks[10]
        left_eye = landmarks[33]
        right_eye = landmarks[263]
        
        # 2D screen coords
        nose_x, nose_y = nose.x * w, nose.y * h
        eye_mid_x = (left_eye.x + right_eye.x) / 2.0 * w
        eye_mid_y = (left_eye.y + right_eye.y) / 2.0 * h
        
        # Pitch: nose_y relative to eye_mid_y / face height
        face_height = (chin.y - forehead.y) * h
        face_width = (right_eye.x - left_eye.x) * w
        
        # Relative displacement of nose tip from midpoint of eyes
        dx = nose_x - eye_mid_x
        dy = nose_y - eye_mid_y
        
        # 3D pose using solvePnP
        # 3D model points
        model_points = np.array([
            (0.0, 0.0, 0.0),             # Nose tip
            (0.0, -330.0, -65.0),        # Chin
            (-225.0, 170.0, -135.0),     # Left eye left corner
            (225.0, 170.0, -135.0),      # Right eye right corner
            (-150.0, -150.0, -125.0),    # Left Mouth corner
            (150.0, -150.0, -125.0)      # Right mouth corner
        ])
        
        # 2D image points
        mouth_l = landmarks[61]
        mouth_r = landmarks[291]
        image_points = np.array([
            (nose.x * w, nose.y * h),
            (chin.x * w, chin.y * h),
            (left_eye.x * w, left_eye.y * h),
            (right_eye.x * w, right_eye.y * h),
            (mouth_l.x * w, mouth_l.y * h),
            (mouth_r.x * w, mouth_r.y * h)
        ], dtype="double")
        
        focal_length = w
        center = (w / 2, h / 2)
        camera_matrix = np.array([
            [focal_length, 0, center[0]],
            [0, focal_length, center[1]],
            [0, 0, 1]
        ], dtype="double")
        dist_coeffs = np.zeros((4, 1))
        
        success, rvec, tvec = cv2.solvePnP(model_points, image_points, camera_matrix, dist_coeffs, flags=cv2.SOLVEPNP_ITERATIVE)
        
        rmat, _ = cv2.Rodrigues(rvec)
        # Calculate Euler angles
        sy = math.sqrt(rmat[0, 0] * rmat[0, 0] + rmat[1, 0] * rmat[1, 0])
        singular = sy < 1e-6
        if not singular:
            pitch = math.atan2(rmat[2, 1], rmat[2, 2])
            yaw = math.atan2(-rmat[2, 0], sy)
            roll = math.atan2(rmat[1, 0], rmat[0, 0])
        else:
            pitch = math.atan2(-rmat[1, 2], rmat[1, 1])
            yaw = math.atan2(-rmat[2, 0], sy)
            roll = 0
            
        pitch_deg = math.degrees(pitch)
        yaw_deg = math.degrees(yaw)
        roll_deg = math.degrees(roll)
        
        # Calculate circular angle on the 2D plane: atan2(dy, dx) or atan2(pitch, yaw)
        angle_rad = math.atan2(pitch_deg, yaw_deg)
        angle_deg = (math.degrees(angle_rad) + 360) % 360
        
        results.append({
            "frame": i,
            "yaw": round(yaw_deg, 2),
            "pitch": round(pitch_deg, 2),
            "roll": round(roll_deg, 2),
            "angle_deg": round(angle_deg, 2),
            "nose_norm": [round(nose.x, 4), round(nose.y, 4)]
        })
    else:
        results.append({
            "frame": i,
            "error": "no_face"
        })

cap.release()
face_mesh.close()

with open(r"c:\Users\Haneesha\Desktop\Root folder\head_poses.json", "w") as f:
    json.dump(results, f, indent=2)

print(f"Processed {len(results)} frames and saved head_poses.json")
