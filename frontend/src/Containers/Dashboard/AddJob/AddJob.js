import React, { useState } from 'react';
import { makeStyles } from '@material-ui/styles';
import { Dialog, DialogContent, DialogTitle } from '@material-ui/core';
import { Button, ButtonGroup, Input } from '../../../Material-UI/Components';
import { DropDownMenu } from '../../../Components';
import APIService from '../../../service/APIService';
import { useToast, ToastConstants } from '../../../store/context';
import {JOB_APPLICATION_PRIORITY, JOB_APPLICATION_STATUS} from '../../../constants/Constants'

const useStyles = makeStyles(() => ({
  mainCard: {
    minWidth: '290px',
    display: 'flex',
    flexDirection: 'column',
  },
  dialogLabel: {
    marginLeft: '0.5em',
    color: 'gray'
  }
}));

const AddJobDialog = props => {
  const showToast = useToast();
  const classes = useStyles();
  const { open, onClose, onChange } = props;
  const [title, setTitle] = useState('');
  const [company, setCompany] = useState('');
  const [status, setStatus] = useState('');
  const [priority, setPriority] = useState('');
  const [location, setLocation] = useState('');

  const handleSubmit = (evt) => {
    evt.preventDefault();
    APIService.addJobApplication(title, status, priority, company, location)
      .then(() => {
        onChange();
        onClose();
        setTitle('');
        setCompany('');
        setLocation('')
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
          <p className={classes.dialogLabel}> Priority </p>
          <ButtonGroup>
            {JOB_APPLICATION_PRIORITY.map(element => (
              <Button onClick={()=> { setPriority(element.value) }}
                 color={priority === element.value ? 'primary': 'default'}> 
                {element.label} 
              </Button>
              ))
            }
          </ButtonGroup>
          <DropDownMenu label="Status" options={JOB_APPLICATION_STATUS} onChange={e => setStatus(e.target.value)} />
          <Input type="text" label="Location" required onChange={e => setLocation(e.target.value)} value={location} />
          <Button type="submit">Add</Button>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default AddJobDialog;
