import React from 'react';
import Snackbar from '@material-ui/core/Snackbar';
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';
import { Error, InfoOutlined, Done } from '@material-ui/icons';
import theme from '../../theme';

const Toast = props => {
  const {
    show, duration, onClose, message, type,
  } = props;

  const StatusIcon = () => {
    const getIcon = () => {
      if (type === 'success') {
        return <Done fontSize="small" style={{ color: theme.palette.success.main }} />;
      } if (type === 'error') {
        return <Error fontSize="small" style={{ color: theme.palette.error.main }} />;
      }
      return <InfoOutlined fontSize="small" style={{ color: theme.palette.info.main }} />;
    };

    return (
      <IconButton size="small" aria-label="close" color="inherit" onClick={onClose}>
        {getIcon()}
      </IconButton>
    );
  };

  return (
    <Snackbar
      open={show}
      autoHideDuration={duration || 4000}
      onClose={onClose}
      message={(
        <div>
          <StatusIcon />
          {' '}
          {message}
        </div>
      )}
      action={(
        <>
          <IconButton size="small" aria-label="close" color="inherit" onClick={onClose}>
            <CloseIcon fontSize="small" />
          </IconButton>
        </>
      )}
    />
  );
};

export default Toast;
