import React, { useState, useEffect } from "react";
import { searchProducts } from "./product.service";
import ProductDetail from "./productDetail";
import '../../../pages/site-customer/products/product.css'


const SearchProducts = ({ name }) => {
  const [searchResults, setSearchResults] = useState([]);
  const [showSearchResults, setShowSearchResults] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      if (name) {
        const results = await searchProducts(name);
        setSearchResults(results);
        setShowSearchResults(true);
      }
    };

    fetchData();
  }, [name]);

  return (
    <div className='list-find-products'>
      {showSearchResults && (
        <>
          <h4 style={{ textAlign: "center", color: "#b72f75", fontWeight: "bold", padding: "20px", fontSize: "30px" }}>{`You are looking for ${name}`}</h4>
          <ul>
            {searchResults.map((product, index) => (
              <ProductDetail key={index} product={product} />
            ))}
          </ul>
        </>
      )}
    </div>
  );
};

export default SearchProducts;
