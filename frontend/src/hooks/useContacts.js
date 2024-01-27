import { GET_CONTACTS } from '../graphql/queries';
import { useQuery } from '@apollo/client';

const useContacts = (variables) => {

    //const {data, loading, fetchMore} = useQuery(GET_CONTACTS, {
    const {data, loading} = useQuery(GET_CONTACTS, {
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

    let contacts = loading ? [] : data.getContacts
    return {contacts, loading}
    //    return {contacts, loading, fetchMore: handleFetchMore,}

};

export default useContacts;
