const { gql } = require("apollo-server");
//import * as yup from 'yup';

const Message = require("../../models/Message");
const { GraphQLError } = require("graphql");

const typeDefs = gql`
    extend type Query {
        """
        Returns messages contacts.
        """
        getMessages(toID: String!, first: Int, after: String): MessageConnection!
    }

    type MessageConnection {
        edges: [MessageEdge!]!
        pageInfo: PageInfo!
    }

    type MessageEdge {
        cursor: String!
        node: Message!
    }

    type PageInfo {
        hasNextPage: Boolean!
        endCursor: String
    }
`;

const resolvers = {
    Query: {
        getMessages: async (obj, args, { currentUser }) => {
            if (!currentUser) {
                throw new GraphQLError("Not authenticated", {
                    extensions: {
                        code: "BAD_USER_INPUT"
                    }
                });
            }

            const limit = args.first || 10;

            const afterMessage = await Message.findOne({ _id: args.after }).select("date");

            const query = {
                $or: [
                    { to: args.toID, from: currentUser._id },
                    { to: currentUser._id, from: args.toID }
                ],
            };

            //Sumo qu eme traiga mensajes con date menores(Mas viejos) que el after
            if (afterMessage) {
                query.date = { $lt: afterMessage.date };
            }

            const messages = await Message.find(query)
                .sort({ date: -1 }) // Ordena por fecha de creación de forma descendente (más reciente primero)
                .limit(limit + 1 || 10) // Limita la cantidad de mensajes devueltos (valor por defecto: 10)
                .populate("to from");

            const hasNextPage = messages.length > limit;

            const edges = hasNextPage ? messages.slice(0, -1) : messages;

            const pageInfo = {
                hasNextPage,
                endCursor: hasNextPage ? edges[edges.length - 1]._id.toString() : null,
            };

            edges.sort((a, b) => a.date - b.date);

            return {
                edges: edges.map((message) => ({
                    cursor: message._id.toString(),
                    node: message,
                })),
                pageInfo,
            };
        }
    },
};

module.exports = {
    typeDefs,
    resolvers,
};