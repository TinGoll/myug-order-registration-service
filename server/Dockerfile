FROM node:16-alpine AS builder
WORKDIR /app
COPY /*.json ./
COPY . .
RUN npm install
# RUN npm rebuild --verbose sharp
RUN npm run build

FROM node:16-alpine
WORKDIR /app
COPY --from=builder /app ./
EXPOSE 3771

CMD ["npm", "run", "start:prod"]