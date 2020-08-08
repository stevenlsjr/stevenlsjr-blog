FROM node:lts as BUILD
WORKDIR /build
RUN chown -R 1000:1000 /build/
RUN yarn global add lerna
USER 1000
ADD . ./
RUN yarn lerna bootstrap \ 
  -- --ignore-engines --verbose --non-interactive
RUN yarn workspace @stevenlsjr/blog-server build