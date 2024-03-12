import { instance as axios } from "./axiosInstance";

const login = (data) => axios.post("login/jwt/", data)

const user_detail = (username) => axios.get(`api/user/${username}/`)

export {
    login,
    user_detail
}