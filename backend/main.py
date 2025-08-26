import joblib
import numpy as np
from fastapi import FastAPI
from pydantic import BaseModel
from fastapi.middleware.cors import CORSMiddleware

app = FastAPI(
    title="Diabetes Prediction API",
    description="An API to predict diabetes based on patient data.",
    version="1.0"
)

origins = [
    "http://localhost",
    "http://localhost:8080",
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

try:
    model = joblib.load('build/diabetes_model.joblib')
    scaler = joblib.load('build/scaler.joblib')
    print("Model and scaler loaded successfully.")
except FileNotFoundError:
    print("Error: Model or scaler files not found.")
    model = None
    scaler = None

class PatientData(BaseModel):
    pregnancies: int
    glucose: float
    blood_pressure: float
    skin_thickness: float
    insulin: float
    bmi: float
    diabetes_pedigree_function: float
    age: int

    class Config:
        json_schema_extra = {
            "example": {
                "pregnancies": 5,
                "glucose": 120,
                "blood_pressure": 72,
                "skin_thickness": 23,
                "insulin": 84,
                "bmi": 32.1,
                "diabetes_pedigree_function": 0.25,
                "age": 30
            }
        }

@app.post("/predict/")
async def predict_diabetes(data: PatientData):
    """
    Predicts the probability of diabetes based on patient features sent in a POST request.
    """
    if model is None or scaler is None:
        return {"error": "Model or scaler not loaded. Please check server logs."}
    
    features = np.array([[
        data.pregnancies, data.glucose, data.blood_pressure, data.skin_thickness,
        data.insulin, data.bmi, data.diabetes_pedigree_function, data.age
    ]])

    scaled_features = scaler.transform(features)

    prediction = model.predict(scaled_features)
    probabilities = model.predict_proba(scaled_features)

    response = {
        "has_diabetes": bool(prediction[0]),
        "diabetes_probability": float(probabilities[:, 1]),
        "no_diabetes_probability": float(probabilities[:, 0])
    }

    return response