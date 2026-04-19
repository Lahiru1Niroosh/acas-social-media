import pickletools

with open('backend/models/text/ensemble_checker.pkl','rb') as f:
    data=f.read()

print(pickletools.dis(data)[:2000])
