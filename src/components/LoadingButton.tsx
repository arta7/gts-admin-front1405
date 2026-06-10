import { Button, ButtonProps, CircularProgress } from '@mui/material'
import React from 'react'

const LoadingButton = ({ loading, ...rest }: { loading: boolean } & ButtonProps) => {
    const icon = <CircularProgress color="inherit" size={16} />;
    const loadingProps: ButtonProps = {};
    if (loading) {
        loadingProps.variant='outlined';
        if (rest.startIcon) {
            loadingProps.startIcon = icon;
        }
        else if (rest.endIcon) {
            loadingProps.endIcon = icon;
        }
        else {
            loadingProps.endIcon = icon;
        }
    }
    return (
        <Button {...rest} disabled={loading ? true : false} {...loadingProps}>
            {rest.children}
        </Button>
    )
}

export default LoadingButton