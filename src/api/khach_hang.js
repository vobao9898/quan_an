import axios from "axios";

const token = JSON.parse(localStorage.getItem("token"));

var URL = "http://localhost:8080";

// var url_get_loia_giay = ''
const authAxios = axios.create({
    baseURL: URL,
    headers: {
        Authorization: `Bearer ${token}`,
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Methods": "GET,PUT,POST,DELETE,PATCH,OPTIONS",
    },
});

export const Them = (data) => {
    return authAxios.post(`/api/khach_hang`, data);
};

export const getList = () => {
    return authAxios.get(`/api/khach_hang`);
};

export const update = (data) => {
    return authAxios.patch(`/api/khach_hang`, data);
};
export const page = (data) => {
    return authAxios.post(`/api/khach_hang/page`, data);
};

export const pageSearch = (data) => {
    return authAxios.post(`/api/khach_hang/pageSearch`, data);
};

export const deletekhach_hang = (data) => {
    return authAxios.post(`/api/khach_hang/delete`, data);
};