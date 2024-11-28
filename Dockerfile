FROM oven/bun:latest

WORKDIR /usr/src/app

COPY package.json bun.lockb ./

RUN bun install

COPY . .

EXPOSE 3000

CMD ["bun", "src/server.ts"]

