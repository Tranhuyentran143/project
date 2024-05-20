import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom'; // Import Link from react-router-dom

const ProductSort = () => {
    const [products, setProducts] = useState([]);
    const [sortBy, setSortBy] = useState('name');
    const [isSortHovered, setIsSortHovered] = useState(false);

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                let response;
                if (sortBy === 'name') {
                    response = await axios.get('http://localhost:8081/api/v1/products/sortedByName');
                } else if (sortBy === 'price') {
                    response = await axios.get('http://localhost:8081/api/v1/products/sortedByPrice');
                }
                // Cập nhật đường dẫn đến hình ảnh cho mỗi sản phẩm
                setProducts(response.data.map(product => ({
                    ...product,
                    image: `http://localhost:8081/${product.image_url}`
                })));
            } catch (error) {
                console.error('Failed to fetch products:', error);
            }
        };

        fetchProducts();
    }, [sortBy]);

    const handleSortBy = (sortType) => {
        setSortBy(sortType);
        setIsSortHovered(false);
    };

    return (
        <div>
            <div
                onMouseEnter={() => setIsSortHovered(true)}
                onMouseLeave={() => setIsSortHovered(false)}
            >
                <button style={{ backgroundColor: "#ecc9d3", color: "black", fontSize: "15px", padding: "5px", borderRadius: "5px" }} onClick={() => handleSortBy('price')}>Sort By Price</button>
                {isSortHovered && (
                    <div>
                        {/* <button onClick={() => handleSortBy('name')}>By Name</button> */}
                        {/* <button onClick={() => handleSortBy('price')}>By Price</button> */}
                    </div>
                )}
            </div>
            <div style={{ display: 'flex', flexWrap: 'wrap', marginLeft: '50px' }}>
                {products.map((product, index) => (
                    <div key={product.product_id} style={{ width: '200px', margin: '10px' }}>
                        <Link to={`/products/${product.product_id}`} style={{ textDecoration: 'none', color: 'inherit' }}>
                            <img src={product.image_url} alt={product.name} style={{ width: '100px', height: '100px' }} />
                            <div style={{ textAlign: 'center', marginTop: '5px' }}>{sortBy === 'name' ? product.name : `$${product.price}`}</div>
                        </Link>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default ProductSort;
