import axios from "axios";
import { toast } from 'react-toastify';
import { serverError } from "./Messages";

export const getServerError=(error:any)=>`${serverError} (${error.code})`;

axios.defaults.baseURL=process.env.VITE_APP_API_URL;

axios.interceptors.response.use(function (response) {
  return response;
},(error)=> {
  console.log('error message',error)
  if (error&& error.response.status === 400) {
    let errors;
  errors = error.response.data.result.message
   toast.error(errors);
}else if (error.response.data.result.message) {
                let errors;
  errors = error.response.data.result.message
         toast.error(errors);       
}else if(error.response.status !== 400&&!error.response.data.result.message){toast.error(getServerError(error))};
  return Promise.reject(error);
});

// For POST requests
// axios.interceptors.response.use(
//   (res) => {
//     // Add configurations here
//     if (res.data.detail) {
//       notyf.open({
//         type: "success",
//         message: res.data.detail.success,
//         //@ts-ignore
//         html: true,
//         ripple: true,
//         dismissible: true,
//       });
//     } else if (res.status === 201) {
//       notyf.open({
//         type: "success",
//         message: "Object was Created Successfully",
//         ripple: true,
//         dismissible: true,
//       });
//     } else if (res.status === 200) {
//       notyf.open({
//         type: "success",
//         message: "Object was Updated Successfully",
//         ripple: true,
//         dismissible: true,
//       });
//     } else if (res.status === 204) {
//       notyf.open({
//         type: "success",
//         message: "Object was Deleted Successfully",
//         ripple: true,
//         dismissible: true,
//       });
//     }
//     return res;
//   },
//   (err) => {
//     notyf.open({
//       type: "error",
//       message: "Operation failed",
//       ripple: true,
//       dismissible: true,
//     });
//     return Promise.reject(err);
//   }
// );


const axiosInstance = axios.create({
  baseURL: process.env.VITE_APP_API_URL,
});

export default axiosInstance;
