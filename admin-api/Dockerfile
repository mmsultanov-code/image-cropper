FROM node:20.12.1

WORKDIR /usr/src/app

COPY package*.json ./

COPY . .

RUN npm install
RUN npm install nodemon
RUN npm install bcrypt

EXPOSE 8000

CMD ["npm", "run", "dev"]