import { gql } from "@apollo/client";
import { MESSAGE_DETAILS } from "./fragments";

export const SUBSCRIPTIONS_MESSAGE = gql`
subscription SubscriptionMessage {
    messageSent {
        ...MessageDetails
    }
}
${MESSAGE_DETAILS}
`;