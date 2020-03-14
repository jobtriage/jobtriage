import React from 'react';
import { Select, InputLabel, FormControl } from '../../import';

const SelectComponent = (props) => {
  const {
    label, onChange, children, required,
  } = props;

  return (
    <FormControl variant="outlined" required={required} style={{ marginTop: '5px', marginBottom: '5px' }}>
      <InputLabel id={label}>
        {label}
      </InputLabel>
      <Select
        labelId={label}
        color="primary"
        variant="outlined"
        onChange={onChange}
        {...props}
      >
        {children}
      </Select>
    </FormControl>
  );
};

export default SelectComponent;
