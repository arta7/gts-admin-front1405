import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import DescriptionIcon from '@mui/icons-material/Description';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import FolderCopyIcon from '@mui/icons-material/FolderCopy';
import TreeView from '@mui/lab/TreeView';
import React, { useEffect } from 'react';
import getDynamicIcon from '../DynamicIcon';
import TreeItem from './TreeItem';
import { TreeNode } from './TreeNode';


export const Tree = ({ items, onChange,defaultValue }: any) => {
    const [checked, setChecked] = React.useState<Array<any>>(defaultValue);
    const [selected, setSelected] = React.useState<string>();
    const handleSelect = (event: React.SyntheticEvent, nodeId: string) => {
        setSelected(nodeId);
    };

    

    const handleToggleSystem = (node: TreeNode, checkItems: boolean) => {
        const newChecked = [...checked];
        toggleCheck(node, checkItems, newChecked)
        setChecked(newChecked);
        if (onChange) {
            onChange(newChecked);
        }
    }
    const toggleCheck = (node: TreeNode, checkItems: boolean, newChecked: Array<string>) => {
        let _newChecked = newChecked;
        const hasChildren = Array.isArray(node.children) && node.children.length;
        if (!hasChildren) {
            if (checkItems) {
                const currentIndex = _newChecked.indexOf(node.nodeId);
                if (currentIndex === -1) {
                    _newChecked.push(node.nodeId);
                }
            }
            else {
                const currentIndex = _newChecked.indexOf(node.nodeId);
                if (currentIndex != -1) {
                    _newChecked = _newChecked.splice(currentIndex, 1);
                }
            }
        }
        else {
            node.children?.forEach((child: TreeNode) => {
                toggleCheck(child, checkItems, _newChecked)
            });
        }
    }

    const isChecked = (id: string) => {
        return checked.indexOf(id) != -1;
    };

    function isParentNodeSelected(list: Array<string>) {
        const checkedItems = list.filter(c => isChecked(c)).length;
        return checkedItems == list.length;
    }

    const flatNestedList = (node: TreeNode, list: any) => {
        if (node.children) {
            node.children.forEach(c => {
                flatNestedList(c, list)
            })
        }
        else {
            list.push(node.nodeId);
        }
    }

    const isNodeChecked = (id: string, node: TreeNode, level: number) => {
        // console.log('check item checked : ',id,node)
        const hasChildren = node.children && node.children.length;
        if (!hasChildren) {
            return isChecked(id);
        }

        else {
            const list: Array<string> = []
            flatNestedList(node, list);
            return isParentNodeSelected(list)
        }
    }

    const renderTree = (node: TreeNode, level: number, parentNodeId: string = "") => {
        const icon = level == 1 ? getDynamicIcon(node.icon!) : (level == 2 ? FolderCopyIcon : DescriptionIcon)
        const id = node.nodeId;

        return <TreeItem key={id} nodeId={id} label={node.caption} labelIcon={icon} level={level} checked={isNodeChecked(id, node, level)} onClick={(e) => handleToggleSystem(node, e.target.checked)}>
            {Array.isArray(node.children)
                ? node.children.map((child) => renderTree(child, level + 1, id))
                : null}
        </TreeItem>
    };

    return (
        <TreeView sx={{ height: 500, flexGrow: 1, maxWidth: '100%', overflowY: 'auto' }} onNodeSelect={handleSelect} selected={selected}
            aria-label="rich object"
            defaultCollapseIcon={<ExpandMoreIcon />}
            defaultExpanded={['root']}
            defaultExpandIcon={<ChevronLeftIcon />}
        >
            {
                items.map((node: TreeNode) => renderTree(node, 1))
            }
        </TreeView>
    )
}
