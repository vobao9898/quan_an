import React from 'react';
import * as FaIcons from 'react-icons/fa';
import * as AiIcons from 'react-icons/ai';
import * as IOIcon from 'react-icons/io';
import { Link, Redirect } from 'react-router-dom';
import './Slidebar.scss';
import { IconContext } from 'react-icons';
import * as routes from './../../contants/index';

function Slidebar(props) {
	function showSidebar() {
		onClickShowSlider(sidebar);
	}
	const { sidebar } = props;
	const { onClickShowSlider } = props;

	function logOut() {
		localStorage.clear();
		return (
			<Redirect
				to={{
					pathname: '/dangnhap',
					state: { from: props.location },
				}}
			></Redirect>
		);
	}
	return (
		<IconContext.Provider className="navbar-slide" value={{ color: '#fff' }}>
			<div className="navbar">
				<div className="navbar-base">
					<Link to="#" className="menu-bars">
						<FaIcons.FaBars onClick={showSidebar} />
					</Link>
					<div className="menu-bars-right">
						<IOIcon.IoMdNotifications className="icons-navbar"> </IOIcon.IoMdNotifications>
						<Link onClick={logOut} to="#">
							<FaIcons.FaUserLock className="icons-navbar"> </FaIcons.FaUserLock>
						</Link>
					</div>
				</div>
			</div>
			<nav className={sidebar ? 'nav-menu active' : 'nav-menu'}>
				<ul className="nav-menu-items" onClick={showSidebar}>
					<li className="navbar-toggle">
						<Link to="#" className="menu-bars">
							<AiIcons.AiOutlineClose />
						</Link>
					</li>
					{routes.ROUTES.map((item, index) => {
						return (
							<li key={index} className="row">
								<Link to={item.path}>
									<div id="icon"> {item.icon} </div> <div id="title"> {item.name} </div>
								</Link>
							</li>
						);
					})}
				</ul>
			</nav>
		</IconContext.Provider>
	);
}

Slidebar.propTypes = {};

export default Slidebar;
