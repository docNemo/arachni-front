import * as React from "react";
import { Theme, useTheme } from "@mui/material/styles";
import Box from "@mui/material/Box";
import OutlinedInput from "@mui/material/OutlinedInput";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select, { SelectChangeEvent } from "@mui/material/Select";
import Chip from "@mui/material/Chip";

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250,
    },
  },
};

const getStyles = (
  value: string,
  values: readonly string[],
  theme: Theme
) => ({
  fontWeight:
    values.indexOf(value) === -1
      ? theme.typography.fontWeightRegular
      : theme.typography.fontWeightMedium,
});

interface ISelectProps {
  label: string;
  list: Array<string>;
}

const MultipleSelectChip = ({ label, list }: ISelectProps) => {
  const theme = useTheme();
  const [values, setValues] = React.useState<string[]>(["Клуб Слизней", "Участники Битвы за Хогвартс"]);

  const handleChange = (event: SelectChangeEvent<typeof values>) => {
    const { target: { value } } = event;
    setValues(typeof value === "string" ? value.split(",") : value);
  };

  return (
    <FormControl variant="standard" size="small" sx={{ m: 1 }}>
      <InputLabel>{label}</InputLabel>
      <Select
        multiple
        value={values}
        onChange={handleChange}
        renderValue={(selected) => (
          <Box sx={{ display: "flex", flexWrap: "wrap", gap: 0.5 }}>
            {selected.map((value) => (
              <Chip key={value} label={value} />
            ))}
          </Box>
        )}
        MenuProps={MenuProps}
      >
        {list.map((el) => (
          <MenuItem
            key={el}
            value={el}
            style={getStyles(el, values, theme)}
          >
            {el}
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  );
};

const LongSelect = ({ label, list }: ISelectProps) => {
  const [value, setValue] = React.useState<string>("");
  const handleChange = (event: SelectChangeEvent) => setValue(event.target.value);

  return (
    <FormControl variant="standard" sx={{ m: 1, minWidth: 120 }} size="small">
      <InputLabel>{label}</InputLabel>
      <Select
        value={value}
        label={label}
        onChange={handleChange}
      >
        <MenuItem value="" sx={{ display: "none" }} />
        {list.map((el) => (
          <MenuItem
            key={el}
            value={el}
          >
            {el}
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  );
}

export { MultipleSelectChip, LongSelect };
