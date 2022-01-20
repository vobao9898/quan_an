import axios from "axios";

const token = JSON.parse(localStorage.getItem("token"));
var url_upload = "api/upload";
var URL = "http://localhost:8080";
var url_them_giay = "api/giay";
var ulr_chitietmausac_giay = "api/chi_tiet_mau_sac";
var ulr_chitietsize_giay = "api/chi_tiet_size";
// var url_get_loia_giay = ''
const authAxios = axios.create({
    baseURL: URL,
    headers: {
        Authorization: `Bearer ${token}`,
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Methods": "GET,PUT,POST,DELETE,PATCH,OPTIONS",
    },
});
// const authAxiosDelete = axios.create({
//     baseURL: URL,

//     headers: {
//         Authorization: `Bearer ${token}`,
//         'Access-Control-Allow-Origin': '*',
//         'Access-Control-Allow-Methods': 'GET,PUT,POST,DELETE,PATCH,OPTIONS',
//     },
// });

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

export const ThemLoaiGiay = (data) => {
    return authAxios.post(`${URL}/${url_them_giay}`, data);
};
export const pageGiay = (data) => {
    return authAxios.post(`${URL}/${url_them_giay}/page`, data);
};

export const pageSearchGiay = (data) => {
    return authAxios.post(`${URL}/${url_them_giay}/pageSearch`, data);
};

export const getGiay = () => {
    return authAxios.get(`/api/giay`);
};

export const updateGiay = (data) => {
    return authAxios.patch(`/api/giay`, data);
};

export const updateChiTietMSGiay = (data) => {
    return authAxios.patch(`/api/chi_tiet_mau_sac`, data);
};

export const updateChiTietSizeGiay = (data) => {
    return authAxios.post(`/api/chi_tiet_size/update`, data);
};

export const deleteGiay = (data) => {
    return authAxios.post(`/api/giay/delete`, data);
};

export const deleteSize = (data) => {
    return authAxios.post(`/api/chi_tiet_size/delete`, data);
};

export const deleteMauSac = (data) => {
    return authAxios.post(`/api/chi_tiet_mau_sac/delete`, data);
};

export const ThemChiTietMauSac = (data) => {
    return authAxios.post(`${URL}/${ulr_chitietmausac_giay}`, data);
};

export const getChiTietMauSac = () => {
    return authAxios.get(`/api/chi_tiet_mau_sac`);
};

export const ThemChiTietSize = (data) => {
    return authAxios.post(`${URL}/${ulr_chitietsize_giay}`, data);
};

export const getChiTietSize = () => {
    return authAxios.get(`/api/chi_tiet_size`);
};

// export const updateLoaiGiay = (data) => {
//     return authAxios.patch(`/api/giay`, data);
// };

// export const deleteLoaiGiay = (data) => {
//     return authAxios.post(`/api/giay/delete`, data);
// };