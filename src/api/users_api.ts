import { API_USERS } from '../constant/constant';
import { AppApi } from './app_api';


const usersApi = {
    getUsers: () => AppApi.get(API_USERS),
    createUser: () => AppApi.post(API_USERS, {}),
    editUser: (id: number) => AppApi.put(API_USERS + '/' + id, {}),
    deleteUser: (id: number) => AppApi.delete(API_USERS + '/' + id)
};


export const { getUsers, createUser, editUser, deleteUser } = usersApi;