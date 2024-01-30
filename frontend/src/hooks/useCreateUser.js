import { useMutation } from "@apollo/client";

import { CREATE_USER } from "../graphql/mutations";

const useCreateUSer = () => {
    const [mutate, result] = useMutation(CREATE_USER);

    const createUser = async (variables) => {
        const { data } = await mutate({variables})
        return data;
    };

    return [createUser, result];
};

export default useCreateUSer;