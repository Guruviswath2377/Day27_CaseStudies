/* eslint-disable no-mixed-operators */
/* eslint-disable no-unused-vars */
import React, { useState } from 'react';

const FormValidate = () => {
  const [form, setForm] = useState({
    name: '',
    email: '',
    password: '',
    phone: ''
  });

  const [errors, setErrors] = useState({});
  const validate = () => {
    let tempErrors = {};
    if (!form.name) tempErrors.name = "Name is required";
    if (!form.email) tempErrors.email = "Email is required";
    if (!form.password) tempErrors.password = "Password is required";
    if (!form.phone) tempErrors.phone = "Phone is required";
    if(form.email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) {
      tempErrors.email = "Email is not valid";
    }
    if(form.password && form.password.length < 6 || form.password.length > 120) {
      tempErrors.password = "Password must be at least 6 characters";
    }
    if(form.phone && !/^\d{10}$/.test(form.phone)) {
      tempErrors.phone = "Phone must be 10 digits";
    }
    setErrors(tempErrors);
    return Object.keys(tempErrors).length === 0;
  };
  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm({
      ...form,
      [name]: value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
  };

  return (
    <div style={{ maxWidth: '400px', margin: 'auto' }}>
      <h2>Registration Form</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Name:</label>
          <input type="text" name="name" value={form.name} onChange={handleChange} />
          {errors.name && <p style={{ color: 'red' }}>{errors.name}</p>}
        </div>

        <div>
          <label>Email:</label>
          <input type="email" name="email" value={form.email} onChange={handleChange} />
          {errors.email && <p style={{ color: 'red' }}>{errors.email}</p>}
        </div>

        <div>
          <label>Password:</label>
          <input type="password" name="password" value={form.password} onChange={handleChange} />
          {errors.password && <p style={{ color: 'red' }}>{errors.password}</p>}
        </div>

        <div>
          <label>Phone:</label>
          <input type="number" name="phone" value={form.phone} onChange={handleChange} />
          {errors.phone && <p style={{ color: 'red' }}>{errors.phone}</p>}
        </div>

        <button type="submit">Submit</button>
      </form>
    </div>
  );
};

export default FormValidate;
