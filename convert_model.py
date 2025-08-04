import tensorflow as tf

# Path to your .h5 model
h5_model_path = 'model/best_model_weights.h5'
tflite_model_path = 'model/pcos_model.tflite'


import tensorflow as tf
# Load the Keras model
model = tf.keras.models.load_model( h5_model_path)

# Convert the model to TFLite
converter = tf.lite.TFLiteConverter.from_keras_model(model)
tflite_model = converter.convert()
# Save the converted model
with open(tflite_model_path, 'wb') as f:
    f.write(tflite_model)

print("✅ Conversion complete. TFLite model saved to:", tflite_model_path)

