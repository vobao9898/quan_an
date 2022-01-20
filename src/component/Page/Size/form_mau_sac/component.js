import React, { useEffect, useState } from 'react';

import useform from './useForm/useForm';
import validate from './validateForm/validateForm';
import * as api from './../../../../api/size';
import { connect } from 'react-redux';
import * as notify from './../../../../contants/notifycation';
import { bindActionCreators } from 'redux';
import * as actionSize from './../../../../actions/size';
import * as modalAction from './../../../../actions/modal';
import Modal from 'react-bootstrap/Modal';
import { Button } from 'react-bootstrap';
import Moment from 'moment';
function Component_mau_sac(props) {
	const { onChangeInput, handleSubmit, data, setData, errors } = useform(submit, validate);
	const { ten_size } = data;
	const { sizeCreator, modalFormCreator, sizeEditting, ListSize } = props;
	const { hideModal } = modalFormCreator;
	const [show, setShow] = useState(false);
	const [nd, setNd] = useState('');
	const handleClose = () => {
		setShow(false);
	};
	function closeDidalog() {
		setShow(false);
	}
	function submit() {
		const { themSizesuccess, updateSize } = sizeCreator;
		const dataNew = {
			id: data.id,
			ten_size: data.ten_size,
			date_create: Moment(new Date()).format('YYYY-MM-DD HH:mm'),
			date_update: Moment(new Date()).format('YYYY-MM-DD HH:mm'),
		};
		let ktCS = ListSize.filter((item) => item.ten_size !== parseInt(sizeEditting.ten_size));
		let k = ktCS.filter((item) => item.ten_size === parseInt(data.ten_size));
		const kt = ListSize.filter((item) => item.ten_size === parseInt(data.ten_size));

		if (data.ten_size < 0) {
			setShow(true);
			setNd(`Bạn hãy kiểm tra lại size giày phải lớn hơn 0`);
		} else {
			if (sizeEditting.id) {
				if (k.length > 0) {
					setShow(true);
					setNd(`Bạn hãy kiểm tra size ${data.ten_size} đã được thêm vào trước đó`);
				} else {
					api.updateSize(dataNew)
						.then((response) => {
							if (response.status === 200) {
								notify.notificatonSuccess('Chỉnh sửa thành công');
								updateSize(dataNew);
								hideModal();
								setData({ ...data, ten_size: '' });
							}
						})
						.catch((error) => {
							console.log(error);
						});
				}
			} else {
				if (kt.length > 0) {
					setShow(true);
					setNd(`Bạn hãy kiểm tra size ${data.ten_size} đã được thêm vào trước đó`);
				} else {
					api.ThemSize(dataNew)
						.then((response) => {
							if (response.status === 200) {
								notify.notificatonSuccess('Thêm thành công');
								themSizesuccess(response.data.data.insertId, dataNew);
								hideModal();
								setData((data) => ({
									...data,
									id: 0,
									ten_size: '',
								}));
							}
						})
						.catch((error) => {
							console.log(error);
						});
				}
			}
		}
	}

	useEffect(() => {
		if (sizeEditting.id) {
			setData((data) => ({
				...data,
				id: sizeEditting.id,
				ten_size: sizeEditting.ten_size,
			}));
		}
	}, [sizeEditting]);

	return (
		<div className=" tm-edit-product-row">
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
			<form className="row tm-edit-product-form" onSubmit={handleSubmit}>
				<div className="col-xl-6 col-lg-6 col-md-12">
					<div className="form-group mb-3">
						<label> Màu sắc </label>
						<input
							id="ten_size"
							name="ten_size"
							type="number"
							value={ten_size}
							className="form-control validate"
							onChange={(e) => onChangeInput(e)}
						/>
						{errors.ten_size && <p className="error"> {errors.ten_size} </p>}
					</div>
				</div>
				<div className="col-12">
					<button type="submit" className="btn btn-primary btn-block text-uppercase add_type">
						Thực hiện
					</button>
				</div>
			</form>
		</div>
	);
}

const mapDispatchToProps = (dispatch) => {
	return {
		sizeCreator: bindActionCreators(actionSize, dispatch),
		modalFormCreator: bindActionCreators(modalAction, dispatch),
	};
};

const mapStateToProps = (state) => {
	return {
		sizeEditting: state.size.sizeEditting,
		ListSize: state.size.ListSize,
	};
};

export default connect(mapStateToProps, mapDispatchToProps)(Component_mau_sac);
