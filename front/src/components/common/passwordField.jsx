import React, { useState, useEffect } from "react";

import IconButton from "@material-ui/core/IconButton";
import Visibility from "@material-ui/icons/Visibility";
import InputAdornment from "@material-ui/core/InputAdornment";
import VisibilityOff from "@material-ui/icons/VisibilityOff";
import Input from "@material-ui/core/Input";
import TitleOk from "./Titles/titleOk";

const PasswordField = (props) => {
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const handleChange = (event) => {
    setPassword(event.target.value);
    props.onChange(event.target.value);
  };

  return (
    <div className="row mt-4 ml-4">
      <>
        <TitleOk title={`${props.title}`} />
        <Input
          value={password}
          placeholder={`${props.placeholder}`}
          type={showPassword ? "text" : "password"}
          onChange={handleChange}
          endAdornment={
            <InputAdornment position="end">
              <IconButton onClick={() => setShowPassword(!showPassword)}>
                {showPassword ? <Visibility /> : <VisibilityOff />}
              </IconButton>
            </InputAdornment>
          }
        />
      </>
    </div>
  );
};

export default PasswordField;
