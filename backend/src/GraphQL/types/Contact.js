const { gql } = require('apollo-server');

const User = require("../../models/User");

const typeDefs = gql`
    type Contact {
        id: ID!
        name: String!
        user: UserContact!
    }
`;

const resolvers = {
    Contact: {
        user: async (obj, args) => {
            const user = await User.findById(obj.userContact);
            return {
                number: user.number,
                imageURL: user.imageURL
            }
        },
    },
};

module.exports = {
    typeDefs,
    resolvers,
};