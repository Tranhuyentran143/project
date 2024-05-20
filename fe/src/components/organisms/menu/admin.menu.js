import { NavLink, useNavigate } from "react-router-dom";
import axios from "axios";
import { useEffect } from "react";
import "./admin.menu.css"

const AdminMenu = () => {
  const navLinkClass = ({ isActive }) => {
    return isActive ? "nav-link activated" : "nav-link";
  };

  // lấy token
  const getToken = () => {
    return localStorage.getItem("token");
  };

  //  Authorization với token hiện tại
  const setAuthorizationToken = () => {
    const token = getToken();
    if (token) {
      axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
    } else {
      delete axios.defaults.headers.common["Authorization"];
    }
  };

  // setAuthor when component được render lại
  useEffect(() => {
    setAuthorizationToken();
  }, []);

  return (
    <div>
      <h2 className="my-3 " style={{ color: "black", backgroundColor: "#d777a3", width: "600px", marginLeft: "320px" }}>💙  ONLINE SHOP 💙 </h2>
      <div className="pt-3">
        <ul className="nav nav-pills flex-column " style={{ color: "black", backgroundColor: "#ecc9d3", width: "800px", marginLeft: "220px", fontSize: "20px", }}>
          <li className="nav-item"  >
            <NavLink style={{ color: "black", }} to="/admin/productcategories" className={navLinkClass} >
              CATEGORIES
            </NavLink>
          </li>
          {/* <li className="nav-item">
            <NavLink style={{ color: "black",}} to="/admin/carts" className={navLinkClass}>
              Carts
            </NavLink>
          </li> */}
          <li className="nav-item">
            <NavLink style={{ color: "black", }} to="/admin/products" className={navLinkClass}>
              PRODUCTS
            </NavLink>
          </li>
          <li className="nav-item">
            <NavLink style={{ color: "black", }} to="/admin/users" className={navLinkClass}>
              USERS
            </NavLink>
          </li>
          <li className="nav-item">
            <NavLink style={{ color: "black", }} to="/admin/orders" className={navLinkClass}>
              ORDERS
            </NavLink>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default AdminMenu;