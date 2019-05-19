# Inventory Management

Given a list of orders and restocks, determine if the restocking algorithm was a SUCCESS (was able to fulfill all orders) or OUT OF STOCK (insufficient inventory to complete an order).

## Pre-reqs
- Install [Node.js](https://nodejs.org/en/)

## Getting Started
This project was created using [Typescript](https://github.com/microsoft/TypeScript). The source file are located under the `src` directory.

- Build the project (outputs the `dist` directory)
```
npm run build
```
- Start the project
```
npm run start
```

- Follow the command line prompts. Enter the path of ther orders and restocks json files.

Example console output:
```
? File path to orders file orders.json
? File path to restocks file restocks.json
SUCCESS
 {"shovel":4,"snowblower":4,"tires":2,"sled":1}
 ```

## Development commands
- Build and start the project
```
npm run build-start
```
- Watch `src` changes
```
npm run watch
```
- Run jest unit tests
```
npm run test
```
- Watch jest unit tests
```
npm run watch-test
```
- Run dev without compile (ts-node)
```
npm run start-dev
```
- Watch dev without compile (ts-node)
```
npm run watch-dev
```