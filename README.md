# Daily Trends

### Description

This project contains two microservices written in TypeScript.

## Feed API Service

It is an API to store news, for which an API has been developed with four endpoints that allow inserting, consulting and deleting a news item, as well as having a last endpoint that allows generating a feed, which is a compendium of the 5 news items of each newspaper of the day.

### How to deploy it

Both apis will be deployed in the same way:

1. To start, we need to access the microservice folder.

    ```bash
    cd feed-api-service
    ```

2. We use the build command to install dependencies and transpile the code from TypeScript to JavaScript.

    ```bash
    npm run build
    ```
3. Then, using the $service-folder/env/.env.schema file we create an .env file to set the environment variables, all of which have a default value.

4. Finally, to deploy it we must use the start command.

    ```bash
    npm run start
    ```

## Crawler Service

It is not finished yet, its task will consist of scraping two newspaper websites to obtain the first 5 news items on the front page and save them through the Feed API Service by making a request to it.

### How to deploy it

Both apis will be deployed in the same way:

1. To start, we need to access the microservice folder.

    ```bash
    cd crawler-service
    ```

2. We use the build command to install dependencies and transpile the code from TypeScript to JavaScript.

    ```bash
    npm run build
    ```
3. Then, using the $service-folder/env/.env.schema file we create an .env file to set the environment variables, all of which have a default value.

4. Finally, to deploy it we must use the start command.

    ```bash
    npm run start
    ```

In the root of the repository there is a collection of Postman to test the both APIs.

## Technological Stack

For this project we have used:

- **Express**: Framework to build the web server.
- **MongoDB**: For this we have used the mongodb-memory-server library, which allows to have a "mongo server" in memory.
- **Mongoose**: An ODM for MongoDB that also works with mongodb-memory-server.
- **got**: To make requests between microservices.
- **jest**: For testing.
- **scrape-it**: For web scraping.

In addition to this, it has been decided to use **path aliases** so that imports within the same microservice make sense and are understandable at first glance.
