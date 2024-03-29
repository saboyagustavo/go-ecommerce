"use client";

import { InputBase, styled } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import { grey } from "@mui/material/colors";
import { useSearchParams } from "next/navigation";

const Search = styled("div")(({ theme }) => ({
  position: "relative",
  borderRadius: theme.shape.borderRadius,
  backgroundColor: grey[300],
  marginLeft: 0,
  width: "100%",
  [theme.breakpoints.up("sm")]: {
    marginLeft: theme.spacing(1),
    width: "50%",
  },
}));

const SearchIconWrapper = styled("div")(({ theme }) => ({
  padding: theme.spacing(0, 2),
  height: "100%",
  position: "absolute",
  pointerEvents: "none",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  color: grey[900],
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: grey[900],
  width: "100%",
  "& .MuiInputBase-input": {
    padding: theme.spacing(1, 1, 1, 0),
    paddingLeft: `calc(1em + ${theme.spacing(4)})`,
    transition: theme.transitions.create("width"),
    width: "100%",
  },
}));

export function SearchBar() {
  const searchParams = useSearchParams();
  
  return (
    <Search sx={{ width: 480}}>
      <SearchIconWrapper>
        <SearchIcon />
      </SearchIconWrapper>
      <form>
        <StyledInputBase
          name="search"
          type="search"
          placeholder="Search product by name..."
        />
      </form>
    </Search>
  );
}