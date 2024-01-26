const { gql } = require('apollo-server');
//import * as yup from 'yup';
const User = require('../../models/User');
const Contact = require('../../models/Contact');

const typeDefs = gql`
    extend type Query {
        """
        Returns paginated users.
        """
        users: [User!]!
    }
`;

const resolvers = {
    Query: {
        users: async (obj, args) => await User.find({}).populate("contacts"),
    },
};

module.exports = {
    typeDefs,
    resolvers,
};