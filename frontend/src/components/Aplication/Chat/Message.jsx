import {
    Box,
    Typography,
    Paper,
} from "@mui/material";
import { useStateContextState } from "../../../contexts/StateProvider";

const Message = ({ message }) => {

    const state = useStateContextState();

    const isUser = message.from.id === state.user.id;

    const classes = {
        messageLine: {
            display: "flex",
            justifyContent: isUser ? "flex-end" : "flex-start",
            mb: 2,
        },
        message: {
            p: 2,
            backgroundColor: isUser ?  "primary.light" : "secondary.light",
            borderRadius: isUser ? "20px 20px 5px 20px" : "20px 20px 20px 5px",
        },
        timestamp: {
            bottom: 0,
            right: 0,
            fontSize: "0.8rem",
            color: "rgba(0, 0, 0, 0.5)",
        }
    }

    const date = message.date.substring(11,16);
    return (
        <Box sx={classes.messageLine} >
            <Paper variant="outlined" sx={classes.message} >
                <Typography variant="body1">{message.text}</Typography>
                <Typography variant="caption" sx={classes.timestamp}>
                    {`${date} `}
                    {isUser && 
                        <span role="img" style={{ color: message.read ? "blue" : "gray" }}>
                            ✔✔ 
                        </span>
                    }
                </Typography>
            </Paper>
        </Box>
    );
};

export default Message;