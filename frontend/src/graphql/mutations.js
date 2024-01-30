import { gql } from "@apollo/client";
//import { REPOSITORY_BASE_FIELDS, REVIEW_BASE_FIELDS } from "./fragments";

export const LOGIN = gql`
    mutation login($number: String!, $password: String!) {
        authenticate(number: $number, password: $password) {
            value
            imageURL
            number
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