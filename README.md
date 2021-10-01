
## Description

This repo shows an extremely slow query with nested writes when connected to a remote Postgresql.

Locally: local DB write 4s vs Remote DB write > 100s

How to reproduce:
Send the example query to this endpoint: localhost:3000/context

You can find an example request [here](https://gist.github.com/monapasan/adb95a22a8286b22897092934e81683e).

## The same query with typeorm

The same query with typeorm connector takes around 1-2 seconds.
You can checkout it in branch `typeorm`.

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
