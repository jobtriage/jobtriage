import React, { useState } from 'react';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import { Button } from '../../Material-UI/Components';
import { makeStyles } from '../../Material-UI/import';

const useStyles = makeStyles(() => ({
  root: {
    minHeight: '35vh',
    width: '100%',
  },
  buttonDiv: {
    marginTop: '5vh',
    display: 'flex',
    justifyContent: 'center',
  },
}));

const TextEditor = (props) => {
  const classes = useStyles();
  const { content, onUpdate, onCancel } = props;
  const [value, setValue] = useState(content);


  return (
    <div className={classes.root}>
      <ReactQuill theme="snow" style={{ height: '30vh' }} value={value || content} onChange={setValue} />
      <div className={classes.buttonDiv}>
        <Button name="Cancel" onClick={onCancel} color="default">Cancel</Button>
        <Button name="Submit" onClick={() => onUpdate(value.toString())}>Submit</Button>
      </div>
    </div>
  );
};

export default TextEditor;
