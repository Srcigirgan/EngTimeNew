import { instance as axios } from "./axiosInstance";

const teacher_anouncement = () => axios.get(`api/anouncement/`)

export {
    teacher_anouncement,
}