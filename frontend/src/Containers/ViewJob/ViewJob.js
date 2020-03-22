import React, { useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { NavLink } from 'react-router-dom';
import APIService from '../../service/APIService';
import { NavBar, Typography } from '../../Components';
import BasicDetails from './BaiscDetails';
import Notes from './Notes/Notes';

const useStyles = makeStyles(theme => ({
  root: {
    display: 'flex',
    flexGrow: 2,
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

const Loading = () => {
  return (
    <Typography variant="h4">
      Loading...
    </Typography>
  );
};

const ViewJob = props => {
  const classes = useStyles();
  const { match } = props;
  const { applicationId } = match.params;
  const [basicDetail, setBasicDetail] = useState({});

  const loadData = () => {
    APIService.getApplicationDetails(applicationId)
      .then(resp => setBasicDetail({ applicationId, ...resp.data.message })).catch(console.log);
  };

  useEffect(() => {
    if (basicDetail.title === undefined) {
      loadData();
    }
  });

  const Body = () => (
    <div className={classes.root}>
      <BasicDetails basicDetail={basicDetail} reload={loadData} />
      <Notes notes={basicDetail.notes} applicationId={applicationId} reload={loadData} />
    </div>
  );

  return (
    <div className={classes.root}>
      <NavBar>
        <Typography variant="h6">
          <NavLink to="/dashboard" className={classes.underLine}>Back</NavLink>
        </Typography>
        {basicDetail.title ? <Body /> : <Loading />}
      </NavBar>
    </div>
  );
};

export default ViewJob;
