import { instance as axios } from "./axiosInstance";

const rollcall_detail = (data) => axios.get(`api/get_by_schedule/${data}/`)

const rollcall_multiple = (data) => axios.post(`api/rollcall_multiple/`, data)

const rollcall_history = (id) => axios.get(`api/rollcall_multiple/${id}/`)

export {
    rollcall_detail,
    rollcall_multiple,
    rollcall_history
}