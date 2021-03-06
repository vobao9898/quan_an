import React, { useEffect, useState } from "react";
import * as api from "./../../../api/dat_hang";
import moment from "moment";
import "./index.scss";
import { useHistory } from "react-router-dom";
import Modal from "react-bootstrap/Modal";
import { Button } from "react-bootstrap";
import Table from "react-bootstrap/Table";
import Carousel from "react-bootstrap/Carousel";

function XemDonHang(props) {
  const [data, setData] = useState({});
  const [status, setStatus] = useState("DAT_HANG");
  const [khuyenmai, setKhuyenMai] = useState([]);
  const [dataTK, setDataTK] = useState([]);
  const [show, setShow] = useState(false);
  const [nd, setNd] = useState("");
  const handleClose = () => {
    setShow(false);
  };

  function imageArray(h) {
    const d = h.split(",");
    let arr = [];
    for (var i = 0; i < d.length; i++) {
      arr.push(d[i]);
    }
    return arr;
  }

  function closeDidalog() {
    api
      .updateStatus({
        id: parseInt(props.match.params.id),
        trang_thai: status,
        date_udate: moment(new Date()).format("YYYY-MM-DD HH:mm"),
      })
      .then((response) => {
        if (response.status === 200) {
          history.push("/donhang");
        }
      })
      .catch((error) => {
        console.log(error);
      });

    setShow(false);
  }

  const history = useHistory();
  useEffect(() => {
    if (props.match.params) {
      function fetchPostsLists() {
        if (props.match.params.id) {
          api.getDonHangByID({ id: props.match.params.id }).then((res) => {
            if (res.status === 200) {
              api.getGiayByID({ id: props.match.params.id }).then((resP) => {
                if (resP.status === 200) {
                  let d = res.data.data[0];
                  d.chitiet = resP.data.data;
                  setData(d);
                  setStatus(d.trang_thai);
                }
              });
            }
          });
        }
      }

      fetchPostsLists();
    }
    return () => {
      setData([]);
    };
  }, [props.match.params]);
  function onchangeSelect(e) {
    e.persist();
    setStatus(e.target.value);
  }
  function getTongTien() {
    let tong = 0;
    if (data.id) {
      data.chitiet.forEach((item, index) => {
        tong += item.so_luong * item.gia_ban;
      });
    }
    return tong;
  }
  function onCancle() {
    history.push("/donhang");
  }
  function onUpdateTT() {
    setShow(true);
    setNd(`B???n c?? ch???c ch???n mu???n ch???nh s???a tr???ng th??i ????n h??ng ${status}`);
  }
  return (
    <div className="donhang menumonan">
      <div className="list card_dh">
        <Modal
          show={show}
          onHide={handleClose}
          backdrop="static"
          keyboard={false}
        >
          <Modal.Header closeButton>
            <Modal.Title>Th??ng b??o</Modal.Title>
          </Modal.Header>
          <Modal.Body>{nd}</Modal.Body>
          <Modal.Footer>
            <Button variant="primary" onClick={closeDidalog}>
              ?????ng ??
            </Button>
          </Modal.Footer>
        </Modal>

        <div className="donhang-content">
          <div className="search_reservation">
            <div className="title_reservation"></div>
            <div className="search_RVT">
              <div className="rights">
                <button
                  type="button"
                  className="btn btn-secondary mr-2"
                  onClick={onCancle}
                >
                  h???y b???
                </button>
                <button
                  type="button"
                  className="btn btn-primary"
                  onClick={onUpdateTT}
                >
                  Th???c hi???n
                </button>
              </div>
            </div>
          </div>

          <div className="listusers">
            <Table striped bordered hover variant="dark" className="table_type">
              <tbody>
                <tr>
                  <td>Ng?????i g???i</td>
                  <td colSpan={5}>{data.ten_khach_hang}</td>
                </tr>
                <tr>
                  <td>Ng?????i nh???n</td>
                  <td colSpan={5}>{data.ten_nguoi_nhan}</td>
                </tr>
                <tr>
                  <td>S??? ??i???n tho???i</td>
                  <td colSpan={5}>{data.sdt_nguoi_nhan}</td>
                </tr>

                <tr>
                  <td>?????a ch???</td>
                  <td colSpan={5}>{data.dia_chi_nguoi_nhan}</td>
                </tr>
                <tr>
                  <td>Th???i gian ?????t</td>
                  <td colSpan={5}>
                    {moment(data.tg_dathang).utc().format("YYYY-MM-DD HH:mm")}
                  </td>
                  {/* <td>Th???i gian Giao h??ng</td>
                  <td colSpan={3}>
                    {moment(data.tg_giaohang).utc().format("YYYY-MM-DD HH:mm")}
                  </td> */}
                </tr>
                <tr>
                  <td>T??nh tr???ng</td>
                  <td colSpan={5}>
                    <select
                      onChange={(e) => onchangeSelect(e)}
                      className="custom-select-product"
                      id="category"
                      value={status}
                    >
                      <option value="DAT_HANG">?????t h??ng</option>
                      <option value="XAC_NHAN">X??c nh???n</option>
                      <option value="HOAN_THANH">Ho??n th??nh</option>
                      <option value="HUY">H???y ????n h??ng</option>
                    </select>
                  </td>
                </tr>
                <tr>
                  <td>T???ng ti???n</td>
                  <td colSpan={5}>{getTongTien()}</td>
                </tr>
              </tbody>
            </Table>
          </div>
          <div className="title-sanpham">S???n ph???m</div>
          {data.id ? (
            <div className="row">
              {data.chitiet.map((list, i) => {
                return (
                  <div key={i + 1} className="col-sm-4">
                    <div className="row">
                      <div className="col-sm-12">
                        <div className="card">
                          <div className="img">
                            <Carousel>
                              {imageArray(list.hinh_anh).map(
                                (l, indexImage) => {
                                  return (
                                    <Carousel.Item key={indexImage}>
                                      <img
                                        className=" w-100"
                                        src={`https://nhatdoan.herokuapp.com/images/${l}`}
                                        alt=""
                                      />
                                    </Carousel.Item>
                                  );
                                }
                              )}
                            </Carousel>
                          </div>
                          <div className="card-body">
                            <h5 className="card-title fs-4">{list.ten_giay}</h5>

                            <p className="card-text">
                              Gi?? b??n: {list.gia_ban}??
                            </p>
                            <p className="card-text">
                              S??? l?????ng: {list.so_luong}
                            </p>

                            <p className="card-text">
                              T???ng ti???n: {list.gia_ban * list.so_luong}
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          ) : (
            <div></div>
          )}
        </div>
      </div>
    </div>
  );
}

XemDonHang.propTypes = {};

export default XemDonHang;
