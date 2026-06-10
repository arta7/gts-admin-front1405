import { isNationalIdValid } from "../../utils/nationalCode"

export const setValidation = (needToValidate: any, validationRule: any,value:any)=>{
    
    if (!needToValidate) {
        return false
    }
    if (needToValidate) {
        if (validationRule === 'nationalCode') {
            if (!isNationalIdValid(value)) {
                return false|| "کد ملی صحیح نمی باشد"
            }
        }
    }
}