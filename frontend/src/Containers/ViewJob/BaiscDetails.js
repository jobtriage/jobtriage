import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import APIService from '../../service/APIService';
import {
  Typography, Input, Button, StatusMenu, PriorityMenu,
} from '../../Components';
import { useToast, ToastConstants } from '../../store/context';

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
  },
  spaceBetween: {
    display: 'flex',
    justifyContent: 'space-between',
  },
}));

const BasicDetails = props => {
  const showToast = useToast();
  const classes = useStyles();
  const { basicDetail, reload } = props;
  const [title, setTitle] = useState(basicDetail.title);
  const [companyName, setCompanyName] = useState(basicDetail.company.name);
  const [companyUrl, setCompanyUrl] = useState(basicDetail.company.url || '');
  const [status, setStatus] = useState(basicDetail.status);
  const [priority, setPriority] = useState(basicDetail.priority);
  const [description, setDescription] = useState(basicDetail.description || '');
  const [url, setUrl] = useState(basicDetail.url || '');

  const handleSubmit = event => {
    event.preventDefault();
    const jobDetail = {
      title,
      company_name: companyName,
      company_url: companyUrl,
      status,
      priority,
      description,
      url,
    };
    APIService.updateJobApplication(basicDetail.applicationId, jobDetail)
      .then(() => {
        showToast('Update success', ToastConstants.SUCCESS);
        reload();
      })
      .catch(() => showToast('Update failed', ToastConstants.ERROR));
  };

  return (
    <div className={classes.root}>
      <Typography variant="h6" color="primary">
        Baisc details
      </Typography>
      <form onSubmit={handleSubmit} className={classes.form}>
        <div className={classes.spaceBetween}>
          <Input
            type="text"
            label="title"
            onChange={e => setTitle(e.target.value)}
            value={title}
          />
          <PriorityMenu value={priority} onChange={e => setPriority(e.target.value)} />
          <StatusMenu value={status} onChange={e => setStatus(e.target.value)} />
        </div>
        <Input type="text" label="Job post url" onChange={e => setUrl(e.target.value)} value={url} />
        <Input
          type="text"
          label="description"
          multiline
          rows="4"
          onChange={e => setDescription(e.target.value)}
          value={description}
        />
        <Typography variant="h6" color="primary">
          Company details
        </Typography>
        <div className={classes.spaceBetween}>
          <Input
            type="text"
            label="company name"
            onChange={e => setCompanyName(e.target.value)}
            value={companyName}
          />
          <Input
            type="text"
            label="company link"
            onChange={e => setCompanyUrl(e.target.value)}
            value={companyUrl}
          />
        </div>
        <div className={classes.displayFlex}>
          <Button type="submit" style={{ marginTop: '20px', marginBottom: '5px' }}>Update</Button>
        </div>
      </form>
    </div>
  );
};

export default BasicDetails;
