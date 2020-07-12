import React, { useState } from 'react';
import { withStyles, makeStyles } from '@material-ui/core/styles';
import { Paper, IconButton, Tooltip } from '@material-ui/core';
import { Delete, Edit, CalendarTodayOutlined } from '@material-ui/icons';
import { MuiPickersUtilsProvider } from '@material-ui/pickers';
import DayJsAdapter from '@date-io/dayjs';
import {
  Typography, Button,
} from '../../../Components';
import APIService from '../../../service/APIService';
import TimeLogForm from './AddTimeLog';

const useStyles = makeStyles(({
  form: {
    display: 'flex',
    flexDirection: 'column',
  },
  displayFlex: {
    display: 'flex',
    justifyContent: 'center',
  },
  root: {
    minWidth: '60%',
    paddingLeft: '5px',
  },
  timeLogItem: {
    margin: '5px',
    display: 'flex',
    flexWrap: 'wrap',
  },
}));


const BootstrapTooltip = withStyles((theme) => ({
  arrow: {
    color: theme.palette.common.black,
  },
  tooltip: {
    backgroundColor: theme.palette.common.black,
    fontSize: 16,
  },
}))(Tooltip);


const getCalenderLink = (type, time, note) => {
  const dayJS = new DayJsAdapter();
  const formatedTime = dayJS.format(dayJS.date(time), 'YYYYMMDDThhmm00');

  return `http://www.google.com/calendar/render?action=TEMPLATE&text=${type}&dates=${formatedTime}/${formatedTime}&details=${note}`;
};

const TimeLogItem = props => {
  const classes = useStyles();
  const {
    note, time, type, applicationId, id, onUpdate,
  } = props;
  const [openAddTimeLog, setOpenAddTimeLog] = useState(false);
  const dayJS = new DayJsAdapter();
  const formatedTime = dayJS.format(dayJS.date(time), 'MMM DD YYYY, hh:mm a');

  const handleDelete = () => {
    APIService.deleteTimeLog(applicationId, id).then(onUpdate);
  };

  const handleAddTimeLogOpen = () => {
    setOpenAddTimeLog(true);
  };

  const handleAddTimeLogClose = () => {
    setOpenAddTimeLog(false);
  };


  const FormatedNote = React.forwardRef((innerProps, ref) => (
    <div {...innerProps} ref={ref}>
      <Typography variant="body2">
        {note.length > 35 ? `${note.substring(0, 37)}...` : note}
      </Typography>
    </div>
  ));

  return (
    <Paper className={classes.timeLogItem} elevation={3}>
      <Typography variant="body2" style={{ width: '20%' }}>
        {formatedTime}
      </Typography>
      <Typography variant="body2" style={{ width: '10%' }}>
        {type.toUpperCase()}
      </Typography>
      <BootstrapTooltip title={note} style={{ width: '40%' }} arrow placement="top">
        <FormatedNote />
      </BootstrapTooltip>
      <div className={classes.displayFlex} style={{ justifyContent: 'space-between' }}>
        <a href={getCalenderLink(type, time, note)} label="Add to calender" target="_blank" rel="noopener noreferrer">
          <IconButton aria-label="Add to calender" component="span">
            <CalendarTodayOutlined />
          </IconButton>
        </a>
        <IconButton aria-label="Edit time log" component="span" onClick={handleAddTimeLogOpen}>
          <Edit color="primary" />
        </IconButton>
        <IconButton aria-label="Delete time log" component="span" onClick={handleDelete}>
          <Delete color="error" />
        </IconButton>
      </div>

      <TimeLogForm
        open={openAddTimeLog}
        onClose={handleAddTimeLogClose}
        onChange={onUpdate}
        applicationId={applicationId}
        timeLogId={id}
        time={time}
        note={note}
        type={type}
      />
    </Paper>
  );
};

const EmptyLogView = () => {
  const classes = useStyles();
  return (
    <div className={classes.displayFlex}>
      <Typography variant="h5">
        No timelogs added yet
      </Typography>
    </div>
  );
};

const TimeLog = props => {
  const { basicDetail, reload } = props;
  const { timelogs, applicationId } = basicDetail;

  const classes = useStyles();
  const [openAddTimeLog, setOpenAddTimeLog] = useState(false);

  const handleAddTimeLogOpen = () => {
    setOpenAddTimeLog(true);
  };

  const handleAddTimeLogClose = () => {
    setOpenAddTimeLog(false);
  };

  return (
    <MuiPickersUtilsProvider utils={DayJsAdapter}>
      <div className={classes.root}>
        <Typography variant="h6" color="primary">
          Time Logs
        </Typography>
        {timelogs.length === 0 ? <EmptyLogView /> : ''}
        {timelogs.map(timelog => (
          <TimeLogItem
            applicationId={applicationId}
            type={timelog.type}
            note={timelog.note}
            time={timelog.time}
            id={timelog.id}
            key={timelog.id}
            onUpdate={reload}
          />
        ))}
        <div className={classes.displayFlex}>
          <Button onClick={handleAddTimeLogOpen}>Add</Button>
        </div>
        <TimeLogForm
          open={openAddTimeLog}
          onClose={handleAddTimeLogClose}
          onChange={reload}
          applicationId={applicationId}
          isNew
        />
      </div>
    </MuiPickersUtilsProvider>
  );
};

export default TimeLog;
