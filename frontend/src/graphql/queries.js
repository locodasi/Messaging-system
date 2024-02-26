import { gql } from "@apollo/client";
import { MESSAGE_DETAILS, CONTACT_DETAILS } from "./fragments";

export const GET_CONTACTS = gql`
query GetContacts ($userContact: String) {
    getContacts (userContact: $userContact) {
        ...ContactDetails
        unreadMessageCount
    }
}
${CONTACT_DETAILS}
`;


export const GET_MESSAGES = gql`
query GetMessages($toId: String!, $first: Int, $after: String) {
    getMessages(toID: $toId, first: $first, after: $after) {
        pageInfo {
            endCursor
            hasNextPage
        }
        edges {
            cursor
            node {
                ...MessageDetails
            }
        }
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