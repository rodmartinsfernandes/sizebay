# URL Shortening Service

## Requisitos

- Node.js 20+
- Docker e Docker Compose

## Instalação

```bash
npm install
```

## Execução em desenvolvimento

Suba o Postgres com Docker Compose:

```bash
docker compose up -d db
```

Depois execute a aplicação:

```bash
npm run start
```

A API ficará disponível em `http://localhost:3000` e a documentação Swagger em `http://localhost:3000/docs`.

## Execução com Docker Compose

```bash
docker compose up --build
```

## Endpoints principais

- `POST /shorten`: cria uma nova URL encurtada.
- `GET /shorten/:code`: traz a URL original e incrementa o contador de acessos.
- `PUT /shorten/:code`: atualiza a URL original.
- `DELETE /shorten/:code`: remove a URL encurtada.
- `GET /shorten/:code/stats`: traz os dados da URL, incluindo `accessCount`.

