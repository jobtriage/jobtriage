import React, { useState } from 'react';
import { makeStyles } from '@material-ui/styles';
import { Dialog, DialogContent, DialogTitle } from '@material-ui/core';
import { Button, Input } from '../../../Material-UI/Components';
import { StatusMenu, PriorityMenu } from '../../../Components';
import APIService from '../../../service/APIService';
import { useToast, ToastConstants } from '../../../store/context';


const useStyles = makeStyles(() => ({
  mainCard: {
    minWidth: '290px',
    display: 'flex',
    flexDirection: 'column',
  },
}));

const AddJobDialog = props => {
  const showToast = useToast();
  const classes = useStyles();
  const { open, onClose, onChange } = props;
  const [title, setTitle] = useState('');
  const [company, setCompany] = useState('');
  const [status, setStatus] = useState('');
  const [priority, setPriority] = useState('');

  const handleSubmit = (evt) => {
    evt.preventDefault();
    APIService.addJobApplication(title, status, priority, company)
      .then(() => {
        onChange();
        onClose();
        setTitle('');
        setCompany('');
        showToast('Job Application added successfully', ToastConstants.SUCCESS);
      })
      .catch(() => { showToast('Error in adding Job Application', ToastConstants.ERROR); });
  };

  return (
    <Dialog open={open} onClose={onClose} aria-labelledby="form-dialog-title">
      <DialogTitle style={{ marginLeft: '8px' }} id="form-dialog-title">Add new Job Application</DialogTitle>
      <DialogContent>
        <form className={classes.mainCard} onSubmit={handleSubmit}>
          <Input type="text" label="Title" required onChange={e => setTitle(e.target.value)} value={title} />
          <Input type="text" label="Company" required onChange={e => setCompany(e.target.value)} value={company} />
          <PriorityMenu onChange={e => setPriority(e.target.value)} />
          <StatusMenu onChange={e => setStatus(e.target.value)} />
          <Button type="submit">Add</Button>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default AddJobDialog;
