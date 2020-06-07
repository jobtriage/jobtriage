import React from 'react';
import { CircularProgress } from '@material-ui/core';
import { makeStyles } from '@material-ui/styles';

const useStyles = makeStyles(() => ({
    progress: {
      marginLeft: '30%',
      zIndex: '10',
    },
  }));

const CircularProgressWrapper = () => {
    const classes = useStyles();
    return (
        <div>
            <CircularProgress color="primary" className={classes.progress}  size={300} thickness={2}/>
        </div>
    );
};

export default CircularProgressWrapper;