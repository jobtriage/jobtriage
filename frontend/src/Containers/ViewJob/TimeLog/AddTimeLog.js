import React, { useState } from 'react';
import {
  Dialog, DialogContent, DialogTitle, MenuItem,
} from '@material-ui/core';
import { DateTimePicker } from '@material-ui/pickers';
import { makeStyles } from '@material-ui/core/styles';
import { Button, Input, Select } from '../../../Material-UI/Components';
import APIService from '../../../service/APIService';
import { DropDownMenu } from '../../../Components';
import { TIMELOG_TYPES } from '../../../constants/Constants';

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

const TimeDialog = props => {
  const classes = useStyles();

  const {
    open, onClose, onChange, applicationId, isNew, time: timeO, note: noteO, type: typeO, timeLogId,
  } = props;
  const [type, setType] = useState(isNew ? '' : typeO);
  const [note, setNote] = useState(isNew ? '' : noteO);
  const formatedTime = isNew ? new Date() : new Date(timeO);
  const [time, setTime] = useState(formatedTime);
  const [error, setError] = useState('');

  const handleSubmit = (evt) => {
    evt.preventDefault();
    if (isNew) {
      APIService.addTimeLog(applicationId, type, time, note)
        .then(onChange)
        .catch(() => setError('Error in adding time logs'));
    } else {
      APIService.updateTimeLog(applicationId, timeLogId, type, time, note)
        .then(onChange)
        .catch(() => setError('Error in updating time logs'));
    }
  };

  return (
    <Dialog open={open} onClose={onClose} aria-labelledby="Add time log">
      <DialogTitle style={{ marginLeft: '8px' }} id="add-title">Add Time log</DialogTitle>
      <DialogContent>
        <form className={classes.form} onSubmit={handleSubmit}>
          
          <DropDownMenu 
            label="Type" 
            value={type} 
            onChange={e => setType(e.target.value)} 
            options={TIMELOG_TYPES} 
          />
          <DateTimePicker
            style={{ margin: '8px' }}
            label="Event time"
            inputVariant="outlined"
            variant="inline"
            value={time}
            onChange={setTime}
          />
          <Input
            type="text"
            label="Note"
            multiline
            rows="6"
            onChange={e => setNote(e.target.value)}
            value={note}
          />
          <Button type="submit">{isNew ? 'Add' : 'Update'}</Button>
          <p className={classes.error}>
            {error}
          </p>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default TimeDialog;
