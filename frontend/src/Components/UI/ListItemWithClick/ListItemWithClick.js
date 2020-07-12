import React from 'react';
import { ListItem, ListItemIcon, ListItemText } from '../../../Material-UI/Components';

const ListItemWithLink = (props) => {
  const {
    icon, primary, textOverrideClass, onClick,
  } = props;

  return (
    <li onClick={onClick} role="presentation">
      <ListItem button>
        {icon ? <ListItemIcon>{icon}</ListItemIcon> : null}
        <ListItemText primary={primary} textOverrideClass={textOverrideClass} />
      </ListItem>
    </li>
  );
};

export default ListItemWithLink;
