FROM node:18.17-alpine
WORKDIR /usr/src/app
COPY package*.json ./
COPY .env ./
RUN npm install
COPY . .
RUN npm run build
CMD [ "node", "dist/main.js" ]