import React, { useState, useEffect } from "react";
import DatePicker from "react-datepicker";
import "./index.scss";
import * as api from "./../../../api/khach_hang";
import { useHistory } from "react-router-dom";
import moment from "moment";
import Pagination from "react-js-pagination";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import * as action from "./../../../actions/modal";
// import ComponentKH from './form_khach_hang/component';
import { Button } from "react-bootstrap";
import Modal from "react-bootstrap/Modal";
import Table from "react-bootstrap/Table";

function KhachHang(props) {
  const [dataPage, setDataPage] = useState({
    offset: 0,
    search: "",
  });
  const [data, setData] = useState([]);
  const [activePage, setActivePage] = useState(1);
  const [allPage, setAllPage] = useState(0);
  const { search } = dataPage;
  const history = useHistory();

  const [dataTam, setDataTam] = useState({});
  const [show, setShow] = useState(false);
  const [nd, setNd] = useState("");

  useEffect(() => {
    if (props.match.params) {
      function fetchPostsLists() {
        if (props.match.params.page && !props.match.params.search) {
          let pageN = 0;
          let pageNumber = parseInt(props.match.params.page);
          if (pageNumber === 1) {
            pageN = 0;
          } else {
            pageN = pageNumber * 6 - 6;
          }
          setActivePage(parseInt(props.match.params.page));
          api.page({ offset: pageN }).then((res) => {
            const { data } = res;
            if (res.data.success === 1) {
              setData(res.data.data);
              api.getList().then((resP) => {
                if (resP.data.success === 1) {
                  setAllPage(resP.data.data.length);
                }
              });
            }
          });
        } else if (props.match.params.search) {
          let pageN = 0;
          if (props.match.params.page) {
            let pageNumber = parseInt(props.match.params.page);
            setDataPage({
              offset: pageN,
              search: props.match.params.search,
            });
            setActivePage(parseInt(props.match.params.page));
            if (pageNumber === 1) {
              pageN = 0;
            } else {
              pageN = pageNumber * 6 - 6;
            }
          } else {
            pageN = 0;
            setActivePage(1);
          }

          api
            .page({
              offset: pageN,
              search: props.match.params.search,
            })
            .then((res) => {
              const { data } = res;
              if (res.data.success === 1) {
                setData(res.data.data);
                api
                  .pageSearch({
                    offset: pageN,
                    search: props.match.params.search,
                  })
                  .then((res) => {
                    const { data } = res;
                    if (res.data.success === 1) {
                      setAllPage(res.data.data.length);
                    }
                  });
              }
            });
        } else {
          api.page({ offset: 0 }).then((res) => {
            const { data } = res;
            if (res.data.success === 1) {
              setData(res.data.data);
              api.getList().then((resP) => {
                if (resP.data.success === 1) {
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
    if (props.match.params.search) {
      history.push(
        `/khachhang/search=${props.match.params.search}/page=${pageNumber}`
      );
    } else {
      history.push(`/khachhang/page=${pageNumber}`);
    }
  }
  function onChangeSearch(e) {
    e.persist();
    setDataPage((dataPage) => ({ ...dataPage, search: e.target.value }));
  }
  function searchKhachHang() {
    history.push(`/khachhang/search=${search}`);
  }

  function deleteKH(data) {
    setShow(true);
    setNd(`Bạn có chắc chắn muốn xóa khách hàng ${data.ten}`);
    setDataTam(data);
  }
  function resetKhachHang() {
    history.push(`/khachhang`);
  }
  return (
    <div className="donhang">
      <div className="donhang-content">
        <div className="search">
          <h3 className="text-center title_khuyenmai">Khách hàng</h3>
          <div className="d-flex align-items-center">
            <div className="btnsearch">
              <input
                className="search"
                value={search}
                onChange={onChangeSearch}
                type="text"
                placeholder="Search Name"
              />
            </div>

            <div className="d-flex">
              <button
                type="button"
                className="btn btn-primary ml-2"
                onClick={searchKhachHang}
              >
                Search
              </button>
              <button
                type="button"
                className="btn btn-secondary ml-2"
                onClick={resetKhachHang}
              >
                Reset
              </button>
            </div>
          </div>
        </div>
        <div className="listusers">
          <Table striped bordered hover variant="dark" className="table_type">
            <thead>
              <tr>
                <th scope="col">ID</th>
                <th scope="col">Tên</th>
                <th scope="col">Phone</th>
                <th scope="col">Email</th>
                <th scope="col">Đăng nhập</th>
              </tr>
            </thead>
            <tbody>
              {data.length > 0 ? (
                data.map((item, index) => {
                  return (
                    <tr key={item.id}>
                      <td>{index + 1}</td>
                      <td>{`${item.ho_khach_hang} ${item.ten_khach_hang}`}</td>
                      <td>{item.phone}</td>
                      <td>{item.email}</td>
                      <td>
                        {item.facebook_id
                          ? "Đăng nhập từ Facebook"
                          : "Đăng nhập từ website"}
                      </td>
                    </tr>
                  );
                })
              ) : (
                <tr></tr>
              )}
            </tbody>
          </Table>
        </div>
        <div>
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
    </div>
  );
}
const mapDispatchToProps = (dispatch) => {
  return {};
};

const mapStateToProps = (state) => {
  return {};
};

export default connect(mapStateToProps, mapDispatchToProps)(KhachHang);
