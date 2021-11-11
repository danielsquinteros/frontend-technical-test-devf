import React from 'react';
import { TextField, MenuItem } from '@mui/material';
import { useField, useFormikContext } from 'formik';

const SelectWrapper = ({
  content,
  name,
  options,
  ...otherProps
}) => {
  const { setFieldValue } = useFormikContext();
  const [field, meta] = useField(name);

  const handleChange = evt => {
    const { value } = evt.target;
    setFieldValue(name, value);
  };

  const configSelect = {
    ...field,
    ...otherProps,
    select: true,
    variant: 'outlined',
    fullWidth: true,
    onChange: handleChange,
    defaultValue: content,
  };

  if (meta && meta.touched && meta.error) {
    configSelect.error = true;
    configSelect.helperText = meta.error;
  }

  
  const renderOptions = () => {
    const allOptions = options.map(element=> {
      return (
        <MenuItem key={element._id} value={element._id}>
              {element.title && element.title}
              {element.name && element.name}
        </MenuItem>
      )
    })
    return allOptions;
  }

  return (
  
    <TextField {...configSelect}>
      {renderOptions()}
      {/* {Object.keys(options).map((index, item) => {
        return (
          <MenuItem key={index} value={item[_id]}>
               {item[title]}
          </MenuItem>
        )
      })} */}
    </TextField>
  );
};

export default SelectWrapper;