import skl2onnx
import onnxruntime as ort
from skl2onnx import convert_sklearn
from skl2onnx.common.data_types import FloatTensorType
import joblib

# Load your trained SVC model
svc_model = joblib.load("C:/Users/anasm/OneDrive/Desktop/CPP/cpp/svc.pkl")

# Define input type (assuming 10 input features)
initial_type = [('float_input', FloatTensorType([None, 10]))]

# Convert SVC model to ONNX
onnx_model = convert_sklearn(svc_model, initial_types=initial_type)

# Save the ONNX model
with open("svc_model.onnx", "wb") as f:
    f.write(onnx_model.SerializeToString())

print("Model converted to ONNX successfully!")
