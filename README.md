# 🧠 PCOS Detector Web App

A lightweight web application for detecting PCOS (Polycystic Ovary Syndrome) from medical images using a TensorFlow Lite model.

Built with Flask and TFLite for fast, lightweight deployment — including full support for Heroku.

---

## 🚀 Features

- Upload a medical image to detect PCOS
- Model runs with TensorFlow Lite for low memory usage
- Automatically downloads `.tflite` model from Google Drive
- Works locally and on Heroku
- No TensorFlow required in production (uses `tflite-runtime`)

---

## 📁 Project Structure


---

## ⚙️ Requirements

- Python 3.10 (recommended for `tflite-runtime`)
- pip and virtualenv

---

## 🖥️ Run Locally

```bash
# 1. Clone the repo
git clone https://github.com/ahasanhnahid/pcos_detector.git
cd pcos_detector

# 2. Create a virtual environment
python -m venv venv
# Activate:
#   Windows: venv\Scripts\activate
#   macOS/Linux: source venv/bin/activate

# 3. Install dependencies
pip install -r requirements.txt

# 4. Run the app
python app.py
