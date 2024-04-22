FROM node:18.17-alpine
WORKDIR /usr/src/app
COPY package*.json ./
RUN npm install
COPY . .
RUN npm run build
COPY .env ./dist
CMD [ "node", "dist/main.js" ]