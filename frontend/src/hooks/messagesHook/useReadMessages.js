import { useMutation } from "@apollo/client";

import { READ_MESSAGES } from "../../graphql/mutations";
import { UPDATE_MESSAGE_UNREAD, UPDATE_MESSAGE_READ } from "../../graphql/fragments";


const useReadMessage = (contactId) => {
    const [mutate, result] = useMutation(READ_MESSAGES, {
        update: (cache, data) => {
            cache.writeFragment({
                id: `Contact:${contactId}`, // Reemplaza con tu cacheId específico
                fragment: UPDATE_MESSAGE_UNREAD,
                data: {
                    unreadMessageCount: 0,
                },
            });

            data.data.readMessage.map(message => {
                cache.writeFragment({
                    id: `Message:${message}`,
                    fragment: UPDATE_MESSAGE_READ,
                    data: {
                        read: true,
                    },
                });
        
                return true;
            })
        },
        onError: (error) => {
            try{
                console.log(error.graphQLErrors[0].message);
            }catch(e){console.log(error)}    
        }
    });

    const readMessages = async (variables) => {
        const { data } = await mutate({variables})
        return data;
    };

    return [readMessages, result];
};

export default useReadMessage;