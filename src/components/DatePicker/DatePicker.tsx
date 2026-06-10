 //@ts-ignore
import { Box, FilledTextFieldProps, OutlinedTextFieldProps, StandardTextFieldProps, TextField, TextFieldVariants } from "@mui/material";
 //@ts-ignore
import { DatePicker } from "@mui/x-date-pickers";
import { LocalizationProvider } from "@mui/x-date-pickers";
import KeyboardArrowLeftIcon from "@mui/icons-material/KeyboardArrowLeft";
import KeyboardArrowRightIcon from "@mui/icons-material/KeyboardArrowRight";

import { useTranslation } from "react-i18next";
import React from "react";
 //@ts-ignore
import { JSX } from "react/jsx-runtime";

type DatePickerProps = {
    value: Date | null;
    onChange: (value: any | null) => void;
    label: string | undefined;
};

export default function Datepicker({
    value,
    onChange,
    label,
}: DatePickerProps) {
    const { t: translate } = useTranslation();
    const mask = "____/__/__";
    const placeholder = `سال/ماه/روز`;

    return (
        <DatePicker
            //@ts-ignore
            mask={mask}
            label={label}
             //@ts-ignore
            value={value}
            
             //@ts-ignore
            onChange={( newValue: Date | null, keyboardInputValue: string | undefined) => {
                // console.log('new value',newValue)
                onChange(newValue);
            }}
            renderInput={(params: JSX.IntrinsicAttributes & { variant?: TextFieldVariants | undefined; } & Omit<FilledTextFieldProps | OutlinedTextFieldProps | StandardTextFieldProps, "variant">) => {
                return (
                    <TextField
                        {...params}
                        inputProps={{ ...params.inputProps, placeholder, dir: "ltr" }}
                    />
                );
            }}
        />
    );
}