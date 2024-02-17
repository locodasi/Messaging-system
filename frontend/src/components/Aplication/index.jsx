import Contacts from "./Contacts";

import { useStateContextState } from "../../contexts/StateProvider";

import Chat from "./Chat";

import { SUBSCRIPTIONS_MESSAGE } from "../../graphql/subscriptions";
import { GET_MESSAGES, GET_CONTACTS } from "../../graphql/queries";

import { useSubscription, gql, useApolloClient } from "@apollo/client";

const  Aplication = ()=> {

    const state = useStateContextState();
    const client = useApolloClient();
    
    useSubscription(SUBSCRIPTIONS_MESSAGE, {
        onData: ({ data, client }) => {
            const messegeSent = data.data.messageSent;
            const fromId = data.data.messageSent.from.id;
            //notify(`${addedBook.title} added`)
            //Actualizo mensajes
            client.cache.updateQuery({ query: GET_MESSAGES, variables: {toId: fromId}}, ({ getMessages }) => {
                return {
                    getMessages: getMessages.concat(messegeSent)
                }
            })

            // //ACtualizao mensajes no vistos
            //Obtengo el contacto que envio el mensaje
            client.query({
                query: GET_CONTACTS,
                variables: { userContact: fromId },
                fetchPolicy: 'network-only'
            }).then(result => {
                const contactData = result.data.getContacts[0];

                // // Actualiza directamente el campo en la caché utilizando el cacheId
                client.writeFragment({
                    id: `Contact:${contactData.id}`, // Reemplaza con tu cacheId específico
                    fragment: gql`
                    fragment UpdateMessagesUnread on Contact {
                        unreadMessageCount
                    }
                    `,
                    data: {
                        unreadMessageCount: contactData.unreadMessageCount,
                    },
                });
            })
            // // Lee los datos actuales de la caché
            // const contact = client.readFragment({
            //     id: `Contact:${contactId}`,
            //     fragment: gql`
            //     fragment GetCurrentMessagesUnread on Contact {
            //         unreadMessageCount
            //     }
            //     `,
            // });
        
            // // Incrementa el valor actual
            // const updatedMessagesUnread = contact.unreadMessageCount + 1;
        
            
        },
        onError: (error) => {
            console.error("Subscription error:", error);
        }
    })

    return(
        <div style={{display: "flex"}}>
            <Contacts />
            <div style={{width: "70%"}}>
                {state.contact ? <Chat contact={state.contact}/> : <h1>adios</h1>}
            </div>
        </div> 
    );
}


export default Aplication