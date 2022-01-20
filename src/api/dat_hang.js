import axiosService from "./axiosService";
import axios from "axios";

const token = JSON.parse(localStorage.getItem("token"));
var url_upload = "api/upload";
var URL = "http://localhost:8080";
var url_them_dat_hang = "api/dat_hang";
// var url_get_loia_giay = ''
const authAxios = axios.create({
    baseURL: URL,
    headers: {
        Authorization: `Bearer ${token}`,
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Methods": "GET,PUT,POST,DELETE,PATCH,OPTIONS",
    },
});

export const upload = (file) => {
    let formData = new FormData();
    const config = {
        headers: {
            // 'Access-Control-Allow-Origin': '*',
            // 'Access-Control-Allow-Methods': 'GET,PUT,POST,DELETE,PATCH,OPTIONS',
            "content-type": "multipart/form-data",
        },
    };
    formData.append("image", file);
    return axios.post(`${URL}/${url_upload}`, formData, config);
};

export const Them = (data) => {
    return axiosService.post(`${URL}/${url_them_dat_hang}`, data);
};

export const getList = () => {
    return authAxios.get(`/api/dat_hang`);
};

export const update = (data) => {
    return authAxios.post(`/api/dat_hang`, data);
};

export const pageDonHang = (data) => {
    return authAxios.post(`/api/dat_hang/page`, data);
};

export const pageSearchDonHang = (data) => {
    return authAxios.post(`/api/dat_hang/pageSearch`, data);
};

export const getChiTietDonHangByID = (data) => {
    return authAxios.post(`/api/dat_hang/getChiTietDonHangByID`, data);
};

export const getGiayByID = (data) => {
    return authAxios.post(`/api/dat_hang/getGiayByID`, data);
};

export const getDonHangByID = (data) => {
    return authAxios.post(`/api/dat_hang/getDonHangByID`, data);
};

export const updateStatus = (data) => {
    return authAxios.post(`/api/dat_hang/updateStatus`, data);
};

export const deleteDat_hang = (data) => {
    return authAxios.post(`/api/dat_hang/delete`, data);
};