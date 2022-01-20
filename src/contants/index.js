import React from "react";
import LoaiSanPham from "./../component/Page/LoaiSanPham/index";
import SanPham from "./../component/Page/SanPham/index";
import KhachHang from "./../component/Page/KhachHang/index";
import DonHang from "./../component/Page/DonHang/index";
import KhuyenMai from "./../component/Page/KhuyenMai/index";
import PhanHoi from "./../component/Page/PhanHoi/index";
import TrangChu from "./../component/Page/TrangChu/index";
import MauSac from "./../component/Page/MauSac/index";
import Size from "./../component/Page/Size/index";
import HomeIcon from "@material-ui/icons/Home";
import XemDonHang from "./../component/Page/XemDonHang/index";
import {
  AssignmentTurnedIn,
  AddShoppingCart,
  PersonAdd,
  ListAlt,
  Timer10,
  RecordVoiceOver,
} from "@material-ui/icons";
import Login from "./../commom/Login/index";
import Taikhoan from "./../component/Page/TaiKhoan/index";
import NotFound from "./../component/Page/notFound/index";

// export const ROUTES_LOGIN = [
// 	{
// 	  path: '/login',
// 	  name: 'Đăng nhập',
// 	  component: Login,
// 	  exact: true,
// 	},
//   ];

export const API_ENPOINT = "http://localhost:8080";
export const ROUTESLG = [
  {
    path: "/dangnhap",
    name: "Trang đămg nhập",
    exact: false,
    component: Login,
  },
];

export const ROUTES = [
  {
    path: "/",
    name: "Trang chủ",
    exact: true,
    component: TrangChu,
    icon: <HomeIcon> </HomeIcon>,
  },
  {
    path: "/ThuongHieu",
    name: "Thương hiệu",
    exact: false,
    component: LoaiSanPham,
    icon: <AssignmentTurnedIn> </AssignmentTurnedIn>,
  },
  {
    path: "/SanPham",
    name: "Sản phẩm",
    exact: false,
    component: SanPham,
    icon: <AddShoppingCart> </AddShoppingCart>,
  },
  {
    path: "/MauSac",
    name: "Màu Sắc",
    exact: false,
    component: MauSac,
    icon: <AddShoppingCart> </AddShoppingCart>,
  },
  {
    path: "/Size",
    name: "Size",
    exact: false,
    component: Size,
    icon: <AddShoppingCart> </AddShoppingCart>,
  },
  {
    path: "/khachhang",
    name: "Khách hàng",
    exact: false,
    component: KhachHang,
    icon: <PersonAdd> </PersonAdd>,
  },
  {
    path: "/donhang",
    name: "Đơn Hàng",
    exact: false,
    component: DonHang,
    icon: <ListAlt> </ListAlt>,
  },
  // {
  //   path: "/Khuyenmai",
  //   name: "Khuyến mãi",
  //   exact: false,
  //   component: KhuyenMai,
  //   icon: <Timer10> </Timer10>,
  // },
  // {
  //   path: "/phanhoi",
  //   name: "Phản hồi",
  //   exact: false,
  //   component: PhanHoi,
  //   icon: <RecordVoiceOver> </RecordVoiceOver>,
  // },
  {
    path: "/taikhoan",
    name: "Tài khoản",
    exact: false,
    component: Taikhoan,
    icon: <RecordVoiceOver> </RecordVoiceOver>,
  },
];

