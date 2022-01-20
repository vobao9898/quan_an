import React, { useState, useEffect } from "react";
import "./component_type.scss";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import * as khuyenMaiAction from "./../../../actions/khuyenMai";
import * as ctkhuyenMaiAction from "./../../../actions/CT_khuyenMai";
import * as modalAction from "./../../../actions/modal";
import useForm from "./useForm/useForm";
import validate from "./validateForm/validateForm";
import * as notify from "./../../../contants/notifycation";
import Moment from "moment";
import "react-datepicker/dist/react-datepicker.css";
import "bootstrap/dist/css/bootstrap.min.css";
import DatePicker from "react-datepicker";
import Carousel from "react-bootstrap/Carousel";
import NavigateNextIcon from "@material-ui/icons/NavigateNext";
import NavigateBeforeIcon from "@material-ui/icons/NavigateBefore";
import * as apiUpload from "../../../api/loai_giay";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import * as apiKM from "./../../../api/khuyen_mai";
import * as apiCTKM from "./../../../api/ct_khuyen_mai";

function Component_type(props) {
    const {
        onUpload,
        onChangeInput,
        onchangeSelect,
        handleChange,
        handleSubmit,
        file,
        data,
        setData,
        errors,
        khuyenmai,
        setKhuyenmai,
        addCTKM,
        setAddCTKM,
        deleteCTKM,
        setDeleteCTKM,
    } = useForm(submit, validate, apiUpload);
    const {
        ctkhuyenMaiCreator,
        khuyenMaiCreator,
        modalFormCreator,
        ListLoaiGiay,
        ListGiay,
        khuyenMaiEditting,
    } = props;
    const { themKhuyenMai, updateKhuyenMai } = khuyenMaiCreator;
    const { themCTKhuyenMais, deleteCTKhuyenMai } = ctkhuyenMaiCreator;
    const { hideModal } = modalFormCreator;
    const [show, setShow] = useState(false);
    const [nd, setNd] = useState("");
    const [g, setG] = useState([]);
    const [search, setSearch] = useState([]);
    const [indexTam, setIndexTam] = useState(-1);
    const [indexTamGiay, setIndexTamGiay] = useState(-1);
    const [boolThemSP, setBoolThemSP] = useState(false);
    const handleClose = () => {
        setIndexTam(-1);
        setIndexTamGiay(-1);
        setShow(false);
    };

    function closeDidalog() {
        if (indexTam !== -1) {
            if (boolThemSP) {
                const s = addCTKM;
                s.push(g[indexTam]);
                setAddCTKM(s);
                let d = khuyenmai;
                d.push(g[indexTam]);
                setKhuyenmai(d);
                let dd = g;
                dd.splice(indexTam, 1);
                setG(dd);
            } else {
                let d = khuyenmai;
                d.push(g[indexTam]);
                setKhuyenmai(d);
                let dd = g;
                dd.splice(indexTam, 1);
                setG(dd);
            }
        }
        if (indexTamGiay !== -1) {
            if (khuyenMaiEditting.id) {
                const s = deleteCTKM;
                s.push(khuyenmai[indexTamGiay]);
                setDeleteCTKM(s);
                let dd = khuyenmai;
                dd.splice(indexTamGiay, 1);
                setKhuyenmai(dd);
            } else {
                let d = g;
                d.push(khuyenmai[indexTamGiay]);
                setG(d);
                let dd = khuyenmai;
                dd.splice(indexTamGiay, 1);
                setKhuyenmai(dd);
            }
        }
        setShow(false);
        setIndexTam(-1);
        setIndexTamGiay(-1);
    }

    const { id_loai_giay } = ListLoaiGiay;

    function handleformfromdate(date) {
        const date1 = new Date();
        const date2 = new Date(date);
        if (date1 > date2) {
            setShow(true);
            setNd(
                "Vui lòng chọn mốc thời gian tại thời điểm hiện tại hoặc tương lai"
            );
        } else {
            setData((data) => ({...data, ngay_bat_dau: date }));
        }
    }

    function handleformtodate(date) {
        const date1 = new Date(date);
        const date2 = new Date(ngay_bat_dau);
        if (date1 < date2) {
            setShow(true);
            setNd("Vui lòng chọn mốc thời gian lớn hơn ngày bắt đầu");
        } else {
            setData((data) => ({...data, ngay_ket_thuc: date }));
        }
    }

    function imageArray(h) {
        const d = h.split(",");
        let arr = [];
        for (var i = 0; i < d.length; i++) {
            arr.push(d[i]);
        }
        return arr;
    }

    function onchangeSelectLG(e) {
        let da = ListGiay.filter(
            (item) => item.id_loai_giay === parseInt(e.target.value)
        );
        let d = [];
        if (khuyenmai.length > 0) {
            var h = 0;
            for (h; h < da.length; h++) {
                let danew = khuyenmai.filter((item) => {
                    return item.id === da[h].id;
                });
                if (danew.length === 0) {
                    d.push(da[h]);
                }
            }
        } else {
            d = da;
        }
        setG(d);
    }

    function inputSearch(e) {
        setSearch(e.target.value);
    }

    function selectGiay(index) {
        setIndexTam(index);
        setShow(true);
        setNd(`Bạn muốn thêm ${g[index].ten_giay} vào chương trình khuyến mãi`);
    }

    function deleteSelectGiay(index) {
        setIndexTamGiay(index);
        setShow(true);
        setNd(
            `Bạn muốn xóa ${khuyenmai[index].ten_giay} ra khỏi chương trình khuyến mãi`
        );
    }

    function submit() {
        const to_date = Moment(data.ngay_bat_dau).format("YYYY-MM-DD HH:mm");
        const from_date = Moment(data.ngay_ket_thuc).format("YYYY-MM-DD HH:mm");
        const dataNew = {
            id: data.id,
            ngay_bat_dau: to_date,
            ngay_ket_thuc: from_date,
            ten_khuyen_mai: data.ten_khuyen_mai,
            mo_ta: data.mo_ta,
            phan_tram: data.phan_tram,
            hinh_anh: data.hinh_anh,
            trang_thai: data.trang_thai,
            date_create: Moment(data.date_create).format("YYYY-MM-DD HH:mm"),
            date_update: Moment(new Date()).format("YYYY-MM-DD HH:mm"),
        };
        if (khuyenMaiEditting.id) {
            apiKM
                .updateKhuyenMai(dataNew)
                .then((response) => {
                    if (response.status === 200) {
                        updateKhuyenMai(data);
                        if (addCTKM.length > 0) {
                            for (var i = 0; i < addCTKM.length; i++) {
                                const datanews = {
                                    id_khuyen_mai: data.id,
                                    id_giay: addCTKM[i].id,
                                    gia_ban_khuyen_mai: addCTKM[i].gia_ban -
                                        (addCTKM[i].gia_ban * data.phan_tram) / 100,
                                };
                                apiCTKM
                                    .ThemCTKhuyenMai(datanews)
                                    .then((responseCTKM) => {
                                        if (responseCTKM.status === 200) {
                                            themCTKhuyenMais(datanews);
                                        }
                                    })
                                    .catch((error) => {
                                        console.log(error);
                                    });
                            }
                        }
                        if (deleteCTKM.length > 0) {
                            for (let i = 0; i < deleteCTKM.length; i++) {
                                const datanews = {
                                    id_khuyen_mai: data.id,
                                    id_giay: deleteCTKM[i].id,
                                };
                                apiCTKM
                                    .deleteCTKhuyenMai(datanews)
                                    .then((responseCTKM) => {
                                        if (responseCTKM.status === 200) {
                                            deleteCTKhuyenMai(
                                                datanews.id_khuyen_mai,
                                                datanews.id_giay
                                            );
                                        }
                                    })
                                    .catch((error) => {
                                        console.log(error);
                                    });
                            }
                        }
                        notify.notificatonSuccess("Update khuyến mãi thành công");
                        setData((data) => ({
                            ...data,
                            id: 0,
                            ngay_bat_dau: new Date(),
                            ngay_ket_thuc: new Date(),
                            ten_khuyen_mai: "",
                            mo_ta: "",
                            phan_tram: 0,
                            hinh_anh: "",
                            trang_thai: 1,
                            date_create: new Date(),
                            date_update: new Date(),
                        }));
                        hideModal();
                    }
                })
                .catch((error) => {
                    console.log(error);
                });
        } else {
            apiKM
                .ThemKhuyenMai(dataNew)
                .then((response) => {
                    if (response.status === 200) {
                        themKhuyenMai(response.data.data.insertId, data);
                        notify.notificatonSuccess("Thêm khuyến mãi thành công");
                        if (khuyenmai.length > 0) {
                            for (var i = 0; i < khuyenmai.length; i++) {
                                const datanews = {
                                    id_khuyen_mai: response.data.data.insertId,
                                    id_giay: khuyenmai[i].id,
                                    gia_ban_khuyen_mai: khuyenmai[i].gia_ban -
                                        (khuyenmai[i].gia_ban * data.phan_tram) / 100,
                                };
                                apiCTKM
                                    .ThemCTKhuyenMai(datanews)
                                    .then((responseCTKM) => {
                                        if (responseCTKM.status === 200) {
                                            themCTKhuyenMais(datanews);
                                        }
                                    })
                                    .catch((error) => {
                                        console.log(error);
                                    });
                            }
                        }
                        setData((data) => ({
                            ...data,
                            id: 0,
                            ngay_bat_dau: new Date(),
                            ngay_ket_thuc: new Date(),
                            ten_khuyen_mai: "",
                            mo_ta: "",
                            phan_tram: 0,
                            hinh_anh: "",
                            trang_thai: 1,
                            date_create: new Date(),
                            date_update: new Date(),
                        }));
                        hideModal();
                    }
                })
                .catch((error) => {
                    console.log(error);
                });
        }
    }
    useEffect(() => {
        const { khuyenMaiEditting, CTKhuyenMaiEditting, ListGiay } = props;

        if (khuyenMaiEditting.id) {
            const dataNew = {
                id: khuyenMaiEditting.id,
                ngay_bat_dau: new Date(khuyenMaiEditting.ngay_bat_dau),
                ngay_ket_thuc: new Date(khuyenMaiEditting.ngay_ket_thuc),
                ten_khuyen_mai: khuyenMaiEditting.ten_khuyen_mai,
                mo_ta: khuyenMaiEditting.mo_ta,
                phan_tram: khuyenMaiEditting.phan_tram,
                hinh_anh: khuyenMaiEditting.hinh_anh.toString(),
                trang_thai: khuyenMaiEditting.trang_thai,
                date_create: new Date(khuyenMaiEditting.date_create),
                date_update: new Date(),
            };
            setData(dataNew);
            let dNew = [];
            for (var i = 0; i < ListGiay.length; i++) {
                let dataKM = CTKhuyenMaiEditting.filter(
                    (item) => item.id_giay === ListGiay[i].id
                );
                if (dataKM.length > 0) {
                    dNew.push(ListGiay[i]);
                }
            }
            setKhuyenmai(dNew);
        }
    }, [khuyenMaiEditting]);

    const {
        ngay_bat_dau,
        ngay_ket_thuc,
        ten_khuyen_mai,
        mo_ta,
        phan_tram,
        hinh_anh,
    } = data;

    function boolThemSPSP() {
        setBoolThemSP(true);
    }

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
            label className = "margin-right" > Ngày bắt đầu < /label> <
            DatePicker selected = { ngay_bat_dau }
            value = { ngay_bat_dau }
            setStartDate = { new Date() }
            onChange = {
                (date) => handleformfromdate(date) }
            showTimeSelect timeFormat = "HH:mm"
            timeIntervals = { 5 }
            timeCaption = "time"
            dateFormat = "dd-MM-yyyy HH:mm a"
            name = "from_date" /
            >
            <
            /div> <
            div className = "form-group mb-3" >
            <
            label className = "margin-right" > Ngày kết thúc < /label> <
            DatePicker selected = { ngay_ket_thuc }
            value = { ngay_ket_thuc }
            onChange = {
                (date) => handleformtodate(date) }
            showTimeSelect timeFormat = "HH:mm"
            timeIntervals = { 5 }
            timeCaption = "time"
            dateFormat = "dd-MM-yyyy HH:mm a"
            name = "from_date" /
            >
            <
            /div> {
                errors.date_KM && < p className = "error" > { errors.date_KM } < /p>} <
                    div className = "form-group mb-3" >
                    <
                    label > Tên khuyến mãi < /label> <
                    input
                id = "ten_khuyen_mai"
                name = "ten_khuyen_mai"
                type = "text"
                value = { ten_khuyen_mai }
                className = "form-control validate"
                onChange = {
                    (e) => onChangeInput(e) }
                /> {
                    errors.ten_khuyen_mai && ( <
                        p className = "error" > { errors.ten_khuyen_mai } < /p>
                    )
                } <
                /div> <
                div className = "form-group mb-3" >
                    <
                    label > Mô tả chi tiết < /label> <
                    textarea
                id = "mo_ta"
                name = "mo_ta"
                type = "text"
                rows = "3"
                value = { mo_ta }
                className = "form-control validate"
                onChange = {
                    (e) => onChangeInput(e) }
                /> {
                    errors.mo_ta && < p className = "error" > { errors.mo_ta } < /p>} <
                        /div> <
                        div className = "form-group mb-3" >
                        <
                        label > Phần trăm < /label> <
                        input
                    type = "number"
                    id = "phan_tram"
                    name = "phan_tram"
                    value = { phan_tram }
                    className = "form-control validate"
                    onChange = {
                        (e) => onChangeInput(e) }
                    /> {
                        errors.phan_tram && < p className = "error" > { errors.phan_tram } < /p>} <
                            /div> <
                            /div> <
                            div className = "col-xl-6 col-lg-6 col-md-12 mx-auto mb-4" >
                            <
                            div className = "title-hinhanh" > Lựa chọn hình ảnh cho màu sắc < /div> <
                            div className = "tm-product-img-dummy" > {
                                hinh_anh === "" ? ( <
                                    i className = "fas fa-cloud-upload-alt tm-upload-icon" > < /i>
                                ) : ( <
                                    Carousel nextIcon = { <
                                        span className = "glyphicon glyphicon-glass" >
                                        <
                                        NavigateNextIcon className = "iconCoursel" > < /NavigateNextIcon> <
                                        /span>
                                    }
                                    prevIcon = { <
                                        span className = "glyphicon-pre glyphicon-glass" >
                                        <
                                        NavigateBeforeIcon className = "iconCoursel" > < /NavigateBeforeIcon> <
                                        /span>
                                    } >
                                    {
                                        imageArray(hinh_anh).map((l, indexImage) => {
                                            return ( <
                                                Carousel.Item key = { indexImage } >
                                                <
                                                img className = "d-block w-100"
                                                src = { `http://localhost:8080/images/${l}` }
                                                alt = "" /
                                                >
                                                <
                                                /Carousel.Item>
                                            );
                                        })
                                    } <
                                    /Carousel>
                                    // <img
                                    // 	src={`http://localhost:8080/images/${data.hinh_anh}`}
                                    // ></img>
                                )
                            } <
                            /div> { /* {errors.hinh_anh && <p className="error"> {errors.hinh_anh} </p>} */ } <
                            div className = "custom-file mt-3 mb-3" >
                            <
                            input
                        type = "file"
                        name = "file"
                        accept = "image/*"
                        multiple
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
                            div className = "ct" >
                            <
                            div className = "title-ct-khuyenmai" >
                            Lựa chọn giày cho chương trình khuyến mãi <
                            /div> <
                            div className = "content-select-giay" > {
                                khuyenMaiEditting.id ? (
                                    boolThemSP === true ? ( <
                                        div className = "title-select-giay" >
                                        <
                                        div className = "thuonghieu" >
                                        <
                                        label > Thương hiệu < /label> <
                                        select onChange = {
                                            (e) => onchangeSelectLG(e) }
                                        className = "custom-select tm-select-loaigiay"
                                        id = "category"
                                        value = { id_loai_giay } >
                                        <
                                        option value = { 0 } > < /option> {
                                            ListLoaiGiay.map((l, index) => {
                                                return ( <
                                                    option key = { l.id }
                                                    value = { l.id } > { l.ten_loai_giay } <
                                                    /option>
                                                );
                                            })
                                        } <
                                        /select> <
                                        /div> <
                                        /div>
                                    ) : ( <
                                        Button variant = "primary"
                                        className = "padding-km"
                                        onClick = { boolThemSPSP } >
                                        Thêm giày cho chương trình khuyến mãi <
                                        /Button>
                                    )
                                ) : ( <
                                    div className = "title-select-giay" >
                                    <
                                    div className = "thuonghieu" >
                                    <
                                    label > Thương hiệu < /label> <
                                    select onChange = {
                                        (e) => onchangeSelectLG(e) }
                                    className = "custom-select tm-select-loaigiay"
                                    id = "category"
                                    value = { id_loai_giay } >
                                    <
                                    option value = { 0 } > < /option> {
                                        ListLoaiGiay.map((l, index) => {
                                            return ( <
                                                option key = { l.id }
                                                value = { l.id } > { l.ten_loai_giay } <
                                                /option>
                                            );
                                        })
                                    } <
                                    /select> <
                                    /div> <
                                    /div>
                                )
                            } <
                            div className = "list-giay" > {
                                g.length > 0 ? ( <
                                    div className = "khung-select-giay" >
                                    <
                                    div className = "title-ct-khuyenmai" >
                                    Nhấn vào sản phẩm để lựa chọn sản phẩm <
                                    /div>

                                    {
                                        g.map((item, index) => {
                                            return ( <
                                                div key = { item.id }
                                                className = "tiltle-giay"
                                                title = { item.ten_giay }
                                                onClick = {
                                                    () => selectGiay(index) } >
                                                { item.ten_giay } <
                                                /div>
                                            );
                                        })
                                    } <
                                    /div>
                                ) : ( <
                                    div > < /div>
                                )
                            } <
                            /div> <
                            /div> <
                            div className = "selected-giay" >
                            <
                            div className = "title-ct-khuyenmai" >
                            Các sản phẩm đã được lựa chọn trong chương trình khuyến mãi <
                            /div> {
                                khuyenmai.length > 0 ? ( <
                                    div className = "khung-selected-giay" > {
                                        khuyenmai.map((item, index) => {
                                            return ( <
                                                div key = { item.id }
                                                className = "tiltle-giay"
                                                title = { item.ten_giay }
                                                onClick = {
                                                    () => deleteSelectGiay(index) } >
                                                { item.ten_giay } <
                                                /div>
                                            );
                                        })
                                    } <
                                    /div>
                                ) : ( <
                                    div > < /div>
                                )
                            } <
                            /div> <
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

                // Component_type.propTypes = {
                // 	loagiayCreator: PropTypes.func,
                // };

                // Component_type.defaultProps = {
                // 	loagiayCreator: null,
                // };

                const mapDispatchToProps = (dispatch) => {
                    return {
                        khuyenMaiCreator: bindActionCreators(khuyenMaiAction, dispatch),
                        ctkhuyenMaiCreator: bindActionCreators(ctkhuyenMaiAction, dispatch),
                        modalFormCreator: bindActionCreators(modalAction, dispatch),
                    };
                };

                const mapStateToProps = (state) => {
                    return {
                        ListLoaiGiay: state.loaigiay.ListLoaiGiay,
                        ListGiay: state.giay.ListGiay,
                        CTKhuyenMaiEditting: state.ctkhuyenmai.CTKhuyenMaiEditting,
                        khuyenMaiEditting: state.khuyenmai.khuyenMaiEditting,
                    };
                };

                export default connect(mapStateToProps, mapDispatchToProps)(Component_type);