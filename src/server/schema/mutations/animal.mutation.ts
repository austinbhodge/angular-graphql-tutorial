export const typeDef = `
# Mutations
type Mutation {
    addAnimal(name: String!): Animal
}
`;

export const resolver = {
  Mutation: {
    addAnimal(root, args, context) {
      return context.db.collection('animals').insert(args);
    },
  },
};
