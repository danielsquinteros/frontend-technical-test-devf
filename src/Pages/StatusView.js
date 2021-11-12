import { Typography, Box, Button } from '@mui/material';
import React, {useEffect, useState} from 'react'
import * as Yup from 'yup';

import NavbarView from './NavbarView';

import Card from '../Components/Molecules/Card'
import Modal from '../Components/Molecules/Modal';
import Message from '../Components/Molecules/Message';

import ActionFormik from '../Components/Organisms/ActionFormik';

import  { getStatus, updateStatus, createState } from '../Services/statusService';


const StatusView = () => {
    const [openModal, setOpenModal] = useState(false);
    const [msgApi, setMsgApi] = useState({msg:'', status: false, type: 'error', title: 'Éxito'})

    const submitCreate = async (values) => {
        try {
            const response = await createState(values)
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
        setOpenModal(false)
        setMsgApi({...msgApi, status: false})
      };

    const handleClickOpen = () => {
        setOpenModal(true);
    };
    const [statusAll, setStatusAll] = useState([])

    useEffect(() => {
        const getData = async () => {
            try {
                const data = await getStatus();
                setStatusAll(data)
            } catch (error) {
                console.log(error);
            }
        };
        getData();

    },[statusAll]);

    const allCard = () => {
        const renderCard = statusAll.map((element) => {
            return <Card sx={{mt: 4, mb: 4}} 
            action={'EDITAR'}
            id={element._id} 
            title={element.title} 
            description={element.description} 
            titleModal={element.title}
            INITIAL_FORM_STATE={{title: element.title, description: element.description}}
            INITIAL_FORM_STATE_ARRAY={
                [
                    {
                        name: 'title',
                        content: element.title,
                        label: 'Title'
                    },
                    {
                        name: 'description',
                        content: element.description,
                        label: 'Description'
                    },
                ]
            }
            FORM_VALIDATION={{ title: Yup.string().required('Required'), description: Yup.string().required('Required')}}
            functionApi={updateStatus}
            >
                 <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
                {element._id}
                </Typography>
                <Typography variant="h5" component="div">
                {element.title}
                </Typography>
                <Typography variant="body2">
                {element.description}
                </Typography>
            </Card>
            })
        return renderCard
    }


    return (
        <NavbarView>
            <Box
                sx={{
                display: 'flex',
                justifyContent: 'space-between',
                bgcolor: 'background.paper',
                }}
            >
            <Typography variant="h5" gutterBottom>
                Total de Estados de Casos
            </Typography>
            <Button variant="outlined" color="success" onClick={handleClickOpen}>
                Crear Estado de Caso
            </Button>
            </Box>
            {allCard()}
            <Modal 
                open={openModal}
                title='Tipo de estado'
                action='Crear'
            >
                <ActionFormik
                    functionSubmit={submitCreate}
                    INITIAL_FORM_STATE={{title: '', description: ''}}
                    INITIAL_FORM_STATE_ARRAY={
                        [
                            {
                                name: 'title',
                                label: 'Title'
                            },
                            {
                                name: 'description',
                                label: 'Description'
                            },
                        ]
                    }
                    FORM_VALIDATION={{ 
                        title: Yup.string().required('Required'), 
                        description: Yup.string().required('Required')}}
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
        </NavbarView>
    )
}

export default StatusView;
