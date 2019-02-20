FROM node:10.15-alpine AS builder

ENV LANG C.UTF-8

WORKDIR /app

COPY package.json package-lock.json ./
RUN npm i
ARG NODE_ENV="production"
ARG GA_TRACKING_CODE
ARG MIXPANEL_TOKEN
ARG ADD_TO_SLACK_URL

COPY . .
RUN npm run build

FROM nginx:1.15-alpine

ENV LANG C.UTF-8

RUN apk --update add --no-cache tzdata

COPY --from=builder /app/dist/* /usr/share/nginx/html/
COPY docker-entrypoint.sh /
COPY nginx/nginx.conf /etc/nginx/nginx.conf

ENTRYPOINT ["/docker-entrypoint.sh"]
CMD ["nginx", "-g", "daemon off;"]
