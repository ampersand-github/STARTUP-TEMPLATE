FROM node:16.14.0 as builder
RUN npm install -g @nestjs/cli
WORKDIR /app
COPY package*.json ./
RUN npm ci
COPY . .
RUN npx prisma generate
RUN npm run build


FROM node:16.14.0 as release
WORKDIR /app

COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/package*.json ./
COPY --from=builder /app/prisma ./prisma
COPY --from=builder /app/dist ./dist
EXPOSE 3001

CMD ["npm", "run", "start:prod"]

