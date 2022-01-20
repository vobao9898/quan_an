import React, { useState, useEffect } from "react";

import "./component_type.scss";
import * as apiUpload from "./../../../../api/loai_giay";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import * as loaigiayAction from "./../../../../actions/loai_giay";
import * as modalAction from "./../../../../actions/modal";
import useForm from "./useForm/useForm";
import validate from "./validateForm/validateForm";
import * as notify from "./../../../../contants/notifycation";
import { Button } from "react-bootstrap";
import Moment from "moment";
import Modal from "react-bootstrap/Modal";

function Component_type(props) {
    const { loagiayCreator, loaiGiayEditting, ListLoaiGiay } = props;
    const { modalFormCreator } = props;
    const { hideModal } = modalFormCreator;
    const { updateLoaiGiay, themLoaiGiaysuccess } = loagiayCreator;
    const {
        onUpload,
        onChangeInput,
        handleChange,
        handleSubmit,
        data,
        setData,
        errors,
    } = useForm(submit, validate, apiUpload);
    const [show, setShow] = useState(false);
    const [nd, setNd] = useState("");
    const handleClose = () => {
        setShow(false);
    };

    function closeDidalog() {
        setShow(false);
    }
    const { ten_loai_giay, mo_ta } = data;

    function submit() {
        let ktCS = ListLoaiGiay.filter(
            (item) => item.ten_loai_giay !== loaiGiayEditting.ten_loai_giay
        );
        let k = ktCS.filter((item) => item.ten_loai_giay === data.ten_loai_giay);
        const kt = ListLoaiGiay.filter(
            (item) => item.ten_loai_giay === data.ten_loai_giay
        );

        if (loaiGiayEditting.id) {
            if (k.length > 0) {
                setShow(true);
                setNd(`Loại giày ${data.ten_loai_giay} đã có trong danh sách`);
            } else {
                apiUpload
                    .updateLoaiGiay(data)
                    .then((response) => {
                        if (response.status === 200) {
                            updateLoaiGiay(data);
                            notify.notificatonSuccess("Chỉnh sửa thành công");
                            hideModal();
                            setData((data) => ({
                                ...data,
                                id: 0,
                                ten_loai_giay: "",
                                mo_ta: "",
                                trang_thai: 1,
                                hinh_anh: "",
                                date_create: new Date(),
                                date_update: new Date(),
                            }));
                        }
                    })
                    .catch((error) => {
                        console.log(error);
                    });
            }
        } else {
            if (kt.length > 0) {
                setShow(true);
                setNd(`Loại giày ${data.ten_loai_giay} đã có trong danh sách`);
            } else {
                apiUpload
                    .ThemLoaiGiay(data)
                    .then((response) => {
                        if (response.status === 200) {
                            notify.notificatonSuccess("Thêm thành công");
                            themLoaiGiaysuccess(response.data.data.insertId, data);
                            hideModal();
                            setData((data) => ({
                                ...data,
                                id: 0,
                                ten_loai_giay: "",
                                mo_ta: "",
                                trang_thai: 1,
                                hinh_anh: "",
                                date_create: new Date(),
                                date_update: new Date(),
                            }));
                        }
                    })
                    .catch((error) => {
                        console.log(error);
                    });
            }
        }
    }
    useEffect(() => {
        const { date_create } = data;
        setData((data) => ({
            ...data,
            id: loaiGiayEditting.id,
            ten_loai_giay: loaiGiayEditting.ten_loai_giay,
            mo_ta: loaiGiayEditting.mo_ta,
            trang_thai: loaiGiayEditting.trang_thai,
            hinh_anh: loaiGiayEditting.hinh_anh,
            date_update: Moment(date_create).format("YYYY-MM-DD HH:mm"),
        }));
    }, [loaiGiayEditting]);

    return ( <
            div className = " tm-edit-product-row" >
            <
            Modal show = { show }
            onHide = { handleClose }
            backdrop = "static"
            keyboard = { false } >
            <
            Modal.Header closeButton >
            <
            Modal.Title > Thông báo < /Modal.Title> <
            /Modal.Header> <
            Modal.Body > { nd } < /Modal.Body> <
            Modal.Footer >
            <
            Button variant = "primary"
            onClick = { closeDidalog } >
            Đồng ý <
            /Button> <
            /Modal.Footer> <
            /Modal> <
            form className = "row tm-edit-product-form"
            onSubmit = { handleSubmit } >
            <
            div className = "col-xl-6 col-lg-6 col-md-12" >
            <
            div className = "form-group mb-3" >
            <
            label > Tên loại giày < /label> <
            input id = "ten_loai_giay"
            name = "ten_loai_giay"
            type = "text"
            value = { ten_loai_giay }
            className = "form-control validate"
            onChange = {
                (e) => onChangeInput(e) }
            /> {
                errors.ten_loai_giay && ( <
                    p className = "error" > { errors.ten_loai_giay } < /p>
                )
            } <
            /div> <
            div className = "form-group mb-3" >
            <
            label > Mô tả < /label> <
            textarea id = "mo_ta"
            name = "mo_ta"
            value = { mo_ta }
            className = "form-control validate"
            rows = "5"
            onChange = {
                (e) => onChangeInput(e) } >
            < /textarea> {
                errors.mo_ta && < p className = "error" > { errors.mo_ta } < /p>} <
                    /div> <
                    /div> <
                    div className = "col-xl-6 col-lg-6 col-md-12 mx-auto mb-4" >
                    <
                    div className = "tm-product-img-dummy mx-auto" > {!data.hinh_anh ? ( <
                            i className = "fas fa-cloud-upload-alt tm-upload-icon" > < /i>
                        ) : ( <
                            img src = { `http://localhost:8080/images/${data.hinh_anh}` }
                            />
                        )
                    } <
                    /div> {
                        errors.hinh_anh && < p className = "error" > { errors.hinh_anh } < /p>} <
                            div className = "custom-file mt-3 mb-3" >
                            <
                            input type = "file"
                        name = "file"
                        onChange = {
                            (e) => handleChange(e) }
                        /> <
                        button
                        type = "button"
                        className = "btn btn-primary btn-block text-uppercase add_type"
                        onClick = { onUpload } >
                            Upload <
                            /button> <
                            /div> <
                            /div> <
                            div className = "col-12" >
                            <
                            button
                        type = "submit"
                        className = "btn btn-primary btn-block text-uppercase add_type" >
                            Thực hiện <
                            /button> <
                            /div> <
                            /form> <
                            /div>
                    );
            }

            const mapDispatchToProps = (dispatch) => {
                return {
                    loagiayCreator: bindActionCreators(loaigiayAction, dispatch),
                    modalFormCreator: bindActionCreators(modalAction, dispatch),
                };
            };

            const mapStateToProps = (state) => {
                return {
                    ListLoaiGiay: state.loaigiay.ListLoaiGiay,
                    ListGiay: state.giay.ListGiay,
                    loaiGiayEditting: state.loaigiay.loaiGiayEditting,
                };
            };

            export default connect(mapStateToProps, mapDispatchToProps)(Component_type);