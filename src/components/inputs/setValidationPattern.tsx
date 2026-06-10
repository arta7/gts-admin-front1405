export const setValidationPattern = (
    isInteger: any, canBeZero: any, canBeNegative: any, acceptAllChars: any,
    acceptPersianLetters: any, acceptEnglishLetters: any,
     acceptNumbers: any,needToValidate: any,validationRule: string,value: any)=>{
    
    if (!needToValidate) {
    }
    if (needToValidate) {
        if (validationRule == "Numeric") {
         return {value:/^[0-9]+$/,message:'.فقط مجاز به وارد کردن اعداد می باشید'}
        }
    }
}