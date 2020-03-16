import React, { useState } from 'react';
import {
    Dialog, DialogContent, DialogTitle, MenuItem,
} from '@material-ui/core';
import {
    Button, Input, Select
} from '../../../Components';
import APIService from '../../../service/APIService';

import styles from './AddJob.module.scss';

const AddJobDialog = props => {
    const { open, onClose, onChange } = props;
    const [title, setTitle] = useState('');
    const [company, setCompany] = useState('');
    const [status, setStatus] = useState('');
    const [priority, setPriority] = useState('');
    const [error, setError] = useState('');

    const handleSubmit = (evt) => {
        evt.preventDefault();
        APIService.addJobApplication(title, status, priority, company)
            .then(() => {
                onChange();
                onClose();
                setTitle('');
                setCompany('');
            })
            .catch(() => { setError('Error in adding Job application'); });
    };

    return (
        <Dialog open={open} onClose={onClose} aria-labelledby="form-dialog-title">
            <DialogTitle style={{ marginLeft: '8px' }} id="form-dialog-title">Add new job</DialogTitle>
            <DialogContent>
                <form className={styles.MainCard} onSubmit={handleSubmit}>
                    <Input type="text" label="title" required onChange={e => setTitle(e.target.value)} value={title} />
                    <Input type="text" label="company" required onChange={e => setCompany(e.target.value)} value={company} />
                    <Select label="status" required onChange={e => setStatus(e.target.value)}>
                        <MenuItem value="yettoapply">Yet to apply</MenuItem>
                        <MenuItem value="applied">Applied</MenuItem>
                        <MenuItem value="inprogress">In Progress</MenuItem>
                        <MenuItem value="accepted">Accepted</MenuItem>
                        <MenuItem value="rejected">Rejected</MenuItem>
                    </Select>

                    <Select label="priority" required onChange={e => setPriority(e.target.value)}>
                        <MenuItem value={1}>Low</MenuItem>
                        <MenuItem value={2}>Medium</MenuItem>
                        <MenuItem value={3}>High</MenuItem>
                    </Select>
                    <Button type="submit">Add</Button>
                    <p className={styles.Error}>
                        {error}
                    </p>
                </form>
            </DialogContent>
        </Dialog>
    );
};

export default AddJobDialog;