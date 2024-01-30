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
            const a = { ...obj.userContact, id:obj.userContact._id };
            console.log("aaaa", a);
            return { ...obj.userContact, id:obj.userContact._id };
        },
    },
};

module.exports = {
    typeDefs,
    resolvers,
};