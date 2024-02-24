import { useMutation } from "@apollo/client";

import { CREATE_CONTACT } from "../../graphql/mutations";

const useCreateContact = () => {
    const [mutate, result] = useMutation(CREATE_CONTACT);

    const createContact = async (variables) => {
        const { data } = await mutate({variables})
        return data;
    };

    return [createContact, result];
};

export default useCreateContact;