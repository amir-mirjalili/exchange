## Description

follow steps:

1.copy and rename .env.example to .env and make the changes

2.create DB on your postgress dbstore
3.run migrations to generate tables and recieve default values

## Installation

```bash
$ npm install
```

## Running the app

```bash
# development
$ npm run start

# watch mode
$ npm run start:dev

# production mode
$ npm run start:prod
```

## Test

```bash
# unit tests
$ npm run test
```

## Migration

```bash
# generate migration file
$ npx typeorm migration:create ./src/migrations/{migrationName}

# run migration files
$ migration:run

```
