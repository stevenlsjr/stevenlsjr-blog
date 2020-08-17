FROM python:3.8 AS base
WORKDIR /app
ADD Pipfile Pipfile.lock ./
# install apt-get dependencies
# note, we're installing cryptography from .deb instead of pip
RUN apt update && \
  apt install -y libffi-dev libssl-dev build-essential python3-cryptography \
  libzmq3-dev && \ 
  pip install pipenv pipfile-requirements
RUN \
  pipfile2req -d > _requirements_dev.txt  && \
  pipfile2req >  _requirements_prod.txt &&  \
  cat _requirements_dev.txt _requirements_prod.txt > _requirements.txt
RUN \
  pip install -r _requirements.txt  --verbose && echo dependencies installed && \
  mkdir -p /var/www/static/ .media .static && \
  chown -R 1000:1000 /app /var/www/static && echo created staticfiles folder

ADD ./tox.ini ./manage.py /app/
ADD ./stevenlsjr_blog/ /app/stevenlsjr_blog/
ENV DJANGO_STATIC_ROOT=/var/www/static/
ENV DJANGO_CONFIGURATION=Develop
RUN DJANGO_SECRET_KEY=changeme python manage.py collectstatic

FROM nginx:1 as staticfiles
COPY --from=base /var/www/static /var/www/static
COPY deploy/staticfiles.nginx.conf /etc/nginx/templates/default.conf.template

FROM base AS runtime
ENV DJANGO_STATIC_ROOT=