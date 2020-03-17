import React from 'react';
import { Button, Typography } from '../..';
import { makeStyles } from '../../../Material-UI/import';
import { Calendar, Free, Priority } from '../../../assets/icons';

const useStyles = makeStyles((theme) => ({
  bodyTitle: {
    backgroundColor: theme.palette.primary.main,
    color: 'white',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-evenly',
    textAlign: 'center',
    padding: '5vh 0',
  },
  commonSectionStyle: {
    margin: 'auto',
    width: '60%',
    textAlign: 'center',
    marginTop: theme.spacing(7),
    '@media (max-width : 600px)': {
      width: '95%',
    },
  },
  underLine: {
    borderBottom: `2px solid ${theme.palette.primary.main}`,
    display: 'inline-block',
  },
  Inner: {
    display: 'flex',
    justifyContent: 'space-between',
    '@media (max-width : 600px)': {
      flexDirection: 'column',
    },
  },
  Icons: {
    height: '100px',
    '@media (max-width : 600px)': {
      height: '75px',
    },
  },
}));

const BodyTitle = (props) => {
  const { className } = props;
  return (
    <div className={className}>
      <Typography variant="h4">Job Triage</Typography>
      <Typography variant="h6">Interactive way to manage and track your job applications.</Typography>
      <span>
        <Button
          onClick={() => window.open('https://github.com/jobtriage/jobtriage',
            '_blank')}
        >
          Github
        </Button>
      </span>
    </div>
  );
};

const BodySectionWrapper = (props) => {
  const { children, className } = props;
  return (
    <div className={className}>
      {children}
    </div>
  );
};
const LandingBody = () => {
  const classes = useStyles();
  return (
    <>
      <BodyTitle className={classes.bodyTitle} />
      <BodySectionWrapper className={classes.commonSectionStyle}>
        <Typography variant="h5" color="primary" className={classes.underLine}>What is triage?</Typography>
        <Typography>
          Triage is the process of determining the priority of patient&apos;s treatments based on the severity of their condition.
          This rations patient treatment efficiently when resources are insufficient for all to be treated immediately, influencing the order and priority of emergency treatment, emergency transport, or transport destination for the patient.
        </Typography>
      </BodySectionWrapper>
      <BodySectionWrapper className={classes.commonSectionStyle}>
        <Typography variant="h5" color="primary" className={classes.underLine}>Job triage</Typography>
        <Typography>
          Job triage lets you manage job applications based on priority in kanban board style.
          Add notes, tasks which needs to be addressed before appearing for interview.
          <b> Self analysis </b>
          will help you to prepare your personal pitch and STAR stories.
        </Typography>
      </BodySectionWrapper>
      <BodySectionWrapper className={classes.commonSectionStyle}>
        <Typography variant="h5" color="primary" className={classes.underLine}>Features</Typography>
        <div className={classes.Inner}>
          <div>
            <img src={Priority} alt="priority" className={classes.Icons} />
            <Typography variant="body1" color="primary">Priority based</Typography>
          </div>
          <div>
            <img src={Calendar} alt="calendar" className={classes.Icons} />
            <Typography variant="body1" color="primary">Google calendar Integration</Typography>
          </div>
          <div>
            <img src={Free} alt="free" className={classes.Icons} />
            <Typography variant="body1" color="primary">Completely free</Typography>
          </div>
        </div>
      </BodySectionWrapper>
      <BodySectionWrapper className={classes.commonSectionStyle}>
        <Typography variant="h5" color="primary" className={classes.underLine}>Contributing</Typography>
        <Typography>
          Job Triage is completely open source and free and it always will be.
          Contribute to Job Triage by creating &nbsp;
          <a href="https://github.com/jobtriage/jobtriage/issues" target="_blank" rel="noopener noreferrer">issues </a>
          and
          <a href="https://github.com/jobtriage/jobtriage/pulls" target="_blank" rel="noopener noreferrer"> Pull requests </a>
        </Typography>
      </BodySectionWrapper>
      <BodySectionWrapper className={classes.commonSectionStyle}>
        <Typography>
          Icons made by
          {' '}
          <a href="https://www.flaticon.com/authors/freepik" title="Freepik"> Freepik </a>
          from
          <a href="https://www.flaticon.com/" title="Flaticon"> www.flaticon.com</a>
        </Typography>
      </BodySectionWrapper>
    </>
  );
};

export default LandingBody;
