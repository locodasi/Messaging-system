import { useMutation } from "@apollo/client";

import { CREATE_MESSAGE } from "../../graphql/mutations";
import { GET_MESSAGES } from "../../graphql/queries";

const useCreateMessage = (toId) => {
    const [mutate, result] = useMutation(CREATE_MESSAGE, {
        update: (cache, { data: { createMessage } }) => {
            cache.updateQuery({ query: GET_MESSAGES, variables: {toId, first:10}}, ({getMessages})=> {
                const newGetMessages = {
                    ...getMessages,
                    edges:[
                        ...getMessages.edges,
                        {
                            cursor: createMessage.id,
                            node: createMessage
                        }
                    ]
                }
                return {getMessages:newGetMessages}
            })
        },
        onError: (error) => {
            try{
                console.log(error.graphQLErrors[0].message);
            }catch(e){console.log(error)}    
        }
    });

    const createMessage = async (variables) => {
        const { data } = await mutate({variables})
        return data;
    };

    return [createMessage, result];
};

export default useCreateMessage;