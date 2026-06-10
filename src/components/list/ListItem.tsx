import { ListItemButton, ListItemText } from '@mui/material';
import * as React from 'react';
import { Item } from './List';

export type ListItemProps = {
  item: Item;
  index: number;
  onClick: any;
  selected: Item | null;
};

const selectedItemStyle = {
  "&.Mui-selected": {
    backgroundColor: "#D3D3D3",
  }
};

const ListItem = ({ item, index, onClick, selected }: ListItemProps) => {
  return (
    <ListItemButton key={index}
      sx={selectedItemStyle}
      selected={item == selected}
      onClick={() => onClick(item)}
    >
      <ListItemText primary={item.title} />
    </ListItemButton>
  );
};

export default ListItem;
