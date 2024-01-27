const { gql } = require("apollo-server");
//import * as yup from 'yup';
const User = require("../../models/User");
// eslint-disable-next-line no-unused-vars
const Contact = require("../../models/Contact");

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
        users: async () => await User.find({}).populate("contacts"),
    },
};

module.exports = {
    typeDefs,
    resolvers,
};