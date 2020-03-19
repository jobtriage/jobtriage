import React from 'react';
import { MenuItem } from '../../Material-UI/import';
import { Select } from '../../Material-UI/Components';

const PriorityMenu = props => {
  const { value, onChange } = props;
  return (
    <Select label="priority" value={value} required onChange={onChange}>
      <MenuItem value={1}>Low</MenuItem>
      <MenuItem value={2}>Medium</MenuItem>
      <MenuItem value={3}>High</MenuItem>
    </Select>
  );
};

export default PriorityMenu;
