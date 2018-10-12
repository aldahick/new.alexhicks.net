import axios, { AxiosPromise } from "axios";

type HttpMethod = "get" | "post" | "delete" | "patch";

export const APIEndpoint = <Params, Return>(method: HttpMethod, url: string) => (data?: Params) => {
    let res: AxiosPromise<Return>;
    if (typeof(data) === "object") {
        Object.keys(data).forEach(key => {
            if (url.includes(":" + key)) {
                url = url.replace(":" + key, data[key]);
                delete data[key];
            }
        });
    }
    if (method === "get") {
        res = axios.get(url + "?" + new URLSearchParams(data as any).toString());
    } else {
        res = axios.post(url, data);
    }
    return res.then(r => r.data);
};
