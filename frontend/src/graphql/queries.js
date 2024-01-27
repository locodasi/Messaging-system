import { gql } from "@apollo/client";
//import { REPOSITORY_BASE_FIELDS, REVIEW_BASE_FIELDS } from "./fragments";

export const GET_CONTACTS = gql`
query GetMessages($userId: String!) {
    getContacts(userID: $userId) {
        id
        name
        user {
            number
            imageURL
            id
        }
    }
}
`;