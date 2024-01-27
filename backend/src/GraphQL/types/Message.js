const { gql } = require("apollo-server");

// const User = require("../../models/User");

const typeDefs = gql`
    type Message {
        id: ID!
        text: String!
        date: String!
        read: Boolean!
        to: UserContact!
        from: UserContact!
    }
`;

const resolvers = {
    Message: {
        date: async (obj) => createStringDate(obj.date),
    },
};

const createStringDate = (date) => {
    const day = date.getDate().toString().padStart(2, "0");
    const month = (date.getMonth() + 1).toString().padStart(2, "0");
    const year = date.getFullYear().toString();
    const hours = date.getHours().toString().padStart(2, "0");
    const minutes = date.getMinutes().toString().padStart(2, "0");
    const seconds = date.getSeconds().toString().padStart(2, "0");

    const formattedDateString = `${day}-${month}-${year} ${hours}:${minutes}:${seconds}`;

    return formattedDateString;
};

module.exports = {
    typeDefs,
    resolvers,
};