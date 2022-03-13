const { gql } = require("apollo-server");

const typeDefs = gql`
  type Mutation {
    deleteEquipment(id: String): Equipment
    deleteSupply: [Supply]
  }
`;

module.exports = typeDefs;
