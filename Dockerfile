FROM python:3.11-slim

LABEL maintainer="toys4babyodua@gmail.com"

WORKDIR /apps

ENV PYTHONDONTWRITEBYTECODE=1
ENV PYTHONUNBUFFERED=1

RUN apt-get update && apt-get install --yes libgdal-dev

RUN pip install --upgrade pip

COPY requirements.txt requirements.txt
RUN pip install -r requirements.txt

COPY . .

