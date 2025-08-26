import pandas as pd
import joblib

print("Loading model and scaler...")
model = joblib.load('build/diabetes_model.joblib')
scaler = joblib.load('build/scaler.joblib')
print("Model and scaler loaded.")

try:
    new_data = pd.read_csv('tests/data.csv') 
except FileNotFoundError:
    print("Error: 'data.csv' not found. Please create this file with your new data.")
    exit()

required_features = [
    "Pregnancies", "Glucose", "BloodPressure", "SkinThickness", 
    "Insulin", "BMI", "DiabetesPedigreeFunction", "Age"
]

if not all(feature in new_data.columns for feature in required_features):
    print("Error: The new dataset is missing one or more required columns.")
    print(f"Required columns are: {required_features}")
    exit()

X_new = new_data[required_features]

X_new_scaled = scaler.transform(X_new)

predictions = model.predict(X_new_scaled)
predictions_proba = model.predict_proba(X_new_scaled)

print("\n--- Predictions for New Data ---")
new_data['Predicted_Outcome'] = predictions
new_data['Probability_Diabetes (1)'] = predictions_proba[:, 1]
new_data['Probability_No_Diabetes (0)'] = predictions_proba[:, 0]

print(new_data)