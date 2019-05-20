# Inventory Management

Given a list of orders and restocks, determine if the restocking algorithm was a SUCCESS (was able to fulfill all orders) or OUT OF STOCK (insufficient inventory to complete an order).

## Assumptions
1. If the timestamp for an order and a restock are the same, the order will take precedent/execute first.
2. If there are additional restocks after all orders are complete, the remaining restocks will still be processed.

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

- Follow the command line prompts. Enter the path of ther orders and restocks json files. The current directory `./` points to the root of this directory.

Example console output:
```
? File path to orders file orders.json
? File path to restocks file restocks.json
SUCCESS
 {"shovel":4,"snowblower":4,"tires":2,"sled":1}
 ```

 ## JSON Validation
 This program utilizes [hapi/joi](https://github.com/hapijs/joi) for validation. The program will exit if JSON validation fails, before testing if the algorithm was successfull.
 
 - Required fields
 The fields specified in the sample `orders.json` and `restocks.json` are all required.
See `src/validators` for details.

- Extra fields
If there are any extra/non-required fields included, the validation will still pass.

- Field types
`order_date` and `restock_date` must be a string of Date format.
`item_quantity` must be an integer.
`item_price` must be a number.
See `src/validators` for full type details.
 
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