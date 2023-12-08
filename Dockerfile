FROM python:3.10-slim
WORKDIR /app/src
COPY ./ /app
RUN apt update
RUN apt upgrade -y
RUN pip install -r /app/requirements.txt
CMD ["python", "app.py"]