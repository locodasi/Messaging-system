const { gql } = require("apollo-server");
//import * as yup from 'yup';
const { GraphQLError } = require("graphql");
const bcrypt = require("bcrypt");

const User = require("../../models/User");

const typeDefs = gql`

    extend type Mutation {
        createUser(number: String! password: String!): User!
    }
`;

const resolvers = {
    Mutation: {
        createUser: async (obj, args) => {

            const saltRounds = 10;
            if(args.password.length < 8){
                throw new Error("Password too short");
            }
            const passwordHash = await bcrypt.hash(args.password, saltRounds);

            const user = new User({
                number : args.number,
                passwordHash,
                imageURL: "https://i.pinimg.com/236x/21/09/47/21094753857210805aa234b3ade8cc1d.jpg",
                contacts: []
            });

            try{
                const userSave = await user.save();
                return userSave;
            }catch(error){
                console.log(error);
                throw new GraphQLError("Creating the user failed", {
                    extensions: {
                        code: "BAD_USER_INPUT",
                        invalidArgs: args.name,
                        error
                    }
                });
            }
        },
    },
};

module.exports = {
    typeDefs,
    resolvers,
};