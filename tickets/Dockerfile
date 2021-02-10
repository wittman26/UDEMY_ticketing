FROM node:15-alpine

WORKDIR /app

COPY package*.json ./

RUN node --version
RUN npm --version

RUN npm install -g npm@7.5.2
RUN npm install --only=prod

RUN node --version
RUN npm --version

COPY . .

CMD [ "npm", "start" ]