import joblib
import pprint

model = joblib.load('backend/models/text/traditional_credibility_model.joblib')
print('type', type(model))
try:
    pprint.pprint(model)
except Exception as e:
    print('repr failed', e)
