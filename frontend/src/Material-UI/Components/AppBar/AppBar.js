import React from 'react';
import { AppBar } from '../../import';

const SimpleAppBar = (props) => {
  const {
    children, color, position, className,
  } = props;
  return (
    <AppBar
      className={className}
      color={color}
      position={position}
    >
      {children}
    </AppBar>
  );
};

export default SimpleAppBar;
