import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { createUser, deleteUserById, updateUser, getUsers } from "../../../api/user.api";

const UserManager = ({ isAdmin }) => {
  const [userName, setUserName] = useState("");
  const [userEmail, setUserEmail] = useState("");
  const [userPassword, setUserPassword] = useState("");
  const [userAddress, setUserAddress] = useState("");
  const [users, setUsers] = useState([]);
  const [selectedUserId, setSelectedUserId] = useState(null);
  const [error, setError] = useState("");

  const navigate = useNavigate();

  useEffect(() => {
    initPage();
  }, []);

  const initPage = async () => {
    try {
      const listUsers = await getUsers();
      if (Array.isArray(listUsers)) {
        setUsers(listUsers);
      } else {
        throw new Error('Expected an array');
      }
    } catch (error) {
      console.error("Error while fetching users:", error.message);
      setUsers([]);
    }
  };

  const clearForm = () => {
    setUserName("");
    setUserEmail("");
    setUserPassword("");
    setUserAddress("");
    setSelectedUserId(null);
    setError("");
  };

  const onCreateUser = async () => {
    if (!userName || !userEmail || !userPassword || !userAddress) {
      setError("Please fill in all fields before adding a user.");
      return;
    }

    const user = {
      userName: userName,
      email: userEmail,
      password: userPassword,
      address: userAddress,
    };

    try {
      await createUser(user);
      initPage();
      clearForm();
    } catch (error) {
      console.error('Error creating user:', error);
      setError('An error occurred while creating the user.');
    }
  };

  const onUpdateUser = async () => {
    if (!userName || !userEmail || !userPassword || !userAddress) {
      setError("Please fill in all fields before updating the user.");
      return;
    }

    const user = {
      id: selectedUserId,
      userName: userName,
      email: userEmail,
      password: userPassword,
      address: userAddress,
    };

    try {
      await updateUser(user);
      initPage();
      clearForm();
    } catch (error) {
      console.error('Error updating user:', error);
      setError('An error occurred while updating the user.');
    }
  };

  const onDeleteUser = async (id) => {
    try {
      await deleteUserById(id);
      initPage();
      clearForm();
    } catch (error) {
      console.error('Error deleting user:', error);
      setError('An error occurred while deleting the user.');
    }
  };

  const handleEditUser = (user) => {
    setUserName(user.userName);
    setUserEmail(user.email);
    setUserPassword(user.password);
    setUserAddress(user.address);
    setSelectedUserId(user.id);
  };

  return (
    <div style={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
      <h2 style={{ color: "black", textAlign: "center", fontSize: "25px", backgroundColor: "#ecc9d3", width: "800px", marginTop: "20px" }}>USER MANAGEMENT</h2>
      <div>
        <input
          value={userName}
          onChange={(event) => setUserName(event.target.value)}
          placeholder="Name"
        />
        <input
          value={userEmail}
          onChange={(event) => setUserEmail(event.target.value)}
          placeholder="Email"
        />
        <input
          value={userPassword}
          onChange={(event) => setUserPassword(event.target.value)}
          placeholder="Password"
        />
        <input
          value={userAddress}
          onChange={(event) => setUserAddress(event.target.value)}
          placeholder="Address"
        />
        {selectedUserId !== null ? (
          <button onClick={onUpdateUser} style={{ backgroundColor: "yellow" }}>Update User</button>
        ) : (
          <button onClick={onCreateUser} style={{ backgroundColor: "yellow", marginRight: "15px", marginLeft: "15px" }}>Add User</button>
        )}
        <button onClick={clearForm} style={{ backgroundColor: "yellow" }}>Clear Form</button>
      </div>
      {error && (
        <p style={{ color: "red", textAlign: "center" }}>{error}</p>
      )}
      <div>
        <h4 style={{ color: "black", backgroundColor: "#ecc9d3", textAlign: "center", fontSize: "25px", width: "800px", marginTop: "30px", marginLeft: "170px" }}>LIST OF USERS IN SYSTEM</h4>
        <table style={{ border: "1px solid black", borderCollapse: "collapse" }}>
          <thead>
            <tr style={{ textAlign: "center", fontSize: "20px", border: "1px solid black", padding: "8px" }}>
              <th style={{ width: "150px", padding: "8px" }}>ID</th>
              <th style={{ width: "250px" }}>Name</th>
              <th style={{ width: "250px" }}>Email</th>
              <th style={{ width: "250px" }}>Address</th>
              <th style={{ width: "200px" }}>Actions</th>
            </tr>
          </thead>
          <tbody>
            {Array.isArray(users) && users.map((user) => (
              <tr key={user.id}>
                <td>{user.id}</td>
                <td>{user.userName}</td>
                <td>{user.email}</td>
                <td>{user.address}</td>
                <td style={{ width: "250px" }}>
                  <button
                    style={{ backgroundColor: "yellow", marginRight: "15px" }}
                    onClick={() => handleEditUser(user)}
                  >
                    Edit
                  </button>
                  <button
                    style={{ backgroundColor: "yellow", marginRight: "15px" }}
                    onClick={() => onDeleteUser(user.id)}
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

export default UserManager;
