# Sanity-Now!

This is a sample application with no actual code, its main purpose is to demonstrate the concept of sanity tests as a development tool.

# Getting Started

## Install dependencies
```
npm i
```

## Run sanity tests
```
npm run test:sanity
```

# Playing with the concept

 - Try and add a property to one of the `config/{env}.json` files and run `npm run test:sanity`;
 - Try and create a new DTO on `src/dto.js` without creating an OpenAPI definition on `docs/openapi.yml` and run `npm run test:sanity`;
 - Try and add a typo on either `config/{env}.json` or `src/dto.js` and run `npm run test:sanity`;

