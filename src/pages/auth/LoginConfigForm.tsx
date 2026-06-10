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
import baseUrl, { base64ToImage, formatRequestBody, readFile } from '../../utils/Util';
import axios from 'axios';
import { toast } from 'react-toastify';
import ImageViewerModal from './ImageViewerModal';
import { useNavigate } from 'react-router-dom';

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
    S00_loginPageSlider: Array<{ sliderImage: any }>,
    showForgetPasswordLink: boolean,
    showSignUpLink: boolean
}



const LoginConfigForm = ({ config }: { config: LoginConfig }) => {
    const [openModal, setOpenModal] = useState(false);
    const [image, setImage] = useState();
    const [imageKey, setImageKey] = useState<any>();
    const [openImageViewrModal, setOpenImageViewrModal] = React.useState(false);
    const [sliderImagesInfo, setSliderImagesInfo] = useState<Array<any>>([])
    const [state, dispatch] = useReducer(fileUploadReducer, {
        systemLogo: config.systemLogo,
        customerLogo: config.customerLogo,
        developerLogo: config.developerLogo,
        S00_loginPageSlider: (config.S00_loginPageSlider || []).map(s => s.sliderImage)
    })
    const navigate = useNavigate()
    const { handleSubmit, control, formState: { errors }, getValues } = useForm({
        defaultValues: config
    });

    const onSubmit = () => {
        const entityToSave = { ...getValues(), ...state };
        entityToSave.S00_loginPageSlider = state.S00_loginPageSlider.map((item: any) => ({ sliderImage: item }))
        console.log('OnSubmit ', entityToSave.S00_loginPageSlider);
        axios.post(`/gts/v1/api/base/login-page-info/create`, { json: `${JSON.stringify(entityToSave)}` }).then(() => {
            toast.success('تنظیمات لاگین با موفقیت ثبت شد')
            navigate(`${baseUrl}/`)
        });
    }
    const readFileUploadValue = (e: any, name: string): void => {
        readFile(e.target.files[0]).then((value) => dispatch(
            {
                type: FileUploadActionKind.CHANGE,
                payload: {
                    key: name,
                    value: value
                }
            }
        ));
    };

    const readFileUploadMultipleValue = (files: any, name: string): void => {
        dispatch({
            type: FileUploadActionKind.CHANGE, payload: {
                key: name,
                value: files
            }
        })
    };

    function showImage(base64Image: any) {
        base64ToImage(base64Image).then((file: any) => {
            setImage(file);
            setOpenImageViewrModal(true);
        });
    }

    const handleDeleteImage = (name: string) => {
        dispatch(
            {
                type: FileUploadActionKind.CHANGE,
                payload: {
                    key: name,
                    value: null
                }
            }
        )
    }

    return (
        <Form onSubmit={handleSubmit(onSubmit)} noValidate>
            <Grid container spacing={'1rem'}>
                <Grid xs={12} md={6} lg={4}>
                    <TextFieldControl name='systemName' label=" نام سامانه " control={control} errors={errors} fullWidth={true} required={true} />
                </Grid>
                <Grid xs={12} md={6} lg={4}>
                    <TextFieldControl name='systemVersion' label="نسخه سامانه" control={control} errors={errors} fullWidth={true} />
                </Grid>
                <Grid xs={12} md={6} lg={4}>
                    <Button variant="outlined" component="label" startIcon={<AttachmentIcon />}>
                        لوگوی سامانه
                        <input hidden accept="image/*" type="file" name="systemLogo" onChange={(e) => readFileUploadValue(e, 'systemLogo')} />
                    </Button>
                    {state.systemLogo && <Button onClick={() => {
                        showImage(state.systemLogo);
                        setImageKey('systemLogo');
                    }}>مشاهده</Button>}
                </Grid>
                <Grid xs={12} md={6} lg={4}>
                    <TextFieldControl name='customerName' label="نام مشتری" control={control} errors={errors} fullWidth={true} required={true} />
                </Grid>
                <Grid xs={12} md={6} lg={4}>
                    <TextFieldControl name='customerLink' label=" لینک مشتری" control={control} errors={errors} fullWidth={true} />
                </Grid>
                <Grid xs={12} md={6} lg={4}>
                    <Button variant="outlined" component="label" startIcon={<AttachmentIcon />}>
                        لوگوی مشتری
                        <input hidden accept="image/*" type="file" name='customerLogo' onChange={(e) => readFileUploadValue(e, 'customerLogo')} />
                    </Button>
                    {state.customerLogo && <Button onClick={() => {
                        showImage(state.customerLogo);
                        setImageKey('customerLogo');
                    }}>مشاهده</Button>}
                </Grid>
                <Grid xs={12} md={6} lg={4}>
                    <TextFieldControl name='developerName' label=" نام توسعه دهنده" control={control} errors={errors} fullWidth={true} required={true} />
                </Grid>
                <Grid xs={12} md={6} lg={4}>
                    <TextFieldControl name='developerLink' label=" لینک توسعه دهنده " control={control} errors={errors} fullWidth={true} />
                </Grid>
                <Grid xs={12} md={6} lg={4}>
                    <Button variant="outlined" component="label" startIcon={<AttachmentIcon />}>
                        لوگوی توسعه دهنده
                        <input hidden accept="image/*" type="file" name={'developerLogo'} onChange={(e) => readFileUploadValue(e, 'developerLogo')} />
                    </Button>
                    {state.developerLogo && <Button onClick={() => {
                        showImage(state.developerLogo);
                        setImageKey('developerLogo');
                    }}>مشاهده</Button>}
                </Grid>
                <Grid xs={12}>
                    <Button variant="outlined" component="label" startIcon={<AttachmentIcon />} onClick={() => setOpenModal(true)}>
                        تصاویر اسلایدر
                    </Button>
                </Grid>
                <Grid xs={12}>
                    <CheckboxControl name='showForgetPasswordLink' label=' لینک فراموشی رمز عبور نمایش داده شود ' control={control} errors={errors} />
                </Grid>
                <Grid xs={12}>
                    <CheckboxControl name='showSignUpLink' label=' لینک ثبت نام نمایش داده شود' control={control} errors={errors} />
                </Grid>
                <Grid xs={12} sx={{ direction: 'rtl', marginRight: 3, marginTop: 4 }}>
                    <Button type='submit' variant='contained'>ثبت اطلاعات</Button>
                </Grid>
            </Grid>
            <ImageUploadModal open={openModal} onClose={() => setOpenModal(false)} fileUploadProps={{
                value: state.S00_loginPageSlider,
                onChange: (files: Array<string>) => readFileUploadMultipleValue(files, 'S00_loginPageSlider')
            }} />
            <ImageViewerModal open={openImageViewrModal}
                onClose={setOpenImageViewrModal} image={image}
                name={imageKey} onDelete={handleDeleteImage} />
        </Form>
    )
}

export default LoginConfigForm;

export const Form = styled('form')(({ theme }: { theme: Theme }) => {
    return {
        padding: '3rem'
    }
})