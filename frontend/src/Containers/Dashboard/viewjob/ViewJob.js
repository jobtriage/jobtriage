import React, { useState, useEffect } from 'react';
import {
  Dialog, DialogContent, DialogTitle, MenuItem,
} from '@material-ui/core';
import { Button, Input, Select } from '../../../Components';
import APIService from '../../../service/APIService';
import './ViewJob.css';


const ViewJob = props => {
  const {
    open, onClose, onChange, jobId,
  } = props;
  const [title, setTitle] = useState('');
  const [company, setCompany] = useState('');
  const [status, setStatus] = useState('');
  const [priority, setPriority] = useState('');

  const [error, setError] = useState('');

  useEffect(() => {
    if (title === '') {
      APIService.getApplicationDetails(jobId)
        .then(resp => {
          const {
            title: respTitle, status: respStatus, priority: respPriority, company: respCompany,
          } = resp.data.message;
          if (title) {
            setTitle(respTitle);
            setStatus(respStatus);
            setCompany(respCompany.name);
            setPriority(respPriority);
          }
        })
        .catch(console.log);
    }
  });

  const handleSubmit = (evt) => {
    evt.preventDefault();
    APIService.updateJobApplication(jobId, title, status, priority, company)
      .then(() => {
        onChange();
        onClose();
        setTitle('');
        setCompany('');
      })
      .catch(() => { setError('Error in adding Job application'); });
  };

  const reset = () => {
    console.log('close');
    setTitle('');
    setCompany('');
    onClose();
  };

  return (
    <Dialog open={open} onClose={reset} aria-labelledby="form-dialog-title" style={{ marginBottom: '10px' }}>
      <DialogTitle id="form-dialog-title">View Job Details</DialogTitle>
      <DialogContent>
        <form className="loginForm" onSubmit={handleSubmit}>
          <Input type="text" label="title" required onChange={e => setTitle(e.target.value)} value={title} />
          <Input type="text" label="company" required onChange={e => setCompany(e.target.value)} value={company} />
          <Select label="status" value={status} required onChange={e => setStatus(e.target.value)}>
            <MenuItem value="yettoapply">Yet to apply</MenuItem>
            <MenuItem value="applied">Applied</MenuItem>
            <MenuItem value="inprogress">In Progress</MenuItem>
            <MenuItem value="accepted">Accepted</MenuItem>
            <MenuItem value="rejected">Rejected</MenuItem>

          </Select>

          <Select label="priority" value={priority} required onChange={e => setPriority(e.target.value)}>
            <MenuItem value={1}>Low</MenuItem>
            <MenuItem value={2}>Medium</MenuItem>
            <MenuItem value={3}>High</MenuItem>
          </Select>
          <Button name="Update" type="submit" style={{ marginTop: '5px', marginBottom: '5px' }} />
          <p className="error">
            {error}
          </p>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default ViewJob;
