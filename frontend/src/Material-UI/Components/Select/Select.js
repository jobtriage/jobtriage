import React from 'react';
import {
  Select, InputLabel, FormControl, makeStyles,
} from '../../import';

const useStyles = makeStyles(theme => ({
  root: {
    margin: theme.spacing(1),
  },
}));

const SelectComponent = (props) => {
  const classes = useStyles();

  const {
    label, onChange, children, required,
  } = props;

  return (
    <FormControl variant="outlined" required={required} className={classes.root}>
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
