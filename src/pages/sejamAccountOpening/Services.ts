// banks
import axios from "axios";

export const banksAPI = '/sjm/v1/api/banks';

export const banks = (nationalCode: string) => {
    return axios.get(banksAPI).then((res) => res.data.result);
}
