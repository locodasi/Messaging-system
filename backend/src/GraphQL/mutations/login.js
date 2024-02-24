const { gql } = require("apollo-server");
//import * as yup from 'yup';
const bcrypt = require("bcrypt");
const { GraphQLError } = require("graphql");
const jwt = require("jsonwebtoken");

const User = require("../../models/User");

const typeDefs = gql`

    type Token {
        value: String!
        number: String!
        imageURL: String!
        id: String!
    }

    extend type Mutation {
        authenticate(number: String! password: String!): Token!
    }
`;

const resolvers = {
    Mutation: {
        authenticate: async (obj, args) => {
            const user = await User.findOne({ number: args.number });

            if (!user) {
                throw new GraphQLError("Wrong number", {
                    extensions: {
                        code: "BAD_USER_INPUT"
                    }
                });
            }

            const match = await bcrypt.compare(args.password, user.passwordHash);

            if (!match) {
                throw new GraphQLError("Wrong password", {
                    extensions: {
                        code: "BAD_USER_INPUT"
                    }
                });
            }

            const userForToken = {
                number: user.number,
                id: user._id,
            };

            return {
                value: jwt.sign(userForToken, process.env.JWT_SECRET, {
                    expiresIn: "3h", // Tiempo de expiración de 1 hora
                }),
                number: user.number,
                imageURL: user.imageURL,
                id: user._id
            };
        },
    },
};

module.exports = {
    typeDefs,
    resolvers,
};