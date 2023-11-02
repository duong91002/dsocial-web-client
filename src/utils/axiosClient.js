import axios from 'axios';

console.log(import.meta.env.VITE_APP_SERVER_URL)

export const axiosClient = axios.create({
    baseURL: import.meta.env.VITE_APP_SERVER_URL,
});

const upload = axios.create({
    baseURL: `https://api.cloudinary.com/v1_1/${import.meta.env.VITE_APP_UPLOAD_NAME}/image/upload`,
});

export const uploadCloudinary = async (file) => {
    const formData = new FormData();
    formData.append('file', file);
    formData.append('upload_preset', import.meta.env.VITE_APP_UPLOAD_PRESET);
    const imageData = await upload.post('/', formData);
    return imageData.data.url;
};

axiosClient.interceptors.request.use((config) => {
    if (config.url?.indexOf('login') !== -1) {
        return config;
    }

    if (!config?.headers) {
        throw new Error(`Expected 'config' and 'config.headers' not to be undefined`);
    }

    const token = localStorage.getItem('token');

    if (token) {
        config.headers.Authorization = `Bearer ${token.replace(/"/g, '')}`;
    }

    return config;
});

axiosClient.interceptors.response.use(
    (response) => {
        return response;
    },
    (error) => {
        console.log(error);
        if (error?.response?.status === 401 ) {
            if (typeof window !== 'undefined') {
                window.location.href = '/login';
                localStorage.removeItem('token');
            }
        }
        return Promise.reject(error?.response?.data);
    },
);