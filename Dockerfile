FROM python:3.11-slim

LABEL maintainer="boris.tikhonov.21@gmail.com"

WORKDIR /apps

ENV PYTHONDONTWRITEBYTECODE=1
ENV PYTHONUNBUFFERED=1

RUN apt-get update && apt-get install --yes libgdal-dev

COPY requirements.txt requirements.txt

RUN pip install --upgrade pip && pip install --no-cache-dir -r requirements.txt

COPY . .

