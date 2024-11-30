FROM oven/bun:latest AS builder

WORKDIR /usr/src/app

COPY package.json bun.lockb .env ./

RUN bun install --frozen-lockfile

RUN bun install -g minify

COPY . .

RUN bun run build

FROM ubuntu:latest AS runner

WORKDIR /usr/src/app

COPY --from=builder /usr/src/app/dist .

CMD [ "./server" ]
