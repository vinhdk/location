# Location

## Running using [Docker](https://www.docker.com/)

### 1. Install [Docker](https://www.docker.com/)

### 2. Run commands:

```sh
docker-compose up -d
```

### 3. Open [Swagger Page](http://localhost:3000/api)

## Locally

### 1. Install [Docker](https://www.docker.com/) & [PNPM](https://pnpm.io/)

### 2. Prepare environment by copying `.env.local` to `.env`

### 3. Run commands:

#### Setting up Database in Docker

```sh
docker compose -f docker-compose-db.yml up -d
```

#### Install dependencies

```sh
pnpm install
```

#### Run application

```sh
pnpm start
```

### 4. Open [Swagger Page](http://localhost:3000/api)
