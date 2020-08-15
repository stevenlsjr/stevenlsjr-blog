FROM pypy:3-buster
WORKDIR app
ADD Pipfile Pipfile.lock ./
RUN pip install pipenv && \
  pipenv install --system

ADD ./ /app/
RUN rm -fr packages yarn.lock package.json