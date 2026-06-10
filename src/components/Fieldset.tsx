import { styled, Typography } from '@mui/material'
import Box from '@mui/material/Box'
import React from 'react'

const Fieldset = ({ title, children }: { title: string, children: any }) => {
    return (
        <FieldSet component="fieldset">
            <Title><Typography component={'div'} fontSize='1rem' fontWeight={'bold'}>{title}</Typography></Title>
            {children}
        </FieldSet>
    )
}

export default Fieldset

const Title = styled('legend')(({ theme }: any) => ({
    paddingInline:'1.5rem',
}));

const FieldSet=styled(Box)(({ theme }: any) => ({
    borderRadius:'.5rem',
    border:`2px solid ${theme.palette.border}`,
    padding:'1rem',
    paddingTop:'2rem'
}));