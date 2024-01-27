const { gql } = require("apollo-server");
//import * as yup from 'yup';

const Contact = require("../../models/Contact");

const typeDefs = gql`
    extend type Query {
        """
        Returns paginated contacts.
        """
        getContacts(userID: String!): [Contact!]!
    }
`;

const resolvers = {
    Query: {
        getContacts: async (obj, args) => await Contact.find({ user: args.userID }).populate("userContact"),
    },
};

module.exports = {
    typeDefs,
    resolvers,
};