import { Checkbox, FormControlLabel } from "@mui/material"
import { Controller } from "react-hook-form"

export const CheckboxControl = ({ name, label, control,onchange,currentValue,listcheckvalue }: any) => {

    return <FormControlLabel sx={{cursor:'pointer'}} control={<Controller name={name} control={control} render={({ field }) =>
        <Checkbox {...field} id={name} onChange={onchange != null ? onchange : (e) => field.onChange(e.target.checked)
        
        } checked={listcheckvalue != null ? listcheckvalue : currentValue != null ?  currentValue=== name ? true:false : field.value } />
    } />} label={label} />
}