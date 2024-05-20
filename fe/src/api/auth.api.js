import axiosInstance from "../config/axios.config";

export const auth = async (user_name, password) => {
    try {
        const auth_url = "/api/v1/login";
        var bodyFormData = new FormData();
        bodyFormData.append('userName', user_name)
        bodyFormData.append('password', password)
        const res = await axiosInstance.post(auth_url, { user_name, password });
        return res.data;
    } catch (err) {
        alert(err.message);
        // console.log(err.message)
    }

}