import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import { Fab } from '@material-ui/core';
// eslint-disable-next-line import/no-unresolved
import Board from 'react-trello';
import { Add, VerticalAlignCenterOutlined } from '@material-ui/icons';
import { makeStyles } from '@material-ui/core/styles';
import cloneDeep from 'lodash/cloneDeep';
import { Typography, HorizontalLoader } from '../../Components';
import AddJob from './AddJob/AddJob';
import APIService from '../../service/APIService';
import { useToast, ToastConstants, useLoader } from '../../store/context';
import { JOB_APPLICATION_PRIORITY, JOB_APPLICATION_STATUS } from '../../constants/Constants'

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
  return JOB_APPLICATION_PRIORITY.find(obj => obj.value == priority).label;
};

const getLane = (lanes, status) => {
  return lanes.find(lane => lane.id == status).cards;
};

const parseApplicationData = appData => {
  const { lanes } = cloneDeep(data);

  for (const application of appData) {
    const { status, id, title } = application;
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
  const [applicationsData, setApplicationsData] = React.useState();
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
        const appData = resp.data;
        setApplicationsData(appData);
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

  const isEmptyBoard = () => {
    return applicationsData.length == 0
  };

  return (
    <div>
    { applicationsData ? 
      <div>
        <Typography color="primary" variant="h5">
          Dashboard
        </Typography>
          {isEmptyBoard() && (
              <Typography style={{marginTop: '20%', textAlign: 'center' , VerticalAlignCenterOutlined}}> Your dashboard is empty!! <br/> Hope you are doing well !! <br/> Add a new application to get started!! </Typography>
            )
          }

          {!isEmptyBoard() && (
            <Board
            data={boardData}
            style={{ backgroundColor: '#fff', height: 'auto' }}
            handleDragEnd={handleDrag}
            onCardDelete={cardDelete}
            onCardClick={cardId => history.push(`/application/${cardId}`)}
            laneStyle={{ backgroundColor: '#d9c8f5' }}
            cardStyle={{ backgroundColor: '#ffe' }}
          />
          )}
          
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
    : <HorizontalLoader />
  };
  </div>
  );
};


export default Dashboard;
