import React, { useState } from 'react';
import Slidebar from './../Slidebar/index';
import './ListMenu.scss';

function DashBoard(props) {
	const { children, name } = props;
	const [sidebar, setSidebar] = useState(false);

	function onClickShowSlider(data) {
		setSidebar(!sidebar);
	}

	function onClickHide() {
		setSidebar(!sidebar);
	}
	return (
		<div key={name} className="chia">
			<div className={sidebar ? 'MuiBackdrop-root' : ''} onClick={onClickHide}></div>
			<Slidebar onClickShowSlider={onClickShowSlider} sidebar={sidebar}></Slidebar>
			{children}
		</div>
	);
}

export default DashBoard;
