import { gql } from "@apollo/client";
import { CONTACT_DETAILS, MESSAGE_DETAILS } from "./fragments";

export const LOGIN = gql`
    mutation login($number: String!, $password: String!) {
        authenticate(number: $number, password: $password) {
            value
            imageURL
            number
            id
        }
    }
`;

export const CREATE_USER = gql`
mutation addUser($number: String!, $password: String!) {
    createUser(number: $number, password: $password) {
        id
        imageURL
        number
    }
}
`;

export const CREATE_CONTACT = gql`
mutation addContact($name: String!, $number: String!) {
    createContact(name: $name, number: $number) {
        ...ContactDetails
    }
}
${CONTACT_DETAILS}
`;

export const UPDATE_CONTACT = gql`
mutation updateContact($name: String!, $number: String!) {
    updateContact(name: $name, number: $number) {
        ...ContactDetails
    }
}
${CONTACT_DETAILS}
`

export const CREATE_MESSAGE = gql`
mutation addMessage($text: String!, $toId: String!) {
    createMessage(text: $text, toID: $toId) {
        ...MessageDetails
    }
}
${MESSAGE_DETAILS}
`

export const READ_MESSAGES = gql`
mutation readMessages($messagesIDs: [String!]!, $fromId: String!) {
    readMessage(messagesIDs: $messagesIDs, fromId: $fromId)
}
`