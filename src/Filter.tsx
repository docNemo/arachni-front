import React from "react";
import { observer } from "mobx-react-lite";
import Stack from "@mui/material/Stack";
import DataPickers from "./DataPickers";
import { MultipleSelectChip, LongSelect } from "./ChipSelect";
import store from "./Store";

const Filter = () => {
  return (
    <Stack>
      <DataPickers />
      <LongSelect
        label="Автор"
        list={[]}
        value={[store.filter.creator ?? ""]}
        setValue={(newValue) => store.filter.creator = newValue[0]}
      />
      <MultipleSelectChip
        label="Категории"
        list={[]}
        value={store.filter.categories}
        setValue={(newValue) => store.filter.categories = newValue}
      />
    </Stack>
  );
};

export default observer(Filter);
