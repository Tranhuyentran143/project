import React, { useState, useEffect } from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { getOrderById, updateOrder } from "../../../api/order.api";

const EditOrder = () => {
    const { state } = useLocation();
    const { order } = state || {};
    const navigate = useNavigate();
    const { id } = useParams();
    const [userName, setUserName] = useState(order?.userName || "");
    const [userPhone, setUserPhone] = useState(order?.phone || "");
    const [userAddress, setUserAddress] = useState(order?.address || "");
    const [totalPrice, setTotalPrice] = useState(order?.totalPrice || "");
    const [totalQuantity, setTotalQuantity] = useState(order?.totalQuantity || "");
    const [status, setStatus] = useState(order?.status || "");
    const [contractId, setContractId] = useState(order?.contractId || "");
    const [createdDate, setCreatedDate] = useState(order ? new Date(order.createdDate).toISOString().substring(0, 10) : "");
    const [updatedDate, setUpdatedDate] = useState(order?.updatedDate ? new Date(order.updatedDate).toISOString().substring(0, 10) : "");
    const [orderItems, setOrderItems] = useState(order?.orderItem || []);
    const [user, setUser] = useState(order?.user || "");
    const [error, setError] = useState("");
    const clearForm = () => {
        setUser(null)
        setUserName("");
        setUserPhone("");
        setUserAddress("");
        setTotalPrice("");
        setTotalQuantity("");
        setStatus("");
        setContractId("");
        setCreatedDate("");
        setUpdatedDate("");
        setOrderItems([]);
        setError("");
    };

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await getOrderById(id);
                setOrderItems(response.products);
                const user = response.order.id;
                setUserName(user.userName)
                setUser(user)
                const userAdd = response.order.id;
                setUserAddress(response.order.address)
            } catch (error) {
                console.error('Error fetching order:', error);
            }
        };
        fetchData();
    }, [id]);

    const onUpdateOrder = async () => {
        if (!userName || !userPhone || !userAddress || !totalPrice || !totalQuantity || !status || !createdDate) {
            setError("Please fill in all fields before updating the order.");
            return;
        }

        const updatedOrder = {
            orderId: order.orderId,
            status: status,
            address: userAddress,
            updatedDate: new Date().toISOString(),
            orderItem: orderItems
        };

        try {
            await updateOrder(updatedOrder);
            navigate("/admin/orders");
        } catch (error) {
            console.error('Error updating order:', error);
            setError('An error occurred while updating the order.');
        }
    };

    return (
        <div style={{ width: "100%" }}>
            <h2 style={{ color: "black", textAlign: "center", fontSize: "25px", backgroundColor: "#ecc9d3", width: "800px", marginTop: "20px", marginLeft: "220px" }}>
                EDIT ORDER
            </h2>
            <table style={{ margin: "20px auto", width: "80%", borderCollapse: "collapse", border: "1px solid #ccc" }}>
                <thead>
                    <tr style={{ padding: "10px", textAlign: "center", borderBottom: "1px solid #ccc" }}>
                        <th>Id</th>
                        <th>Field</th>
                        <th>Value</th>
                    </tr>
                </thead>
                <tbody>
                    <tr style={{ padding: "10px", textAlign: "center", borderBottom: "1px solid #ccc" }}>
                        <td>1</td>
                        <td>User Name</td>
                        <td>
                            <input value={user.userName} onChange={(event) => setUserName(event.target.value)} placeholder="User Name" />
                        </td>
                    </tr>
                    <tr style={{ padding: "10px", textAlign: "center", borderBottom: "1px solid #ccc" }}>
                        <td>2</td>
                        <td>User Phone</td>
                        <td>
                            <input value={user.phone} onChange={(event) => setUserPhone(event.target.value)} placeholder="User Phone" />
                        </td>
                    </tr>
                    <tr style={{ padding: "10px", textAlign: "center", borderBottom: "1px solid #ccc" }}>
                        <td>3</td>
                        <td>User Address</td>
                        <td>
                            <input value={userAddress} onChange={(event) => setUserAddress(event.target.value)} placeholder="User Address" />
                        </td>
                    </tr>
                    <tr style={{ padding: "10px", textAlign: "center", borderBottom: "1px solid #ccc" }}>
                        <td>4</td>
                        <td>Status</td>
                        <td>
                            <input value={status} onChange={(event) => setStatus(event.target.value)} placeholder="Status" />
                        </td>
                    </tr>
                    <tr style={{ padding: "10px", textAlign: "center", borderBottom: "1px solid #ccc" }}>
                        <td>5</td>
                        <td>Products</td>
                        <td>
                            {orderItems && orderItems.map((item, index) => (
                                <div key={index}>
                                    <p>{item.name}</p>
                                    <img src={item.image_url} alt={item.name} style={{ width: "100px", height: "100px" }} />
                                </div>
                            ))}
                        </td>
                    </tr>
                    <tr style={{ padding: "10px", textAlign: "center", borderBottom: "1px solid #ccc" }}>
                        <td>6</td>
                        <td>Total Price</td>
                        <td>
                            <input value={totalPrice} onChange={(event) => setTotalPrice(event.target.value)} placeholder="Total Price" />
                        </td>
                    </tr>
                    <tr>
                        <td colSpan="3" style={{ textAlign: "center", borderTop: "1px solid #ccc" }}>
                            <button onClick={onUpdateOrder} style={{ backgroundColor: "yellow", marginRight: "10px" }}>Update Order</button>
                            <button onClick={clearForm} style={{ backgroundColor: "yellow" }}>Clear Form</button>
                        </td>
                    </tr>
                </tbody>
            </table>
            {error && <p style={{ color: "red", textAlign: "center", marginTop: "20px" }}>{error}</p>}
        </div>
    );
};

export default EditOrder;
