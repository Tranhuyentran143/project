import React, { useEffect } from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
import AdminMenu from "../components/organisms/menu/admin.menu";
import { Routes, Route } from "react-router-dom";
import CategoryManageComponent from "../pages/site-admin/category-manage";
import ProductManager from "../pages/site-admin/product-manage/product.manage";
import UserManager from "../pages/site-admin/user-manage/user.manage";
import axios from "axios";
import OrderManager from "../pages/site-admin/order.magage.js/order.manage";

const AdminRoute = () => {

  const getToken = () => {
    return localStorage.getItem("token");
  };

  // set tiêu đề Authorization với token current
  const setAuthorizationToken = () => {
    const token = getToken();
    if (token) {
      axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
    } else {
      delete axios.defaults.headers.common["Authorization"];
    }
  };

  //setAuthor when component render again
  useEffect(() => {
    setAuthorizationToken();
  }, []);

  return (
    <div className="container-fluid">
      <div className="row">
        <div className="col-2 bg-dark min-height-100vh">
          <AdminMenu />
        </div>
        <div className="col-10">
          <Routes>
            <Route path="/admin/productcategories" element={<CategoryManageComponent />} />
            <Route path="/admin/products" element={<ProductManager />} />
            <Route path="/admin/users" element={<UserManager />} />
            <Route path="/admin/orders" element={<OrderManager />} />
          </Routes>
        </div>
      </div>
    </div>
  );
};

export default AdminRoute;