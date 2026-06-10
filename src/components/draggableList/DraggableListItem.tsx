import { ListItem, ListItemButton, ListItemText, makeStyles } from '@mui/material';
import * as React from 'react';
import { Draggable } from 'react-beautiful-dnd';
import { Item } from './DraggbleList';

const getItemStyle = (isDragging: boolean, draggableStyle: any) => ({
  ...draggableStyle,
  ...(isDragging && {
    background: "rgb(235,235,235)",
  })
});

export type DraggableListItemProps = {
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

const DraggableListItem = ({ item, index, onClick, selected }: DraggableListItemProps) => {

  return (
    <Draggable draggableId={item.id} index={index}>
      {(provided: any, snapshot: any) => (
        <ListItemButton
          sx={selectedItemStyle}
          selected={item == selected}
          onClick={() => onClick(item)}
          ref={provided.innerRef}
          {...provided.draggableProps}
          {...provided.dragHandleProps}
          className={snapshot.isDragging ? '' : ''}
          style={getItemStyle(
            snapshot.isDragging,
            provided.draggableProps.style
          )}
        >
          <ListItemText primary={item.title} />
        </ListItemButton>
      )}
    </Draggable>
  );
};

export default DraggableListItem;
