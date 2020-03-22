import React, { useState } from 'react';
import { Dialog, DialogContent, DialogTitle } from '@material-ui/core';
import { Button, Input } from '../../../Material-UI/Components';
import { StatusMenu, PriorityMenu } from '../../../Components';
import APIService from '../../../service/APIService';
import { useToast, ToastConstants } from '../../../store/context';

import styles from './AddJob.module.scss';

const AddJobDialog = props => {
  const showToast = useToast();
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
        showToast('Job application added successfully', ToastConstants.SUCCESS);
      })
      .catch(() => { showToast('Error in adding Job application', ToastConstants.ERROR); });
  };

  return (
    <Dialog open={open} onClose={onClose} aria-labelledby="form-dialog-title">
      <DialogTitle style={{ marginLeft: '8px' }} id="form-dialog-title">Add new job</DialogTitle>
      <DialogContent>
        <form className={styles.MainCard} onSubmit={handleSubmit}>
          <Input type="text" label="title" required onChange={e => setTitle(e.target.value)} value={title} />
          <Input type="text" label="company" required onChange={e => setCompany(e.target.value)} value={company} />
          <PriorityMenu onChange={e => setPriority(e.target.value)} />
          <StatusMenu onChange={e => setStatus(e.target.value)} />
          <Button type="submit">Add</Button>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default AddJobDialog;
