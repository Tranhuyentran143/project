import React from 'react';

const OrderSuccessPage = () => {
  return (
    <div style={styles.container}>
      <h2 style={styles.heading}>ORDER SUCCESSFULLY!</h2>
      <p style={styles.message}>Thank you for your purchase. Your order has been successfully.</p>
      <p style={styles.instruction}>Please wait for our confirmation call.</p>
      <p style={styles.instruction}>You will receive a call shortly for order confirmation and delivery details !</p>
    </div>
  );
};

const styles = {
  container: {
    maxWidth: '700px',
    margin: '0 auto',
    padding: '20px',
    border: '5px solid #e39fbf',
    borderRadius: '10px',
    backgroundColor: '#edcaca',
    color: 'black',
  },
  heading: {
    textAlign: 'center',
    color: '#b72f75',
    fontSize: '24px',
    marginBottom: '20px',
  },
  message: {
    textAlign: 'left',
    fontSize: '18px',
    marginBottom: '20px',
  },
  instruction: {
    textAlign: 'left',
    fontSize: '16px',
    marginBottom: '20px',
  },
};

export default OrderSuccessPage;
