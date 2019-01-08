FROM node:10.15-alpine
ARG NODE_ENV="production"

WORKDIR /app

RUN apk --update add --no-cache yarn tzdata

COPY package.json .
COPY yarn.lock .
RUN yarn install
COPY . .

CMD ["yarn", "run", "start:dev"]
