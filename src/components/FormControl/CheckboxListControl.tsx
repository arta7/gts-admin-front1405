import { FormControlLabel } from "@mui/material"
import { Controller } from "react-hook-form"
import CheckboxList from "../CheckboxList"

export const CheckListboxControl = ({ name, control, data, errors, title, required, onChange }: any) => {
    let rules: any = {};
    if (required) {
        title = `${title} *`;
        rules.required = "*";
    }
    return <Controller name={name} control={control} rules={rules} render={({ field }) =>
        <CheckboxList title={title} id={name} value={field.value} onChange={(value) => {
            field.onChange(value);
            if (onChange) {
                onChange(value);
            }
        }} data={data} hasError={errors && errors[name]} />
    } />
}