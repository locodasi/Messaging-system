const { gql } = require("apollo-server");
//import * as yup from 'yup';
const { GraphQLError } = require("graphql");

const Contact = require("../../models/Contact");

const typeDefs = gql`
    extend type Query {
        """
        Returns paginated contacts.
        """
        getContacts: [Contact!]!
    }
`;

const resolvers = {
    Query: {
        getContacts: async (obj, args, { currentUser }) => {
            if (!currentUser) {
                throw new GraphQLError("Not authenticated", {
                    extensions: {
                        code: "BAD_USER_INPUT"
                    }
                });
            }

            return await Contact.find({ user: currentUser._id }).populate("userContact");
        }
    },
};

module.exports = {
    typeDefs,
    resolvers,
};