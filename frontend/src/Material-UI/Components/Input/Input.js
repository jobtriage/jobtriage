import React from 'react';
import { TextField } from '../../import';

const Input = (props) => {
  return (
    <TextField
      {...props}
      color="primary"
      variant="outlined"
      style={{ marginTop: '5px', marginBottom: '5px' }}
    />
  );
};

export default Input;
