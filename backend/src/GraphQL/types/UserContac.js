const { gql } = require('apollo-server');

const typeDefs = gql`
    type UserContact {
        number: String!
        imageURL: String!
    }
`;

module.exports = {
    typeDefs,
//    resolvers,
};