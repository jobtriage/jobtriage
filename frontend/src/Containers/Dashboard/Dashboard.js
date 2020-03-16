import React, { useEffect, useState } from 'react';
// eslint-disable-next-line import/no-unresolved
import {
  Fab
} from '@material-ui/core';
import Board from 'react-trello';
import { Add } from '@material-ui/icons';
import { makeStyles } from '@material-ui/core/styles';
import cloneDeep from 'lodash/cloneDeep';
import {
  NavBar,
} from '../../Components';
import AddJob from './AddJob/AddJob';
import ViewJob from './viewjob/ViewJob';
import APIService from '../../service/APIService';

import styles from './Dashboard.module.scss';


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
    position: 'fixed',
    bottom: theme.spacing(2),
    right: theme.spacing(2),
  },
}));

const getPriority = priority => {
  let status = 'High';
  if (priority === 1) {
    status = 'Low';
  } if (priority === 2) {
    status = 'Medium';
  }
  return status;
};

const getLane = (lanes, status) => {
  let { cards } = lanes[0];
  if (status === 'applied') cards = lanes[1].cards;
  if (status === 'inprogress') cards = lanes[2].cards;
  if (status === 'accepted') cards = lanes[3].cards;
  if (status === 'rejected') cards = lanes[4].cards;

  return cards;
};

const parseApplicationData = appData => {
  const { lanes } = cloneDeep(data);

  for (const application of appData) {
    const { status, _id: id, title } = application;
    const { company } = application;
    const priority = getPriority(application.priority);
    getLane(lanes, status).push({
      id, title, description: company.name, label: priority,
    });
  }

  return { lanes };
};



const Dashboard = () => {
  const classes = useStyles();
  const [boardData, setBoardData] = useState(data);
  const [openJobAdd, setOpenJobAdd] = React.useState(false);
  const [openJobView, setOpenJobView] = React.useState(false);
  const [selectedJob, setSelectedJob] = React.useState('');

  const handleJobAddOpen = () => {
    setOpenJobAdd(true);
  };

  const handleJobAddClose = () => {
    setOpenJobAdd(false);
  };

  const handleJobViewOpen = (cardId) => {
    setOpenJobView(true);
    setSelectedJob(cardId);
  };

  const handleJobViewClose = () => {
    setOpenJobView(false);
    setSelectedJob('');
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
    <div className={styles.Dashboard}>
      <NavBar />
      <div className={styles.Container}>
        <Board
          data={boardData}
          style={{ backgroundColor: '#fff', height: '95vh' }}
          handleDragEnd={handleDrag}
          onCardDelete={cardDelete}
          onCardClick={(cardId) => handleJobViewOpen(cardId)}
        />
      </div>
      <Fab color="primary"
        aria-label="Add job"
        className={classes.fab}
        onClick={handleJobAddOpen}>
        <Add />
      </Fab>
      <AddJob
        open={openJobAdd}
        onClose={handleJobAddClose}
        onChange={getJobApplications}
      />
      <ViewJob
        open={openJobView}
        onClose={handleJobViewClose}
        onChange={getJobApplications}
        jobId={selectedJob}
      />
    </div>
  );
};


export default Dashboard;
