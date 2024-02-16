import { useMutation } from "@apollo/client";

import { CREATE_MESSAGE } from "../graphql/mutations";
import { GET_MESSAGES } from "../graphql/queries";

const useCreateMessage = (toId) => {
    const [mutate, result] = useMutation(CREATE_MESSAGE, {
        update: (cache, { data: { createMessage } }) => {
            cache.updateQuery({ query: GET_MESSAGES, variables: {toId}}, ({getMessages})=> {
                return {getMessages: getMessages.concat(createMessage)}
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