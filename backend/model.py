import pandas as pd
from sklearn.model_selection import train_test_split
from sklearn.ensemble import RandomForestClassifier
from sklearn.preprocessing import StandardScaler
import joblib 
import os
import zipfile
import subprocess

os.makedirs("data/dataset", exist_ok=True)
os.makedirs("build", exist_ok=True)

zip_path = "data/dataset/pima.zip"
csv_path = "data/dataset/diabetes.csv"

if not os.path.exists(csv_path):
    print("Downloading dataset using curl...")

    subprocess.run([
        "curl", "-L", "-o", zip_path,
        "https://www.kaggle.com/api/v1/datasets/download/uciml/pima-indians-diabetes-database"
    ], check=True)

    with zipfile.ZipFile(zip_path, "r") as zip_ref:
        zip_ref.extractall("data/dataset")
    
    if os.path.exists(csv_path):
        os.remove(zip_path)
        print("Zip file removed.")
    print("Dataset downloaded and extracted successfully!")

columns = [
    "Pregnancies", "Glucose", "BloodPressure", "SkinThickness", 
    "Insulin", "BMI", "DiabetesPedigreeFunction", "Age", "Outcome"
]
data = pd.read_csv(csv_path, names=columns, skiprows=1)

X = data.drop("Outcome", axis=1)
y = data["Outcome"]

X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.2, random_state=42)

scaler = StandardScaler()
X_train_scaled = scaler.fit_transform(X_train)

model = RandomForestClassifier(n_estimators=100, random_state=42)
model.fit(X_train_scaled, y_train)
print("Model trained successfully!")

os.makedirs("build", exist_ok=True)
joblib.dump(model, 'build/diabetes_model.joblib')
joblib.dump(scaler, 'build/scaler.joblib')
print("Model and scaler have been saved to files: 'build/diabetes_model.joblib' and 'build/scaler.joblib'")