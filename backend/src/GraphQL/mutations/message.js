const { gql } = require("apollo-server");
//import * as yup from 'yup';
const { GraphQLError } = require("graphql");

const Message = require("../../models/Message");

const pubsub = require("../pubsub");

const typeDefs = gql`

    extend type Mutation {
        createMessage(text: String! toID: String!): Message!
    }
`;

const resolvers = {
    Mutation: {
        createMessage: async (obj, args, { currentUser }) => {
            if (!currentUser) {
                throw new GraphQLError("Not authenticated", {
                    extensions: {
                        code: "BAD_USER_INPUT"
                    }
                });
            }

            const message = new Message({
                text : args.text,
                to: args.toID,
                from: currentUser._id,
                read: false,
                date: new Date(),
            });

            const messageSaved = await message.save().then(savedMessage => savedMessage.populate("from to"));

            pubsub.publish(`MESSAGE_SENT_${args.toID}`, { messageSent: messageSaved });
            return messageSaved;
        },
    },
};

module.exports = {
    typeDefs,
    resolvers,
};