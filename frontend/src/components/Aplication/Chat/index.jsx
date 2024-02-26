import { useState } from "react";
import {
    Box,
    TextField,
    Button,
    Grid,
    Typography
} from "@mui/material";
import SendIcon from "@mui/icons-material/Send";

import { useNavigate } from "react-router-dom";

import useMessages from "../../../hooks/messagesHook/useMessages";
import useCreateMessage from "../../../hooks/messagesHook/useCreateMessages";

import { useDispatchState } from "../../../contexts/StateProvider";

import useReadMessage from "../../../hooks/messagesHook/useReadMessages";
import Messages from "./Messages";

const classes = {
    header: {
        display: "flex",
        justifyContent: "flex-end",
        bgcolor: "grey.100",
        fontSize: "30px"
    },
    chat: {
        height: "100vh",
        display: "flex",
        flexDirection: "column",
        bgcolor: "grey.200",
    },
    conatinerSend: { 
        p: 2, 
        backgroundColor: "background.default" 
    }
}

const Chat = ({contact}) => {
    const [input, setInput] = useState("");

    const [createMessage] = useCreateMessage(contact.user.id);
    const [readMessages] = useReadMessage(contact.id);

    const navigate = useNavigate();

    const dispatch = useDispatchState();

    const {messages, loading, error, fetchMore} = useMessages({
        toId: contact.user.id,
        first: 10
    });

    if(error && error.graphQLErrors[0].message === "Not authenticated"){
        if (localStorage.getItem("messasegin-user-token") !== null){
            localStorage.removeItem("messasegin-user-token");
        }
        window.location.reload();
    }

    const handleSend = async () => {
        if (input.trim() !== "") {
            await createMessage({text: input, toId: contact.user.id})
            setInput("");
        }
    };

    const handleInputChange = (event) => {
        setInput(event.target.value);
    };

    const closeContact = () => {
        dispatch({ type: "cleanContact" })
    }

    const updateContact = () => {
        localStorage.setItem("contactNumber", contact.user.number);
        navigate("/updateContact");
    }

    if(loading){
        return <></>
    }

    const messagesRead = async() => {
        const messagesNotReadIDs = messages.filter(
            (message) => !message.read && message.from.id ===contact.user.id)
        .map((message) => message.id);

        if(messagesNotReadIDs.length !== 0){
            await readMessages({messagesIDs: messagesNotReadIDs, fromId: contact.user.id})
        }
    }
    
    messagesRead();

    return (
        <Box sx={classes.chat}>

            <Box sx={classes.header}>   
                <Typography style={{marginTop: "8px"}}>{contact.name}</Typography>  
                { !contact.saved &&
                    <Button onClick={updateContact} sx={{ fontSize: '16px' }}>
                        Agregar contacto
                    </Button> 
                }  
                <Button onClick={closeContact} sx={{ fontSize: '16px' }}>
                    X
                </Button>  
            </Box>

            <Messages messages={messages} fetchMore={fetchMore}/>

            <Box sx={classes.conatinerSend}>
                <Grid container spacing={2}>
                    <Grid item xs={10}>
                        <TextField
                            fullWidth
                            size="small"
                            placeholder="Type a message"
                            variant="outlined"
                            value={input}
                            multiline
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