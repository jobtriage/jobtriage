import React, { useEffect, useState } from 'react';
import Board from 'react-trello';
import {
  Fab, Dialog, DialogContent, DialogTitle, MenuItem,
} from '@material-ui/core';
import { Add } from '@material-ui/icons';
import { makeStyles } from '@material-ui/core/styles';
import cloneDeep from 'lodash/cloneDeep';
import { NavBar } from '../../container';
import { Button, Input, Select } from '../../components';
import APIService from '../../service/APIService';
import './Dashboard.css';

const data = {
  lanes: [
    {
      id: 'yettoapply', title: 'Yet to Apply', cards: [], currentPage: 1,
    },
    {
      id: 'applied', title: 'Applied', cards: [], currentPage: 1,
    },
    {
      id: 'inprogress', title: 'In Progress', cards: [], currentPage: 1,
    },
    {
      id: 'accepted', title: 'Accepted', cards: [], currentPage: 1,
    },
    {
      id: 'rejected', title: 'Rejected', cards: [], currentPage: 1,
    },
  ],
};

const useStyles = makeStyles(theme => ({
  fab: {
    position: 'absolute',
    bottom: theme.spacing(2),
    right: theme.spacing(2),
  },
}));

const parseApplicationData = appData => {
  const { lanes } = cloneDeep(data);

  const getLane = status => {
    if (status === 'applied') return lanes[1].cards;
    if (status === 'inprogress') return lanes[2].cards;
    if (status === 'accepted') return lanes[3].cards;
    if (status === 'rejected') return lanes[4].cards;

    return lanes[0].cards;
  };

  const getPriority = priority => {
    if (priority === 1) {
      return 'Low';
    } if (priority === 2) {
      return 'Medium';
    }
    return 'High';
  };

  for (const application of appData) {
    const { status, _id: id, title } = application;
    const { company } = application;
    const priority = getPriority(application.priority);
    getLane(status).push({ id, title, description: company.name, label: priority });
  }

  return { lanes };
};

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
    <Dialog open={open} onClose={onClose} aria-labelledby="form-dialog-title" style={{ marginBottom: '10px' }}>
      <DialogTitle id="form-dialog-title">Add new job</DialogTitle>
      <DialogContent>
        <form className="loginForm" onSubmit={handleSubmit}>
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
          <Button name="Add" type="submit" style={{ marginTop: '5px', marginBottom: '5px' }} />
          <p className="error">
            {error}
          </p>
        </form>
      </DialogContent>
    </Dialog>
  );
};

const Dashboard = () => {
  const classes = useStyles();
  const [boardData, setBoardData] = useState(data);
  const [openDialog, setOpenDialog] = React.useState(false);

  const handleClickOpen = () => {
    setOpenDialog(true);
  };

  const handleClose = () => {
    setOpenDialog(false);
  };

  const getJobApplications = () => {
    APIService.getJobApplications()
      .then(resp => {
        const appData = resp.data.message;
        const parsedData = parseApplicationData(appData);
        setBoardData(parsedData);
      });
  };

  useEffect(() => {
    getJobApplications();
  }, []);

  const handleDrag = (id, source, target) => {
    if (source !== target) {
      APIService.updateApplicationStatus(id, target).then(console.log);
    }
  };

  const cardDelete = id => {
    APIService.deleteApplication(id).then(console.log);
  };

  return (
    <div className="dashboard">
      <NavBar />
      <div className="container">
        <Board
          data={boardData}
          style={{ backgroundColor: '#fff', height: '95vh' }}
          handleDragEnd={handleDrag}
          onCardDelete={cardDelete}
        />
      </div>
      <Fab color="primary" aria-label="Add job" className={classes.fab} onClick={handleClickOpen}>
        <Add />
      </Fab>
      <AddJobDialog open={openDialog} onClose={handleClose} onChange={getJobApplications} />
    </div>
  );
};


export default Dashboard;
