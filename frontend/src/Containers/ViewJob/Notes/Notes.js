import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Add, Delete } from '@material-ui/icons';
import { Typography } from '../../../Material-UI/Components';
import APIService from '../../../service/APIService';
import NoteForm from './AddNote';

const useStyles = makeStyles(theme => ({
  root: {
    marginLeft: 30,
  },
  notes: {
    display: 'flex',
    flexWrap: 'wrap',
  },
  card: {
    width: 250,
    height: 250,
    margin: 5,
    border: `1px solid ${theme.palette.border.main}`,
    borderRadius: '4px',

  },
  addBox: {
    display: 'flex',
    alignItems: 'center',
    alignContent: 'center',
    justifyContent: 'center',
    width: 250,
    height: 250,
    margin: 5,
    cursor: 'pointer',
    border: `1px solid ${theme.palette.border.main}`,
    borderRadius: '4px',
  },
  cardAction: {
    display: 'flex',
    justifyContent: 'center',
  },
  cardContent: {
    height: '210px',
    overflow: 'hidden',
    cursor: 'pointer',
  },
}));

const NotesCard = (props) => {
  const classes = useStyles();
  const [openAddNote, setOpenAddNote] = useState(false);
  const {
    title, content, onDelete, id, applicationId, onUpdate,
  } = props;

  const handleAddNoteOpen = () => {
    setOpenAddNote(true);
  };

  const handleAddNoteClose = () => {
    setOpenAddNote(false);
  };

  return (
    <div className={classes.card}>
      <div className={classes.cardContent} onClick={handleAddNoteOpen}>
        <Typography variant="h6" gutterBottom>
          {title.substring(0, 15)}
        </Typography>
        <Typography variant="body1" gutterBottom>
          {content}
        </Typography>
      </div>
      <div className={classes.cardAction}>
        <Delete
          style={{ cursor: 'pointer' }}
          onClick={() => onDelete(id)}
        />
      </div>
      <NoteForm
        open={openAddNote}
        onClose={handleAddNoteClose}
        onChange={onUpdate}
        applicationId={applicationId}
        title={title}
        content={content}
        id={id}
      />
    </div>
  );
};

const Notes = props => {
  const classes = useStyles();
  const { notes, applicationId, reload } = props;
  const [openAddNote, setOpenAddNote] = useState(false);

  const handleAddNoteOpen = () => {
    setOpenAddNote(true);
  };

  const handleAddNoteClose = () => {
    setOpenAddNote(false);
  };

  const onDelete = id => {
    APIService.deleteNote(applicationId, id).then(reload);
  };

  return (
    <div className={classes.root}>
      <Typography variant="h6" color="primary">
        Notes
      </Typography>
      <div className={classes.notes}>
        {notes.map(note => (
          <NotesCard
            applicationId={applicationId}
            title={note.title}
            content={note.content}
            id={note.id}
            key={note.id}
            onDelete={onDelete}
            onUpdate={reload}
          />
        ))}
        <div className={classes.addBox} onClick={handleAddNoteOpen}>
          <Typography variant="h6" gutterBottom>
            <Add />
          </Typography>
        </div>
      </div>
      <NoteForm
        open={openAddNote}
        onClose={handleAddNoteClose}
        onChange={reload}
        applicationId={applicationId}
        isNew
      />
    </div>
  );
};

export default Notes;
