FROM python:3.8 AS base
WORKDIR /app
ADD Pipfile Pipfile.lock ./
RUN \
  pip install pipenv && echo pipenv installed && \
  pipenv install --system --verbose && echo dependencies installed && \
  mkdir -p /var/www/static/ && \
  chown -R 1000:1000 /app /var/www/static && echo created staticfiles folder

ADD ./stevenlsjr_blog ./tox.ini ./manage.py /app/

FROM nginx:1 as staticfiles
COPY --from=base /var/www/static /var/www/static

FROM base AS runtime
RUN rm -fr /var/www/static/