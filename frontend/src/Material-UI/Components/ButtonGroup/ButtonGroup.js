import React from 'react';
import { ButtonGroup, makeStyles } from '../../import';

const useStyles = makeStyles(theme => ({
  root: {
    margin: theme.spacing(1),
    letterSpacing: theme.spacing(0.12),
  },
}));

const PrimaryButtonGroup = (props) => {
  const classes = useStyles();

  const {
    children, disabled, color, fullWidth, size, variant,
  } = props;

  return (
    <ButtonGroup
      classes={classes}
      disabled={disabled}
      color={color || 'primary'}
      fullWidth={fullWidth}
      size={size || 'large'}
      variant={variant || 'outlined'}
      aria-label="large outlined primary button group"
    >
      {children}
    </ButtonGroup>
  );
};

export default PrimaryButtonGroup;
