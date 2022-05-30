import axios, { AxiosRequestConfig } from "axios";

/**
 * axios instance
 *
 * @param {AxiosRequestConfig} params for axios request
 * @example
 * axiosInstance({url:'...',method:'GET', params:{...etc}})
 */
export const axiosInstance = axios.create({
  baseURL: "https://api.imgur.com/3/",
  headers: {
    Authorization: "Client-ID 5063cc071db6492",
  },
});
