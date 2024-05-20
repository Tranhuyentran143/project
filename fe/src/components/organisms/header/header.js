import React, { useEffect, useState } from 'react';
import '../header/header.css';
import { Link } from 'react-router-dom';
import myImage from './logo.png';
import '../../../style/all.style.css'
import { AiOutlineFacebook, AiOutlineGoogle, AiOutlineInstagram, AiOutlineLinkedin, AiOutlineLogin, AiOutlineLogout, AiOutlineMenu, AiOutlineShoppingCart, AiOutlineTwitter, AiOutlineUser } from "react-icons/ai";
import { MENU_URL } from '../../../constants/commont.constant';
import kkk from './kkk.jpg'
import '../../../pages/site-customer/products/product.css'
import { useNavigate } from 'react-router-dom/dist';
import axios from 'axios';
import SearchProducts from '../../../pages/site-customer/products/product.search';
import ProductSort from '../../../pages/site-customer/products/product.sort';

const HeaderComponent = (props) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isShowCategory, setShowCategory] = useState([true])
  const [name, setSearchName] = useState('');
  const navigate = useNavigate();
  const [showSort, setShowSort] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem('token');
    setIsLoggedIn(!!token);
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.setItem('carts', JSON.stringify([]));
    delete axios.defaults.headers.common["Authorization"];
    window.location.href = '/login';
    setIsLoggedIn(false);
  };

  const handleSearch = async (e) => {
    e.preventDefault();
    if (name) {
      navigate(`/search/${name}`);
    }
  };
  // const handleCartClick = () => {
  //   if (!isLoggedIn) {
  //     alert("Your cart is empty. Please login.");
  //     navigate(`/login`)
  //   } else {
  //     // navigate(`/carts`)
  //   }
  // };

  const handleMouseEnter = () => {
    setShowSort(true);
  };

  const handleMouseLeave = () => {
    setShowSort(false);
  };

  const handleSortButtonClick = () => {
    setShowSort(!showSort);
  };


  const menus = [
    {
      name: "HOME",
      path: MENU_URL.CUSTOMER.HOME
    },

    {
      name: "STORE",
      path: MENU_URL.CUSTOMER.PRODUCTS
    },

    {
      name: "PRODUCTS",
      path: MENU_URL.CUSTOMER.PRODUCTS,
      isShowMenu: true,
      child: [
        {
          name: "Food",
          path: "/products/food"
        },
        {
          name: "Cosmetic",
          path: "/products/cosmetic"
        },
        {
          name: "Jewelry",
          path: "/products/jewelry"
        },
      ]
    },

    {
      name: "POST",
      path: MENU_URL.CUSTOMER.POSTS
    },

    {
      name: "CONTACT",
      path: MENU_URL.CUSTOMER.CONTACT
    },
  ];

  return (
    <header>
      <div className="container">
        <div className="top-row">
          <div className="logo">
            <img src={myImage} alt="Logo" />
          </div>
          <div className="navbar-search">
            <ul className='icon'>
              <li><Link to=""><AiOutlineFacebook /></Link></li>
              <li><Link to=""><AiOutlineInstagram /> </Link></li>
              <li><Link to=""><AiOutlineGoogle /></Link></li>
              <li><Link to=""><AiOutlineTwitter /></Link></li>
              <li><Link to=""><AiOutlineLinkedin /></Link></li>
            </ul>
            <ul className="menu">
              <nav className='header-menu'>
                <ul>
                  {menus?.map((menu, menuKey) => (
                    <li key={menuKey} className={menuKey === 0 ? "active" : ""}>
                      <Link to={menu?.path}>{menu?.name}</Link>
                      {menu.child && (
                        <ul className='header-menu-dropdow'>
                          {menu.child.map((childItem, childKey) => (
                            <li key={`${menuKey}-${childKey}`}>
                              <Link to={childItem.path}>{childItem.name}</Link>
                            </li>
                          ))}
                        </ul>
                      )}
                    </li>
                  ))}
                </ul>
              </nav>
            </ul>
          </div>
        </div>
      </div>
      <div className="bottom-row">
        <ul>
          <li>
            <Link to="/carts">
              <AiOutlineShoppingCart />
              {/* <span onClick={handleCartClick}></span> */}
            </Link>
          </li>
          <li><Link to="/find-a-store">Find a Store</Link></li>
          <li><Link to="/register">Register</Link></li>
          {isLoggedIn ? (
            <>
              <li><Link to="/account"><AiOutlineUser /> My Account</Link></li>
              <li><Link to="#" onClick={handleLogout}><AiOutlineLogout /> Logout</Link></li>
            </>
          ) : (
            <li> <Link to="/login"><AiOutlineLogin /> Login</Link></li>
          )}

        </ul>
      </div>
      <div className="container">
        <div className='row-categories-container'>
          <div className='col-lg-3 all'>

            <div className='all-categories' onMouseEnter={handleMouseEnter}
              onMouseLeave={handleMouseLeave} onClick={() => setShowCategory(!isShowCategory)}>
              <AiOutlineMenu />
              LIST PRODUCTS</div>
            {isShowCategory && (
              <ul className={isShowCategory ? "" : "hidden"}>
                <li><Link to="/products/food">Food</Link></li>
                <li><Link to="/products/cosmetic">Cosmetics</Link></li>
                <li><Link to="/products/healthcare">Healthcare</Link></li>
                <li><Link to="products/fashion">Fashion</Link></li>
                <li><Link to="/products/jewelry">Jewelry</Link></li>
                <li><Link to="/products/accessory">Accessory</Link></li>
                <li><Link to="/products/other">Others</Link></li>
              </ul>
            )}
          </div>

          <div className='col-lg-9 row-search-container'>
            <div className='row-search'>
              <div className='row-search-form'>
                <form onSubmit={handleSearch}>
                  <input
                    type='text'
                    placeholder='What are you looking for?'
                    value={name}
                    onChange={(e) => setSearchName(e.target.value)}
                  />
                  <button type='submit' className='site-btn' style={{ fontSize: "18px" }}>
                    Search
                  </button>
                </form>
              </div>



            </div>
          </div>
          <div className='row-ads'>
            <div className='row-text'>
              <img src={kkk} alt="kkk" />
              <div className='information'>
                <h3> Reputation Safety - Quality</h3>
                <p>Fast delivery <br />VietNam - Japan</p>
                <Link to="/carts" className='primary-btn'>Shopping now!</Link>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className='list-find-products'>
        <SearchProducts name={name} />
      </div>
      <button className="sort-button" style={{ backgroundColor: "#ecc9d3", color: "black", fontSize: "15px", padding: "5px", borderRadius: "5px" }} onClick={handleSortButtonClick}>
        Sort By Name
      </button>
      {showSort && (
        <div className='list-sort-products'>
          <ProductSort />
        </div>
      )}
    </header>
  );
};

export default HeaderComponent;