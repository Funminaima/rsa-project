import axios, { AxiosResponse } from "axios";
import { IAddon, IQuote } from "../type";

export const getQuote = (): Promise<IQuote[]> => {
  return axios
    .get("http://localhost:3000/quote")
    .then((response: AxiosResponse<IQuote[]>) => response.data)
    .catch((error) => {
      console.error(error, "Error fetching quote data");
      throw error;
    });
};

export const getaddons = (): Promise<IAddon[]> => {
  return axios
    .get("http://localhost:3000/addons")
    .then((response: AxiosResponse<IAddon[]>) => response.data)
    .catch((error) => {
      console.error(error, "Error fetching addons data");
      throw error;
    });
};
