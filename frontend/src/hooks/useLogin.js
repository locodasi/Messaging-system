import { useMutation } from "@apollo/client";

import { LOGIN } from "../graphql/mutations";

const useLogin = () => {
    const [mutate, result] = useMutation(LOGIN);

    const login = async (variables) => {
        const { data } = await mutate({variables})
        return data;
    };

    return [login, result];
};

export default useLogin;