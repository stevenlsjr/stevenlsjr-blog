FROM alpine AS fetcher

RUN apk add curl

ARG BUILDX_VERSION=0.3.1
RUN curl -L \
  --output /docker-buildx \
  "https://github.com/docker/buildx/releases/download/v${BUILDX_VERSION}/buildx-v${BUILDX_VERSION}.linux-amd64"

RUN chmod a+x /docker-buildx

FROM docker:stable

COPY --from=fetcher /docker-buildx /usr/lib/docker/cli-plugins/docker-buildx