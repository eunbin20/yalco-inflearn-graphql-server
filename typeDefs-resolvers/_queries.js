const { gql } = require("apollo-server");

const typeDefs = gql`
  type Query {
    equipments: [Equipment]
    equipmentAdvs: [EquipmentAdv]
    supplies: [Supply]
    softwares: [Software]
    software: Software
    givens: [Given]
    people: [People]
  }
`;

module.exports = typeDefs;
