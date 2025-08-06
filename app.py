import os
import gdown
import tensorflow as tf
from flask import Flask, render_template, request
import numpy as np
from PIL import Image

app = Flask(__name__)
UPLOAD_FOLDER = 'static/uploads'
os.makedirs(UPLOAD_FOLDER, exist_ok=True)

# Google Drive file ID
google_drive_url = 'https://drive.google.com/uc?export=download&id=1dL0tAr6gJiMsoSqA6Wt5NoMxbyyfxkj6'
model_path = 'model/pcos_model.tflite'

# Check if model is already downloaded, if not download from Google Drive
if not os.path.exists(model_path):
    print("🔽 Downloading model from Google Drive...")
    gdown.download(google_drive_url, model_path, quiet=False)
else:
    print("✅ Model already downloaded.")

# Load TFLite model
interpreter = tf.lite.Interpreter(model_path=model_path)
interpreter.allocate_tensors()
input_details = interpreter.get_input_details()
output_details = interpreter.get_output_details()

def preprocess_image(image_path):
    img = Image.open(image_path).convert("RGB")
    img = img.resize((128, 128))  # ✅ Match model input size
    img_array = np.array(img, dtype=np.float32) / 255.0
    return np.expand_dims(img_array, axis=0)


@app.route('/')
def index():
    return render_template('index.html')

@app.route('/predict', methods=['POST'])
def predict():
    print("🔍 /predict route hit")  # <— Add this
    if 'image' not in request.files:
        print("❌ No image part")
        return render_template('index.html', result="No file", confidence="N/A", image_path=None)

    file = request.files['image']
    if file.filename == '':
        print("❌ No selected file")
        return render_template('index.html', result="Empty file", confidence="N/A", image_path=None)

    image_path = os.path.join('static/uploads', file.filename)
    file.save(image_path)
    print(f"✅ Saved image to: {image_path}")

    input_data = preprocess_image(image_path)
    interpreter.set_tensor(input_details[0]['index'], input_data)
    interpreter.invoke()
    output = interpreter.get_tensor(output_details[0]['index'])

    prediction = output[0][0]
    label = "Infected ( PCOS Detected )" if prediction > 0.5 else "Notinfected ( No PCOS Detected )"
    confidence = f"{(prediction if prediction > 0.5 else 1 - prediction) * 100:.2f}%"

    return render_template("index.html", result=label, confidence=confidence, image_path='/' + image_path)



if __name__ == '__main__':
    print("🚀 Flask server is starting...")
    app.run(debug=True)
