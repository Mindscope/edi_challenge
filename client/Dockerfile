FROM node:14.6.0-stretch

WORKDIR /code

COPY package.json /code/package.json
COPY package-lock.json /code/package-lock.json

RUN npm install

COPY . /code

EXPOSE 5000

CMD ["npm", "start"]