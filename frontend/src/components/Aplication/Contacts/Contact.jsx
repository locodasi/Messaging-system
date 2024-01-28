import { Fragment } from 'react';
import ListItemText from '@mui/material/ListItemText';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import ListItem from '@mui/material/ListItem';
import Avatar from '@mui/material/Avatar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';

import { useDispatchContact } from '../../../contexts/ContactProvider';

const classes = {
    inline: {
        display: 'inline',
    },
    button: {
        border: "none",
        transition: 'background-color 0.3s',
        '&:hover': {
        backgroundColor: '#e0e0e0',  // Cambia el color a tu preferencia
        },
    }
}

const Contact = ({contact})=> {

    const dispatch = useDispatchContact();

    const onCLick = () => {
        dispatch({ type: "setContact", contact: contact });
    }

    return(
        <Button onClick={onCLick} sx={classes.button}>
            <ListItem alignItems="flex-start">         
                <ListItemAvatar>
                <Avatar alt={`contact ${contact.name}`} src={contact.user.imageURL} />
                </ListItemAvatar>
                <ListItemText
                    primary={<span style={{ color: 'black' }}>{contact.name}</span>}
                    secondary={
                        <Fragment>
                        <Typography
                            component="span"
                            variant="body2"
                            style={classes.inline}
                            color="textPrimary"
                        >
                            Ali Connors
                        </Typography>
                        {" — I'll be in your neighborhood doing errands this…"}
                        </Fragment>
                    }
                />           
            </ListItem>
        </Button>
    );
}

export default Contact