import { Typography, Box, Button } from '@mui/material';
import React, {useEffect, useState} from 'react'
import * as Yup from 'yup';

import NavbarView from './NavbarView';

import Card from '../Components/Molecules/Card'
import Modal from '../Components/Molecules/Modal';
import Message from '../Components/Molecules/Message';
import DataCase from '../Components/Molecules/DataCase';

import ActionFormik from '../Components/Organisms/ActionFormik';

import  { getCases, updateCase, createCase } from '../Services/casesService';
import  { getStatus } from '../Services/statusService';
import  { getTypes } from '../Services/typesService';
import  { getUsers } from '../Services/userService';
import  dataUser from '../Services/dataUser';

const CaseView = () => {
    const [openModal, setOpenModal] = useState(false);
    const [msgApi, setMsgApi] = useState({msg:'', status: false, type: 'error', title: 'Éxito'})
    const [dataAll, setDataAll] = useState([])
    const [userAll, setUserAll] = useState([])
    const [typesAll, setTypesAll] = useState([])
    const [statusAll, setStatusAll] = useState([])

    const submitCreate = async (values) => {
        try {
            const response = await createCase(values)
            if(response.status === 200){
                setOpenModal(false)
                setMsgApi({msg:'Creado existosamente', status: true, type: 'success', title: 'Éxito'})
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

    useEffect(() => {
        const getData = async () => {
            try {
                const dataCases = await getCases();
                setDataAll(dataCases)

            } catch (error) {
                console.log(error);
            }
        };
        getData();

    },[dataAll]);

    useEffect(() => {
        const getAll = async () => {
            try {
                const dataUser = await getUsers();
                const dataStatus = await getStatus();
                const dataTypes = await getTypes();
                setUserAll(dataUser)
                setStatusAll(dataStatus)
                setTypesAll(dataTypes)

            } catch (error) {
                console.log(error);
            }
        };
        getAll();

    },[]);


    const allCard = () => {
        const renderCard = dataAll.map((element) => {
            return <Card 
            sx={{mt: 4, mb: 4, boxShadow: 2, }} 
            id={element._id}
            action={'EDITAR'}
            functionApi={updateCase}
            INITIAL_FORM_STATE={{
                title: element.title, 
                description: element.description,
                type: element.type._id, 
                user: element.user._id,
                state: element.state._id, 
                student: element.student, 
            }}
            INITIAL_FORM_STATE_ARRAY={
                [
                    {
                        name: 'title',
                        content: element.title,
                        label: 'Nombre del Caso'
                    },
                    {
                        name: 'description',
                        content: element.description,
                        label: 'Descripción del Caso'
                    },
                ]
            }
            INITIAL_FORM_STATE_ARRAY_SELECT={
                [
                    {
                        name: 'user',
                        content: element.user._id,
                        label: 'Miembro del Equipo',
                        options:userAll
                    },
                    {
                        name: 'state',
                        content: element.state._id,
                        label: 'Estado del Caso',
                        options:statusAll
                    },
                    {
                        name: 'type',
                        content: element.type._id,
                        label: 'Tipo de Caso',
                        options: typesAll
                    },
                ]

            }
            FORM_VALIDATION={{ 
                title: Yup.string().required('Required'), 
                description: Yup.string().required('Required')
            }}

            >
                <DataCase  
                    id={element._id}
                    nameStudent={element.student}
                    type={element.type.title}
                    statusName={element.state.title}
                    title={element.title}
                    description={element.description}
                    careerStudent='Alumno'
                    nameMemberTeam={element.user.name}
                    created={element.created_at}
                    started={element.date_started}
                />

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
                Total de casos
            </Typography>
            <Button variant="outlined" color="success" onClick={handleClickOpen}>
                Crear caso
            </Button>
            </Box>
            {allCard()}
            <Modal 
                open={openModal}
                title='Caso'
                action='Crear'
            >
                <ActionFormik
                    functionSubmit={submitCreate}
                    INITIAL_FORM_STATE={{
                        title: '', 
                        description: '',
                        user: '',
                        state: '',
                        type: '',
                        student: '',
                        date_started: '',

                    }}
                    INITIAL_FORM_STATE_ARRAY={
                        [
                            {
                                name: 'title',
                                label: 'Nombre del Caso'
                            },
                            {
                                name: 'description',
                                label: 'Descripción del Caso'
                            },
                        ]
                    }
                    INITIAL_FORM_STATE_ARRAY_SELECT={
                        [
                            {
                                name: 'user',
                                label: 'Miembro del Equipo',
                                options:userAll
                            },
                            {
                                name: 'state',
                                label: 'Estado del Caso',
                                options:statusAll
                            },
                            {
                                name: 'type',
                                label: 'Tipos de Caso',
                                options:typesAll
                            },
                            {
                                name: 'student',
                                label: 'Estudiante',
                                options:dataUser
                            },
                        ]
                    }
                    INITIAL_FORM_STATE_ARRAY_DATAPICKER={
                        [
                            {
                                name: 'date_started',
                                label: 'Fecha de comienzo'
                            }
                        ]
                    }
                    FORM_VALIDATION={{ 
                        title: Yup.string().required('Required'), 
                        description: Yup.string().required('Required'),
                        user: Yup.string().required('Required'), 
                        type: Yup.string().required('Required'), 
                        state: Yup.string().required('Required'),
                        student: Yup.string().required('Required'), 
                        date_started: Yup.date().required('Required'),
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

export default CaseView;
