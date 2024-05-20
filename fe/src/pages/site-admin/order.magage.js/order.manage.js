// import React, { useEffect, useState } from "react";
// import { useNavigate } from "react-router-dom";
// import { getOrders, createOrder, updateOrder, deleteOrderById } from "../../../api/order.api";
// import { getProducts } from "../../../api/product.api";

// const OrderManager = ({ isAdmin }) => {
//     const [userName, setUserName] = useState("");
//     const [userPhone, setUserPhone] = useState("");
//     const [userAddress, setUserAddress] = useState("");
//     const [totalPrice, setTotalPrice] = useState("");
//     const [totalQuantity, setTotalQuantity] = useState("");
//     const [contractId, setContractId] = useState("");
//     const [status, setStatus] = useState("");
//     const [createdDate, setCreatedDate] = useState("");
//     const [updatedDate, setUpdatedDate] = useState("");

//     const [productName, setProductName] = useState("");
//     const [productImg, setProductImg] = useState("");
//     const [productPrice, setProductPrice] = useState("");
//     const [listOrders, setListOrders] = useState([]);
//     const [listProducts, setListProducts] = useState([]);
//     const [error, setError] = useState("");
//     const [selectedOrderId, setSelectedOrderId] = useState(null);

//     const navigate = useNavigate();

//     useEffect(() => {
//         initPage();
//     }, []);

//     const initPage = async () => {
//         try {
//             const listProductsApi = await getProducts();
//             const listOrdersApi = await getOrders();

//             if (Array.isArray(listProductsApi)) {
//                 setListProducts(listProductsApi);
//             } else {
//                 throw new Error('Expected an array for products');
//             }

//             if (Array.isArray(listOrdersApi)) {
//                 setListOrders(listOrdersApi);
//             } else {
//                 throw new Error('Expected an array for orders');
//             }
//         } catch (error) {
//             console.error("Error while fetching products or orders:", error.message);
//             setListOrders([]);
//         }
//     };

//     const clearForm = () => {
//         setUserName("");
//         setUserPhone("");
//         setUserAddress("");
//         setTotalPrice("");
//         setTotalQuantity("");
//         setStatus("");
//         setContractId("");
//         setCreatedDate("");
//         setUpdatedDate("");
//         setProductName("");
//         setProductImg("");
//         setProductPrice("");
//         setSelectedOrderId(null);
//         setError("");
//     };

//     const onCreateOrder = async () => {
//         if (!userName || !userPhone || !userAddress || !productPrice || !productName || !productImg || !totalPrice || !totalQuantity || !status || !createdDate) {
//             setError("Please fill in all fields before adding an order.");
//             return;
//         }

//         const order = {
//             user_name: userName,
//             user_phone: userPhone,
//             user_address: userAddress,
//             totalPrice: totalPrice,
//             totalQuantity: totalQuantity,
//             status: status,
//             contractId: contractId,
//             createdDate: new Date(createdDate).toISOString(),
//             updatedDate: updatedDate ? new Date(updatedDate).toISOString() : null,
//             products: [
//                 {
//                     name: productName,
//                     price: productPrice,
//                     image_url: productImg
//                 }
//             ]
//         };

//         try {
//             await createOrder(order);
//             initPage();
//             clearForm();
//         } catch (error) {
//             console.error('Error creating order:', error);
//             setError('An error occurred while creating the order.');
//         }
//     };

//     const onUpdateOrder = async () => {
//         if (!userName || !userPhone || !userAddress || !productPrice || !productName || !productImg || !totalPrice || !totalQuantity || !status || !createdDate) {
//             setError("Please fill in all fields before updating the order.");
//             return;
//         }

//         const order = {
//             order_id: selectedOrderId,
//             user_name: userName,
//             user_phone: userPhone,
//             user_address: userAddress,
//             totalPrice: totalPrice,
//             totalQuantity: totalQuantity,
//             status: status,
//             contractId: contractId,
//             createdDate: new Date(createdDate).toISOString(),
//             updatedDate: new Date().toISOString(),
//             products: [
//                 {
//                     name: productName,
//                     price: productPrice,
//                     image_url: productImg
//                 }
//             ]
//         };

//         try {
//             await updateOrder(order);
//             initPage();
//             clearForm();
//         } catch (error) {
//             console.error('Error updating order:', error);
//             setError('An error occurred while updating the order.');
//         }
//     };

//     const onDeleteOrder = async (order_id) => {
//         try {
//             await deleteOrderById(order_id);
//             initPage();
//             clearForm();
//         } catch (error) {
//             console.error('Error deleting order:', error);
//             setError('An error occurred while deleting the order.');
//         }
//     };

//     const handleEditOrder = (order) => {
//         setUserName(order.user_name);
//         setUserPhone(order.user_phone);
//         setUserAddress(order.user_address);
//         setTotalPrice(order.totalPrice);
//         setTotalQuantity(order.totalQuantity);
//         setStatus(order.status);
//         setContractId(order.contractId);
//         setCreatedDate(new Date(order.createdDate).toISOString().substring(0, 10));
//         setUpdatedDate(order.updatedDate ? new Date(order.updatedDate).toISOString().substring(0, 10) : "");

