import { gql } from "@apollo/client";
//import { REPOSITORY_BASE_FIELDS, REVIEW_BASE_FIELDS } from "./fragments";

export const LOGIN = gql`
    mutation login($number: String!, $password: String!) {
        authenticate(number: $number, password: $password) {
            value
        }
    }
`;