import React from "react";

const Input = ({ type, id, value, placeholder, onChange, error, label }) => {
  return (
    <div className="form-group">
      <label htmlFor="email">{label}</label>
      <input
        type={type}
        className="form-control"
        id={id}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
      />
      {error && (
        <div className="alert alert-danger" role="alert">
          {error}
        </div>
      )}
    </div>
  );
};

export default Input;
