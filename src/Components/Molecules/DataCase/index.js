import React,{useState} from 'react';
import Typography from '@mui/material/Typography';
import { 
    Box, 
    Stack, 
    Chip, 
    Divider, 
    ListItem, 
    ListItemAvatar, 
    Avatar, 
    ListItemText, 
    IconButton, 
    DialogActions, 
    DialogContent,
    Button
} from '@mui/material';
import  { format, formatDistance } from 'date-fns';

import DeleteIcon from '@mui/icons-material/Delete';
import Message from '../Message'
import Modal from '../Modal'

import logo  from '../../../assets/images/logo_devf.png';

import  { deteleCase } from '../../../Services/casesService';

export default function BasicCard({id, type, statusName, title,description, nameStudent, careerStudent, nameMemberTeam, created, started}){
    const [msgApi, setMsgApi] = useState({msg:'', status: false, type: 'error', title: 'Éxito'})
    const [openDelete, setOpenDelete] = useState(false);
    const dateNow = new Date();
    const createdCase = new Date(created);
    const startedCase = new Date(started);

    const actionDeleteCase = async () => {
        try {
            const response = await deteleCase(id)
            if(response.status === 200){
                setOpenDelete(false);
            }
        } catch (error) {
            setMsgApi({msg:error.msg, status: true, type: 'error', title: 'Error'})
        }
    }

    const handleCloseDelete = () => {
        setOpenDelete(false);
        setMsgApi({...msgApi, status: false})
      };

    const handleClickOpenDelete = () => {
        setOpenDelete(true);
    };

    
    
    return(
        <>
        <Box sx={{display:'flex',justifyContent:'space-between',alignItems:'center' }}>
                    <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
                    {id}
                    </Typography>
                    <IconButton aria-label="delete" onClick={()=>{handleClickOpenDelete()}}>
                        <DeleteIcon />
                    </IconButton>
                </Box>
                <Divider light sx={{mt: 2, mb: 2}}/>
                <Typography variant="body2"  color="text.secondary" component="div">
                Tipo de Caso:
                </Typography>
                <Typography variant="body1"  component="div">
               {type}
                </Typography>
                <Divider light sx={{mt: 2, mb: 2}}/>

                <Stack direction="row" spacing={1} sx={{mt:1}}>
                    { statusName === 'Sin empezar' ? <Chip label={statusName} color="error" variant="outlined"/> : '' }
                    { statusName === 'En proceso' ? <Chip label={statusName} color="warning" variant="outlined"/> : '' }
                    { statusName === 'Terminado' ? <Chip label={statusName} color="success" variant="outlined"/> : '' }
                    { statusName === 'Sin respuesta' ? <Chip label={statusName} color="error" variant="outlined"/> : '' }
                </Stack>
                <Divider light sx={{mt: 2, mb: 2}}/>
                <Typography variant="h5" component="div">
                {title}
                </Typography>
                <Typography variant="body2">
                {description}
                </Typography>
                <Divider light sx={{mt: 2, mb: 2}}/>
                <ListItem>
                  <ListItemAvatar>
                    <Avatar>
                    </Avatar>
                  </ListItemAvatar>
                  <ListItemText
                    primary={nameStudent}
                    secondary={careerStudent}
                  />
                </ListItem>
                <ListItem>
                  <ListItemAvatar>
                    <Avatar alt="Logo DEVF" src={logo}>
                    </Avatar>
                  </ListItemAvatar>
                  <ListItemText
                    primary={nameMemberTeam}
                    secondary='Miembro del Equipo'
                  />
                </ListItem>
                <Divider light sx={{mt: 2, mb: 2}}/>
                <Box sx={{display:'flex',justifyContent:'flex-start',alignItems:'center' }}>
                    <Box>
                        <Typography variant="body2"  color="text.secondary" component="div">
                        Creado el:
                        </Typography>
                        <Typography variant="body1"  component="div">
                        {format(createdCase, "dd/MM/yyyy")}
                        </Typography>
                    </Box>
                    <Box sx={{ml:4}}>
                        <Typography variant="body2"  color="text.secondary" component="div">
                        Empieza el:
                        </Typography>
                        <Typography variant="body1"  component="div">
                            {format(startedCase, "dd/MM/yyyy")}
                        </Typography>
                    </Box>
                    <Box sx={{ml:4}}>
                        <Typography variant="body2"  color="text.secondary" component="div">
                        Tiempo para empezar: 
                        </Typography>
                        <Typography variant="body1"  component="div">
                            {formatDistance(startedCase,dateNow, {addSuffix: true})}
                        </Typography>
                    </Box>
                </Box>
                <Divider light sx={{mt: 2, mb: 2}}/>
                <Modal
                    open={openDelete}
                    setOpen={setOpenDelete} 
                >
                <DialogContent>
                    <Typography variant="h5" component="div" color="text.secondary">
                    Borrar caso:
                    </Typography>
                    <Typography variant="h5" component="div" >
                    {id}
                    </Typography>
                    <Divider light sx={{mt: 2, mb: 2}}/>
                    <Typography variant="h5" component="div">
                    {title}
                    </Typography>
                    <Typography variant="body2">
                    {description}
                    </Typography>
                    <Divider light sx={{mt: 2, mb: 2}}/>
                    <ListItem>
                    <ListItemAvatar>
                        <Avatar>
                        </Avatar>
                    </ListItemAvatar>
                    <ListItemText
                        primary={nameStudent}
                        secondary={careerStudent}
                    />
                    </ListItem>
                    <ListItem>
                    <ListItemAvatar>
                        <Avatar>
                        </Avatar>
                    </ListItemAvatar>
                    <ListItemText
                        primary={nameMemberTeam}
                        secondary='Miembro del Equipo'
                    />
                    </ListItem>
                    <Divider light sx={{mt: 2, mb: 2}}/>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleCloseDelete}>Cerrar</Button>
                    <Button variant="outlined" color="error" onClick={actionDeleteCase}>
                        BORRAR
                    </Button>  
                </DialogActions>
                <Message 
                status={msgApi.status} 
                type={msgApi.type} 
                title={msgApi.title} 
                msg={msgApi.msg}
                />
            </Modal>
        </>
    )

}