# Nest.js Exception Filter Bug

## Installation

```
yarn
```

or

```
npm install
```

## Running

```
yarn dev
```

or

```
npm run dev
```

## Bug Reproduction

This is OK

```sh
curl http://localhost:5000 -H 'Authorization:any_random_string'
```

This will crash the server

```sh
curl http://localhost:5000
```
