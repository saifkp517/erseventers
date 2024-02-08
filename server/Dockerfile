FROM oven/bun:latest AS base
WORKDIR /usr/src/app

COPY package.json ./
COPY prisma ./prisma/

RUN bun i -g prisma
RUN bun i && bun run prisma generate

COPY . .

CMD ["bun", "run", "dev"] 
