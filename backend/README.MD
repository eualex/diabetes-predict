# Diabetes Prediction Model/API

This project was built to predict the probability of a person having diabetes.

## How to generate the model

The application uses the [Pima Indians Diabetes Database](https://www.kaggle.com/datasets/uciml/pima-indians-diabetes-database) to train and validate the model.

### Train and save the model

```bash
python model.py
```

### Test the model

```bash
python test.py
```

# How to run?

### Initialize venv

```bash
python -m venv .venv
```

### Install dependencies

```bash
pip install -r requirements.txt
```

### Run server

```bash
uvicorn main:app --reload
```

### See Api docs at

```bash
http://localhost:8000/docs
```
