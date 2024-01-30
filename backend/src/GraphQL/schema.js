const { merge } = require ("lodash");
const { gql } = require("apollo-server");

const Contact = require("./types/Contact");
const User = require("./types/User");
const UserContact = require("./types/UserContac");
const Message = require("./types/Message");

const userQuery = require("./queries/user");
const contactQuery = require("./queries/contact");
const messageQuery = require("./queries/message");
const meQuery = require("./queries/me");

const loginMutation = require("./mutations/login");
const messageMutation = require("./mutations/message");
const userMutation = require("./mutations/user");
const contactMutation = require("./mutations/contact");

const rootTypeDefs = gql`
    type Query {
        root: String
    }

    type Mutation {
        root: String
    }
`;

const typeDefs = [
    rootTypeDefs,
    Contact.typeDefs,
    UserContact.typeDefs,
    User.typeDefs,
    userQuery.typeDefs,
    contactQuery.typeDefs,
    messageQuery.typeDefs,
    Message.typeDefs,
    meQuery.typeDefs,
    loginMutation.typeDefs,
    messageMutation.typeDefs,
    userMutation.typeDefs,
    contactMutation.typeDefs,
];

const resolvers = merge(
    Contact.resolvers,
    // User.resolvers,
    userQuery.resolvers,
    contactQuery.resolvers,
    messageQuery.resolvers,
    Message.resolvers,
    meQuery.resolvers,
    loginMutation.resolvers,
    messageMutation.resolvers,
    userMutation.resolvers,
    contactMutation.resolvers,
);


module.exports = { typeDefs, resolvers };