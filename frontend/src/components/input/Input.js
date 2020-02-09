import React from 'react';
import TextField from '@material-ui/core/TextField';

export default function Input(props) {
  return (
    <TextField
      {...props}
      color="primary"
      variant="outlined"
      style={{ marginTop: '5px', marginBottom: '5px' }}
    />
  );
}
