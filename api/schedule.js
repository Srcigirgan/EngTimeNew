import { instance as axios } from "./axiosInstance";

const teacher_schedule = (id) => axios.get(`api/teacher_schedule/${id}/`)


export {
    teacher_schedule,
}