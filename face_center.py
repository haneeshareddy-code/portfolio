import cv2
import numpy as np

img = cv2.imread(r"c:\Users\Haneesha\Desktop\Root folder\public\center.webp")
h, w, _ = img.shape

# Let's inspect center of the face
# In 1280x720, the face is roughly centered horizontally and in the upper half vertically.
# Let's find skin tone pixels or mouth/eyes
# Or template match nose/eyes from face
print(f"Image dimensions: {w}x{h}")
# Character is centered horizontally (x around w/2 = 640)
# Her eyes/nose are around y = 260..300 (roughly 0.38..0.42 of height)
print(f"Relative Face Center estimate: x = 0.50, y = 0.40")
