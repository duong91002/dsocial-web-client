import { axiosClient } from '../utils/axiosClient';
const FriendServices = {
    getFriendByUserId: async ({ pageParam, id }) => {
        if (!id) return;
        const result = await axiosClient.get(`/friend/${id}?page=${pageParam}`);
        return result.data;
    },
    getFriendRequestByUserId: async ({ pageParam }) => {
        const result = await axiosClient.get(`/friend/requests?page=${pageParam}`);
        return result.data;
    },
    getAllMyRequestFriend: async () => {
        const result = await axiosClient.get(`/friend/my-requests`);
        return result.data;
    },
    getAllFriendRequestByUserId: async () => {
        const result = await axiosClient.get(`/friend/requests`);
        return result.data;
    },
    getAllFriendByUserId: async (userId) => {
        if (!userId) return;
        const result = await axiosClient.get(`/friend/${userId}`);
        return result.data;
    },
    acceptFriend: async (userId) => {
        if (!userId) return;
        const result = await axiosClient.put(`/friend/${userId}`);
        return result.data;
    },
    deleteFriendRequest: async (userId) => {
        if (!userId) return;
        const result = await axiosClient.delete(`/friend/request/${userId}`);
        return result.data;
    },
    deleteFriend: async (userId) => {
        if (!userId) return;
        const result = await axiosClient.delete(`/friend/${userId}`);
        return result.data;
    },
    addFriend: async (friendId) => {
        if (!friendId) return;
        const result = await axiosClient.post(`/friend`, friendId);
        return result.data;
    },
    getMyFriend: async () => {
        const result = await axiosClient.get('/friend/all');
        return result.data;
    },
};

export default FriendServices;
