![graphql](./assets/ng-ql-github.png)

# Making Full Stack Applications With Angular & GraphQL
---
## We will go through each of these steps
*If you are reading this because you are stuck, skip to a more helpful section below...*

##### *[1. Starting Our Project](#starting-our-project)*
##### *[2. Setup Our Server](#setup-our-server)*
##### *[3. Connect to our database](#connect-to-our-database)*
##### *[4. Making a GraphQL schema](#making-a-graphql-schema)*
##### *[5. Adding Queries to our schema](#adding-queries-to-our-schema)*
##### *6. Add Angular Into Our Project*
##### *7. Setup Our Webpack Config*
##### *9. Create a Simple Client App*
##### *10. Summary*

---

## Starting Our Project

To start off we will create our package.json with
```bash
npm init
```
After that, we need to install the dependencies for our server.
The fastest way is for you to just copy from this [package.json](http://google.com), and then run
```bash
npm install
(or yarn install)
```

We have our projects dependencies, now lets get into the meat of the app. We are gonna make a few folders and files.

```
/node_modules          - Where all of our dependencies live their life out
/src                   - The typescript source of our app
  /client              - We will put our angular code in here
  /server              - Our server declaration and backend config go here
    /schema            - We will define our Graphql Schema in this folder
    main.ts            - The main function for our server
    database.ts        - The code to connect to our database
    config.ts          - Variables related to configuration
```
Your app structure should look like the above.

---

##  Setup Our Server

Start by importing our dependencies into the main function

```
// src/server/main.ts

import * as express from 'express';
import * as bodyParser from 'body-parser';
import { graphqlExpress, graphiqlExpress } from 'graphql-server-express';
```

You might want to use hapi, restify, or something else. We are using express, but there is [graphQL support](https://github.com/apollographql/graphql-server) for all of these variants. graphiQl will let us test out our server and let us view our schema. Not essential, but helpful nonetheless.

Now lets setup the rest of our main. Read the comments for details.

```
// src/server/main.ts

export async function main(){
  // typical app instantiation
  let app = express();
  // We will import this function from src/server/database.ts in the next step
  let db = await connectDatabase();

  // This will create our graphql endpoint @ 'localhost:3000/graphql'
  // Later we will produce & import our schema to use here
  app.use('/graphql', bodyParser.json(), graphqlExpress({
    context: {
      db
    },
    schema: Schema
  }));

  // We also create the graphiql endpoint so that we can test our server out
  app.use('/graphiql', graphiqlExpress({endpointURL: '/graphql'}));

  // finally we return a promise to get our app running locally
  return new Promise((resolve, reject) => {
    let server = app.listen(3000, () => {
      resolve(server);
    }).on("error", (err: Error) => {
      reject(err);
    });
  });
}

main();

```
Note that we pass our soon to be connected database to the context object when we use the graphQL middleware. This is because data passed into the context can be accessed by our schema resolver functions.

##  Connect to our database

Lets write out a function for our app to connect to a database.
We will also take some variables from our main and aggregate them all to src/server/config.ts.

```
// src/server/database.ts

import { MongoClient } from 'mongodb';
import { DB_URL } from './config'

export async function connectDatabase(){
   try {
    let db = await MongoClient.connect(DB_URL);
    return db;
  }
  catch(err){
    console.log(err)
  }
}
```

A fairly simple function, but different databases will have different needs.

Our config file looks something like this now.
```
// src/server/config.ts

export const DB_URL = 'mongodb://localhost:27017/somedb';
export const SERVER_PORT = 3000;
export const GRAPHQL_ROUTE = "/graphql";
export const GRAPHIQL_ROUTE = "/graphiql";
```
The purpose of the config is to quickly find server variables. You can place more variables here as your backend develops, like CORS settings or ENV settings.

---

## Making a basic GraphQL schema

We will be creating a very modular schema, the folder structure will look like the below

```
// src/server/schema/
queries/         - Folder that we put our queries into
mutations/       - Folder that we put our mutations into
types/           - Folder that we put our types into
index.ts         - This code will wrap everything up and export the schema


```
