import React from 'react';
import { MenuItem } from '../../Material-UI/import';
import { Select } from '../../Material-UI/Components';

const DropDownMenu = props => {
  const { value, label,  onChange, options } = props;
  return (
    <Select label={label} {...props}>
      {options.map(option => (
         <MenuItem value={option.value}> {option.label} </MenuItem>
      ))
      }
    </Select>
  )
};

export default DropDownMenu;