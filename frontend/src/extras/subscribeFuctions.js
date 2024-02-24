import { GET_MESSAGES, GET_CONTACTS } from "../graphql/queries";
import { UPDATE_MESSAGE_UNREAD, UPDATE_MESSAGE_READ } from "../graphql/fragments";

export const subscriptionMessage = ({ data, client }) => {
    const messegeSent = data.data.messageSent;
    const fromId = data.data.messageSent.from.id;

    // Actualizar mensajes
    try {
        client.cache.updateQuery({ query: GET_MESSAGES, variables: { toId: fromId } }, ({ getMessages }) => {
            console.log(getMessages)
            return {
                getMessages: getMessages.concat(messegeSent),
            };
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
    
        // Actualiza directamente el campo en la caché utilizando el cacheId
        client.writeFragment({
            id: `Contact:${contactData.id}`,
            fragment: UPDATE_MESSAGE_UNREAD,
            data: {
            unreadMessageCount: contactData.unreadMessageCount,
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