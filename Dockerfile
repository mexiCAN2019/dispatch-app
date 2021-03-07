FROM node:10.16.3

WORKDIR /usr/src/app

COPY package*.json ./

RUN npm install

COPY . /usr/src/app

CMD ["npm", "start"]