//         if (order.products && order.products.length > 0) {
//             const product = order.products[0];
//             setProductName(product.name);
//             setProductPrice(product.price);
//             setProductImg(product.image_url);
//         }

//         setSelectedOrderId(order.order_id);
//     };

//     return (
//         <div style={{ width: "100%" }}>
//             <h2
//                 style={{
//                     color: "black",
//                     textAlign: "center",
//                     fontSize: "25px",
//                     backgroundColor: "#ecc9d3",
//                     width: "800px",
//                     marginTop: "20px",
//                     marginLeft: "220px",
//                 }}
//             >
//                 ORDER MANAGEMENT
//             </h2>
//             <div>
//                 <input
//                     value={userName}
//                     onChange={(event) => setUserName(event.target.value)}
//                     placeholder="User Name"
//                 />
//                 <input
//                     value={userPhone}
//                     onChange={(event) => setUserPhone(event.target.value)}
//                     placeholder="User Phone"
//                 />
//                 <input
//                     value={userAddress}
//                     onChange={(event) => setUserAddress(event.target.value)}
//                     placeholder="User Address"
//                 />
//                 <input
//                     value={productName}
//                     onChange={(event) => setProductName(event.target.value)}
//                     placeholder="Product Name"
//                 />
//                 <input
//                     value={productPrice}
//                     onChange={(event) => setProductPrice(event.target.value)}
//                     placeholder="Product Price"
//                 />
//                 <input
//                     value={totalPrice}
//                     onChange={(event) => setTotalPrice(event.target.value)}
//                     placeholder="Total Price"
//                 />
//                 <input
//                     value={totalQuantity}
//                     onChange={(event) => setTotalQuantity(event.target.value)}
//                     placeholder="Total Quantity"
//                 />
//                 <input
//                     value={status}
//                     onChange={(event) => setStatus(event.target.value)}
//                     placeholder="Status"
//                 />
//                 <input
//                     value={contractId}
//                     onChange={(event) => setContractId(event.target.value)}
//                     placeholder="Contract Id"
//                 />
//                 <input
//                     type="date"
//                     value={createdDate}
//                     onChange={(event) => setCreatedDate(event.target.value)}
//                     placeholder="Created Date"
//                 />
//                 <input
//                     type="date"
//                     value={updatedDate}
//                     onChange={(event) => setUpdatedDate(event.target.value)}
//                     placeholder="Updated Date"
//                 />
//                 <input
//                     value={productImg}
//                     onChange={(event) => setProductImg(event.target.value)}
//                     placeholder="Image URL"
//                 />
//                 {selectedOrderId ? (
//                     <button
//                         onClick={onUpdateOrder}
//                         style={{ backgroundColor: "yellow" }}
//                     >
//                         Update Order
//                     </button>
//                 ) : (
//                     <button
//                         onClick={onCreateOrder}
//                         style={{ backgroundColor: "yellow", marginRight: "15px" }}
//                     >
//                         Add Order
//                     </button>
//                 )}
//                 <button onClick={clearForm} style={{ backgroundColor: "yellow" }}>
//                     Clear Form
//                 </button>
//             </div>
//             {error && (
//                 <p style={{ color: "red", textAlign: "center" }}>{error}</p>
//             )}
//             <div>
//                 <h4
//                     style={{
//                         color: "black",
//                         backgroundColor: "#ecc9d3",
//                         textAlign: "center",
//                         fontSize: "25px",
//                         width: "800px",
//                         marginTop: "30px",
//                         marginLeft: "220px",
//                     }}
//                 >
//                     LIST OF ORDERS IN SYSTEM
//                 </h4>
//                 <table>
//                     <thead>
//                         <tr style={{ textAlign: "center", fontSize: "20px" }}>
//                             <th style={{ width: "100px" }}>Order ID</th>
//                             <th style={{ width: "150px" }}>User Phone</th>
//                             <th style={{ width: "100px" }}>Total Price</th>
//                             <th style={{ width: "100px" }}>Total Quantity</th>
//                             <th style={{ width: "100px" }}>Status</th>
//                             <th style={{ width: "150px" }}>Contract Id</th>
//                             <th style={{ width: "150px" }}>Created Date</th>
//                             <th style={{ width: "150px" }}>Updated Date</th>
//                             <th style={{ width: "200px" }}>Products</th>
//                             <th style={{ width: "150px" }}>Actions</th>
//                         </tr>
//                     </thead>
//                     <tbody>
//                         {Array.isArray(listOrders) && listOrders.map((order) => (
//                             <tr key={order.orderId}>
//                                 <td style={{ textAlign: "center" }}>{order.orderId}</td>
//                                 <td style={{ textAlign: "center" }}>{order.user_phone}</td>
//                                 <td style={{ textAlign: "center" }}>{order.totalPrice}</td>
//                                 <td style={{ textAlign: "center" }}>{order.totalQuantity}</td>
//                                 <td style={{ textAlign: "center" }}>{order.status}</td>
//                                 <td style={{ textAlign: "center" }}>{order.contractId}</td>
//                                 <td style={{ textAlign: "center" }}>{new Date(order.createdDate).toLocaleDateString()}</td>
//                                 <td style={{ textAlign: "center" }}>{order.updatedDate ? new Date(order.updatedDate).toLocaleDateString() : ""}</td>
//                                 <td>
//                                     {order.products && order.products.map((product, index) => (
//                                         <div key={index} style={{ textAlign: "center", marginBottom: "10px" }}>
//                                             <img src={product.image_url} alt={product.name} style={{ width: "50px", height: "50px" }} />
//                                             <p>{product.name}</p>
//                                             <p>{product.price}</p>
//                                         </div>
//                                     ))}
//                                 </td>
//                                 <td style={{ textAlign: "center" }}>
//                                     <button
//                                         onClick={() => handleEditOrder(order)}
//                                         className="btn btn-warning"
//                                         style={{ marginRight: "5px" }}
//                                     >
//                                         Edit
//                                     </button>
//                                     <button
//                                         onClick={() => onDeleteOrder(order.order_id)}
//                                         className="btn btn-danger"
//                                     >
//                                         Delete
//                                     </button>
//                                 </td>
//                             </tr>
//                         ))}
//                     </tbody>
//                 </table>
//             </div>
//         </div>
//     );
// };

