const { gql } = require("apollo-server");
//import * as yup from 'yup';

const Message = require("../../models/Message");
const { GraphQLError } = require("graphql");

const typeDefs = gql`
    extend type Query {
        """
        Returns messages contacts.
        """
        getMessages(toID: String!): [Message!]!
    }
`;

const resolvers = {
    Query: {
        getMessages: async (obj, args, { currentUser }) => {
            if (!currentUser) {
                throw new GraphQLError("Not authenticated", {
                    extensions: {
                        code: "BAD_USER_INPUT"
                    }
                });
            }
            return await Message.find({
                $or: [
                    { to: args.toID, from: currentUser._id },
                    { to: currentUser._id, from: args.toID }
                ]
            }).populate("to from");

        }
    },
};

module.exports = {
    typeDefs,
    resolvers,
};