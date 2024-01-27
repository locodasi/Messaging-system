const { gql } = require("apollo-server");

const typeDefs = gql`
    type UserContact {
        id:ID!
        number: String!
        imageURL: String!
    }
`;

module.exports = {
    typeDefs,
//    resolvers,
};