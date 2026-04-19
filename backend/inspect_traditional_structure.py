import joblib
import pprint

d = joblib.load('backend/models/text/traditional_credibility_model.joblib')
print('loaded object type', type(d))
print('keys:', list(d.keys()))
for k,v in d.items():
    print('\nKEY', k, '-> type', type(v))
    try:
        print('repr', repr(v))
    except Exception as e:
        print('repr error', e)
    if hasattr(v, 'steps'):
        print('   pipeline steps:')
        for name, step in v.steps:
            print('     ', name, type(step))
