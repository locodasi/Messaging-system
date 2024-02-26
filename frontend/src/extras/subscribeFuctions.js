import { GET_MESSAGES, GET_CONTACTS } from "../graphql/queries";
import { UPDATE_MESSAGE_UNREAD, UPDATE_MESSAGE_READ } from "../graphql/fragments";

export const subscriptionMessage = ({ data, client }) => {
    const messegeSent = data.data.messageSent;
    const fromId = data.data.messageSent.from.id;

    // Actualizar mensajes
    try {
        client.cache.updateQuery({ query: GET_MESSAGES, variables: { toId: fromId, first:10 } }, ({ getMessages }) => {
            const newGetMessages = {
                ...getMessages,
                edges:[
                    ...getMessages.edges,
                    {
                        cursor: messegeSent.id,
                        node: messegeSent
                    }
                ]
            }
            return {getMessages:newGetMessages}
        });
    } catch (error) {
        //Si hay un error porque nunca abri el chat, se evita la excepcion
    }
    

    // Actualizar mensajes no vistos
    client.query({
            query: GET_CONTACTS,
            variables: { userContact: fromId },
            fetchPolicy: 'network-only',
        }).then(result => {
        const contactData = result.data.getContacts[0];
    
        //Obtengo mis contactos
        const cachedData = client.readQuery({
            query: GET_CONTACTS
        });

        // Verifica si el contacto ya existe en la caché
        const existingContact = cachedData.getContacts.find(contact => contact.id === contactData.id);

        let contacts = cachedData.getContacts;

        if (existingContact) {
            // Actualiza directamente el campo en la caché utilizando el cacheId
            client.writeFragment({
                id: `Contact:${contactData.id}`,
                fragment: UPDATE_MESSAGE_UNREAD,
                data: {
                    unreadMessageCount: contactData.unreadMessageCount,
                },
            });
        
        } else {
            // El contacto no está en la caché, agrégalo
            contacts = [...cachedData.getContacts, contactData];
        }

        // Ordenar los contactos por unreadMessageCount en orden descendente
        const sortedContacts = contacts.slice().sort((a, b) => b.unreadMessageCount - a.unreadMessageCount);

        // Actualiza directamente la caché con los contactos ordenados y utiliza una función de combinación personalizada
        client.cache.writeQuery({
            query: GET_CONTACTS,
            data: {
                getContacts: sortedContacts,
            },
        });

    });
};

export const subscriptionMessageRead = ({ data, client }) => {

    data.data.messagesRead.map(message => {
        client.writeFragment({
            id: `Message:${message}`,
            fragment: UPDATE_MESSAGE_READ,
            data: {
            read: true,
            },
        });

        return true;
    })
    
};

export const subscriptionError = (error) => {
    console.error('Subscription error:', error);
};