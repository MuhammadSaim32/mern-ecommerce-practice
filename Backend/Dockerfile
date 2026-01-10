FROM node:20.19.4-alpine

RUN mkdir -p /app

COPY . /app

WORKDIR /app

RUN npm i

EXPOSE 3000

CMD ["node","index.js"]