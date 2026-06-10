import * as React from 'react';
import { List as MuiList } from '@mui/material';
import ListItem from './ListItem';

export type Item = {
    id: string;
    title: string;
};

export type ListProps = {
    items: Item[];
    onItemClick: any;
    selected: Item | null;
};

const List = (({ items, onItemClick, selected }: ListProps) => {
    return (
        <MuiList>
            {items.map((item, index) => (
                <ListItem item={item} index={index} key={item.id} onClick={onItemClick} selected={selected} />
            ))}
        </MuiList>
    );
});

export default List;
