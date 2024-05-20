import React, { useState, useEffect } from "react";
import { BUTTON_TEXT } from "../../../constants/commont.constant";
import { Button, Form } from "react-bootstrap";
import {
  getCategories,
  getCategoryById,
  createCategory,
  updateCategory,
  deleteCategoryById,
} from "../../../api/category.api";
import CategoryComponent from ".";

const CategoryManageComponent = (props, { isAdmin }) => {
  const [categorysState, setCategorysState] = useState([]);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const categories = await getCategories();
        if (Array.isArray(categories)) {
          setCategorysState(categories);
        } else {
          throw new Error('Expected an array');
        }
      } catch (error) {
        console.error('Error fetching categories:', error);
        setCategorysState([]);
      }
    };

    fetchData();
  }, []);

  const [category_id, setCategoryId] = useState("");
  const [category_name, setCategoryName] = useState("");

  const clickUpdate = async (category_id) => {
    const categoryUpdate = await getCategoryById(category_id);
    setCategoryId(categoryUpdate.category_id);
    setCategoryName(categoryUpdate.category_name);
  };

  const addOrUpdateCategory = async () => {
    if (!category_name) {
      setError("Please enter the category name.");
      return;
    }

    const category = {
      category_id: category_id,
      category_name: category_name,
    };

    try {
      if (category_id === "") {
        const newCategory = await createCategory(category);
        setCategorysState([...categorysState, newCategory]);
      } else {
        const updatedCategory = await updateCategory(category);
        setCategorysState(
          categorysState.map((item) =>
            item.category_id === updatedCategory.category_id ? updatedCategory : item
          )
        );
      }
      setCategoryId("");
      setCategoryName("");
      setError("");
    } catch (error) {
      console.error('Error adding/updating category:', error);
      setError('An error occurred while adding/updating the category.');
    }
  };

  const onClickDel = async (category_id) => {
    try {
      await deleteCategoryById(category_id);
      setCategorysState(categorysState.filter((category) => category.category_id !== category_id));
    } catch (error) {
      console.error('Error deleting category:', error);
      setError('An error occurred while deleting the category.');
    }
  };

  return (
    <div style={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
      <h4 style={{ color: "black", textAlign: "center", fontSize: "25px", backgroundColor: "#ecc9d3", width: "800px", marginTop: "20px" }}>
        LIST OF CATEGORIES IN SYSTEM
      </h4>
      <table style={{ width: "800px", marginTop: "20px", textAlign: "center" }}>
        <thead>
          <tr>
            <th style={{ width: "150px", marginRight: "100px" }}>ID</th>
            <th style={{ width: "250px", marginRight: "80px" }}>Category name</th>
            <th style={{ width: "300px", marginRight: "100px" }}>Actions</th>
          </tr>
        </thead>
        <tbody>
          {Array.isArray(categorysState) && categorysState.map((category) => (
            <CategoryComponent
              key={category.category_id}
              category_id={category.category_id}
              category_name={category.category_name}
              clickUpdate={clickUpdate}
              clickDel={onClickDel}
            />
          ))}
        </tbody>
      </table>
      <div style={{ width: "800px", marginTop: "10px" }} className="d-flex mb-2">
        Name of the category to add
        <Form.Control
          value={category_name}
          onChange={(event) => setCategoryName(event.target.value)}
          className="me-2"
        />
        <Button variant="primary" onClick={addOrUpdateCategory}>
          {BUTTON_TEXT.ADD}
        </Button>
      </div>
      {error && (
        <p style={{ color: "red", textAlign: "center", marginTop: "10px" }}>{error}</p>
      )}
    </div>
  );
};

export default CategoryManageComponent;
