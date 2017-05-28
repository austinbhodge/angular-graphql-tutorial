export const typeDef = `
# Root Query
type Query {
  getAllAnimals: [Animal]
  getFlyingAnimals: [Animal]
  getAnimalByName(name: String!): Animal
}
`;

export const resolver = {
  Query: {
    getAllAnimals(root, args, context) {
      return context.db.collection('animals').find().toArray();
    },
    getFlyingAnimals(root, args, context) {
      return context.db.collection('animals').find({airborne:true}).toArray();
    },
    getAnimalByName(root, args, context) {
      return context.db.collection('animals').findOne({name: args.name});
    },
  },
};
