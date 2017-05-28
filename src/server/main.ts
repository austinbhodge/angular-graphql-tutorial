import * as express from 'express';
import * as bodyParser from 'body-parser';
import * as cors from 'cors';
import { graphqlExpress, graphiqlExpress } from 'graphql-server-express';
import { Schema } from './schema';

import { GRAPHQL_ROUTE, GRAPHIQL_ROUTE, SERVER_PORT } from './config';
import { connectDatabase } from './database';



export async function main(){
  let app = express();
  let db = await connectDatabase();
  app.use(GRAPHQL_ROUTE, cors())
  app.use(GRAPHQL_ROUTE, bodyParser.json(), graphqlExpress({
    context: {
      db
    },
    schema: Schema
  }));


  app.use(GRAPHIQL_ROUTE, graphiqlExpress({endpointURL: GRAPHQL_ROUTE}));

  return new Promise((resolve, reject) => {
    let server = app.listen(SERVER_PORT, () => {
      resolve(server);
    }).on("error", (err: Error) => {
      reject(err);
    });
  });
}

main();
