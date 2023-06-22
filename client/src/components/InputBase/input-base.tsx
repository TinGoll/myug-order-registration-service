import { alpha, styled } from "@mui/material/styles";
import MaterialInputBase from "@mui/material/InputBase";



const InputBase = styled(MaterialInputBase)(({ theme, color = "primary" }) => ({
  "label + &": {
    marginTop: theme.spacing(1),
  },
  "& .MuiInputBase-input": {
    borderRadius: 4,
    position: "relative",
    backgroundColor: theme.palette.mode === "light" ? "#F3F6F9" : "#1A2027",
    border: "1px solid",
    borderColor: theme.palette.mode === "light" ? "#E0E3E7" : "#2D3843",
    padding: "8px 12px",
    transition: theme.transitions.create(["border-color", "background-color", "box-shadow"]),
    fontFamily: [
      "-apple-system",
      "BlinkMacSystemFont",
      '"Segoe UI"',
      "Roboto",
      '"Helvetica Neue"',
      "Arial",
      "sans-serif",
      '"Apple Color Emoji"',
      '"Segoe UI Emoji"',
      '"Segoe UI Symbol"',
    ].join(","),
    "&:focus": {
      boxShadow: `${alpha(theme.palette[color].main, 0.5)} 0 0 0 0.2rem`,
      borderColor: `${alpha(theme.palette[color].main, 0.3)}`,
    },
  },
}));

export default InputBase;
