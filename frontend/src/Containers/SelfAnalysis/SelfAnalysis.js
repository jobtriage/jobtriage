import React, { useState, useEffect } from 'react';
import parse from 'html-react-parser';
import { makeStyles } from '@material-ui/core/styles';
import { IconButton } from '@material-ui/core';
import { Delete, Add } from '@material-ui/icons';
import { Typography } from '../../Material-UI/Components';
import TextEditor from '../../Components/TextEditor/TextEditor';
import NavBar from '../../Components/NavBar/NavBar';
import APIService from '../../service/APIService';
import AnalysisCard from '../../Components/AnalysisCard/AnalysisCard';
import AnalysisForm from './AddAnalysis';

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 2,
    width: '100%',
  },
  editor: {
    border: '1px solid grey',
    padding: '6px',
  },
  card: {
    width: 300,
    height: 300,
    margin: 5,
    border: `1px solid ${theme.palette.border.main}`,
    borderRadius: '4px',
    boxShadow: '1px 1px 8px #e0e0e0',
  },
  cardAction: {
    display: 'flex',
    justifyContent: 'center',
  },
  cardContent: {
    height: '260px',
    overflow: 'hidden',
    cursor: 'pointer',
  },
  addBox: {
    display: 'flex',
    alignItems: 'center',
    alignContent: 'center',
    justifyContent: 'center',
    width: 300,
    height: 300,
    margin: 5,
    cursor: 'pointer',
    border: `1px solid ${theme.palette.border.main}`,
    borderRadius: '4px',
    boxShadow: '1px 1px 8px #e0e0e0',
  },
  behaviourDiv: {
    display: 'flex',
    flexWrap: 'wrap',
  },
  pitchContent: {
    display: 'flex',
    margin: '20px',
    width: '50%',
    alignItems: 'center',
    alignContent: 'center',
    justifyContent: 'center',
  },
}));

const PitchView = () => {
  const [pitch, setPitch] = useState('');
  const [displayEditor, setDisplayEditor] = useState(false);
  const classes = useStyles();

  const updatePitch = (content) => {
    APIService.updatePitch(content).then(() => {
      setDisplayEditor(false);
      setPitch(content);
    });
  };

  useEffect(() => {
    APIService.getPitch().then(resp => setPitch(resp.data.message.pitch));
  }, []);

  return (
    <div>
      <Typography color="primary" variant="subtitle1">
        Personal Pitch
      </Typography>
      <div className={classes.pitchContent}>
        {displayEditor
          ? (
            <TextEditor
              content={pitch}
              onUpdate={updatePitch}
              onCancel={() => setDisplayEditor(false)}
            />
          )
          : (<AnalysisCard content={pitch} onEdit={() => setDisplayEditor(true)} />)}
      </div>
    </div>
  );
};


const AnalysesCard = (props) => {
  const {
    title, content, analysisId, reload,
  } = props;
  const classes = useStyles();
  const [openAddAnalysis, setOpenAddAnalysis] = useState(false);

  const handleAddAnalysisOpen = () => {
    setOpenAddAnalysis(true);
  };

  const handleAddAnalysisClose = () => {
    setOpenAddAnalysis(false);
  };

  const loadState = () => {
    setOpenAddAnalysis(false);
    reload();
  };

  const deleteAnalysis = () => {
    APIService.deleteAnalysis(analysisId).then(reload);
  };

  return (
    <div className={classes.card}>
      <div className={classes.cardContent} onClick={handleAddAnalysisOpen}>
        <Typography variant="h6" gutterBottom color="primary">
          {title}
        </Typography>
        <div className="ql-editor">
          {parse(content)}
        </div>
      </div>
      <div className={classes.cardAction}>
        <IconButton aria-label="Delete analysis" component="span" onClick={deleteAnalysis}>
          <Delete />
        </IconButton>
      </div>
      <AnalysisForm
        open={openAddAnalysis}
        onClose={handleAddAnalysisClose}
        onChange={loadState}
        title={title}
        content={content}
        analysisId={analysisId}
      />
    </div>
  );
};


const BehaviourAnalysis = () => {
  const [analyses, setAnalyses] = useState([]);
  const classes = useStyles();
  const [openAddAnalysis, setOpenAddAnalysis] = useState(false);

  const fetchData = () => {
    APIService.getAnalyses().then(resp => setAnalyses(resp.data.message));
  };

  const loadState = () => {
    setOpenAddAnalysis(false);
    fetchData();
  };

  const handleAddAnalysisOpen = () => {
    setOpenAddAnalysis(true);
  };

  const handleAddAnalysisClose = () => {
    setOpenAddAnalysis(false);
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <div>
      <Typography color="primary" variant="subtitle1">
        Behavioral Analyses
      </Typography>
      <div style={{ margin: '20px' }} className={classes.behaviourDiv}>
        {analyses.map(analysis => (
          <AnalysesCard
            title={analysis.title}
            content={analysis.content}
            reload={fetchData}
            key={analysis.id}
            analysisId={analysis.id}
          />
        ))}
        <div className={classes.addBox} onClick={handleAddAnalysisOpen}>
          <Typography variant="h6" gutterBottom>
            <IconButton aria-label="Add analysis" component="span">
              <Add />
            </IconButton>
          </Typography>
        </div>
      </div>
      <AnalysisForm
        open={openAddAnalysis}
        onClose={handleAddAnalysisClose}
        onChange={loadState}
        isNew
      />
    </div>
  );
};


const SelfAnalysis = () => {
  const classes = useStyles();

  return (
    <div>
      <NavBar>
        <div className={classes.root}>
          <Typography color="primary" variant="h5">
            Self Analysis
          </Typography>
          <PitchView />
          <BehaviourAnalysis />
        </div>
      </NavBar>
    </div>
  );
};

export default SelfAnalysis;
