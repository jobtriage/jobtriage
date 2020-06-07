import React from 'react';
import { LinearProgress } from '@material-ui/core';
import { makeStyles } from '@material-ui/styles';

const useStyles = makeStyles(() => ({
    progress: {
      position: 'fixed',
      width: '100%',
      zIndex: '10',
    },
  }));

const LinearProgressWrapper = props => {
    const classes = useStyles();
    const { color } = props;
    return (
        <div>
            <LinearProgress color={color || "primary"} className={classes.progress} />
        </div>
    )
};

export default LinearProgressWrapper;