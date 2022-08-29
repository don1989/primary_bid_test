import axios, { AxiosResponse } from 'axios';
import { IGetResponseBody, IPostResponseBody } from '../types';

const mainUrl = 'http://localhost:4000';

export const getUrls = async (): Promise<AxiosResponse<IGetResponseBody>> => {
	return axios.get(mainUrl);
};

export const postUrl = async (
	longUrl: string
): Promise<AxiosResponse<IPostResponseBody>> => {
	return axios.post(mainUrl, { longUrl });
};
