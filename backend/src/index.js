
const { makeExecutableSchema } = require("@graphql-tools/schema");
const { SubscriptionServer } = require("subscriptions-transport-ws");
const { execute, subscribe } = require("graphql");
const { ApolloServer } = require("apollo-server-express");

const express = require("express");
const { createServer } = require("http");

require("dotenv").config();
const mongoose = require("mongoose");

const jwt = require("jsonwebtoken");
const User = require("./models/User");

const { typeDefs, resolvers } = require("../src/GraphQL/schema");

const MONGODB_URL = process.env.MONGODB_URL;

console.log("connecting to", MONGODB_URL);

mongoose.connect(MONGODB_URL)
    .then(() => {
        console.log("connected to MongoDB");
    })
    .catch((error) => {
        console.log("error connection to MongoDB:", error.message);
    });

const start = async() => {
    const app = express();

    const httpServer = createServer(app);

    const schema = makeExecutableSchema({ typeDefs,resolvers });

    const subscriptionServer = SubscriptionServer.create(
        { schema, execute, subscribe,
            onConnect: async (connectionParams) => {
                if (connectionParams.Authorization) {
                    const token = connectionParams.Authorization.replace("Bearer ", "");
                    try {
                        const decodedToken = jwt.verify(token, process.env.JWT_SECRET);
                        const currentUser = await User.findById(decodedToken.id).populate(
                            "contacts"
                        );
                        return { currentUser };
                    } catch (error) {
                        return null;
                    }
                }
                return null;
            }
        },
        { server: httpServer, path : "/graphql" }
    );

    const server = new ApolloServer({
        schema,
        plugins: [
            {
                async serverWillStart() {
                    return {
                        async drainServer() {
                            await subscriptionServer.close();
                        },
                    };
                }
            }
        ],
        context: async ({ req }) => {
            const auth = req ? req.headers.authorization : null;
            if (auth && auth.startsWith("Bearer ")) {
                try{
                    const decodedToken = jwt.verify(
                        auth.substring(7), process.env.JWT_SECRET
                    );
                    const currentUser = await User.findById(decodedToken.id).populate("contacts");
                    return { currentUser };
                }catch(error){
                    return null;
                }
            }
        }
    });

    await server.start();

    server.applyMiddleware({ app });

    const PORT = 4000;

    httpServer.listen(PORT, () =>
        console.log(`Server is now running on http://localhost:${PORT}`)
    );
};

start();