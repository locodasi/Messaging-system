import Contacts from "./Contacts";

import { useStateContextState } from "../../contexts/StateProvider";

import Chat from "./Chat";
import NotUser from "../NotUser";

import { SUBSCRIPTIONS_MESSAGE, SUBSCRIPTIONS_MESSAGES_READ } from "../../graphql/subscriptions";

import { subscriptionMessage, subscriptionError, subscriptionMessageRead } from "../../extras/subscribeFuctions";

import { useSubscription } from "@apollo/client";

const  Aplication = ()=> {

    const state = useStateContextState();
    
    useSubscription(SUBSCRIPTIONS_MESSAGE, {
        onData: (data) => subscriptionMessage(data),
        onError: (error) => subscriptionError(error)
    })

    useSubscription(SUBSCRIPTIONS_MESSAGES_READ, {
        onData: (data) => subscriptionMessageRead(data),
        onError: (error) => subscriptionError(error)
    })

    return(
        <div style={{display: "flex"}}>
            <Contacts />
            <div style={{width: "70%"}}>
                {state.contact ? <Chat contact={state.contact}/> : <NotUser />}
            </div>
        </div> 
    );
}


export default Aplication