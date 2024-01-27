const { gql } = require("apollo-server");
//import * as yup from 'yup';

const Message = require("../../models/Message");

const typeDefs = gql`
    extend type Query {
        """
        Returns messages contacts.
        """
        getMessages(toID: String! fromID: String!): [Message!]!
    }
`;

const resolvers = {
    Query: {
        getMessages: async (obj, args) => {
            return await Message.find({
                $or: [
                    { to: args.toID, from: args.fromID },
                    { to: args.fromID, from: args.toID }
                ]
            }).populate("to from");

        }
    },
};

module.exports = {
    typeDefs,
    resolvers,
};