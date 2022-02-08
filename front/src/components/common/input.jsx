import React from "react";

const Input = ({ name, label, error, textType, ...rest }) => {
  return textType === "textarea" ? (
    <div className="form-group">
      <label htmlFor={name}>{label}</label>
      <textarea
        {...rest}
        name={name}
        id={name}
        className="form-control"
        rows="7"
      />
      {error && <div className="alert alert-danger">{error}</div>}
    </div>
  ) : (
    <div className="form-group">
      <label htmlFor={name}>{label}</label>
      <input {...rest} name={name} id={name} className="form-control" />
      {error && <div className="alert alert-danger">{error}</div>}
    </div>
  );
};

export default Input;
