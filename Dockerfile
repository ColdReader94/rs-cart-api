FROM node:16.16-alpine3.15
WORKDIR /usr/app
COPY package*.json .
RUN npm install --force
COPY . .
# EXPOSE ${PORT}
ENTRYPOINT ["npm", "start"]