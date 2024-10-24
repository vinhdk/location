FROM node:20-alpine AS tools

RUN corepack enable
RUN corepack prepare pnpm@9.5.0 --activate

COPY . /api

WORKDIR /api

RUN --mount=type=cache,id=pnpm,target=/pnpm/store pnpm install

CMD ["pnpm", "run", "start"]
