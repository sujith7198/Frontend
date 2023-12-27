// TEST component
import React, { useState } from 'react';

function TEST({ onSubmit }) {
  const styles = {
    body: {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      height: '100vh',
      margin: 0,
      backgroundColor: '#f4f4f4',
    },
    form: {
      backgroundColor: '#fff',
      padding: '20px',
      borderRadius: '8px',
      boxShadow: '0 0 10px rgba(0, 0, 0, 0.1)',
      textAlign: 'center',
    },
    label: {
      display: 'block',
      marginBottom: '8px',
    },
    input: {
      width: '100%',
      padding: '8px',
      marginBottom: '16px',
      boxSizing: 'border-box',
    },
    fileInput: {
      border: '1px solid #ddd',
      borderRadius: '4px',
    },
    submitInput: {
      backgroundColor: '#007bff',
      color: '#fff',
      cursor: 'pointer',
    },
  };

  const [productName, setProductName] = useState('');
  const [amount, setAmount] = useState('');
  const [image, setImage] = useState(null);

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    setImage(file);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (typeof onSubmit === 'function') {
      const formData = new FormData();
      formData.append('productName', productName);
      formData.append('amount', amount);
      formData.append('image', image);

      onSubmit(formData);
      setProductName('');
      setAmount('');
      setImage(null);
    }
  };

  return (
    <>
      <div style={styles.body}>
        <form style={styles.form} onSubmit={handleSubmit}>
          <label style={styles.label}>Product Name</label>
          <input
            type='text'
            placeholder='Product name'
            value={productName}
            onChange={(e) => setProductName(e.target.value)}
            style={{ ...styles.input, ...styles.fileInput }}
          />
          <label style={styles.label}>Amount</label>
          <input
            type='text'
            placeholder='Amount'
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            style={{ ...styles.input, ...styles.fileInput }}
          />
          <input
            type="file"
            style={{ ...styles.input, ...styles.fileInput }}
            onChange={handleImageChange}
          />
          <input type="submit" value="Submit" style={styles.submitInput} />
        </form>
      </div>
    </>
  );
}

export default TEST;
