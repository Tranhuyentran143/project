import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { createProduct, deleteProductById, getProducts, updateProduct } from "../../../api/product.api";

const ProductManager = ({ isAdmin }) => {
  const [productName, setProductName] = useState("");
  const [productPrice, setProductPrice] = useState("");
  const [productDescription, setProductDescription] = useState("");
  const [productImg, setProductImg] = useState("");
  const [listProducts, setListProducts] = useState([]);
  const [selectedProductId, setSelectedProductId] = useState(null);
  const [error, setError] = useState("");

  const navigate = useNavigate();

  useEffect(() => {
    initPage();
  }, []);

  const initPage = async () => {
    try {
      const listProductsApi = await getProducts();
      if (Array.isArray(listProductsApi)) {
        setListProducts(listProductsApi);
      } else {
        throw new Error('Expected an array');
      }
    } catch (error) {
      console.error("Error while fetching products:", error.message);
      setListProducts([]);
    }
  };

  const clearForm = () => {
    setProductName("");
    setProductPrice("");
    setProductDescription("");
    setProductImg("");
    setSelectedProductId(null);
    setError("");
  };

  const onCreateProduct = async () => {
    if (!productName || !productPrice || !productDescription || !productImg) {
      setError("Please fill in all fields before adding a product.");
      return;
    }

    const product = {
      name: productName,
      price: productPrice,
      description: productDescription,
      image_url: productImg,
    };

    try {
      await createProduct(product);
      initPage();
      clearForm();
    } catch (error) {
      console.error('Error creating product:', error);
      setError('An error occurred while creating the product.');
    }
  };

  const onUpdateProduct = async () => {
    if (!productName || !productPrice || !productDescription || !productImg) {
      setError("Please fill in all fields before updating the product.");
      return;
    }

    const product = {
      product_id: selectedProductId,
      name: productName,
      price: productPrice,
      description: productDescription,
      image_url: productImg,
    };

    try {
      await updateProduct(product);
      initPage();
      clearForm();
    } catch (error) {
      console.error('Error updating product:', error);
      setError('An error occurred while updating the product.');
    }
  };

  const onDeleteProduct = async (product_id) => {
    try {
      await deleteProductById(product_id);
      initPage();
      clearForm();
    } catch (error) {
      console.error('Error deleting product:', error);
      setError('An error occurred while deleting the product.');
    }
  };

  const handleEditProduct = (product) => {
    setProductName(product.name);
    setProductPrice(product.price);
    setProductDescription(product.description);
    setProductImg(product.image_url);
    setSelectedProductId(product.product_id);
  };

  return (
    <div style={{ width: "100%" }}>
      <h2
        style={{
          color: "black",
          textAlign: "center",
          fontSize: "25px",
          backgroundColor: "#ecc9d3",
          width: "800px",
          marginTop: "20px",
          marginLeft: "220px",
        }}
      >
        PRODUCT MANAGEMENT
      </h2>
      <div>
        <input
          value={productName}
          onChange={(event) => setProductName(event.target.value)}
          placeholder="Name Product"
        />
        <input
          value={productPrice}
          onChange={(event) => setProductPrice(event.target.value)}
          placeholder="Price"
        />
        <input
          value={productDescription}
          onChange={(event) => setProductDescription(event.target.value)}
          placeholder="Description"
        />
        <input
          value={productImg}
          onChange={(event) => setProductImg(event.target.value)}
          placeholder="Image"
        />
        {selectedProductId ? (
          <button
            onClick={onUpdateProduct}
            style={{ backgroundColor: "yellow" }}
          >
            Update Product
          </button>
        ) : (
          <button
            onClick={onCreateProduct}
            style={{ backgroundColor: "yellow", marginRight: "15px" }}
          >
            Add Product
          </button>
        )}
        <button onClick={clearForm} style={{ backgroundColor: "yellow" }}>
          Clear Form
        </button>
      </div>
      {error && (
        <p style={{ color: "red", textAlign: "center" }}>{error}</p>
      )}
      <div>
        <h4
          style={{
            color: "black",
            backgroundColor: "#ecc9d3",
            textAlign: "center",
            fontSize: "25px",
            width: "800px",
            marginTop: "30px",
            marginLeft: "220px",
          }}
        >
          LIST OF PRODUCTS IN SYSTEM
        </h4>
        <table>
          <thead>
            <tr style={{ textAlign: "center", fontSize: "20px" }}>
              <th style={{ width: "150px" }}>ID</th>
              <th style={{ width: "250px" }}>Name</th>
              <th style={{ width: "150px" }}>Price</th>
              <th style={{ width: "250px" }}>Description</th>
              <th style={{ width: "100px" }}>Image</th>
              <th style={{ width: "200px" }}>Actions</th>
            </tr>
          </thead>
          <tbody>
            {Array.isArray(listProducts) && listProducts.map((product) => (
              <tr key={product.product_id}>
                <td style={{ textAlign: "center" }}>{product.product_id}</td>
                <td style={{ textAlign: "center" }}>{product.name}</td>
                <td style={{ textAlign: "center" }}>{product.price}</td>
                <td style={{ textAlign: "center" }}>{product.description}</td>
                <td style={{ textAlign: "center" }}>{product.image_url}</td>
                <td style={{ textAlign: "center" }}>
                  <button
                    onClick={() => handleEditProduct(product)}
                    className="btn btn-warning"
                    style={{ marginRight: "5px" }}
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => onDeleteProduct(product.product_id)}
                    className="btn btn-danger"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ProductManager;
