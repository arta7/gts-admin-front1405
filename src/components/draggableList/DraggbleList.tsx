import * as React from 'react';
import DraggableListItem from './DraggableListItem';
import {
    DragDropContext,
    Droppable,
    OnDragEndResponder
} from 'react-beautiful-dnd';

export type Item = {
    id: string;
    title: string;
};

export type DraggableListProps = {
    items: Item[];
    onDragEnd: OnDragEndResponder;
    onItemClick: any;
    selected: Item | null;
};

const DraggableList = React.memo(({ items, onDragEnd, onItemClick, selected }: DraggableListProps) => {
    return (
        <DragDropContext onDragEnd={onDragEnd}>
            <Droppable droppableId="droppable-list">
                {(provided: any) => (
                    <div ref={provided.innerRef} {...provided.droppableProps}>
                        {items.map((item, index) => (
                            <DraggableListItem item={item} index={index} key={item.id} onClick={onItemClick} selected={selected} />
                        ))}
                        {provided.placeholder}
                    </div>
                )}
            </Droppable>
        </DragDropContext>
    );
});

export default DraggableList;
