import React, { useEffect, useState } from 'react';
import Table from 'react-bootstrap/Table';
import { Button } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import './index.scss';
import * as actionSize from './../../../actions/size';
import * as actionModal from './../../../actions/modal';
import ComponentMauSac from './form_mau_sac/component';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as api from './../../../api/size';
import * as notify from './../../../contants/notifycation';
import Modal from 'react-bootstrap/Modal';

function Size(props) {
	const { createSize, ListSize, modal } = props;
	const { deleteSize, setSizeEditting, filterSize, SetSize } = createSize;
	const [show, setShow] = useState(false);
	const [nd, setNd] = useState('');
	const [dataTam, setDataTam] = useState([]);
	const [searchSize, setSearchSize] = useState('');
	const handleClose = () => {
		setShow(false);
	};
	function closeDidalog() {
		if (dataTam.id) {
			api.deleteSize(dataTam)
				.then((response) => {
					if (response.data.success === 500) {
						setShow(false);
						setNd(`Bạn Không thể xóa size ${dataTam.ten_size} này`);
						setShow(true);
						setDataTam({});
					} else {
						deleteSize(dataTam.id);
						notify.notificatonSuccess('delete thành công');
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
		const { fetchListSizeRequest } = createSize;
		async function fetchPostsList() {
			try {
				await fetchListSizeRequest();
			} catch (error) {
				console.log('failed to fetch post list', error.message);
			}
		}
		fetchPostsList();
		return () => {
			console.log('ss');
			fetchPostsList();
		};
	}, []);

	function themSize() {
		SetSize();
		setSearchSize('');
		const { showModal, changeModalTitle, changeModalContent } = modal;
		changeModalTitle('Thêm size');
		changeModalContent(<ComponentMauSac></ComponentMauSac>);
		showModal();
	}

	function onDeleteSize(s) {
		SetSize();
		setSearchSize('');
		setNd(`Bạn có chắc chắn muốn xóa size ${s.ten_size}`);
		setShow(true);
		setDataTam(s);
	}

	function chinhSuaSize(data) {
		SetSize();
		setSearchSize('');
		setSizeEditting(data);
		const { showModal, changeModalTitle, changeModalContent } = modal;
		changeModalTitle('Chỉnh sửa size');
		changeModalContent(<ComponentMauSac></ComponentMauSac>);
		showModal();
	}
	function searchSizes(e) {
		e.persist();
		setSearchSize(e.target.value);
	}
	useEffect(() => {
		let delayDebounceFn = null;
		if (searchSize !== '') {
			delayDebounceFn = setTimeout(() => {
				filterSize(searchSize);
			}, 1000);
		} else if (searchSize === '') {
			SetSize();
		}
		return () => clearTimeout(delayDebounceFn);
	}, [searchSize]);
	return (
		<div className="product-admin">
			<Modal show={show} onHide={handleClose} backdrop="static" keyboard={false}>
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
			<div className="type_product">
				<div className="type_product_search">
					<Button variant="success" onClick={themSize}>
						Thêm size
					</Button>
					<div className="search-thuonghieu">
						<label>Tìm kiếm</label>
						<input type="text" value={searchSize} placeholder="Nhập tên size" onChange={searchSizes} />
					</div>
				</div>
				<Table striped bordered hover variant="dark" className="table_type">
					<thead>
						<tr>
							<th className="width-DK"> STT </th>
							<th>Size</th>
							<th className="width-DK">Điều khiển</th>
						</tr>
					</thead>
					<tbody>
						{ListSize
							? ListSize.map((post, index) => {
									return (
										<tr key={index + 1}>
											<td> {index + 1} </td>
											<td> {post.ten_size} </td>
											<td className="Controls_type">
												<Button
													variant="primary update_type"
													onClick={() => chinhSuaSize(post)}
												>
													sửa
												</Button>
												<Button variant="danger delete_type" onClick={() => onDeleteSize(post)}>
													Xóa
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
		createSize: bindActionCreators(actionSize, dispatch),
		modal: bindActionCreators(actionModal, dispatch),
	};
};

const mapStateToProps = (state) => {
	return {
		ListSize: state.size.ListSize,
	};
};

export default connect(mapStateToProps, mapDispatchToProps)(Size);
