FROM oven/bun:1 as base
WORKDIR /usr/src/app

COPY package.json ./

RUN bun i

COPY . .

CMD ["bun", "run", "dev"] 
