import axios from "axios";

export function IsDevelopmentMode() {
  //@ts-ignore
  return import.meta.env.VITE_STATUS == "development";
}

export function client(url: string) {
  return axios.get(url).then((response) => {
    return response.data;
  });
}
