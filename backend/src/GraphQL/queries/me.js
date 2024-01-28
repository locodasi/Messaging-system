const { gql } = require("apollo-server");
//import * as yup from 'yup';

const typeDefs = gql`
    extend type Query {
        me: User
    }
`;

const resolvers = {
    Query: {
        me: (root, args, context) => {
            return context.currentUser;
        }
    },
};

module.exports = {
    typeDefs,
    resolvers,
};