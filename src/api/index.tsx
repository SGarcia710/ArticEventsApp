import axios from 'axios';

export const api = axios.create({
 baseURL: 'https://api.artic.edu/api/v1',
});

export const fetcher = (url: string) => api.get(url).then((res) => res.data);