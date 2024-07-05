# Используем образ Node.js
FROM node:20.12.1

# Устанавливаем рабочую директорию внутри контейнера
WORKDIR /usr/src/app

# Копируем зависимости и исходный код
COPY package*.json ./

COPY . .

RUN npm install
RUN npm install nodemon
RUN npm install bcrypt

EXPOSE 7000

CMD ["npm", "run", "dev"]