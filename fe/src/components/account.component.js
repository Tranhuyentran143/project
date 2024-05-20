import React from 'react';

const AccountComponent = () => {
  return (
    <div>
      <h2>My Account</h2>
      <div>
        <p>Name: Hello</p>
        <p>Email: 123@gmail.com</p>
        <p>Address: 123 Street, City, Country</p>
      </div>
      <button style={{ backgroundColor: "#ecc9d3", color: "black", fontSize: "20px", padding: "8px", marginTop: "20px", borderRadius: "5px" }}>Save</button>
    </div>
  );
};

export default AccountComponent;
