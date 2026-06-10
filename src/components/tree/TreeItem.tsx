// import React from 'react';
// import MuiTreeItem, { TreeItemProps
//     // , treeItemClasses 
// } from '@mui/lab/TreeItem';
// import Box from '@mui/material/Box';
// import Checkbox from '@mui/material/Checkbox';
// import { styled } from '@mui/material/styles';
// import Typography from '@mui/material/Typography';
// import { SvgIconProps } from '@mui/material/SvgIcon';
// import TreeLabelIcon from './TreeLabelIcon';
// import getDynamicIcon from '../DynamicIcon';

// type StyledTreeItemProps = TreeItemProps & {
//     labelIcon: React.ElementType<SvgIconProps>;
//     labelInfo?: string;
//     label: string;
//     onClick?: (e: any, nodeId: string) => void
//     nodeId: number | string,
//     checked?: boolean,
//     level: number,
// };
// const TreeItem = (props: StyledTreeItemProps) => {
//     const {
//         labelIcon: LabelIcon,
//         labelInfo,
//         label,
//         onClick,
//         nodeId,
//         checked,
//         ...other
//     } = props;

//     const handleClick = (e: any) => {
//         e.stopPropagation();
//         if (onClick) {
//             onClick(e, nodeId);
//         }

//     };

//     return (
//         //@ts-ignore
//         <StyledTreeItemRoot nodeId={nodeId} checked={checked}
//             label={
//                 <Box sx={{ display: 'flex', p: 0.5, pr: 0 }}>
//                     <Box color="inherit" sx={{ mr: 1, display: 'flex', gap: 1, alignItems: 'center' }}>
//                         <Box onClick={(e) => e.stopPropagation()}>
//                             <Checkbox sx={{ p: 0 }} checked={checked} onChange={handleClick} />

//                         </Box>
//                         <TreeLabelIcon LabelIcon={LabelIcon} selected={checked} />
//                     </Box>
//                     <Typography variant="body2" sx={{ fontWeight: 'inherit', flexGrow: 1 }}>
//                         {label}
//                     </Typography>
//                 </Box>
//             }
//             {...other}
//         />
//     );
// }

// export default TreeItem;

// const StyledTreeItemRoot = styled(MuiTreeItem)(({ theme, level, checked }: any) => {
//     return {
//         backgroundColor: checked ? "#455a64" : "inherit",
//         borderBottom: checked && "1px solid #F1F3F4",
//         [`& .${treeItemClasses.content}`]: { backgroundColor: "#78909c" },
//         [`& .${treeItemClasses.content}`]: {
//             color: checked ? "#FFF" : theme.palette.text.secondary,
//             paddingRight: theme.spacing(1),
//             fontWeight: theme.typography.fontWeightMedium,
//             '&.Mui-expanded': {
//                 fontWeight: theme.typography.fontWeightRegular,
//                 borderBottom: "1px solid #F1F3F4"
//             },
//             [`& .${treeItemClasses.label}`]: {
//                 fontWeight: 'inherit',
//                 color: 'inherit',
//             },
//             '&.Mui-selected.Mui-focused': {
//                 backgroundColor: "#78909c"
//             },
//         },
//         [`& .${treeItemClasses.group}`]: {
//             marginLeft: 0,
//             // backgroundColor: '#e0e0e0',
//             [`& .${treeItemClasses.content}`]: {
//                 paddingLeft: theme.spacing(2 + (level > 1 ? level : 0))
//             },
//         }
//     }
// })

import React from 'react';
import MuiTreeItem, { TreeItemProps } from '@mui/lab/TreeItem';
import Box from '@mui/material/Box';
import Checkbox from '@mui/material/Checkbox';
import { styled } from '@mui/material/styles';
import Typography from '@mui/material/Typography';
import { SvgIconProps } from '@mui/material/SvgIcon';
import TreeLabelIcon from './TreeLabelIcon';

type StyledTreeItemProps = TreeItemProps & {
    labelIcon: React.ElementType<SvgIconProps>;
    labelInfo?: string;
    label: string;
    onClick?: (e: any, nodeId: string) => void;
    nodeId: number | string;
    checked?: boolean;
    level: number;
};

const TreeItem = (props: StyledTreeItemProps) => {
    const {
        labelIcon: LabelIcon,
        labelInfo,
        label,
        onClick,
        nodeId,
        checked,
        ...other
    } = props;

    const handleClick = (e: any) => {
        e.stopPropagation();
        if (onClick) {
            onClick(e, nodeId.toString());  // Convert nodeId to a string
        }
    };

    return (
        <StyledTreeItemRoot nodeId={nodeId} checked={checked} {...other} label={
            <Box sx={{ display: 'flex', p: 0.5, pr: 0 }}>
                <Box color="inherit" sx={{ mr: 1, display: 'flex', gap: 1, alignItems: 'center' }}>
                    <Box onClick={(e) => e.stopPropagation()}>
                        <Checkbox sx={{ p: 0 }} checked={checked} onChange={handleClick} />
                    </Box>
                    <TreeLabelIcon LabelIcon={LabelIcon} selected={checked} />
                </Box>
                <Typography variant="body2" sx={{ fontWeight: 'inherit', flexGrow: 1 }}>
                    {label}
                </Typography>
            </Box>
        } />
    );
}

export default TreeItem;

const StyledTreeItemRoot = styled(MuiTreeItem)(({ theme, level, checked }: any) => ({
    backgroundColor: checked ? "#455a64" : "inherit",
    borderBottom: checked && "1px solid #F1F3F4",
    color: checked ? "#FFF" : theme.palette.text.secondary,
    paddingRight: theme.spacing(1),
    fontWeight: theme.typography.fontWeightMedium,
    '&.Mui-expanded': {
        fontWeight: theme.typography.fontWeightRegular,
        borderBottom: "1px solid #F1F3F4"
    },
    '&.Mui-selected.Mui-focused': {
        backgroundColor: "#78909c"
    },
    marginLeft: level > 0 ? theme.spacing(2 + level) : 0,
}));