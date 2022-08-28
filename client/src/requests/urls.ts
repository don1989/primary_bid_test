import axios, { AxiosResponse } from 'axios';
import { UrlItem } from '../types';

const mainUrl = 'localhost:2027';

export const getUrls = async (): Promise<AxiosResponse<UrlItem[]>> => {
	const url = `${mainUrl}/urls`;
	return axios.get(url);
};

export const postUrl = async (
	longUrl: string
): Promise<AxiosResponse<void>> => {
	const url = `${mainUrl}/url`;
	return axios.post(url, longUrl);
};
