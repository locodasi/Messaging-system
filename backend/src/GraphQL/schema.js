const { merge } = require ("lodash");
const { gql } = require("apollo-server");

const Contact = require("./types/Contact");
const User = require("./types/User");
const UserContact = require("./types/UserContac");
const Message = require("./types/Message");

const userQuery = require("./queries/user");
const contactQuery = require("./queries/contact");
const messageQuery = require("./queries/message");

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
];

const resolvers = merge(
    Contact.resolvers,
    // User.resolvers,
    userQuery.resolvers,
    contactQuery.resolvers,
    messageQuery.resolvers,
    Message.resolvers,
);


module.exports = { typeDefs, resolvers };