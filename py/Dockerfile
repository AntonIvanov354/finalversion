FROM python:3.11-slim
WORKDIR /app

COPY ffmpeg-8.0.1 .
RUN apt-get update && apt-get install -y \
    ffmpeg \
    && ffmpeg -version \
    && rm -rf /var/lib/apt/lists/*

COPY requirements.txt .
RUN pip install -r requirements.txt 


COPY . .

CMD ["python3", "main.py"]