import { Typography, Box, Button, Divider } from '@mui/material';
import React, {useEffect, useState} from 'react'
import * as Yup from 'yup';

import NavbarView from './NavbarView';

import Card from '../Components/Molecules/Card'
import Modal from '../Components/Molecules/Modal';
import Message from '../Components/Molecules/Message';

import ActionFormik from '../Components/Organisms/ActionFormik';

import  { getUsers, updateUser, createUser  } from '../Services/userService';


const UsersView = () => {
    const [openModal, setOpenModal] = useState(false);
    const [msgApi, setMsgApi] = useState({msg:'', status: false, type: 'error', title: 'Éxito'})

    const submitCreate = async (values) => {
        try {
            const response = await createUser(values)
            if(response.status === 200){
                setOpenModal(false)
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
    const [dataAll, setDataAll] = useState([])

    useEffect(() => {
        const getData = async () => {
            try {
                const data = await getUsers();
                setDataAll(data)
            } catch (error) {
                console.log(error);
            }
        };
        getData();

    },[dataAll]);

    const allCard = () => {
        const renderCard = dataAll.map((element) => {
            return <Card sx={{mt: 4, mb: 4}} 
            action={'EDITAR'}
            id={element._id} 
            INITIAL_FORM_STATE={{
                name: element.name, 
                email: element.email,
                password: element.password,
                role: element.role,
            }}
            INITIAL_FORM_STATE_ARRAY={
                [
                    {
                        name: 'name',
                        content: element.name,
                        label: 'Name'
                    },
                    {
                        name: 'email',
                        content: element.email,
                        label: 'Email'
                    },
                    {
                        name: 'password',
                        content: element.password,
                        label: 'Password'
                    },
                    {
                        name: 'role',
                        content: element.role,
                        label: 'Role'
                    },
                ]
            }
            FORM_VALIDATION={{ 
                name: Yup.string().required('Required'), 
                email: Yup.string().email('Invalid email.').required('Required'),
                password: Yup.string().required('Required'),
                role: Yup.string().required('Required')
            }}
            functionApi={updateUser}
            >
                <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
                {element._id}
                </Typography>
                <Divider light sx={{mt: 2, mb: 2}}/>
                    <Typography variant="body2"  color="text.secondary" component="div">
                        Nombre de Usuario:
                    </Typography>
                    <Typography variant="body1"  component="div">
                        {element.name}
                    </Typography>
                <Divider light sx={{mt: 2, mb: 2}}/>
                    <Typography variant="body2"  color="text.secondary" component="div">
                        Email del Usuario:
                    </Typography>
                    <Typography variant="body1"  component="div">
                        {element.email}
                    </Typography>
                <Divider light sx={{mt: 2, mb: 2}}/>
                    <Typography variant="body2"  color="text.secondary" component="div">
                        Rol del Usuario:
                    </Typography>
                    <Typography variant="body1"  component="div">
                        {element.role}
                    </Typography>
                <Divider light sx={{mt: 2, mb: 2}}/>
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
                Total de Usuarios
            </Typography>
            <Button variant="outlined" color="success" onClick={handleClickOpen}>
                Crear Usuario
            </Button>
            </Box>
            {allCard()}
            <Modal 
                open={openModal}
                title='Usuario'
                action='Crear:'
            >
                <ActionFormik
                    functionSubmit={submitCreate}
                    INITIAL_FORM_STATE={{
                        name: '', 
                        email: '',
                        password: '', 
                        role: '',
                    }}
                    INITIAL_FORM_STATE_ARRAY={
                        [
                            {
                                name: 'name',
                                label: 'Name'
                            },
                            {
                                name: 'email',
                                label: 'Email'
                            },
                            {
                                name: 'password',
                                label: 'Password'
                            },
                            {
                                name: 'role',
                                label: 'Role'
                            },
                        ]
                    }
                    FORM_VALIDATION={{ 
                        name: Yup.string().required('Required'), 
                        email: Yup.string().email('Invalid email.').required('Required'),
                        password: Yup.string().required('Required'),
                        role: Yup.string().required('Required')
                    }}
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

export default UsersView;
