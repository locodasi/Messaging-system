import { useMutation } from "@apollo/client";

import { UPDATE_CONTACT } from "../../graphql/mutations";
import { UPDATE_CONTACT_NAME } from "../../graphql/fragments";

const useUpdateContact = (contactId) => {
    const [mutate, result] = useMutation(UPDATE_CONTACT,{
        update: (cache, { data: { messageUpdate } }) => {
            cache.writeFragment({
                id: `Contact:${contactId}`, // Reemplaza con tu cacheId específico
                fragment: UPDATE_CONTACT_NAME,
                data: {
                    saved: true,
                    name: messageUpdate.name
                },
            });
        },
        onError: (error) => {
            try{
                console.log(error.graphQLErrors[0].message);
            }catch(e){console.log(error)}    
        }
    });

    const updateContact = async (variables) => {
        const { data } = await mutate({variables})
        return data;
    }; 

    return [updateContact, result];
};

export default useUpdateContact;