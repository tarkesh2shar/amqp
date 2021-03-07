FROM node:14

WORKDIR /usr/app

COPY package*.json ./

RUN npm install

COPY ./ ./

EXPOSE 5000

ENV NODE_ENV development

CMD ["npm", "run", "dev"]