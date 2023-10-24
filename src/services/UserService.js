import { axiosClient } from '../utils/axiosClient';

const UserServices = {
    register: (data) => {
        return axiosClient.post('/register', data);
    },
    login: (data) => {
        return axiosClient.post('/login', data);
    },
    confirmEmail: (token) => {
        return axiosClient.get(`/register/authentication/${token}`);
    },
    getOwn: () => {
        return axiosClient.get('/me');
    },
};

export default UserServices;
