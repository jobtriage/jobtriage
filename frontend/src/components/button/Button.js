import React from 'react';
import Button from '@material-ui/core/Button';
import './Button.css';


export default function PrimaryButton(props) {
  const {
    name, style, onClick, type, color,
  } = props;

  return (
    <Button
      style={style}
      onClick={onClick}
      className="button"
      color={color || 'primary'}
      variant="contained"
      type={type}
    >
      {name}
    </Button>
  );
}
