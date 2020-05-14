import React from 'react';
import { MenuItem } from '../../Material-UI/import';
import { Select } from '../../Material-UI/Components';

const StatusMenu = props => {
  return (
    <Select label="Status" {...props}>
      <MenuItem value="yettoapply">Yet to apply</MenuItem>
      <MenuItem value="applied">Applied</MenuItem>
      <MenuItem value="inprogress">In Progress</MenuItem>
      <MenuItem value="accepted">Accepted</MenuItem>
      <MenuItem value="rejected">Rejected</MenuItem>
    </Select>
  );
};

export default StatusMenu;
