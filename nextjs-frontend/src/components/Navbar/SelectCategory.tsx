"use client";

import { FormControl, MenuItem, Select } from "@mui/material";
import { grey } from "@mui/material/colors";
import { Category } from "../../models";

export function SelectCategory({ categories }: { categories: Category[] }) {
  return (
    <FormControl size="small" sx={{ width: 160 }}>
      <Select
        name="select-category"
        sx={{ backgroundColor: grey[300] }}
        onChange={() => console.log('handle change')}
      >
        <MenuItem value="0">Everything</MenuItem>
        {categories.map((category) => (
          <MenuItem key={category.id} value={category.id}>
            {category.name}
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  );
}