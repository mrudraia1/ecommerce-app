FROM python:3.9-slim-buster 
WORKDIR /app
COPY requirements.txt /app/requirements.txt
RUN pip install -r requirements.txt
COPY init.py /app/init.py
CMD ["python", "init.py"]
