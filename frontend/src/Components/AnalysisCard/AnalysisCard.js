import React from 'react';
import { makeStyles } from '@material-ui/styles';
import parse from 'html-react-parser';
import { IconButton } from '@material-ui/core';
import { Delete, Edit } from '@material-ui/icons';

const useStyles = makeStyles(() => ({
  root: {
    width: '100%',
    border: '1px solid #e0e0e0',
    borderRadius: '3px',
    boxShadow: '1px 1px 8px #e0e0e0',
  },
  contentDiv: {
    height: '25vh',
    overflow: 'auto',
  },
  menu: {
    display: 'flex',
    justifyContent: 'flex-end',
  },
}));


const AnalysisCard = props => {
  const classes = useStyles();
  const {
    content, onEdit, onDelete,
  } = props;

  return (
    <div className={`${classes.root} ql-editor`}>
      <div className={classes.contentDiv}>
        {parse(content)}
      </div>
      <div className={classes.menu}>
        {onDelete
          ? (
            <IconButton aria-label="Delete time log" component="span" onClick={onDelete}>
              <Delete color="error" />
            </IconButton>
          )
          : ''}

        <IconButton aria-label="Edit time log" component="span" onClick={onEdit}>
          <Edit color="primary" />
        </IconButton>
      </div>
    </div>
  );
};

export default AnalysisCard;
