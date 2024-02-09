import axios, { Method } from "axios";
import { API_URL } from "../constant/constant";


export class AppApi {
    static baseUrl = API_URL;
    static headers = {
        'Content-Type': 'application/json',
    };

    static createApiOptions(path: string, method: Method, data?: Record<string, unknown>) {
        const url = this.baseUrl + '/' + path;
        const options = {
            url,
            headers: this.headers,
            method,
            data: data ? data : undefined
        }
        return axios(options);
    }

    static get = (url: string) => this.createApiOptions(url, "GET");

    static post = (url: string, data: Record<string, unknown>) => this.createApiOptions(url, "POST", data);

    static put = (url: string, data: Record<string, unknown>) => this.createApiOptions(url, "PUT", data);

    static delete = (url: string) => this.createApiOptions(url, "DELETE");

}