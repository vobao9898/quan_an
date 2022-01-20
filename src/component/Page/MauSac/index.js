import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import Table from "react-bootstrap/Table";
import { Button } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import "./index.scss";
import * as actionMauSac from "./../../../actions/mausac";
import * as actionModal from "./../../../actions/modal";
import ComponentMauSac from "./form_mau_sac/component";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import * as api from "./../../../api/mausac";
import * as notify from "./../../../contants/notifycation";
import Modal from "react-bootstrap/Modal";

function MauSac(props) {
    const { createMauSac, ListMauSac, modal } = props;
    const { deleteMauSac, setMauSacEditting, filterMauSac, SetMS } = createMauSac;
    const [dataTam, setDataTam] = useState({});
    const [show, setShow] = useState(false);
    const [nd, setNd] = useState("");
    const [searchMS, setSearchMS] = useState("");
    const handleClose = () => {
        setShow(false);
    };

    function closeDidalog() {
        if (dataTam.id) {
            api
                .deleteMauSac(dataTam)
                .then((response) => {
                    if (response.status === 200) {
                        if (response.data.success === 500) {
                            setShow(false);
                            setNd(`Bạn Không thể xóa màu sắc ${dataTam.ten_mau_sac} này`);
                            setShow(true);
                            setDataTam({});
                        } else {
                            deleteMauSac(dataTam.id);
                            notify.notificatonSuccess("delete thành công");
                        }
                    }
                })
                .catch((error) => {
                    console.log(error);
                });
        }
        setDataTam({});
        setShow(false);
    }

    useEffect(() => {
        const { createMauSac } = props;
        const { fetchListMauSacRequest } = createMauSac;

        function fetchPostsList() {
            try {
                fetchListMauSacRequest();
            } catch (error) {
                console.log("failed to fetch post list", error.message);
            }
        }
        fetchPostsList();
    }, []);

    function themMauSac() {
        SetMS();
        setSearchMS("");
        const { showModal, changeModalTitle, changeModalContent } = modal;
        changeModalTitle("Thêm màu sắc");
        changeModalContent( < ComponentMauSac > < /ComponentMauSac>);
            showModal();
        }

        function ondeleteMauSac(data) {
            SetMS();
            setSearchMS("");
            setNd(`Bạn có chắc chắn muốn xóa size ${data.ten_mau_sac}`);
            setShow(true);
            setDataTam(data);
        }

        function onupdateMauSac(data) {
            SetMS();
            setSearchMS("");
            setMauSacEditting(data);
            const { showModal, changeModalTitle, changeModalContent } = modal;
            changeModalTitle("Chỉnh sửa màu sắc");
            changeModalContent( < ComponentMauSac > < /ComponentMauSac>);
                showModal();
            }

            function searchMauSac(e) {
                e.persist();
                setSearchMS(e.target.value);
            }
            useEffect(() => {
                let delayDebounceFn = null;
                if (searchMS !== "") {
                    delayDebounceFn = setTimeout(() => {
                        filterMauSac(searchMS);
                    }, 1000);
                } else if (searchMS === "") {
                    SetMS();
                }
                return () => clearTimeout(delayDebounceFn);
            }, [searchMS]);

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
                onClick = { themMauSac } >
                Thêm màu sắc <
                /Button> <
                div className = "search-thuonghieu" >
                <
                label > Tìm kiếm < /label> <
                input type = "text"
                value = { searchMS }
                placeholder = "Nhập tên Màu sắc"
                onChange = { searchMauSac }
                /> <
                /div> <
                /div> <
                Table striped bordered hover variant = "dark"
                className = "table_type" >
                <
                thead >
                <
                tr >
                <
                th > STT < /th> <
                th > Màu sắc < /th> <
                th > Hình ảnh < /th> <
                th className = "width-DK" > Điều khiển < /th> <
                /tr> <
                /thead> <
                tbody > {
                    ListMauSac ?
                    ListMauSac.map((post, index) => {
                        return ( <
                            tr key = { index + 1 } >
                            <
                            td > { index + 1 } < /td> <
                            td > { post.ten_mau_sac } < /td> <
                            td >
                            <
                            img src = { `http://localhost:8080/images/${post.hinh_anh}` } >
                            < /img> <
                            /td> <
                            td className = "Controls_type" >
                            <
                            Button variant = "primary update_type"
                            onClick = {
                                () => onupdateMauSac(post) } >
                            sửa <
                            /Button> <
                            Button variant = "danger delete_type"
                            onClick = {
                                () => ondeleteMauSac(post) } >
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

        MauSac.propTypes = {
            ListMauSac: PropTypes.array,
        };

        MauSac.defaultProps = {
            ListMauSac: [],
        };

        const mapDispatchToProps = (dispatch) => {
            return {
                createMauSac: bindActionCreators(actionMauSac, dispatch),
                modal: bindActionCreators(actionModal, dispatch),
            };
        };

        const mapStateToProps = (state) => {
            return {
                ListMauSac: state.mausac.ListMauSac,
            };
        };

        export default connect(mapStateToProps, mapDispatchToProps)(MauSac);