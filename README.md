
## Description

This repo shows an extremely slow query with nested writes when connected to a remote Postgresql.

Locally: local DB write 4s vs Remote DB write > 100s

How to reproduce:
Send the example query to this endpoint: localhost:3000/context

You can find an example request [here](https://gist.github.com/monapasan/adb95a22a8286b22897092934e81683e).

When running this query in DEBUG=* mode, then I receive following [output](https://gist.github.com/monapasan/fa101284270e5e2c522d75b635703872)

## Installation

```bash
$ yarn
```

## Running the app

```bash
# development
$ yarn run start

# watch mode
$ yarn run start:dev

# production mode
$ yarn run start:prod
```
