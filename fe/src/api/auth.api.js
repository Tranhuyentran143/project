import axiosInstance from "../config/axios.config";

export const auth = async (userName, password) => {
    try {
        const auth_url = "/api/v1/auth/login";
        const res = await axiosInstance.post(auth_url, { userName, password });
        return res.data;
    } catch (err) {
        alert(err.message);
    }

}