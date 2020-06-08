import React from 'react';
import { CircularProgress } from '@material-ui/core';
import { makeStyles } from '@material-ui/styles';

const useStyles = makeStyles(() => ({
    progress: {
      marginLeft: '30%',
      zIndex: '10',
    },
  }));

const CircularProgressWrapper = props => {
    const classes = useStyles();
    const { color, size, thickness } = props;
    return (
        <div>
            <CircularProgress color={color || "primary"} className={classes.progress}  size={size || 300} thickness={thickness || 2}/>
        </div>
    );
};

export default CircularProgressWrapper;