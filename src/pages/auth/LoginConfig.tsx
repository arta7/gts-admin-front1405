import { TextField, Button, Theme, styled } from '@mui/material';
import AttachmentIcon from '@mui/icons-material/Attachment';
import Grid from '@mui/system/Unstable_Grid'
import React, { useEffect, useReducer, useState } from 'react'
import { useForm } from 'react-hook-form'
import { CheckboxControl } from '../../components/FormControl/CheckBoxControl';
import { TextFieldControl } from '../../components/FormControl/TextFieldControl';
import FileUploadModal from '../sejamConfirmation/FileUploadModal';
import { fileUploadReducer, FileUploadActionKind } from '../../reducers/FileUploadReducer';
import ImageUploadModal from './ImageUploadModal';
import baseUrl, { getLoginConfig } from '../../utils/Util';
import axios from 'axios';
import { toast } from 'react-toastify';
import GridLoader from 'react-spinners/GridLoader';
import LoginConfigForm from './LoginConfigForm';

export type LoginConfig = {
    systemName: string,
    systemVersion: string,
    systemLogo: string,
    customerName: string,
    customerLogo: string,
    customerLink: string,
    developerName: string,
    developerLink: string,
    developerLogo: string,
    S00_loginPageSlider: Array<string>,
    showForgetPasswordLink: boolean,
    showSignUpLink: boolean
}

const LoginConfig = () => {
    const [config, setConfig] = useState()
    useEffect(() => {
        getLoginConfig().then((data) => {
            setConfig(data);
        }).catch(() => {
            toast.error("! دریافت تنظیمات لاگین با خطا مواجه شد")
            setConfig({} as any);
        })
    }, []);

    if (!config) {
        return <GridLoader color="#36d7b7" />
    }
    return <LoginConfigForm config={config} />
}

export default LoginConfig;