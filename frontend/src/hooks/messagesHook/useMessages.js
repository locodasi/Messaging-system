import { GET_MESSAGES } from '../../graphql/queries';
import { useQuery } from '@apollo/client';

const useMessages = (variables) => {

    //const {data, loading, fetchMore} = useQuery(GET_CONTACTS, {
    const {data, loading, error, fetchMore} = useQuery(GET_MESSAGES, {
        fetchPolicy: "cache-and-network",
        variables
    })

    const handleFetchMore = () => {
        const canFetchMore =
        !loading && data && data.getMessages.pageInfo.hasNextPage;

        if (!canFetchMore) {
            return;
        }

        fetchMore({
            query: GET_MESSAGES,
            variables: {
                after: data.getMessages.pageInfo.endCursor,
                ...variables,
            },
            updateQuery: (previousResult, { fetchMoreResult }) => {
                const nextResult = {
                    getMessages: {
                        ...fetchMoreResult.getMessages,
                    edges: [
                        ...fetchMoreResult.getMessages.edges,
                        ...previousResult.getMessages.edges,
                    ],
                },
                };

                return nextResult;
            },
        });
    };

    let messages = (loading || error) ? [] : data.getMessages.edges.map(edge => edge.node);
    return {messages, loading, error, fetchMore: handleFetchMore}
    //    return {contacts, loading, fetchMore: handleFetchMore,}

};

export default useMessages;