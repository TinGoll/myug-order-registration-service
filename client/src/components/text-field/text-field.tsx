import React from "react";
import { alpha, styled } from "@mui/material/styles";
import MaterialTextField, { TextFieldProps } from "@mui/material/TextField";

const CssTextField = styled(MaterialTextField)(({ theme, color = "primary" }) => ({
  "& .MuiInputBase-input": {
    padding: "9.5px 14px",
  },
  "& .MuiInputBase-multiline": {
    padding: "6px 6px",
  },
  "& label": {
    lineHeight: "0.8em",
    fontSize: "0.9rem",
  },
  "& label.Mui-focused": {
    color: "#A0AAB4",
    lineHeight: "1.4375em",
    fontSize: "1rem",
  },
  "& .MuiFormLabel-filled": {
    color: "#A0AAB4",
    lineHeight: "1.4375em",
    fontSize: "1rem",
  },
  "& .MuiOutlinedInput-root": {
    "& fieldset": {
      backgroundColor: alpha(theme.palette["primary"].main, 0.02),
      borderColor: alpha(theme.palette["primary"].main, 0.2),
      borderRadius: 4,
    },
    "&:hover fieldset": {
      border: `2px solid ${alpha(theme.palette[color].main, 0.3)}`,
    },
    "&.Mui-focused fieldset": {
      transition: theme.transitions.create(["border-color", "background-color", "box-shadow"]),
      boxShadow: `${alpha(theme.palette[color].main, 0.15)} 0 0 0 0.2rem`,
      borderColor: `${alpha(theme.palette[color].main, 0.3)}`,
    },
  },
}));

const TextField = (props: TextFieldProps) => {
  return <CssTextField {...props} sx={{}} />;
};

export default TextField;
