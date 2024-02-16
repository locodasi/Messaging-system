import { gql } from "@apollo/client";
//import { REPOSITORY_BASE_FIELDS, REVIEW_BASE_FIELDS } from "./fragments";

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
        name
    }
}
`;

export const CREATE_MESSAGE = gql`
mutation addMessage($text: String!, $toId: String!) {
    createMessage(text: $text, toID: $toId) {
        date
        id
        read
        text
        from {
            id
        }
        to {
            id
        }
    }
}
`