import Autocomplete from '@mui/material/Autocomplete';
import TextField from '@mui/material/TextField';
import * as React from 'react';

export interface Option {
    label: string;
    id: number;
}

export type StaticComboProps = {
    label: string;
    value?: any;
    onChange?: (value: Option | null) => void;
    options: Option[];
    helperText?: string,
    getOptionLabel?: (option: any) => string
};

export default function StaticCombo(props: StaticComboProps) {
    const { label, value: defautValue, onChange, options, helperText, getOptionLabel } = props;
    const [value, setValue] = React.useState<Option | null>(defautValue);
    return (
        <Autocomplete
            value={value}
            onChange={(event: any, newValue: Option | null) => {
                setValue(newValue);
                if (onChange) {
                    onChange(newValue);
                }
            }}
            isOptionEqualToValue={(option, value) => option.id === value.id}
            getOptionLabel={getOptionLabel}
            options={options}
            noOptionsText="موردی یافت نشد."
            fullWidth={true}
            size={'small'}
            renderInput={(params) => (
                <TextField
                    variant={'outlined'}
                    {...params}
                    helperText={helperText}
                    label={label}
                    InputProps={{ ...params.InputProps }}
                />
            )}
        />
    );
}