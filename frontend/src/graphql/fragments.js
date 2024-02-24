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

export const UPDATE_MESSAGE_UNREAD = gql`
fragment UpdateMessagesUnread on Contact {
    unreadMessageCount
}
`

export const UPDATE_MESSAGE_READ = gql`
fragment UpdateMessagesRead on Message {
    read
}
`