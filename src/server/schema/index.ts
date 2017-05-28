import { GraphQLSchema } from 'graphql';
import { makeExecutableSchema } from 'graphql-tools';
import * as mutations from './mutations/animal.mutation';
import * as queries from './queries/animal.query'; 
import * as types from './types/animal.type';

const typeDefs = [`
    schema {
        query: Query
        mutation: Mutation
    }
`,
  mutations.typeDef,
  queries.typeDef,
  types.typeDef
];

const resolvers = {...mutations.resolver, ...queries.resolver};

const Schema: GraphQLSchema = makeExecutableSchema({
  logger: console,
  resolvers: resolvers,
  typeDefs: typeDefs,
});

export {Schema};
