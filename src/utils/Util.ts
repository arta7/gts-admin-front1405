import axios from "axios";

let baseUrl = import.meta.env.BASE_URL || '';
if (baseUrl == "/") {
    baseUrl = '';
}
export default baseUrl;

export const ExcelMediaType="data:application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;base64,";

export const getLoginConfig = () => {
    return axios.get(`/gts/v1/api/base/login-page-info/fetch`).then((res) => {
        if (res.data?.result[0]) {
            return res.data?.result[0];
        }else return res.data;
    })
}

export function base64ToImage(base64img: string) {
    return new Promise((res) => {
        var img = new Image();
        img.onload = function () {
            res(img);
        };
        img.src = base64img;
    })
}

export function downloadFile(file: File) {
    const fileURL = window.URL.createObjectURL(new Blob([file]));
    let alink = document.createElement('a');
    alink.href = fileURL;
    alink.download = file.name;
    alink.click();
}

export function readFile(file: File) {
    if (file) {
        return new Promise((res) => {
            const reader = new FileReader();
            reader.onload = upload => {
                res(upload.target?.result);
            };
            reader.readAsDataURL(file);
        })
    }
    return new Promise((res) => res(null));
}

export const formatRequestBody = (entity: any) => {
    return { json: `${JSON.stringify(entity)}` };
};