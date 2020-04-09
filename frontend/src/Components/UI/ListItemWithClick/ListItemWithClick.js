import React from 'react';
import { ListItem, ListItemIcon, ListItemText } from '../../../Material-UI/Components';
import { makeStyles } from '../../../Material-UI/import';


const useStyles = makeStyles((theme) => ({
  activeClassName: {
    backgroundColor: theme.palette.activeBg.main,
  },
}));


const ListItemWithLink = (props) => {
  const classes = useStyles();
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
