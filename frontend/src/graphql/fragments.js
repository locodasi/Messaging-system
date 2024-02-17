import { gql } from "@apollo/client";

export const MESSAGE_DETAILS = gql`
fragment MessageDetails on Message{
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
`