import { Routes, Route } from "react-router-dom";
import ProductList from "../pages/site-customer/products/productList";
import ProductDetailPage from "../pages/site-customer/products.detail.page";
import RegisterComponent from '../pages/site-customer/register';
import React, { useState } from "react";
import LoginComponent from "../pages/site-admin/auth/login";
import AdminMenu from "../components/organisms/menu/admin.menu";
import { Navigate } from "react-router-dom/dist";
import UserManager from "../pages/site-admin/user-manage/user.manage";
import ProductManager from "../pages/site-admin/product-manage/product.manage";
import CategoryManageComponent from "../pages/site-admin/category-manage/category.manage";
import AccountComponent from "../components/account.component";
import HeaderComponent from "../components/organisms/header/header";
import FooterComponent from "../components/organisms/footer/footer";
import OrderSuccessPage from "../pages/site-customer/orderSuccessPage";
import CartPage from "../pages/site-customer/cart";
import ParentComponent from "../pages/site-customer/products/parent.product";
import OrderManager from "../pages/site-admin/order.magage.js/order.manage";
import EditOrder from "../pages/site-admin/order.magage.js/order.edit";


const RenderCustomRoute = () => {
    return (
        <>
            <HeaderComponent />
            <Routes>
                <Route path="/login" element={<LoginComponent />} />
                <Route path="/register" element={<RegisterComponent />} />
                <Route path="/account" element={<AccountComponent />} />
                <Route path="/products" element={<ParentComponent/>} />
                <Route path="/products" element={<ProductList category="all" />} />
                <Route path="/products/:product_id" element={<ProductDetailPage />} />
                <Route path="/carts" element={<CartPage />} />
                <Route path="/order-success" element={<OrderSuccessPage />} />
                <Route path="/products/food" element={<ProductList category="food" />} />
                <Route path="/products/cosmetic" element={<ProductList category="cosmetic" />} />
                <Route path="/products/jewelry" element={<ProductList category="jewelry" />} />
                <Route path="/products/fashion" element={<ProductList category="fashion" />} />
                <Route path="/products/accessory" element={<ProductList category="accessory" />} />
                <Route path="/products/healthcare" element={<ProductList category="healthcare" />} />
                <Route path="/products/other" element={<ProductList category="other" />} />
                <Route path="/admin/dashboard" element={<AdminMenu />} />
                <Route path="/admin/productcategories" element={<CategoryManageComponent />} />
                <Route path="/admin/products" element={<ProductManager />} />
                <Route path="/admin/users" element={<UserManager />} />
                <Route path="/admin/orders" element={<OrderManager />} />
                <Route path="/edit-order/:id" element={<EditOrder />} />
            </Routes>
            <FooterComponent />
        </>
    )
}

export default RenderCustomRoute;
