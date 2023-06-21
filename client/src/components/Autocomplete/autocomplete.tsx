import React from "react";
import MaterialAutocomplete, { AutocompleteProps } from "@mui/material/Autocomplete";
import InputBase from "../InputBase/input-base";
import { OutlinedInputProps, TextField, TextFieldProps, TextFieldPropsColorOverrides } from "@mui/material";
import { alpha, styled } from "@mui/material/styles";

type MaterialAutocompleteProps = AutocompleteProps<any, boolean, boolean, boolean, "div">;
type MaterialColor = "primary" | "secondary" | "error" | "info" | "success" | "warning";

type ExtraProps = {
  color?: MaterialColor;
};

const StyledMaterialAutocomplete = styled(MaterialAutocomplete)<MaterialAutocompleteProps & ExtraProps>(
  ({ theme, color }) => ({
    "& .MuiOutlinedInput-root": {
      padding: "2px 56px 2px 9px",
      background: "red"
    },
    "& .MuiOutlinedInput-notchedOutline": {
      border: "1px solid",
      borderColor: theme.palette.mode === "light" ? "#E0E3E7" : "#2D3843",
    },
    "&:hover .MuiOutlinedInput-notchedOutline": {
      borderWidth: "2px",
      borderColor: "blue",
    },
    "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
      borderWidth: "2px",
      borderColor: "blue",
    },
  })
);

const Autocomplete = ({ color, ...props }: Omit<MaterialAutocompleteProps, "renderInput"> & ExtraProps) => {



  return (
    <StyledMaterialAutocomplete
      {...props}
      color={color}
      renderInput={(opts) => {
        return <TextField {...opts} />;
      }}
    />
  );
};

export default Autocomplete;
