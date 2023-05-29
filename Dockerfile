FROM node:16-alpine
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
EXPOSE ${PORT}
RUN npm run build && npm run start:prod
