FROM node:20-alpine

RUN mkdir -p /home/server
WORKDIR /home/server

COPY package*.json .env ./
RUN npm install

COPY /dist ./dist

EXPOSE 5000
CMD [ "npm", "start" ]