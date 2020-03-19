import React from 'react';
import { NavLink as RouterLink } from 'react-router-dom';
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
    icon, primary, to, exact, textOverrideClass,
  } = props;

  const renderLink = React.useMemo(
    () => React.forwardRef((itemProps, ref) => (
      <RouterLink
        activeClassName={classes.activeClassName}
        to={to}
        ref={ref}
        {...itemProps}
        exact={exact}
      />
    )),
    [to, classes.activeClassName, exact],
  );

  return (
    <li>
      <ListItem button component={renderLink}>
        {icon ? <ListItemIcon>{icon}</ListItemIcon> : null}
        <ListItemText primary={primary} textOverrideClass={textOverrideClass} />
      </ListItem>
    </li>
  );
};

export default ListItemWithLink;
