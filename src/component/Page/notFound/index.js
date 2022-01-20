import React, { useEffect, useState } from 'react';
import './index.scss';
import imageNot from './../../../assets/image/404.png';
import { useHistory, useLocation } from 'react-router-dom';

function NotFound(props) {
	const history = useHistory();
	function backHone() {
		history.push('/admin');
	}
	return (
		<div className="notFound">
			<div className="heigth-not">
				<img className="img-not" src={imageNot}></img>
				<div className="title-big">Lỗi không tìm thấy trang</div>
				<button className="back-home" onClick={backHone}>
					VỀ TRANG CHỦ
				</button>
			</div>
		</div>
	);
}

export default NotFound;
