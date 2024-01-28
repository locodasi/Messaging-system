import { gql } from "@apollo/client";
//import { REPOSITORY_BASE_FIELDS, REVIEW_BASE_FIELDS } from "./fragments";

export const GET_CONTACTS = gql`
query GetContacts {
    getContacts {
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

export const GET_MESSAGES = gql`
query GetMessages($toId: String!) {
    getMessages(toID: $toId) {
        text
        date
        to {
            id
        }
        from {
            id
        }
        id
        read
    }
}
`;