import { Box } from "@mui/material";

import { useRef, useEffect, useState } from "react";

import Message from "./Message";

const classes = {
    containerMessage: { 
        flexGrow: 1, 
        overflow: "auto", 
        p: 2
    }
}

const  Messages = ({messages, fetchMore})=> {
    const scrollBarRef = useRef(null);
    const [getMoreMessage, setGetMoreMessages] = useState(false)
    const [scrollEnabled, setScrollEnabled] = useState(true)

    const [messagesLength, setMessagesLength] = useState(messages.length)

    useEffect(() => {
        if(scrollBarRef.current && !getMoreMessage){
            scrollBarRef.current.scrollTop = scrollBarRef.current.scrollHeight - scrollBarRef.current.clientHeight;
        }

        if(getMoreMessage){
            if(scrollBarRef.current.scrollTop === 0){
                scrollBarRef.current.scrollTop = scrollBarRef.current.scrollHeight * 0.3
            }
            setGetMoreMessages(false)
        }

    }, [scrollBarRef.current?.scrollHeight])

    useEffect(()=> {
        if(messagesLength !== messages.length){
            setMessagesLength(messages.length)
            setScrollEnabled(true)
        }

    },[messages.length])

    const onScroll = ({target}) => {
        if(target.scrollTop <= target.scrollHeight * 0.2){    
            fetchMore()
            setGetMoreMessages(true)
            setScrollEnabled(false)
        }
    }

    

    return(
        <>
            <Box sx={classes.containerMessage} ref={scrollBarRef} onScroll={scrollEnabled ? onScroll : null}>
                {messages.map((message) => (
                    <Message key={message.id} message={message} />
                ))}
            </Box>
        </>
    );
}

export default Messages