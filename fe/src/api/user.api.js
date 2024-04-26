import axios from "axios"
import { USER_HOST_API } from "../constants/api.constant"

export const getUsers = async () => {
    const response = await axios.get(USER_HOST_API);
    return response.data;
};

export const getUserById = async (user_id) => {
    const response = await axios.get(`${USER_HOST_API}/${user_id}`);
    return response.data;
};

// get user theo password
// export const onLogin = async (user_name, password) => {
//     const response = await axios.get(`${USER_HOST_API}?user_name=${user_name}&password=${password}`);
//     return response.data[0];
// };
export const onLoginCus = async (user_name, password) => {
    const response = await axios.get(`${USER_HOST_API}?user_name=${user_name}&password=${password}`);
    return response.data && response.data.length > 0 ? response.data[0] : undefined;
  };
  export const onLogin = async (user_name, password) => {
    const response = await axios.get(`${USER_HOST_API}?user_name=${user_name}&password=${password}`);
    const userData = response.data && response.data.length > 0 ? response.data[0] : undefined;
  
    return userData;
  };

// create user
export const createUser = async (user) => {
    return await axios.post(USER_HOST_API, user);

}
// update user
export const updateUser = async (user) => {
    return await axios.put(`${USER_HOST_API}/${user.id}`, user);
}

// delete user
export const deleteUserById = async (user_id) => {
    return await axios.delete(`${USER_HOST_API}/${user_id}`);
};