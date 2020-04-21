import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import { Fab } from '@material-ui/core';
// eslint-disable-next-line import/no-unresolved
import Board from 'react-trello';
import { Add } from '@material-ui/icons';
import { makeStyles } from '@material-ui/core/styles';
import cloneDeep from 'lodash/cloneDeep';
import NavBar from '../../Components/NavBar/NavBar';
import AddJob from './AddJob/AddJob';
import APIService from '../../service/APIService';
import { useToast, ToastConstants, useLoader } from '../../store/context';

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
  const showToast = useToast();
  const showLoader = useLoader();
  const classes = useStyles();
  const history = useHistory();
  const [boardData, setBoardData] = useState(data);
  const [openJobAdd, setOpenJobAdd] = React.useState(false);

  const handleJobAddOpen = () => {
    setOpenJobAdd(true);
  };

  const handleJobAddClose = () => {
    setOpenJobAdd(false);
  };

  const getJobApplications = () => {
    showLoader(true);
    APIService.getJobApplications()
      .then(resp => {
        const appData = resp.data.message;
        const parsedData = parseApplicationData(appData);
        setBoardData(parsedData);
      }).finally(() => showLoader(false));
  };

  useEffect(() => {
    getJobApplications();
  }, []);

  const handleDrag = (id, source, target) => {
    if (source !== target) {
      APIService.updateApplicationStatus(id, target)
        .catch(() => showToast('Error while deleting updating Job application', ToastConstants.ERROR));
    }
  };

  const cardDelete = id => {
    APIService.deleteApplication(id).catch(() => showToast('Error while deleting Job application', ToastConstants.ERROR));
  };

  return (
    <div>
      <NavBar>
        <Board
          data={boardData}
          style={{ backgroundColor: '#fff', height: '95vh' }}
          handleDragEnd={handleDrag}
          onCardDelete={cardDelete}
          onCardClick={cardId => history.push(`/application/${cardId}`)}
        />
      </NavBar>
      <Fab
        color="primary"
        aria-label="Add job"
        className={classes.fab}
        onClick={handleJobAddOpen}
      >
        <Add />
      </Fab>
      <AddJob
        open={openJobAdd}
        onClose={handleJobAddClose}
        onChange={getJobApplications}
      />
    </div>
  );
};


export default Dashboard;
