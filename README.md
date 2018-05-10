# cqrs-lite-js-example

CQRS-lite blog api example

## Init

Install dependencies:

```
npm install
```

Start database in a tab:

```
cd dev
docker-compose up
```

Migrate database:

```
npm run db:migrate
```

## Start server

Normal startup from compiled files:

```
npm run build
npm start
```

Startup directly from Typescript files:

```
npm ts-start
```

Startup with auto-reload on source file changes:

```
npm run live
```

## Run unit tests

```
npm test
```

## Run end-to-end tests

Start database in a tab:

```
cd dev
docker-compose up
```

Run tests in another tab:

```
npm test:e2e
```
