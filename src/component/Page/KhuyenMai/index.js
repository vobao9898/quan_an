import React, { useEffect, useState } from 'react';
import Table from 'react-bootstrap/Table';
import { Button } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import './index.scss';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as actionKhuyenMai from './../../../actions/khuyenMai';
import Moment from 'moment';
import * as action from './../../../actions/modal';
import * as actionLoaiGiay from './../../../actions/loai_giay';
import * as actionGiay from './../../../actions/giay';
import * as actionctKM from './../../../actions/CT_khuyenMai';
import Modal from 'react-bootstrap/Modal';
import * as apiCTKM from './../../../api/ct_khuyen_mai';
import * as api from './../../../api/khuyen_mai';
import ComponentType from './component';
function KhuyenMai(props) {
	const {
		ListKhuyenMai,
		createKhuyenMai,
		modalAtionCrearotors,
		loaiGiayAtionCrearotors,
		giayAtionCrearotors,
		ctKhuyenMai,
		khuyenMaiEditting,
		CTKhuyenMaiEditting,
	} = props;
	const { setKhuyenMaiEditting, deleteKhuyenMai } = createKhuyenMai;
	const { showModal, changeModalContent, changeModalTitle } = modalAtionCrearotors;

	const { setCTKhuyenMaiEditting, deleteCTKhuyenMai } = ctKhuyenMai;
	const [show, setShow] = useState(false);
	const [nd, setNd] = useState('');

	const handleClose = () => {
		setShow(false);
	};
	function closeDidalog() {
		if (CTKhuyenMaiEditting.length > 0) {
			for (var i = 0; i < CTKhuyenMaiEditting.length; i++) {
				const datanews = {
					id_khuyen_mai: CTKhuyenMaiEditting[i].id_khuyen_mai,
					id_giay: CTKhuyenMaiEditting[i].id_giay,
				};
				apiCTKM
					.deleteCTKhuyenMai(datanews)
					.then((responseCTKM) => {
						if (responseCTKM.status === 200) {
							deleteCTKhuyenMai(datanews.id_khuyen_mai, datanews.id_giay);
						}
					})
					.catch((error) => {
						console.log(error);
					});
			}
			api.deleteKhuyenMai(khuyenMaiEditting)
				.then((responseCTKM) => {
					if (responseCTKM.status === 200) {
						deleteKhuyenMai(khuyenMaiEditting.id);
					}
				})
				.catch((error) => {
					console.log(error);
				});
		}
		setShow(false);
	}
	useEffect(() => {
		const { fetchListGiayRequest } = giayAtionCrearotors;
		const { fetchListCTKhuyenMaiRequest } = ctKhuyenMai;
		const { fetchListKhuyenMaiRequest } = createKhuyenMai;
		const { fetchListLoaiGiayRequest } = loaiGiayAtionCrearotors;
		async function fetchPostsList() {
			try {
				await fetchListKhuyenMaiRequest();
				await fetchListCTKhuyenMaiRequest();
				await fetchListGiayRequest();
				await fetchListLoaiGiayRequest();
			} catch (error) {
				console.log('failed to fetch post list', error.message);
			}
		}
		fetchPostsList();
	}, []);
	function themKhuyenMai() {
		changeModalTitle('Th??m khuy???n m??i');
		changeModalContent(<ComponentType></ComponentType>);
		showModal();
	}

	function updateKhuyenMai(data) {
		setKhuyenMaiEditting(data);
		setCTKhuyenMaiEditting(data);
		changeModalTitle('S???a khuy???n m??i');
		changeModalContent(<ComponentType></ComponentType>);
		showModal();
	}
	function deleteKM(data) {
		setKhuyenMaiEditting(data);
		setCTKhuyenMaiEditting(data);
		setShow(true);
		setNd(`B???n mu???n x??a ${data.ten_khuyen_mai} ra kh???i ch????ng tr??nh khuy???n m??i`);
	}
	function ktKhuyenMai(data) {
		var date1 = new Date(data.ngay_bat_dau);
		var date2 = new Date(data.ngay_ket_thuc);
		var date3 = new Date();
		var xhtml = '';
		if (date1 <= date3 && date3 <= date2) {
			xhtml = 'khuy???n m??i ??ang di???n ra';
		} else if (date3 > date2) {
			xhtml = 'khuy???n m??i ???? k???t th??c';
		} else if (date1 > date3) {
			xhtml = 'khuy???n m??i ch??a di???n ra';
		}
		return xhtml;
	}
	return (
		<div className="product-admin">
			<Modal show={show} onHide={handleClose} backdrop="static" keyboard={false}>
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
			<div className="type_product">
				<Button variant="success" onClick={themKhuyenMai}>
					Th??m khuy???n m??i
				</Button>
				<Table className="khuyenmai table_type" striped bordered hover variant="dark">
					<thead>
						<tr>
							<th>STT</th>
							<th>Ng??y b???t ?????u</th>
							<th>Ng??y k???t th??c</th>
							<th>T??n khuy???n m??i</th>
							<th>M?? t???</th>
							<th>Ph???n tr??m khuy???n m??i</th>
							<th>Tr???ng th??i</th>
							<th className="width-DK">??i???u khi???n</th>
						</tr>
					</thead>
					<tbody>
						{ListKhuyenMai
							? ListKhuyenMai.map((post, index) => {
									return (
										<tr key={index + 1}>
											<td>{index + 1}</td>
											<td>{Moment(post.ngay_bat_dau).utc().format('DD-MM-YYYY hh:mm')}</td>
											<td>{Moment(post.ngay_ket_thuc).utc().format('DD-MM-YYYY hh:mm')}</td>
											<td>{post.ten_khuyen_mai}</td>
											<td>{post.mo_ta}</td>
											<td>{`${post.phan_tram}%`}</td>
											<td></td>
											<td className="Controls_type">
												<Button
													className="khuyenmai-button"
													variant="primary update_type"
													onClick={() => updateKhuyenMai(post)}
												>
													s???a
												</Button>
												<Button
													className="khuyenmai-button"
													variant="danger delete_type"
													onClick={() => deleteKM(post)}
												>
													X??a
												</Button>
											</td>
										</tr>
									);
							  })
							: null}
					</tbody>
				</Table>
			</div>
		</div>
	);
}

const mapDispatchToProps = (dispatch) => {
	return {
		createKhuyenMai: bindActionCreators(actionKhuyenMai, dispatch),
		modalAtionCrearotors: bindActionCreators(action, dispatch),
		loaiGiayAtionCrearotors: bindActionCreators(actionLoaiGiay, dispatch),
		giayAtionCrearotors: bindActionCreators(actionGiay, dispatch),
		ctKhuyenMai: bindActionCreators(actionctKM, dispatch),
	};
};

const mapStateToProps = (state) => {
	return {
		ListKhuyenMai: state.khuyenmai.ListKhuyenMai,
		CTKhuyenMaiEditting: state.ctkhuyenmai.CTKhuyenMaiEditting,
		khuyenMaiEditting: state.khuyenmai.khuyenMaiEditting,
	};
};

export default connect(mapStateToProps, mapDispatchToProps)(KhuyenMai);
