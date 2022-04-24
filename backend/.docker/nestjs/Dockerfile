FROM node:16.14
RUN npm i -g @nestjs/cli

WORKDIR /backend-server

COPY package*.json ./
COPY prisma ./prisma
COPY src ./src

RUN npm install
RUN npx prisma generate

CMD [ "npm", "run", "start:debug" ]
