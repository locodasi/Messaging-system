const { gql } = require("apollo-server");
//import * as yup from "yup";
const { GraphQLError } = require("graphql");

const Contact = require("../../models/Contact");
//const Message = require("../../models/Message");

const typeDefs = gql`
    extend type Query {
        """
        Returns paginated contacts.
        """
        getContacts: [Contact!]!
    }
`;

const resolvers = {
    Query: {
        getContacts: async (obj, args, { currentUser }) => {
            if (!currentUser) {
                throw new GraphQLError("Not authenticated", {
                    extensions: {
                        code: "BAD_USER_INPUT"
                    }
                });
            }

            const currentUserID = currentUser._id;

            //aggregate permite transformar datos, agrupar, filtrar (manipulacion avanzada de datos), esto lo logra con pipeline(tuberias), una serie de etapas que realizan una operacion especifica de forma secunecial
            const contacts = await Contact.aggregate([
                //Filtra los contactos segun usario actual
                { $match: { user: currentUserID } },
                {
                    //loohup, hace una operacion de union entre 2 colecciones (join)
                    $lookup: {
                        //Con quien hago el join
                        from: "messages",
                        //crea variables locales para el lookup, osea crea la variable userContactId cuyo valor es userContact, de los contact
                        let: { userContactId: "$userContact" },
                        //una tuberia de agregacion, son la setapas que modifican lso datos
                        pipeline: [
                            {
                                //Me develve los objeto matcheado, aca esta la union, mientras en el otro lookup uso from y foreignField, aca uso match para obtener los datos
                                $match: {
                                    //Me premite usar las variables definidas en let
                                    $expr: {
                                        //Busca que todas las condiciones sean true para el match
                                        $and: [
                                            //eq busca se sea igual
                                            { $eq: ["$from", "$$userContactId" ] },
                                            { $eq: ["$to", currentUserID ] },
                                            { $eq: ["$read", false] }
                                        ]
                                    }
                                }
                            },
                        ],
                        //EL alias del nuevo campo
                        as: "unreadMessages"
                    }
                },
                {
                    //Otra union, ahora con user, para el type userCOntact de graphQL
                    $lookup: {
                        from: "users",
                        //Campo de la coleccion actual para el join
                        localField: "userContact",
                        //Dato de la coleccion destino para el join
                        foreignField: "_id",
                        //El alias del dato resultante, osea el usuario reultante del join
                        as: "userContactData"
                    }
                },
                {
                    //indica que campos se retornaran
                    $project: {
                        //Re nombo id
                        id: "$_id",
                        //El name, 1 indica que se incluye
                        name: 1,
                        //Obtengo al usuario que obtuve en el segundo lookup
                        userContact: {
                            //arrayElemntAt es para obtener un elemento de un array, aca estaria obteniendo el primer elemento de userContactData, osea lo que obtuve en el segundo lookup, aunque el lookup retorne un solo elemento igual lo vuelve un array, por eso saco el primero, porque ademas es el unico
                            $arrayElemAt: ["$userContactData", 0]
                        },
                        //obtengo el tamaño del array de mensajes no leidos
                        unreadMessageCount: { $size: "$unreadMessages" }
                    }
                },
                {
                    //Ordena segun esta variable y al ser -1 lo hace de forma descendente
                    $sort: {
                        unreadMessageCount: -1
                    }
                }
            ]);

            return contacts;
        }
    },
};

module.exports = {
    typeDefs,
    resolvers,
};