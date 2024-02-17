import { gql } from "@apollo/client";
import { MESSAGE_DETAILS } from "./fragments";

export const GET_CONTACTS = gql`
query GetContacts ($userContact: String) {
    getContacts (userContact: $userContact) {
        name
        user {
            number
            id
            imageURL
        }
        unreadMessageCount
        id
    }
}
`;

export const GET_MESSAGES = gql`
query GetMessages($toId: String!) {
    getMessages(toID: $toId) {
        ...MessageDetails
    }
}
${MESSAGE_DETAILS}
`;

export const ME = gql`
query getMe {
    me {
        number
        imageURL
        id
    }
}
`