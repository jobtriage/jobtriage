import React from 'react';
import { ListItemIcon, makeStyles } from '../../../../import';

const useStyles = makeStyles(() => ({
  root: {
    minWidth: '35px',
  },
}));

const ListItemIconWrapper = (props) => {
  const classes = useStyles();
  const { children } = props;
  return (
    <ListItemIcon className={classes.root}>{children}</ListItemIcon>
  );
};

export default ListItemIconWrapper;
