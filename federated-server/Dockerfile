
FROM node:12

MAINTAINER Marcos Gutierrez <gmarcos87@gmail.com>

WORKDIR /usr/src/app

COPY package*.json ./
RUN npm install --silent
COPY . .

EXPOSE 8080

CMD [ "npm", "run", "start" ]