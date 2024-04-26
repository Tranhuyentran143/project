// import HomePage from "../components/organisms/home/home";
// import Layout from "../components/organisms/theme/layout";
// import { MENU_URL } from "../constants/commont.constant";
// import { Routes, Route, Navigate } from "react-router-dom"
// import ProductList from "../pages/site-customer/products/productList";
// import ProductDetailPage from "../pages/site-customer/products.detail.page";
// import ShoppingCart from "../pages/site-customer/cart";
// import RegisterComponent from '../pages/site-customer/register';
// import LoginAdminComponent from "../pages/site-admin/auth/login";
// import LoginCustomerComponent from "../pages/site-customer/login";
// import React from "react";

// const renderCustomRoute = () => {
//     const customRouter = [
//         {
//             path: MENU_URL.CUSTOMER.HOME,
//             component: <HomePage />
//         }
//     ]

//     const categories = [
//         "all",
//         "food",
//         "cosmetic",
//         "jewelry",
//         "fashion",
//         "accessory",
//         "healthcare",
//         "other",
//     ];


    
//     const routes = [
//         { path: '/', element: <Navigate to="/products" /> },
//         { path: '/products', element: <ProductList category="all" /> },
//         { path: '/products/food', element: <ProductList category="food" /> },
//         { path: '/products/cosmetic', element: <ProductList category="cosmetic" /> },
//         { path: '/products/jewelry', element: <ProductList category="jewelry" /> },
//         { path: '/products/fashion', element: <ProductList category="fashion" /> },
//         { path: '/products/accessory', element: <ProductList category="accessory" /> },
//         { path: '/products/healthcare', element: <ProductList category="healthcare" /> },
//         { path: '/products/other', element: <ProductList category="other" /> },
//         { path: '/products/:product_id', element: <ProductDetailPage /> },
//         { path: '/cart', element: <ShoppingCart /> },
//     ];


//     return (
//         <Layout>
//             <Routes>
//                 <Route
//                     path="/login"
//                     element={<LoginAdminComponent />
//                     }
//                 />
//                 <Route
//                     path="/login"
//                     element={<LoginCustomerComponent />
//                     }
//                 />

//                 <Route
//                     path="/register"
//                     element={<RegisterComponent />}
//                 />

//                 {
//                     customRouter.map((item, key) => {
//                         <Route key={key} path={item.path} element={item.component} />
//                     })
//                 };

//                 {routes.map((route, index) => (
//                     <Route key={index} path={route.path} element={route.element} />
//                 ))}

//                 {categories.map(category => (
//                     <Route
//                         key={category}
//                         path={`/products/${category}`}
//                         element={<ProductList category={category} />}
//                     />
//                 ))}
                
// {/* <Route path="/products/:product_id" component={ProductDetailPage} /> */}

//             </Routes>

//         </Layout>
//     )
// }

// export default renderCustomRoute

import { Routes, Route } from "react-router-dom";
import Layout from "../components/organisms/theme/layout";
import ProductList from "../pages/site-customer/products/productList";
import ProductDetailPage from "../pages/site-customer/products.detail.page";
import ShoppingCart from "../pages/site-customer/cart";
import RegisterComponent from '../pages/site-customer/register';
import LoginAdminComponent from "../pages/site-admin/auth/login";
import LoginCustomerComponent from "../pages/site-customer/login";
import React from "react";

const RenderCustomRoute = () => {
    return (
        <Layout>
            <Routes>
                <Route path="/login" element={<LoginAdminComponent />} />
                <Route path="/login-customer" element={<LoginCustomerComponent />} />
                <Route path="/register" element={<RegisterComponent />} />
                <Route path="/products" element={<ProductList category="all" />} />
                <Route path="/products/:product_id" element={<ProductDetailPage />} />
                <Route path="/cart" element={<ShoppingCart />} />
                <Route path="/products/food" element={<ProductList category="food" />} />
                <Route path="/products/cosmetic" element={<ProductList category="cosmetic" />} />
                <Route path="/products/jewelry" element={<ProductList category="jewelry" />} />
                <Route path="/products/fashion" element={<ProductList category="fashion" />} />
                <Route path="/products/accessory" element={<ProductList category="accessory" />} />
                <Route path="/products/healthcare" element={<ProductList category="healthcare" />} />
                <Route path="/products/other" element={<ProductList category="other" />} />
            </Routes>
        </Layout>
    )
}

export default RenderCustomRoute;
