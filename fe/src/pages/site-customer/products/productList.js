import React, { useEffect, useState } from 'react';
import './product.css';
import ShoppingCart from '../cart';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../../../style/all.style.css';
import { useNavigate } from 'react-router-dom';
import ProductDetail from './productDetail';
import '../../../components/organisms/header/header.css'

const ProductList = ({ category },{ currentPage, paginateNext, paginatePrev }) => {

  const [products, setProducts] = useState([]);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [cartItems, setCartItems] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(`http://localhost:8081/api/v1/products/category/${category}`);
        const data = await response.json();
        if (Array.isArray(data)) {
          setProducts(data);
        } else {
          console.error('Dữ liệu sản phẩm không phải là một mảng:', data);
        }
      } catch (error) {
        console.error('Lỗi khi lấy dữ liệu sản phẩm:', error);
      }
    };

    fetchData();
  }, [category]);

  const handleProductClick = (product) => {
    setSelectedProduct(product);
    navigate(`/products/${product.product_id}`);
  }

  const handleProductClose = () => {
    setSelectedProduct(null);
  };

  const handleBuyNow = (product) => {
    setCartItems([...cartItems, product]);
  };
  return (
    <div>
      <h2>{`Products in ${category}`}</h2>
      <div className="product-list">
        {products.map((product) => (
          <div key={product.product_id} onClick={() => handleProductClick(product)} style={{ cursor: 'pointer' }}>
            <img src={product.image_url} alt={product.name} />
            <h5>{product.name}</h5>
            <p className="description"></p>
            <p className="price">{product.price}</p>
            <button className="button" onClick={() => handleBuyNow(product)}>
              Buy Now
            </button> <br /><br />
          </div>
        ))}
      </div>
      <div className="pagination" style={{textAlign: "center"}}>
        <button onClick={paginatePrev} disabled={currentPage === 1}>Prev</button>
        <span>Page {currentPage}</span>
        <button onClick={paginateNext}>Next</button>
      </div>

      {selectedProduct && (
        <ProductDetail product={selectedProduct} onClose={handleProductClose} />
      )} 
    </div>
  );
};

export default ProductList;

// import React, { useEffect, useState } from 'react';import './product.css';
// import ShoppingCart from '../cart';
// import 'bootstrap/dist/css/bootstrap.min.css';
// import '../../../style/all.style.css';
// import { useNavigate } from 'react-router-dom';
// import ProductDetail from './productDetail';
// import { useEffect, useState } from 'react';

// const ProductList = ({ category }) => {
//   const [products, setProducts] = useState([]);
//   const [selectedProduct, setSelectedProduct] = useState(null);
//   const [cartItems, setCartItems] = useState([]);
//   const [currentPage, setCurrentPage] = useState(1);
//   const [productsPerPage] = useState(9);
//   const navigate = useNavigate();

//   useEffect(() => {
//     const fetchData = async () => {
//       try {
//         const response = await fetch(`http://localhost:8081/api/v1/products/category/${category}`);
//         const data = await response.json();
//         if (Array.isArray(data)) {
//           setProducts(data);
//           console.log(data);
//         } else {
//           console.error('Dữ liệu sản phẩm không phải là một mảng:', data);
//         }
//       } catch (error) {
//         console.error('Lỗi khi lấy dữ liệu sản phẩm:', error);
//       }
//     };

//     fetchData();
//   }, [category]);

//   const handleProductClick = (product) => {
//     setSelectedProduct(product);
//     navigate(`/products/${product.product_id}`);
//   };

//   const handleProductClose = () => {
//     setSelectedProduct(null);
//   };

//   const handleBuyNow = (product) => {
//     setCartItems([...cartItems, product]);
//   };

//   const indexOfLastProduct = currentPage * productsPerPage;
//   const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
//   const currentProducts = products.slice(indexOfFirstProduct, indexOfLastProduct);

//   const totalProducts = products.length;
//   const totalPages = Math.ceil(totalProducts / productsPerPage);

//   const paginateNext = () => {
//     setCurrentPage((prevPage) => prevPage + 1);
//     console.log(currentPage);
//   };

//   const paginatePrev = () => {
//     setCurrentPage((prevPage) => prevPage - 1);
//   };


//   return (
//     <div>
//       <h2>{`Products in ${category}`}</h2>
//       <div className="product-list">
//         {currentProducts.map((product) => (
//           <div key={product.product_id} onClick={() => handleProductClick(product)} style={{ cursor: 'pointer' }}>
//             <img src={product.image_url} alt={product.name} />
//             <h5>{product.name}</h5>
//             <p className="description"></p>
//             <p className="price">{product.price}</p>
//             <button className="button" onClick={() => handleBuyNow(product)}>
//               Buy Now
//             </button> <br /><br />
//           </div>
//         ))}
//       </div>

//       <div className="pagination">
//         <button onClick={paginatePrev} disabled={currentPage === 1}>Prev</button>
//         <span>Page {currentPage} of {totalPages}</span>
//         <button onClick={paginateNext} disabled={currentPage === totalPages}>Next</button>
//       </div>

//       {selectedProduct && (
//         <ProductDetail product={selectedProduct} onClose={handleProductClose} />
//       )}

//       {/* <div>
//         <h2>Shopping Cart</h2>
//         <ShoppingCart items={cartItems} />
//       </div> */}
//     </div>
//   );
// };

// export default ProductList;

