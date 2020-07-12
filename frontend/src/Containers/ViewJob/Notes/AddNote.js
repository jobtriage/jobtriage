import React, { useState } from 'react';
import { Dialog, DialogContent, DialogTitle } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { Button, Input } from '../../../Material-UI/Components';
import APIService from '../../../service/APIService';

const useStyles = makeStyles(theme => ({
  error: {
    color: theme.palette.error.main,
  },
  form: {
    minWidth: '400px',
    display: 'flex',
    flexDirection: 'column',
  },
}));

const NoteDialog = props => {
  const classes = useStyles();

  const {
    open, onClose, onChange, applicationId, isNew, title: titleOld, content: contentOld, id, label,
  } = props;
  const [title, setTitle] = useState(isNew ? '' : titleOld);
  const [content, setContent] = useState(isNew ? '' : contentOld);
  const [error, setError] = useState('');

  const handleSubmit = (evt) => {
    evt.preventDefault();
    if (isNew) {
      APIService.addNotes(applicationId, title, content).then(onChange).catch(() => setError('Error in adding notes'));
    } else {
      APIService.updateNote(applicationId, id, title, content).then(onChange).catch(() => setError('Error in adding notes'));
    }
  };

  return (
    <Dialog open={open} onClose={onClose} aria-labelledby="form-dialog-title">
      <DialogTitle style={{ marginLeft: '8px' }} id="form-dialog-title">{label}</DialogTitle>
      <DialogContent>
        <form className={classes.form} onSubmit={handleSubmit}>
          <Input type="text" label="Title" required onChange={e => setTitle(e.target.value)} value={title} />
          <Input type="text" label="Content" multiline rows="6" required onChange={e => setContent(e.target.value)} value={content} />
          <Button type="submit">{isNew ? 'Add' : 'Update'}</Button>
          <p className={classes.error}>
            {error}
          </p>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default NoteDialog;