// export default OrderManager;

import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getOrders, deleteOrderById } from "../../../api/order.api";

const OrderManager = ({ isAdmin }) => {
    const [listOrders, setListOrders] = useState([]);
    const [error, setError] = useState("");

    const navigate = useNavigate();

    useEffect(() => {
        initPage();
    }, []);

    const initPage = async () => {
        try {
            const listOrdersApi = await getOrders();
            console.log("List of Orders:", listOrdersApi);
            if (Array.isArray(listOrdersApi)) {
                setListOrders(listOrdersApi);
            } else {
                throw new Error('Expected an array for orders');
            }
        } catch (error) {
            console.error("Error while fetching orders:", error.message);
            setListOrders([]);
        }
    };


    const onDeleteOrder = async (orderId) => {
        try {
            await deleteOrderById(orderId);
            initPage();
        } catch (error) {
            console.error('Error deleting order:', error);
            setError('An error occurred while deleting the order.');
        }
    };

    const handleEditOrder = (order) => {
        navigate(`/edit-order/${order.orderId}`, { state: { order } });
    };

    return (
        <div style={{ width: "100%" }}>
            <h2 style={{ color: "black", textAlign: "center", fontSize: "25px", backgroundColor: "#ecc9d3", width: "800px", marginTop: "20px", marginLeft: "220px" }}>
                ORDER MANAGEMENT
            </h2>
            {error && <p style={{ color: "red", textAlign: "center" }}>{error}</p>}
            <div>
                <h4 style={{ color: "black", backgroundColor: "#ecc9d3", textAlign: "center", fontSize: "25px", width: "800px", marginTop: "30px", marginLeft: "220px" }}>
                    LIST OF ORDERS IN SYSTEM
                </h4>
                <table>
                    <thead>
                        <tr style={{ textAlign: "center", fontSize: "20px" }}>
                            <th style={{ width: "100px" }}>Order ID</th>
                            <th style={{ width: "150px" }}>User Phone</th>
                            <th style={{ width: "100px" }}>Total Price</th>
                            <th style={{ width: "100px" }}>Total Quantity</th>
                            <th style={{ width: "100px" }}>Status</th>
                            <th style={{ width: "150px" }}>Ship Code</th>
                            <th style={{ width: "150px" }}>Created Date</th>
                            <th style={{ width: "150px" }}>Updated Date</th>
                            <th style={{ width: "150px" }}>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {Array.isArray(listOrders) && listOrders.map((order) => (
                            <tr key={order.orderId}>
                                <td style={{ textAlign: "center" }}>{order.orderId}</td>
                                <td style={{ textAlign: "center" }}>{order.phone}</td>
                                <td style={{ textAlign: "center" }}>{order.totalPrice}</td>
                                <td style={{ textAlign: "center" }}>{order.totalQuantity}</td>
                                <td style={{ textAlign: "center" }}>{order.status}</td>
                                <td style={{ textAlign: "center" }}>{order.shipping_code}</td>
                                <td style={{ textAlign: "center" }}>{new Date(order.createdDate).toLocaleDateString()}</td>
                                <td style={{ textAlign: "center" }}>{order.updatedDate ? new Date(order.updatedDate).toLocaleDateString() : ""}</td>
                                <td style={{ textAlign: "center" }}>
                                    <button onClick={() => handleEditOrder(order)} className="btn btn-warning" style={{ marginRight: "5px" }}>
                                        Edit
                                    </button>
                                    {/* <button onClick={() => onDeleteOrder(order.orderId)} className="btn btn-danger">
                                        Delete
                                    </button> */}
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default OrderManager;
