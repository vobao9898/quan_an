import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import Table from "react-bootstrap/Table";
import { Button } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import "./index.scss";
import * as action from "./../../../actions/modal";
import * as actionLoaiGiay from "./../../../actions/loai_giay";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import ComponentType from "./form_loai_giay/component";
import * as apiUpload from "./../../../api/loai_giay";
import * as notify from "./../../../contants/notifycation";
import Modal from "react-bootstrap/Modal";

function LoaiSanPham(props) {
    const { ListLoaiGiay, LoaiGiayAtionCrearotors } = props;
    const {
        setLoaiGiayEditting,
        deleteLoaiGiay,
        updateLoaiGiay,
        SetTH,
        filterThuongHieu,
    } = LoaiGiayAtionCrearotors;
    const { modalAtionCrearotors } = props;
    const { showModal, changeModalContent, changeModalTitle } =
    modalAtionCrearotors;
    const [show, setShow] = useState(false);
    const [nd, setNd] = useState("");
    const [dataTam, setDataTam] = useState({});
    const [searchTH, setSearchTH] = useState("");

    function ThemLoaiGiay() {
        SetTH();
        setSearchTH("");
        changeModalTitle("Thêm loại sản phẩm");
        changeModalContent( < ComponentType > < /ComponentType>);
            showModal();
        }

        const handleClose = () => {
            setShow(false);
        };

        function closeDidalog() {
            if (dataTam.id) {
                apiUpload
                    .deleteLoaiGiay(dataTam)
                    .then((response) => {
                        if (response.status === 200) {
                            if (response.data.success === 500) {
                                setShow(false);
                                setNd(
                                    `Bạn Không thể xóa loại giày này hãy cập nhật lại trạng thái của loại giày này`
                                );
                                setShow(true);
                                setDataTam({});
                            } else {
                                deleteLoaiGiay(dataTam.id);
                                notify.notificatonSuccess("Xóa thành công");
                                setDataTam({});
                            }
                        }
                    })
                    .catch((error) => {
                        console.log(error);
                    });
            }
            setShow(false);
        }
        useEffect(() => {
            const { LoaiGiayAtionCrearotors } = props;
            const { fetchListLoaiGiayRequest } = LoaiGiayAtionCrearotors;
            async function fetchPostsList() {
                try {
                    fetchListLoaiGiayRequest();
                } catch (error) {
                    console.log("failed to fetch post list", error.message);
                }
            }
            fetchPostsList();
        }, []);

        function deleteLoaigiays(data) {
            SetTH();
            setSearchTH("");
            setShow(true);
            setNd(`Bạn muốn xóa ${data.ten_loai_giay} ra khỏi danh sách`);
            setDataTam(data);
        }

        function update(data) {
            SetTH();
            setSearchTH("");
            setLoaiGiayEditting(data);
            changeModalTitle("Chỉnh sửa loại sản phẩm");
            changeModalContent( < ComponentType > < /ComponentType>);
                showModal();
            }

            function updateTrangThai(data) {
                SetTH();
                let t = 0;
                if (data.trang_thai === 0) {
                    t = 1;
                }
                const d = {
                    id: data.id,
                    ten_loai_giay: data.ten_loai_giay,
                    mo_ta: data.mo_ta,
                    trang_thai: t,
                    hinh_anh: data.hinh_anh,
                };
                apiUpload
                    .updateLoaiGiay(d)
                    .then((response) => {
                        if (response.status === 200) {
                            updateLoaiGiay(d);
                            notify.notificatonSuccess("Chỉnh sửa trạng thành công");
                        }
                    })
                    .catch((error) => {
                        console.log(error);
                    });
            }

            function searchThuongHieu(e) {
                e.persist();
                setSearchTH(e.target.value);
            }
            useEffect(() => {
                let delayDebounceFn = null;
                if (searchTH !== "") {
                    delayDebounceFn = setTimeout(() => {
                        filterThuongHieu(searchTH);
                    }, 1000);
                } else if (searchTH === "") {
                    SetTH();
                }
                return () => clearTimeout(delayDebounceFn);
            }, [searchTH]);
            return ( <
                div className = "product-admin" >
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
                div className = "type_product" >
                <
                div className = "type_product_search" >
                <
                Button variant = "success"
                onClick = { ThemLoaiGiay } >
                Thêm Loại sản phẩm <
                /Button> <
                div className = "search-thuonghieu" >
                <
                label > Tìm kiếm < /label> <
                input type = "text"
                value = { searchTH }
                placeholder = "Nhập tên thương hiệu"
                onChange = { searchThuongHieu }
                /> <
                /div> <
                /div> <
                Table striped bordered hover variant = "dark"
                className = "table_type khuyenmai" >
                <
                thead >
                <
                tr >
                <
                th > STT < /th> <
                th > Tên loại giày < /th> <
                th > mô tả < /th> <
                th > trạng thái < /th> <
                th > hình ảnh < /th> <
                th className = "width-DK" > Điều khiển < /th> <
                /tr> <
                /thead> <
                tbody > {
                    ListLoaiGiay ?
                    ListLoaiGiay.map((post, index) => {
                        return ( <
                            tr key = { index + 1 } >
                            <
                            td > { index + 1 } < /td> <
                            td className = "width-lsp" > { post.ten_loai_giay } < /td> <
                            td > { post.mo_ta } < /td> <
                            td className = "width-lsp" > {
                                post.trang_thai === 1 ? ( <
                                    Button onClick = {
                                        () => updateTrangThai(post) }
                                    variant = "success" >
                                    Còn hoạt động <
                                    /Button>
                                ) : ( <
                                    Button onClick = {
                                        () => updateTrangThai(post) }
                                    variant = "danger" >
                                    Không còn hoạt động <
                                    /Button>
                                )
                            } <
                            /td> <
                            td >
                            <
                            img src = { `http://localhost:8080/images/${post.hinh_anh}` }
                            alt = "" /
                            >
                            <
                            /td> <
                            td className = "Controls_type" >
                            <
                            Button variant = "primary update_type"
                            onClick = {
                                () => update(post) } >
                            sửa <
                            /Button> <
                            Button variant = "danger delete_type"
                            onClick = {
                                () => deleteLoaigiays(post) } >
                            Xóa <
                            /Button> <
                            /td> <
                            /tr>
                        );
                    }) :
                        null
                } <
                /tbody> <
                /Table> <
                /div> <
                /div>
            );
        }

        LoaiSanPham.propTypes = {
            showModal: PropTypes.func,
        };

        LoaiSanPham.defaultProps = {
            showModal: null,
        };

        const mapDispatchToProps = (dispatch) => {
            return {
                modalAtionCrearotors: bindActionCreators(action, dispatch),
                LoaiGiayAtionCrearotors: bindActionCreators(actionLoaiGiay, dispatch),
            };
        };

        const mapStateToProps = (state) => {
            return {
                ListLoaiGiay: state.loaigiay.ListLoaiGiay,
            };
        };

        export default connect(mapStateToProps, mapDispatchToProps)(LoaiSanPham);