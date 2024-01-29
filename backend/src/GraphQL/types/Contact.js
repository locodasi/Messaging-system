const { gql } = require("apollo-server");

const typeDefs = gql`
    type Contact {
        id: ID!
        name: String!
        user: UserContact!
        unreadMessageCount: Int!
    }
`;

const resolvers = {
    Contact: {
        user: async (obj) => {
            return { ...obj.userContact, id:obj.userContact._id };
        },
    },
};

module.exports = {
    typeDefs,
    resolvers,
};