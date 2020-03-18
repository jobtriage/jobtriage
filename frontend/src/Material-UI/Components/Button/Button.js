import React from 'react';
import { Button, makeStyles } from '../../import';

const useStyles = makeStyles(theme => ({
  root: {
    margin: theme.spacing(1),
    letterSpacing: theme.spacing(0.12),
  },
}));

const PrimaryButton = (props) => {
  const classes = useStyles();

  const {
    children, style, onClick, type, color, fullWidth, size,
  } = props;

  return (
    <Button
      style={style}
      onClick={onClick}
      className={classes.root}
      color={color || 'primary'}
      variant="contained"
      type={type}
      fullWidth={fullWidth}
      size={size}
    >
      {children}
    </Button>
  );
};

export default PrimaryButton;