export const ROUTESS = [
  {
    path: "/",
    name: "Trang chủ",
    exact: true,
    component: TrangChu,
    icon: <HomeIcon> </HomeIcon>,
  },
  {
    path: "/ThuongHieu",
    name: "Thương hiệu",
    exact: false,
    component: LoaiSanPham,
    icon: <AssignmentTurnedIn> </AssignmentTurnedIn>,
  },
  {
    path: "/SanPham/page=:page&&search=:searchSP",
    name: "Sản phẩm",
    exact: false,
    component: SanPham,
    icon: <AddShoppingCart> </AddShoppingCart>,
  },
  {
    path: "/SanPham/page=:page&&ThuongHieu=:th",
    name: "Sản phẩm",
    exact: false,
    component: SanPham,
    icon: <AddShoppingCart> </AddShoppingCart>,
  },
  {
    path: "/SanPham",
    name: "Sản phẩm",
    exact: false,
    component: SanPham,
    icon: <AddShoppingCart> </AddShoppingCart>,
  },
  {
    path: "/MauSac",
    name: "Màu Sắc",
    exact: false,
    component: MauSac,
    icon: <AddShoppingCart> </AddShoppingCart>,
  },
  {
    path: "/Size",
    name: "Size",
    exact: false,
    component: Size,
    icon: <AddShoppingCart> </AddShoppingCart>,
  },
  {
    path: "/khachhang/page=:page",
    name: "Khách hàng",
    exact: false,
    component: KhachHang,
  },
  {
    path: "/khachhang/search=:search",
    name: "Khách hàng",
    exact: false,
    component: KhachHang,
  },
  {
    path: "/khachhang/search=:search/page=:page",
    name: "Khách hàng",
    exact: false,
    component: KhachHang,
  },
  {
    path: "/khachhang",
    name: "Khách hàng",
    exact: false,
    component: KhachHang,
    icon: <PersonAdd> </PersonAdd>,
  },
  {
    path: "/donhang/page=:page",
    name: "Đơn hàng",
    exact: false,
    component: DonHang,
  },
  {
    path: "/donhang/trang_thai=:trang_thai&&page=:page",
    name: "Đơn hàng",
    exact: false,
    component: DonHang,
  },
  {
    path: "/donhang",
    name: "Đơn Hàng",
    exact: false,
    component: DonHang,
    icon: <ListAlt> </ListAlt>,
  },
  {
    path: "/xemdonhang/id=:id",
    name: "Xem Đơn hàng",
    exact: false,
    component: XemDonHang,
  },
  // {
  //   path: "/Khuyenmai",
  //   name: "Khuyến mãi",
  //   exact: false,
  //   component: KhuyenMai,
  //   icon: <Timer10> </Timer10>,
  // },
  // {
  //   path: "/phanhoi",
  //   name: "Phản hồi",
  //   exact: false,
  //   component: PhanHoi,
  //   icon: <RecordVoiceOver> </RecordVoiceOver>,
  // },
  {
    path: "/taikhoan",
    name: "Tài khoản",
    exact: false,
    component: Taikhoan,
    icon: <RecordVoiceOver> </RecordVoiceOver>,
  },
  {
    path: "*",
    name: "Not Found",
    component: NotFound,
  },
];

export const ROUTESSTC = [
  {
    path: "/",
    name: "Trang chủ",
    exact: true,
    component: TrangChu,
  },

  {
    path: "/GiayTay",
    name: "Giày Tây",
    exact: false,
    component: LoaiSanPham,
  },
  {
    path: "/GioiThieu",
    name: "Giới Thiệu",
    exact: false,
    component: MauSac,
  },
  {
    path: "/DangNhap",
    name: "Đăng nhập",
    exact: false,
    component: Size,
  },
  {
    path: "/DangKy",
    name: "Đăng ký",
    exact: false,
    component: KhachHang,
  },
];

export const ROUTESSMN = [
  {
    path: "/",
    name: "Trang chủ",
    exact: true,
  },

  {
    path: "/GiayTay",
    name: "Giày Tây",
    exact: false,
  },
  {
    path: "/GioiThieu",
    name: "Giới Thiệu",
    exact: false,
  },
  {
    path: "/DangNhap",
    name: "Đăng nhập",
    exact: false,
  },
  {
    path: "/DangKy",
    name: "Đăng ký",
    exact: false,
  },
];
