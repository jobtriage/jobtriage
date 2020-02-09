import React from 'react';
import Button from '@material-ui/core/Button';
import './Button.css';


export default function PrimaryButton(props) {
  const {
    name, style, onClick, type,
  } = props;

  return (
    <Button
      style={style}
      onClick={onClick}
      className="button"
      color="primary"
      variant="contained"
      type={type}
    >
      {name}
    </Button>
  );
}
