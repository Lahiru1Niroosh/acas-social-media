from backend.models.text.predictor import TextCredibilityPredictor

model = TextCredibilityPredictor()

text = "COVID vaccines contain microchips bla bla bla"

result = model.predict(text)

print("\nMODEL OUTPUT:")
print(result)