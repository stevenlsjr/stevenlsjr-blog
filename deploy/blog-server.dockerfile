FROM python:3.8 AS base
WORKDIR /app
ADD Pipfile Pipfile.lock ./
# install apt-get dependencies
# note, we're installing cryptography from .deb instead of pip
RUN apt update && \
  apt install -y libffi-dev libssl-dev build-essential \
  libzmq3-dev && \ 
  pip install pipenv pipfile-requirements
RUN \
  pipenv install --system --deploy -vvv && \
  mkdir -p /var/www/static/ .media .static && \
  chown -R 1000:1000 /app /var/www/static && echo created staticfiles folder

ADD ./tox.ini ./manage.py /app/
ADD ./stevenlsjr_blog/ /app/stevenlsjr_blog/
ENV DJANGO_CONFIGURATION=Develop
RUN DJANGO_STATIC_ROOT=/var/www/static/ DJANGO_SECRET_KEY=changeme python manage.py collectstatic

FROM nginx as staticfiles
COPY --from=base /var/www/static /var/www/static
COPY deploy/staticfiles.nginx.conf /etc/nginx/templates/default.conf.template

FROM base AS runtime
USER 1000
# gunicorn stevenlsjr.asgi:app -w 4 -k uvicorn.workers.UvicornWorker
CMD ["uvicorn", "stevenlsjr_blog.asgi:application"]