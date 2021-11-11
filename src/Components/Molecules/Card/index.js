import React, {useState} from 'react';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';

import Modal from '../Modal'
import ActionFormik from '../../Organisms/ActionFormik';

import Message from '../Message'

export default function BasicCard({
    id, 
    title, 
    description, 
    titleModal, 
    contentModal, 
    action,
    INITIAL_FORM_STATE, 
    FORM_VALIDATION,  
    INITIAL_FORM_STATE_ARRAY, 
    INITIAL_FORM_STATE_ARRAY_SELECT,
    functionApi,
    children,
    ...otherProps}) {
        const [open, setOpen] = useState(false);
        const [msgApi, setMsgApi] = useState({msg:'', status: false, type: 'error', title: 'Éxito'})
      
        const submit = async (values) => {
            try {
                const response = await functionApi(id, values)
                if(response.status === 200){
                    setMsgApi({msg:'Editado existosamente', status: true, type: 'success', title: 'Éxito'})
                }
            } catch (error) {
                let totalMessage = ''
                if(error.errors.length > 1){
                    const message = error.errors.map((element)=> {
                        return element.msg
                    })
                    totalMessage = message;
                    totalMessage = totalMessage.join(',  ');
                    setMsgApi({msg:totalMessage, status: true, type: 'error', title: 'Error'})
                } else {
                    setMsgApi({msg:error.errors[0].msg, status: true, type: 'error', title: 'Error'})
                }
            }
        }

    const handleClose = () => {
        setOpen(false);
        setMsgApi({...msgApi, status: false})
      };

    const handleClickOpen = () => {
        setOpen(true);
    };

    return (
        <>
        <Card {...otherProps}>
            <CardContent>
                {children}
            </CardContent>
            <CardActions>
                <Button variant="outlined" onClick={handleClickOpen}>
                    {action}
                </Button>
            </CardActions>
        </Card>
        <Modal 
            open={open}
            setOpen={setOpen} 
            title={titleModal}
            action={action}
        >
             <ActionFormik
                functionSubmit={submit}
                INITIAL_FORM_STATE={INITIAL_FORM_STATE}
                INITIAL_FORM_STATE_ARRAY={INITIAL_FORM_STATE_ARRAY}
                INITIAL_FORM_STATE_ARRAY_SELECT={INITIAL_FORM_STATE_ARRAY_SELECT}
                FORM_VALIDATION={FORM_VALIDATION}
                >
                    <Button onClick={handleClose}>Cerrar</Button>
                    <Button variant="outlined" color="success" type="submit">
                        Guardar
                    </Button> 
                </ActionFormik>
                <Message 
                    status={msgApi.status} 
                    type={msgApi.type} 
                    title={msgApi.title} 
                    msg={msgApi.msg}
                />
        </Modal>
        </>
    );
}