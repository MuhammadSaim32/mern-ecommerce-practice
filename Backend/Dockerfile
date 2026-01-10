FROM node:18-alpine

RUN mkdir -p /app

COPY . /app

WORKDIR /app

RUN npm i

EXPOSE 3000

CMD ["node","app.js"]