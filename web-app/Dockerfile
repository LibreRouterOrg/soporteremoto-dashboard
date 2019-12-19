FROM node:12
WORKDIR /usr/src/app
ENV PATH /app/node_modules/.bin:$PATH
COPY package.json ./
RUN npm install --silent
COPY . .
CMD [ "npm", "run", "start:production" ]