import { Alert, AlertTitle, Collapse} from '@mui/material';

import React from 'react'

const Message = ({status, type, title, msg}) => {
    return (
        <Collapse in={status}>
        <Alert severity={type}>
            <AlertTitle>{title}</AlertTitle>
            {msg}
        </Alert>
    </Collapse>
    )
}

export default Message
