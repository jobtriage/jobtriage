import React from 'react';
import { ListItem } from '../../../import';

const ListItemWrapper = (props) => {
  const {
    children, component, button,
  } = props;
  return (
    <ListItem button={button} component={component}>
      {children}
    </ListItem>
  );
};

export default ListItemWrapper;
