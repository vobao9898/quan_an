import React, { useState, useRef, useEffect } from "react";
import "./homePage.scss";
import {
  AssignmentTurnedIn,
  AddShoppingCart,
  PersonAdd,
  ListAlt,
} from "@material-ui/icons";
function TrangChu(props) {
  return (
    <div className="homePage-admin">
      <div className="homepage">
        <div className="title-homePage"> Trang chủ </div>
        <div className="category-homePage">
          <div className="product-homePage shadow">
            <div className="vertical">
              <div className="base">
                <div className="left">
                  <div className="title-homePage-small"> Số sản phẩm </div>
                  <div className="amount-homePage"> 1 </div>
                </div>
                <div className="righ">
                  <AddShoppingCart className="icons"> </AddShoppingCart>
                </div>
              </div>
            </div>
          </div>
          <div className="classProduct-homePage shadow">
            <div className="vertical">
              <div className="base">
                <div className="left">
                  <div className="title-homePage-small"> Loại sản phẩm </div>
                  <div className="amount-homePage"> 1 </div>
                </div>
                <div className="righ">
                  <AssignmentTurnedIn className="icons"> </AssignmentTurnedIn>
                </div>
              </div>
            </div>
          </div>
          <div className="bill-homePage shadow">
            <div className="vertical">
              <div className="base">
                <div className="left">
                  <div className="title-homePage-small">
                    {" "}
                    Số hoá đơn chưa xử lí{" "}
                  </div>
                  <div className="amount-homePage"> 1 </div>
                </div>
                <div className="righ">
                  <ListAlt className="icons"> </ListAlt>
                </div>
              </div>
            </div>
          </div>
          <div className="account-homePage shadow">
            <div className="vertical">
              <div className="base">
                <div className="left">
                  <div className="title-homePage-small"> Tài khoản </div>
                  <div className="amount-homePage"> 1 </div>
                </div>
                <div className="righ">
                  <PersonAdd className="icons"> </PersonAdd>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="statistical-homepage">
          <div className="title-statistical-homepage">
            {" "}
            Thông kê số lượng đơn hàng{" "}
          </div>
        </div>
      </div>
    </div>
  );
}

export default TrangChu;
