FROM python:3.8 AS base
WORKDIR /app
ADD Pipfile Pipfile.lock ./
RUN apt update && \
  apt install -y libffi-dev libssl-dev build-essential \
  libzmq3-dev && \ 
  pip install pipenv pipfile-requirements
RUN \
  pipfile2req -d > _requirements.txt && \
  pip install -r _requirements.txt  --verbose && echo dependencies installed && \
  mkdir -p /var/www/static/ && \
  chown -R 1000:1000 /app /var/www/static && echo created staticfiles folder

ADD ./stevenlsjr_blog ./tox.ini ./manage.py /app/

FROM nginx:1 as staticfiles
COPY --from=base /var/www/static /var/www/static

FROM base AS runtime
RUN rm -fr /var/www/static/