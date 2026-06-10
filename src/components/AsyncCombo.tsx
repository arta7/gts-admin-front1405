// import Autocomplete from '@mui/material/Autocomplete';
// import CircularProgress from '@mui/material/CircularProgress';
// import TextField from '@mui/material/TextField';
// // import axios from 'axios';
// import axios from '../pages/adminDashboard/axiosConfig';
// import * as React from 'react';
// import { useState } from 'react';

// export interface Option {
//     label: string;
//     id: number;
// }

// export type AsyncComboProps = {
//     label: string,
//     value?: any,
//     onChange?: (value: number | null) => void,
//     url: string,
//     body?: object,
//     loadDataByPostMethod?: boolean,
//     helperText?: string,
//     error?: boolean,
//     getOptionLabel?: (option: any) => string,
//     variant?: 'filled' | 'outlined' | 'standard',
//     required?:boolean
//     setFilterValue?: any
//     disabled?:boolean,
//     UserValue:any
// };

// export default function AsyncCombo(props: AsyncComboProps) {
//     const { label, value:defautValue, onChange, url, helperText, error,setFilterValue,disabled, getOptionLabel ,variant,required,loadDataByPostMethod,body,UserValue} = props;
//     const [open, setOpen] = useState(false);
//     const [options, setOptions] = React.useState<readonly Option[]>([]);
//     const [value, setValue] = React.useState<Option | null>(null);
//     const [loading, setLoading] = useState(false);
//     const [firstLoad, setFirstLoad] = useState(true);

//     const loadData = () => {
//         setLoading(true)
//         console.log('url : => ',loadDataByPostMethod)
//         if(url != '')
//         {
//         if (!loadDataByPostMethod) {
//             return axios.get(url).then((res) => {
//                 console.log('res :=>',res)
//                 const _options = res.data !="" ? res.data.result:[];
//                 setOptions(_options);
//                 setLoading(false);
//                 if (firstLoad) {
//                     setFirstLoad(false)
//                 }
//                 if (firstLoad && defautValue!= null) {
//                     const selected = _options.find((o: Option) => o.id == defautValue)
//                     setValue(selected)
//                 }
//             }).catch((err: any) => {
//                 console.log('error',err)
//                 setLoading(false)
//                 if (firstLoad) {
//                     setFirstLoad(false)
//                 }
//             });
//         } else if (loadDataByPostMethod) {
//             return axios.post(url,body).then((res) => {
//                 const _options = res.data !="" ? res.data.result:[];
//                 setOptions(_options);
//                 setLoading(false);
//                 if (firstLoad) {
//                     setFirstLoad(false)
//                 }
//                 // if (firstLoad && defautValue!== null) {
//                 //     const selected = _options.find((o: Option) => o.id == defautValue)
//                 //     setValue(selected)
//                 // }
//             }).catch((err: any) => {
//                 setLoading(false)
//                 if (firstLoad) {
//                     setFirstLoad(false)
//                 }
//             });
//         }
//     }
//     else
//     {  setOptions(UserValue);
//         // setValue(UserValue)
//         setFirstLoad(false)
//         setLoading(false);
//     }

//     }

//     React.useEffect(() => {
//         if (firstLoad && defautValue != null) {
//             loadData();
//         }
//     }, []);


//     React.useEffect(() => {

//         if ((open)) {
//             loadData();
//         }
//     }, [open]);
//     React.useEffect(() => {
//        // setValue(null)
//     }, [options,disabled]);

//     return (
//         <Autocomplete
            
//             value={value}
//             onChange={(event: any, newValue: Option | null) => {
//                  console.log('id',newValue)
//                 setValue(newValue)
//                 // if (setFilterValue) {
//                 //    setFilterValue(newValue?.id) 
//                 // }
//                 if (onChange) {
//                     onChange(newValue?.id || null);
//                 }
//                 console.log('tets')
//             }}
//             open={open}
//             onOpen={() => {
//                 setOpen(true);
//             }}
//             onClose={() => {
//                 setOpen(false);
//             }}
//             isOptionEqualToValue={(option, value) => option?.id === value?.id}
//             getOptionLabel={getOptionLabel}
//             options={options}
//             loading={loading}
//             loadingText="در حال بارگذاری"
//             noOptionsText="موردی یافت نشد."
//             fullWidth={true}
//             size={'small'}
//             disabled={disabled}
//             renderInput={(params) => (
//                 <TextField
//                     variant={variant?variant:'standard'}
//                     {...params}
//                     required={required}
//                     helperText={helperText}
//                     error={error}
//                     label={label}
//                     value={value}
//                     InputProps={{
//                         ...params.InputProps,
//                         endAdornment: (
//                             <React.Fragment>
//                                 {loading ? <CircularProgress color="inherit" size={20} /> : null}
//                                 {params.InputProps.endAdornment}
//                             </React.Fragment>
//                         ),
//                     }}
//                 />
//             )}
//         />
//     );
// }

