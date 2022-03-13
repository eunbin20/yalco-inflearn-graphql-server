const database = require("./database");
const { ApolloServer, gql } = require("apollo-server");

// 어떤 요청이 들어오고 어떤 데이터를 반환할지. 단일 변수 또는 배열
const typeDefs = gql`
  type Query {
    teams: [Team]
    team(id: Int): Team
    equipments: [Equipment]
    supplies: [Supply]
  }
  type Mutation {
    deleteEquipment(id: String): Equipment
    editEquipment(
      id: String
      used_by: String
      count: Int
      new_or_used: String
    ): Equipment
    insertEquipment(
      id: String
      used_by: String
      count: Int
      new_or_used: String
    ): Equipment
  }
  type Team {
    id: Int
    manager: String
    office: String
    extension_number: String
    mascot: String
    cleaning_duty: String
    project: String
    supplies: [Supply]
  }
  type Equipment {
    id: String
    used_by: String
    count: Int
  }
  type Supply {
    id: String
    team: Int
  }
`;

// 해당 데이터를 보내는 액션 함수. 단일 객체 또는 배열
const resolvers = {
  Query: {
    teams: () =>
      database.teams.map((team) => {
        team.supplies = database.supplies.filter(
          (supply) => supply.team === team.id
        );
        return team;
      }),
    team: (parent, args) =>
      database.teams.filter((team) => team.id === args.id)[0],
    equipments: () => database.equipments,
    supplies: () => database.supplies,
  },
  Mutation: {
    deleteEquipment: (parent, args, context, info) => {
      const deleted = database.equipments.filter((equipment) => {
        return equipment.id === args.id;
      })[0];
      database.equipments = database.equipments.filter((equipment) => {
        return equipment.id !== args.id;
      });
      return deleted;
    },
    insertEquipment: (parent, args, context, info) => {
      database.equipments.push(args);
      return args;
    },
    editEquipment: (parent, args, context, info) => {
      return database.equipments
        .filter((equipment) => {
          return equipment.id === args.id;
        })
        .map((equipment) => {
          Object.assign(equipment, args);
          return equipment;
        })[0];
    },
  },
};

const server = new ApolloServer({ typeDefs, resolvers });
server.listen().then(({ url }) => {
  console.log(`🚀  Server ready at ${url}`);
});
