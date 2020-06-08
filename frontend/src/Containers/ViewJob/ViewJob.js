import React, { useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Tab, Tabs } from '@material-ui/core';
import { NavLink } from 'react-router-dom';
import APIService from '../../service/APIService';
import { NavBar, Typography, HorizontalLoader } from '../../Components';
import BasicDetails from './BasicDetails';
import Notes from './Notes/Notes';
import TimeLog from './TimeLog/TimeLog';

const useStyles = makeStyles(theme => ({
  root: {
    display: 'flex',
    flexGrow: 2,
    width: '100%',
    flexWrap: 'wrap',
  },
  basicDetail: {
    display: 'flex',
    flexDirection: 'column',
  },
  underLine: {
    borderBottom: `2px solid ${theme.palette.primary.main}`,
    display: 'inline-block',
  },
}));

const TabPanel = ({ index, value, children }) => {
  return (
    <div>
      {index === value && children}
    </div>
  );
};

const ViewJob = props => {
  const classes = useStyles();
  const { match } = props;
  const { applicationId } = match.params;
  const [basicDetail, setBasicDetail] = useState({});
  const [tab, setTab] = useState(0);

  const loadData = () => {
    APIService.getApplicationDetails(applicationId)
      .then(resp => setBasicDetail({ applicationId, ...resp.data })).catch(console.log);
  };

  const handleTabChange = (event, newValue) => {
    setTab(newValue);
  };

  useEffect(() => {
    if (basicDetail.title === undefined) {
      loadData();
    }
  });

  const Body = () => (
    <div>
      <Tabs
        value={tab}
        indicatorColor="primary"
        textColor="primary"
        onChange={handleTabChange}
        aria-label="View job tabs"
      >
        <Tab label="Details" />
        <Tab label="Notes" />
      </Tabs>
      <TabPanel value={tab} index={0}>
        <div className={classes.root}>
          <BasicDetails basicDetail={basicDetail} reload={loadData} />
          <TimeLog basicDetail={basicDetail} reload={loadData} />
        </div>
      </TabPanel>
      <TabPanel value={tab} index={1}>
        <Notes notes={basicDetail.notes} applicationId={applicationId} reload={loadData} />
      </TabPanel>
    </div>
  );

  return (
    <div className={classes.root}>
      <NavBar>
        <Typography variant="h6">
          <NavLink to="/dashboard" className={classes.underLine}>Back</NavLink>
        </Typography>
        {basicDetail.title ? <Body /> : <HorizontalLoader />}
      </NavBar>
    </div>
  );
};

export default ViewJob;
