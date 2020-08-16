FROM python:3.8 AS base
WORKDIR /app
RUN apt-get update && apt-get install \
  build-essential \
  openssl-dev