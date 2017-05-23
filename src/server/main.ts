import * as express from 'express';
import * as bodyParser from 'body-parser';

import { MongoClient } from 'mongodb'
import { graphqlExpress, graphiqlExpress } from 'graphql-server-express';
import { Schema } from './schema';

export const GRAPHQL_ROUTE = "/graphql";
export const GRAPHIQL_ROUTE = "/graphiql";
export const MONGO_URL = 'mongodb://localhost:27017/ohi'

function verbosePrint(port, enableGraphiql) {
  console.log(`GraphQL Server is now running on http://localhost:${port}${GRAPHQL_ROUTE}`);
  if (true === enableGraphiql) {
    console.log(`GraphiQL Server is now running on http://localhost:${port}${GRAPHIQL_ROUTE}`);
  }
}

export const main = async(options: any) => {
  try {
    const db = await MongoClient.connect(MONGO_URL)
    const Locations = db.collection('locations')
    let app = express();

    app.use(GRAPHQL_ROUTE, bodyParser.json(), graphqlExpress({
      context: {
        Locations
      },
      schema: Schema
    }));

    if (true === options.enableGraphiql) {
      app.use(GRAPHIQL_ROUTE, graphiqlExpress({endpointURL: GRAPHQL_ROUTE}));
    }

    return new Promise((resolve, reject) => {
      let server = app.listen(options.port, () => {
        /* istanbul ignore if: no need to test verbose print */
        if (options.verbose) {
          verbosePrint(options.port, options.enableGraphiql);
        }

        resolve(server);
      }).on("error", (err: Error) => {
        reject(err);
      });
    });
  }
  catch (e) {
    console.log(e)
  }
}

if (require.main === module) {
  const PORT = process.env.PORT || 3000;
  const NODE_ENV = process.env.NODE_ENV !== "production" ? "dev" : "production";
  const EXPORT_GRAPHIQL = NODE_ENV !== "production";
  const ENABLE_CORS = NODE_ENV !== "production";

  main({
    enableCors: true,
    enableGraphiql: EXPORT_GRAPHIQL,
    env: NODE_ENV,
    port: PORT,
    verbose: true,
  });
}
