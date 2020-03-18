import React from 'react';
import { TextField, makeStyles } from '../../import';

const useStyles = makeStyles(theme => ({
  root: {
    margin: theme.spacing(1),
  },
}));
const Input = (props) => {
  const classes = useStyles();

  return (
    <TextField
      className={classes.root}
      {...props}
      color="primary"
      variant="outlined"
    />
  );
};

export default Input;
