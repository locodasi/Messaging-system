const { gql } = require("apollo-server");
//import * as yup from 'yup';
const { GraphQLError } = require("graphql");

const Contact = require("../../models/Contact");
const User = require("../../models/User");

const typeDefs = gql`

    extend type Mutation {
        createContact(name: String! number: String!): Contact!
    }
`;

const resolvers = {
    Mutation: {
        createContact: async (obj, args,{ currentUser }) => {
            if (!currentUser) {
                throw new GraphQLError("Not authenticated", {
                    extensions: {
                        code: "BAD_USER_INPUT"
                    }
                });
            }

            // Paso 1: Buscar el usuario con el número especificado
            const user = await User.findOne({ number: args.number });

            if (!user) {
                // El usuario no existe, manejar según tus necesidades
                throw new Error("User not exist");
            } else {
                // Paso 2: Verificar si ya existe un contacto con ese usuario en la lista de contactos
                const contact = await Contact.findOne({
                    user: currentUser._id,
                    userContact: user._id
                });

                if(contact){
                    throw new Error("The contact already exists");
                }

                //Paso 3: crear contacto
                const newContact = new Contact({
                    name: args.name,
                    user: currentUser._id,
                    userContact: user._id,
                });

                //Paso 4: Guardar
                const contactSave = await newContact.save();

                //No voy a poder acceder a user de contact ni al unreadMessageCount porque el segundo no se lo estoy pasando y al primero porque no hago el populate( no lo hago porque, mongoose agrega info extra al hacer populate que hace que todo falle en el resolver de user de Contact, pero si lo arreglo ahi el mismo resolver falla para el getContacts (Porque por algun motivo ahi no agrega la info extra), asi que no hago el populate y listo), igual la idea es que en el front se vuelva a hacer la query de getContacts al agregar un contacto, asi que no deberia ser ningun problema esto
                return contactSave;
            }
        },
    },
};

module.exports = {
    typeDefs,
    resolvers,
};