const { gql } = require("apollo-server");
//import * as yup from 'yup';

const pubsub = require("../pubsub");

const typeDefs = gql`
    extend type Subscription {
        messageSent: Message!
        messagesRead: [String!]!
    }
`;

const resolvers = {
    Subscription: {
        messageSent:{
            subscribe: async (obj, args, { currentUser } ) => {
                if (!currentUser) {
                    throw new Error("User not authenticated");
                }
                return pubsub.asyncIterator([`MESSAGE_SENT_${currentUser._id}`]);
            }
        },
        messagesRead:{
            subscribe: async (obj, args, { currentUser } ) => {
                if (!currentUser) {
                    throw new Error("User not authenticated");
                }
                return pubsub.asyncIterator([`MESSAGE_READ_${currentUser._id}`]);
            }
        }
    },
};

module.exports = {
    typeDefs,
    resolvers,
};