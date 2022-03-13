const { ApolloServer, gql } = require("apollo-server");
const _ = require("lodash");

const queries = require("./typedefs-resolvers/_queries");
const mutations = require("./typedefs-resolvers/_mutations");
const equipments = require("./typedefs-resolvers/equipments");
const supplies = require("./typedefs-resolvers/supplies");
const enums = require("./typedefs-resolvers/_enums");
const givens = require("./typedefs-resolvers/givens");
const tools = require("./typedefs-resolvers/tools");
const people = require("./typedefs-resolvers/people");

// 어떤 요청이 들어오고 어떤 데이터를 반환할지. 단일 변수 또는 배열
const typeDefs = [
  queries,
  mutations,
  equipments.typeDefs,
  supplies.typeDefs,
  enums,
  givens.typeDefs,
  tools.typeDefs,
  people.typeDefs,
];

// 해당 데이터를 보내는 액션 함수. 단일 객체 또는 배열
const resolvers = [
  equipments.resolvers,
  supplies.resolvers,
  givens.resolvers,
  tools.resolvers,
  people.resolvers,
];

const server = new ApolloServer({ typeDefs, resolvers });
server.listen().then(({ url }) => {
  console.log(`🚀  Server ready at ${url}`);
});
