FROM node:8-alpine

RUN mkdir /app
WORKDIR /app

RUN npm install

EXPOSE 9000

CMD [ "npm", "start" ]
