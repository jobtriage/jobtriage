import React from 'react';
import { List } from '../../import';

const ListWithItems = (props) => {
  const { children, component } = props;

  return (
    <List component={component}>
      {children}
    </List>
  );
};

export default ListWithItems;
