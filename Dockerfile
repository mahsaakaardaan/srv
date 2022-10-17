FROM node:16.15.0

WORKDIR /var/www/srv

COPY package.json package-lock.json ./

RUN npm i

COPY . .

CMD ["npm", "start"]