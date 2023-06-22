import React from "react";
import MaterialAutocomplete, { AutocompleteProps } from "@mui/material/Autocomplete";
import InputBase from "../InputBase/input-base";
import { OutlinedInputProps, TextField, TextFieldProps, TextFieldPropsColorOverrides } from "@mui/material";
import { alpha, styled } from "@mui/material/styles";

type MaterialAutocompleteProps = AutocompleteProps<any, boolean, boolean, boolean, "div">;
type MaterialColor = "primary" | "secondary" | "error" | "info" | "success" | "warning";

type ExtraProps = {
  color?: MaterialColor;
  label?: string;
};

const StyledMaterialAutocomplete = styled(MaterialAutocomplete)<MaterialAutocompleteProps & ExtraProps>(
  ({ theme, color = "primary" }) => ({
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
      padding: "2px 56px 2px 9px",
      boxShadow: `none`,
    },
    "& .MuiOutlinedInput-notchedOutline": {
      border: "1px solid",
      backgroundColor: alpha(theme.palette[color].main, 0.02),
      borderColor: alpha(theme.palette[color].main, 0.2),
    },
    "&:hover .MuiOutlinedInput-notchedOutline": {
      border: "2px solid",
      borderColor: alpha(theme.palette[color].main, 0.3),
    },
    "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
      transition: theme.transitions.create(["border-color", "background-color", "box-shadow"]),
      boxShadow: `${alpha(theme.palette[color].main, 0.15)} 0 0 0 0.2rem`,
      borderColor: `${alpha(theme.palette[color].main, 0.3)}`,
    },
  })
);

const Autocomplete = ({ color, label, ...props }: Omit<MaterialAutocompleteProps, "renderInput"> & ExtraProps) => {
  return (
    <StyledMaterialAutocomplete
      {...props}
      color={color}
      renderInput={(opts) => {
        console.log("opts", opts);

        return <TextField {...opts} label={label} />;
      }}
    />
  );
};

export default Autocomplete;
