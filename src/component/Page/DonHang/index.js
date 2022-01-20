import React, { useState, useEffect } from "react";
import "./index.scss";
import * as api from "../../../api/dat_hang";
import { useHistory } from "react-router-dom";
import moment from "moment";
import Pagination from "react-js-pagination";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import * as action from "../../../actions/modal";
// import * as actionKH from "../../../actions/khachhang";
import { Button } from "react-bootstrap";
import Modal from "react-bootstrap/Modal";
import { Link } from "react-router-dom";
import Table from "react-bootstrap/Table";

function DonHang(props) {
  const { modalAtionCrearotors } = props;
  const { showModal, changeModalContent, changeModalTitle } =
    modalAtionCrearotors;

  const [dataPage, setDataPage] = useState({
    offset: 0,
    trang_thai: "ALL",
  });
  const [data, setData] = useState([]);
  const [activePage, setActivePage] = useState(1);
  const [allPage, setAllPage] = useState(0);
  const { trang_thai } = dataPage;
  const history = useHistory();

  const [dataTam, setDataTam] = useState({});
  const [show, setShow] = useState(false);
  const [nd, setNd] = useState("");
  const handleClose = () => {
    setShow(false);
  };
  function closeDidalog() {
    setShow(false);
  }

  useEffect(() => {
    if (props.match.params) {
      function fetchPostsLists() {
        if (props.match.params.page && !props.match.params.trang_thai) {
          let pageN = 0;
          let pageNumber = parseInt(props.match.params.page);
          if (pageNumber === 1) {
            pageN = 0;
          } else {
            pageN = pageNumber * 6 - 6;
          }
          setActivePage(parseInt(props.match.params.page));

          api.pageDonHang({ offset: pageN }).then((res) => {
            const { data } = res;
            if (res.status === 200) {
              setData(res.data.data);
              api.getList().then((resP) => {
                if (resP.status === 200) {
                  setAllPage(resP.data.data.length);
                }
              });
            }
          });
        } else if (
          props.match.params.trang_thai &&
          props.match.params.trang_thai !== "ALL"
        ) {
          setActivePage(parseInt(props.match.params.page));
          let pageN = 0;
          let pageNumber = parseInt(props.match.params.page);
          setDataPage({
            offset: pageN,
            trang_thai: props.match.params.trang_thai,
          });

          if (pageNumber === 1) {
            pageN = 0;
          } else {
            pageN = pageNumber * 2 - 2;
          }

          api
            .pageDonHang({
              offset: pageN,
              trang_thai: props.match.params.trang_thai,
            })
            .then((res) => {
              const { data } = res;
              if (res.status === 200) {
                setData(res.data.data);
                api
                  .pageSearchDonHang({
                    offset: pageN,
                    trang_thai: props.match.params.trang_thai,
                  })
                  .then((res) => {
                    const { data } = res;
                    if (res.status === 200) {
                      setAllPage(res.data.data.length);
                    }
                  });
              }
            });
        } else {
          api.pageDonHang({ offset: 0 }).then((res) => {
            const { data } = res;
            if (res.status === 200) {
              setData(res.data.data);
              api.getList().then((resP) => {
                if (resP.status === 200) {
                  setAllPage(resP.data.data.length);
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
  function handlePageChange(pageNumber) {
    setActivePage(pageNumber);
    if (props.match.params.trang_thai) {
      history.push(
        `/donhang/trang_thai=${props.match.params.trang_thai}&&page=${pageNumber}`
      );
    } else {
      history.push(`/donhang/page=${pageNumber}`);
    }
  }
  function onchangeSelect(e) {
    e.persist();
    setDataPage((dataPage) => ({ ...dataPage, status: e.target.value }));
    history.push(`/donhang/trang_thai=${e.target.value}&&page=${1}`);
  }
  return (
    <div className="donhang">
      <Modal
        show={show}
        onHide={handleClose}
        backdrop="static"
        keyboard={false}
      >
        <Modal.Header closeButton>
          <Modal.Title>Thông báo</Modal.Title>
        </Modal.Header>
        <Modal.Body>{nd}</Modal.Body>
        <Modal.Footer>
          <Button variant="primary" onClick={closeDidalog}>
            Đồng ý
          </Button>
        </Modal.Footer>
      </Modal>

      <div className="donhang-content">
        <div className="search_reservation">
          <div className="search_RVT">
            <div className="form-group">
              <label className="title_TT">Tình trạng</label>
              <select
                onChange={(e) => onchangeSelect(e)}
                className="custom-select-product"
                id="category"
                value={trang_thai}
              >
                <option value="ALL">ALL</option>
                <option value="DAT_HANG">Đặt hàng</option>
                <option value="XAC_NHAN">Xác nhận</option>
                <option value="HOAN_THANH">Hoàn thành</option>
              </select>
            </div>
          </div>
        </div>
        <div className="list-donhang">
          <div className="listusers">
            <Table striped bordered hover variant="dark" className="table_type">
              <thead>
                <tr>
                  <th scope="col">ID</th>
                  <th scope="col">Tên Người nhận</th>
                  <th scope="col">Số điện thoại</th>
                  <th scope="col">Địa chỉ</th>
                  <th scope="col">Thời gian đặt hàng</th>
                  <th scope="col">Tình trạng</th>
                </tr>
              </thead>
              <tbody>
                {data.length > 0 ? (
                  data.map((item, index) => {
                    return (
                      <tr key={item.id}>
                        <td>{item.id}</td>
                        <td>
                          {item.trang_thai !== "HUY" ? (
                            <Link
                              className="xem-donhang"
                              to={`/xemdonhang/id=${item.id}`}
                            >
                              {item.ten_nguoi_nhan}
                            </Link>
                          ) : (
                            item.ten_nguoi_nhan
                          )}
                        </td>
                        <td>{item.sdt_nguoi_han}</td>
                        <td>{item.dia_chi_nguoi_nhan}</td>
                        <td>
                          {moment(item.tg_dathang)
                            .utc()
                            .format("YYYY-MM-DD HH:mm")}
                        </td>

                        <td>{item.trang_thai}</td>
                      </tr>
                    );
                  })
                ) : (
                  <tr></tr>
                )}
              </tbody>
            </Table>
          </div>
        </div>
        <div className="pagination">
          <Pagination
            prevPageText="prev"
            nextPageText="next"
            activePage={activePage}
            itemsCountPerPage={6}
            totalItemsCount={allPage}
            pageRangeDisplayed={6}
            onChange={handlePageChange}
          />
        </div>
      </div>
    </div>
  );
}
const mapDispatchToProps = (dispatch) => {
  return {
    // khachhangCreator: bindActionCreators(actionKH, dispatch),
    modalAtionCrearotors: bindActionCreators(action, dispatch),
  };
};

const mapStateToProps = (state) => {
  return {};
};

export default connect(mapStateToProps, mapDispatchToProps)(DonHang);
