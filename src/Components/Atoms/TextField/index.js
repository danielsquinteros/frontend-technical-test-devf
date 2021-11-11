import React from 'react'
import { TextField } from '@mui/material'
import { useField } from 'formik';

const TextfieldWrapper = ({name, ...otherProps}) => {

    const [field, meta] = useField(name);

    const configTextField = {
        ...field,
        ...otherProps,
        fullWidth: true,
        variant: 'outlined',
    };
    if(meta && meta.error && meta.touched){
        configTextField.error = true;
        configTextField.helperText = meta.error;
    }

    return (
        <TextField {...configTextField} />
    )
}

export default TextfieldWrapper
