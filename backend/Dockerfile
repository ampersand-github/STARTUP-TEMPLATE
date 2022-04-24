FROM node:16.14.0 as builder

WORKDIR /app

RUN npm install -g @nestjs/cli

COPY package*.json ./
COPY prisma ./prisma/
COPY src ./src/
RUN npm ci

# : Cannot find module '../Book-id' or its corresponding type declarations.
# が発生する
COPY . .

RUN npm run build


# FROM node:16.14.0
# COPY --from=builder /app/node_modules ./node_modules
# COPY --from=builder /app/package*.json ./
# COPY --from=builder /app/dist ./dist
EXPOSE 3001
# CMD ["npm", "run", "start:prod"]


# docker build --tag startup-template-backend .
# docker run -p 3001:3001 startup-template-backend
# docker run -it startup-template-backend
