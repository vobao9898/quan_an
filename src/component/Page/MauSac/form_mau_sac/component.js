import React, { useEffect, useState } from "react";
import useform from "./useForm/useForm";
import "./index.scss";
import validate from "./validateForm/validateForm";
import * as api from "./../../../../api/mausac";
import { connect } from "react-redux";
import * as notify from "./../../../../contants/notifycation";
import { bindActionCreators } from "redux";
import * as actionMauSac from "./../../../../actions/mausac";
import * as modalAction from "./../../../../actions/modal";
import * as apiUpload from "./../../../../api/loai_giay";
import { Button } from "react-bootstrap";
import Moment from "moment";
import Modal from "react-bootstrap/Modal";

function Component_mau_sac(props) {
    const {
        onChangeInput,
        handleSubmit,
        data,
        setData,
        errors,
        handleChange,
        onUpload,
    } = useform(submit, validate, apiUpload);
    const { ten_mau_sac, hinh_anh } = data;
    const { mausacCreator, modalFormCreator, mausacEditting, ListMauSac } = props;
    const [show, setShow] = useState(false);
    const [nd, setNd] = useState("");

    const { hideModal } = modalFormCreator;
    const handleClose = () => {
        setShow(false);
    };

    function closeDidalog() {
        setShow(false);
    }

    function submit() {
        const { themMauSacsuccess, updateMauSac } = mausacCreator;
        const dataNew = {
            id: data.id,
            ten_mau_sac: data.ten_mau_sac,
            hinh_anh: data.hinh_anh,
            date_create: Moment(new Date()).format("YYYY-MM-DD HH:mm"),
            date_update: Moment(new Date()).format("YYYY-MM-DD HH:mm"),
        };

        let ktCS = ListMauSac.filter(
            (item) => item.ten_mau_sac !== mausacEditting.ten_mau_sac
        );
        let k = ktCS.filter((item) => item.ten_mau_sac === data.ten_mau_sac);
        const kt = ListMauSac.filter(
            (item) => item.ten_mau_sac === data.ten_mau_sac
        );

        if (mausacEditting.id) {
            if (k.length > 0) {
                setShow(true);
                setNd(`Màu sắc ${data.ten_mau_sac} đã có trong danh sách`);
            } else {
                api
                    .updateMauSac(dataNew)
                    .then((response) => {
                        if (response.status === 200) {
                            notify.notificatonSuccess("Chỉnh sửa thành công");
                            updateMauSac(dataNew);
                            hideModal();
                            setData({...data, id: 0, ten_mau_sac: "", hinh_anh: "" });
                        }
                    })
                    .catch((error) => {
                        console.log(error);
                    });
            }
        } else {
            if (kt.length > 0) {
                setShow(true);
                setNd(`Màu sắc ${data.ten_mau_sac} đã có trong danh sách`);
            } else {
                api
                    .ThemMauSac(dataNew)
                    .then((response) => {
                        if (response.status === 200) {
                            notify.notificatonSuccess("Thêm thành công");
                            themMauSacsuccess(response.data.data.insertId, dataNew);
                            hideModal();
                            setData((data) => ({
                                ...data,
                                id: 0,
                                ten_mau_sac: "",
                                hinh_anh: "",
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
        if (mausacEditting.id) {
            setData((data) => ({
                ...data,
                id: mausacEditting.id,
                ten_mau_sac: mausacEditting.ten_mau_sac,
                hinh_anh: mausacEditting.hinh_anh,
            }));
        }
    }, [mausacEditting]);

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
        label > Màu sắc < /label> <
        input id = "ten_mau_sac"
        name = "ten_mau_sac"
        type = "text"
        value = { ten_mau_sac }
        className = "form-control validate"
        onChange = {
            (e) => onChangeInput(e) }
        /> {
            errors.ten_mau_sac && ( <
                p className = "error" > { errors.ten_mau_sac } < /p>
            )
        } <
        /div> <
        /div> <
        div className = "col-xl-6 col-lg-6 col-md-12 mx-auto mb-4" >
        <
        div className = "tm-product-img-dummy mx-auto img-mau-sac" > {!hinh_anh ? ( <
                i className = "fas fa-cloud-upload-alt tm-upload-icon " > < /i>
            ) : ( <
                img src = { `http://localhost:8080/images/${data.hinh_anh}` } > < /img>
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
                /div>

            <
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

    Component_mau_sac.propTypes = {};

    const mapDispatchToProps = (dispatch) => {
        return {
            mausacCreator: bindActionCreators(actionMauSac, dispatch),
            modalFormCreator: bindActionCreators(modalAction, dispatch),
        };
    };

    const mapStateToProps = (state) => {
        return {
            mausacEditting: state.mausac.mausacEditting,
            ListMauSac: state.mausac.ListMauSac,
        };
    };

    export default connect(mapStateToProps, mapDispatchToProps)(Component_mau_sac);