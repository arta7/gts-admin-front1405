import axios from "axios";

export const getSejamStatusAPI = '/sjm/v1/api/get-individual-sjm-status';
export const otpAPI = '/sjm/v1/api/kycOtp';
export const sejamProfileAPI = '/sjm/v1/api/get-profile';

export const getSejamStatus = (nationalCode: string) => {
    return axios.get(getSejamStatusAPI + '/' + nationalCode).then((res) => res.data.result);
}

export const sendOtp = (nationalCode: string) => {
    return axios.post(otpAPI, {
        nationalCode: nationalCode
    }).then((res) => res.data);
}

export const getSejamProfile = (nationalCode: string, code: string) => {
    return axios.post(sejamProfileAPI, {
        nationalCode: nationalCode,
        code: code
    }).then((res) => res.data.result);
}