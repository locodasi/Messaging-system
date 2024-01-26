const { merge } = require ('lodash');
const { gql } = require('apollo-server');

const Contact = require("./types/Contact");
const User = require("./types/User");
const UserContact = require("./types/UserContac");

const userQuery = require("./queries/user");

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
];

const resolvers = merge(
    Contact.resolvers,
    // User.resolvers,
    userQuery.resolvers,
);


module.exports = {typeDefs, resolvers}