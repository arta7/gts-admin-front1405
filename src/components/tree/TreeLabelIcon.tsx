import React from 'react'

const TreeLabelIcon = ({ LabelIcon, selected }: { LabelIcon: any, selected?: boolean }) => {
    return (
        <LabelIcon sx={{ color: selected ? '#FFFFFF' : 'inherit' }} />
    )
}

export default TreeLabelIcon