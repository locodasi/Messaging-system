const { gql } = require("apollo-server");

const typeDefs = gql`
    type User {
        id: ID!
        number: String!
        imageURL: String!
        contacts: [Contact]!
    }
`;

// const resolvers = {
//     User: {
//         contacts: async (obj, args) => {
//             console.log(obj.contacts)
//             return {
//                 contacts: obj.contacts
//             }
//         },
//     },
// };

module.exports = {
    typeDefs,
    // resolvers,
};