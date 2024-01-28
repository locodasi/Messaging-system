import { useState } from "react";
import {
    Box,
    TextField,
    Button,
    Grid,
} from "@mui/material";
import SendIcon from "@mui/icons-material/Send";

import useMessages from "../../../hooks/useMessages";

import Message from "./Message";

const classes = {
    chat: {
        height: "100vh",
        display: "flex",
        flexDirection: "column",
        bgcolor: "grey.200",
    },
    containerMessage: { 
        flexGrow: 1, 
        overflow: "auto", 
        p: 2 
    },
    conatinerSend: { 
        p: 2, 
        backgroundColor: "background.default" 
    }
}

const Chat = ({contact}) => {
    const [input, setInput] = useState("");

    const {messages, loading, error} = useMessages({
        toId: contact.user.id
    });

    if(error && error.graphQLErrors[0].message === "Not authenticated"){
        if (localStorage.getItem("messasegin-user-token") !== null){
            localStorage.removeItem("messasegin-user-token");
        }
        window.location.reload();
    }

    const handleSend = () => {
        if (input.trim() !== "") {
            console.log(input);
            setInput("");
        }
    };

    const handleInputChange = (event) => {
        setInput(event.target.value);
    };

    if(loading){
        return <></>
    }

    return (
        <Box sx={classes.chat}>
            <Box sx={classes.containerMessage}>
                {messages.map((message) => (
                    <Message key={message.id} message={message} />
                ))}
            </Box>

            <Box sx={classes.conatinerSend}>
                <Grid container spacing={2}>
                    <Grid item xs={10}>
                        <TextField
                            fullWidth
                            size="small"
                            placeholder="Type a message"
                            variant="outlined"
                            value={input}
                            onChange={handleInputChange}
                        />
                    </Grid>
                    <Grid item xs={2}>
                        <Button
                            fullWidth
                            size="large"
                            color="primary"
                            variant="contained"
                            endIcon={<SendIcon />}
                            onClick={handleSend}
                        >
                        Send
                        </Button>
                    </Grid>
                </Grid>
            </Box>
        </Box>
    );
};


export default Chat;