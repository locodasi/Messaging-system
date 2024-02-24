import { GET_MESSAGES } from '../../graphql/queries';
import { useQuery } from '@apollo/client';

const useMessages = (variables) => {

    //const {data, loading, fetchMore} = useQuery(GET_CONTACTS, {
    const {data, loading, error} = useQuery(GET_MESSAGES, {
        fetchPolicy: "cache-and-network",
        variables
    })

//   const handleFetchMore = () => {
//     const canFetchMore =
//       !loading && data && data.repositories.pageInfo.hasNextPage;

//     if (!canFetchMore) {
//       return;
//     }

//     fetchMore({
//       query: GET_REPOSITORIES,
//       variables: {
//         after: data.repositories.pageInfo.endCursor,
//         ...variables,
//       },
//       updateQuery: (previousResult, { fetchMoreResult }) => {
//         const nextResult = {
//           repositories: {
//             ...fetchMoreResult.repositories,
//             edges: [
//               ...previousResult.repositories.edges,
//               ...fetchMoreResult.repositories.edges,
//             ],
//           },
//         };

//         return nextResult;
//       },
//     });
//   };

    let messages = (loading || error) ? [] : data.getMessages
    return {messages, loading, error}
    //    return {contacts, loading, fetchMore: handleFetchMore,}

};

export default useMessages;