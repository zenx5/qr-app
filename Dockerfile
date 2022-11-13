FROM node:16.16

WORKDIR /app

VOLUME /app

COPY . /app

EXPOSE 3000

RUN npm i

CMD ["npm", "start"]