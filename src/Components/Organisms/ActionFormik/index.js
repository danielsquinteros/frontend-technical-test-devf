import React from 'react'
import * as Yup from 'yup';
import { Formik, Form } from 'formik';
import DialogActions from '@mui/material/DialogActions';
import { Box } from '@mui/material';

import TextField from '../../Atoms/TextField';
import DataTimePicker from '../../Atoms/DataTimePicker';
import Select from '../../Atoms/Select';

const index = (
    {    
        INITIAL_FORM_STATE,
        FORM_VALIDATION,
        INITIAL_FORM_STATE_ARRAY,
        INITIAL_FORM_STATE_ARRAY_SELECT, 
        INITIAL_FORM_STATE_ARRAY_DATAPICKER, 
        functionSubmit, 
        children
    }) => {

    const WRAPPER_FORM_VALIDATION = Yup.object().shape({
        ...FORM_VALIDATION
    })
    const AllTextFields = () => {
        const TextFields =   INITIAL_FORM_STATE_ARRAY.map(element => {
           return  (<TextField 
                    name={element.name}
                    label={element.label}
                    sx={{ mt: 1, mb: 1 }}
                    />
           )
        })
        return TextFields
    }
    const AllSelects = () => {
        const Selects =   INITIAL_FORM_STATE_ARRAY_SELECT.map(element => {
           return  (<Select 
                    content={element.content}
                    name={element.name}
                    label={element.label}
                    options={element.options}
                    sx={{ mt: 1, mb: 1 }}
                    />
           )
        })
        return Selects
    }
    const AllDataTimePicker = () => {
        const Selects =   INITIAL_FORM_STATE_ARRAY_DATAPICKER.map(element => {
           return  (<DataTimePicker 
                    name={element.name}
                    label={element.label}
                    sx={{ mt: 1, mb: 1 }}
                    />
           )
        })
        return Selects
    }
    return (
        <Formik
        initialValues={{
            ...INITIAL_FORM_STATE
        }}
        validationSchema={ WRAPPER_FORM_VALIDATION}
        onSubmit={functionSubmit}
        >
        <Box component={Form}  sx={{ mt: 5 }}>
            {AllTextFields()}
            {AllSelects()}
            {AllDataTimePicker()}
            <DialogActions>
                {children}
            </DialogActions>
        </Box>
        </Formik>
    )
}

index.defaultProps = {
    INITIAL_FORM_STATE_ARRAY: [],
    INITIAL_FORM_STATE_ARRAY_SELECT: [],
    INITIAL_FORM_STATE_ARRAY_DATAPICKER: [], 
}

export default index


