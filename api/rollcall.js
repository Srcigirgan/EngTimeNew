import { instance as axios } from "./axiosInstance";

const rollcall_detail = (data) => axios.get(`api/get_by_schedule/${data}/`)

const rollcall_multiple = (data) => axios.post(`api/rollcall_multiple/`, data)

export {
    rollcall_detail,
    rollcall_multiple
}