import Autocomplete from '@mui/material/Autocomplete';
import CircularProgress from '@mui/material/CircularProgress';
import TextField from '@mui/material/TextField';
import axios from '../pages/adminDashboard/axiosConfig';
import * as React from 'react';
import { useState, useEffect } from 'react';

export interface Option {
    label: string;
    id: number;
}

export type AsyncComboProps = {
    label: string,
    value?: any,
    onChange?: (value: number | null) => void,
    url: string,
    body?: object,
    loadDataByPostMethod?: boolean,
    helperText?: string,
    error?: boolean,
    getOptionLabel?: (option: any) => string,
    variant?: 'filled' | 'outlined' | 'standard',
    required?: boolean,
    setFilterValue?: any,
    disabled?: boolean,
    UserValue?: any
};

export default function AsyncCombo(props: AsyncComboProps) {
    const { 
        label, 
        value: defaultValue, 
        onChange, 
        url, 
        helperText, 
        error, 
        setFilterValue, 
        disabled, 
        getOptionLabel = (option: any) => option.name || option.label || option.title || '', 
        variant, 
        required, 
        loadDataByPostMethod, 
        body, 
        UserValue 
    } = props;

    const [open, setOpen] = useState(false);
    const [options, setOptions] = useState<readonly any[]>([]);
    const [value, setValue] = useState<any | null>(null);
    const [loading, setLoading] = useState(false);
    const [firstLoad, setFirstLoad] = useState(true);

    const loadData = async () => {
        setLoading(true);
        console.log('Loading data from URL:', url);

        try {
            // اگر UserValue وجود دارد، از آن استفاده کن
            if (UserValue && Array.isArray(UserValue)) {
                setOptions(UserValue);
                setLoading(false);
                setFirstLoad(false);
                return;
            }

            // اگر URL وجود ندارد
            if (!url) {
                setOptions([]);
                setLoading(false);
                setFirstLoad(false);
                return;
            }

            let response;
            if (loadDataByPostMethod) {
                response = await axios.post(url, body);
            } else {
                response = await axios.get(url);
            }

            console.log('API Response:', response.data);
            
            // فرض می‌کنیم response.data مستقیم آرایه است
            const responseData = response.data;
            const _options = Array.isArray(responseData) ? responseData : [];
            
            setOptions(_options);
            
            // اگر مقدار پیش‌فرض داریم و اولین بار است که لود می‌شود
            if (firstLoad && defaultValue != null) {
                const selected = _options.find((o: any) => o.id == defaultValue);
                if (selected) {
                    setValue(selected);
                }
            }
            
        } catch (err: any) {
            console.error('Error loading data:', err);
            setOptions([]);
        } finally {
            setLoading(false);
            setFirstLoad(false);
        }
    };

    // برای مقدار اولیه
    useEffect(() => {
        if (firstLoad && defaultValue != null && url) {
            loadData();
        } else if (UserValue && Array.isArray(UserValue)) {
            setOptions(UserValue);
            setFirstLoad(false);
        }
    }, []);

    // وقتی dropdown باز می‌شود
    useEffect(() => {
        if (open && !firstLoad) {
            loadData();
        }
    }, [open]);

    // وقتی defaultValue تغییر می‌کند
    useEffect(() => {
        if (defaultValue != null && options.length > 0) {
            const selected = options.find((o: any) => o.id == defaultValue);
            setValue(selected || null);
        } else if (defaultValue == null) {
            setValue(null);
        }
    }, [defaultValue, options]);

    const handleChange = (event: any, newValue: any | null) => {
        console.log('Selected value:', newValue);
        setValue(newValue);
        
        if (setFilterValue) {
            setFilterValue(newValue?.id);
        }
        
        if (onChange) {
            onChange(newValue?.id || null);
        }
    };

    return (
        <Autocomplete
            value={value}
            onChange={handleChange}
            open={open}
            onOpen={() => {
                setOpen(true);
            }}
            onClose={() => {
                setOpen(false);
            }}
            isOptionEqualToValue={(option, value) => option?.id === value?.id}
            getOptionLabel={getOptionLabel}
            options={options}
            loading={loading}
            loadingText="در حال بارگذاری"
            noOptionsText="موردی یافت نشد."
            fullWidth={true}
            size={'small'}
            disabled={disabled}
            renderInput={(params) => (
                <TextField
                    variant={variant || 'standard'}
                    {...params}
                    required={required}
                    helperText={helperText}
                    error={error}
                    label={label}
                    InputProps={{
                        ...params.InputProps,
                        endAdornment: (
                            <React.Fragment>
                                {loading ? <CircularProgress color="inherit" size={20} /> : null}
                                {params.InputProps.endAdornment}
                            </React.Fragment>
                        ),
                    }}
                />
            )}
        />
    );
}