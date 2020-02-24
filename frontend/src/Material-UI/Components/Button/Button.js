import React from 'react';
import { Button } from '../../import';
import './Button.css';


const PrimaryButton = (props) => {
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

export default PrimaryButton