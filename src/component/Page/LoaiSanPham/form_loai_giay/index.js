import React from 'react';
import CloseIcon from '@material-ui/icons/Close';
import PropTypes from 'prop-types';
import { Container } from 'react-bootstrap';
import './index.scss';
import * as action from './../../../../actions/modal';
import * as actionMauSac from './../../../../actions/mausac';
import * as actionSize from './../../../../actions/size';
import * as actionLoaiGiay from './../../../../actions/loai_giay';
import * as actionKhuyenMai from './../../../../actions/khuyenMai';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

function form_loai_giay(props) {
	function hideFormThemLoaiGiay() {
		const { modalAtionCrearotors, createMauSac, createLoaiGiay, createSize, createKhuyenMai } = props;
		const { hideModal } = modalAtionCrearotors;
		const { setMauSacEdittingNull } = createMauSac;
		const { setSizeEdittingNull } = createSize;
		const { setLoaiGiayEdittingNull } = createLoaiGiay;
		const { setKhuyenMaiEdittingNull } = createKhuyenMai;
		setMauSacEdittingNull();
		setSizeEdittingNull();
		setLoaiGiayEdittingNull();
		setKhuyenMaiEdittingNull();
		hideModal();
	}

	function showFormLoaiGiay() {
		const { showmodal, title, component } = props;
		if (showmodal) {
			return (
				<div className="form-type">
					<Container>
						<div className="row">
							<div className="col-xl-9 col-lg-10 col-md-12 col-sm-12 mx-auto">
								<div className="tm-bg-primary-dark tm-block tm-block-h-auto">
									<div className="row">
										<div className="col-12">
											<div className="form-type-title">
												<div className="title-type"> {title} </div>
												<CloseIcon
													className="close-type"
													onClick={hideFormThemLoaiGiay}
												></CloseIcon>
											</div>
										</div>
									</div>
									{component}
								</div>
							</div>
						</div>
					</Container>
				</div>
			);
		} else {
			return <div> </div>;
		}
	}
	return <div> {showFormLoaiGiay()} </div>;
}

form_loai_giay.propTypes = {
	showmodal: PropTypes.bool,
};

const mapDispatchToProps = (dispatch) => {
	return {
		modalAtionCrearotors: bindActionCreators(action, dispatch),
		createMauSac: bindActionCreators(actionMauSac, dispatch),
		createSize: bindActionCreators(actionSize, dispatch),
		createLoaiGiay: bindActionCreators(actionLoaiGiay, dispatch),
		createKhuyenMai: bindActionCreators(actionKhuyenMai, dispatch),
	};
};
const mapStateToProps = (state) => {
	return {
		showmodal: state.modal.showmodal,
		title: state.modal.title,
		component: state.modal.component,
	};
};

export default connect(mapStateToProps, mapDispatchToProps)(form_loai_giay);
