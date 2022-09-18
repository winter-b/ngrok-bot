FROM node:17-alpine3.12

RUN mkdir /app
WORKDIR /app

COPY package.json /app/
COPY settings.json /app/

RUN npm install

COPY . /app

CMD ["npm", "start"]