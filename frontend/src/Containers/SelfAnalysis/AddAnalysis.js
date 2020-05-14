import React, { useState } from 'react';
import { Dialog, DialogContent } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { Input } from '../../Material-UI/Components';
import APIService from '../../service/APIService';
import TextEditor from '../../Components/TextEditor/TextEditor';

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

const AnalysisDialog = props => {
  const classes = useStyles();

  const {
    open, onClose, onChange, isNew, title: titleOld, content: contentOld, analysisId,
  } = props;
  const [title, setTitle] = useState(isNew ? '' : titleOld);
  const [content, setContent] = useState(isNew ? '' : contentOld);
  const [error, setError] = useState('');

  const handleSubmit = (contentNew) => {
    setContent(contentNew);
    if (isNew) {
      APIService.addAnalysis(title, contentNew).then(onChange).catch(() => setError('Error in adding Analysis'));
    } else {
      APIService.updateAnalysis(analysisId, title, contentNew).then(onChange).catch(() => setError('Error in updating Analysis'));
    }
  };

  return (
    <Dialog open={open} onClose={onClose} aria-labelledby="Add Analysis form">
      <DialogContent>
        <div className={classes.form}>
          <Input type="text" label="Title" required onChange={e => setTitle(e.target.value)} value={title} />
          <TextEditor content={content} onUpdate={handleSubmit} onCancel={onClose} />
        </div>
        <p className={classes.error}>
          {error}
        </p>
      </DialogContent>
    </Dialog>
  );
};

export default AnalysisDialog;
