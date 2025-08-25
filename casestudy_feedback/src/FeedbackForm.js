/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect } from 'react';

function FeedbackForm() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    rating: "",
    message: ""
  });

  const [errors, setErrors] = useState({});
  const validate = (fieldValues = form) => {
    let temp = { ...errors };
    if ("name" in fieldValues)
      temp.name = fieldValues.name ? "" : "Name is required";

    if ("email" in fieldValues)
      temp.email = fieldValues.email ? "" : "Email is required";

    if ("rating" in fieldValues)
      temp.rating = fieldValues.rating ? "" : "Rating is required";

    if ("message" in fieldValues)
      temp.message =
        fieldValues.message.length >= 20 && fieldValues.message.length <= 250
          ? ""
          : "Message must be 20-250 characters long";
    if ("email" in fieldValues) {
      temp.email =
        /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(fieldValues.email)
          ? temp.email
          : "Email is not valid";
    }

    if ("phone" in fieldValues && fieldValues.phone) {
      temp.phone =
        /^[0-9]{10}$/.test(fieldValues.phone)
          ? ""
          : "Phone must be a 10-digit number";
    }
    if ("name" in fieldValues) {
      temp.name =
        /^[A-Za-z ]+$/.test(fieldValues.name) && !temp.name
          ? ""
          : "Name should only contain alphabets and spaces";
    }

    setErrors({ ...temp });
    return Object.values(temp).every((x) => x === "");
  };
  useEffect(() => {
    validate();
  }, [form]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm({
      ...form,
      [name]: value
    });
    validate({ [name]: value });
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    if (validate()) {
      alert("Feedback submitted: " + JSON.stringify(form));
      setForm({
        name: "",
        email: "",
        phone: "",
        rating: "",
        message: ""
      });
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label>Name: </label>
        <input name="name" value={form.name} onChange={handleChange} />
        <div style={{ color: "red" }}>{errors.name}</div>
      </div>
      <div>
        <label>Email: </label>
        <input name="email" value={form.email} onChange={handleChange} />
        <div style={{ color: "red" }}>{errors.email}</div>
      </div>
      <div>
        <label>Phone: </label>
        <input name="phone" value={form.phone} onChange={handleChange} />
        <div style={{ color: "red" }}>{errors.phone}</div>
      </div>
      <div>
        <label>Rating: </label>
        <select name="rating" value={form.rating} onChange={handleChange}>
          <option value="">Select...</option>
          <option value="1">1 - Poor</option>
          <option value="2">2</option>
          <option value="3">3 - Average</option>
          <option value="4">4</option>
          <option value="5">5 - Excellent</option>
        </select>
        <div style={{ color: "red" }}>{errors.rating}</div>
      </div>
      <div>
        <label>Feedback: </label>
        <textarea name="message" value={form.message} onChange={handleChange} />
        <div style={{ color: "red" }}>{errors.message}</div>
      </div>
      <button type="submit">Submit</button>
    </form>
  );
}

export default FeedbackForm;
