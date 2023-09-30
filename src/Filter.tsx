import React from "react";
import { observer } from "mobx-react-lite";
import Stack from "@mui/material/Stack";
import DataPickers from "./DataPickers";
import { MultipleSelectChip, LongSelect } from "./ChipSelect";

const Filter = () => {
  return (
        <Stack>
          <DataPickers />
          <LongSelect label="Автор" list={["Ниф-Ниф", "Наф-Наф", "Нуф-Нуф", "Ленин", "Жириновский", "Берия", "Троцкий", "Хрущев"]} />
          <MultipleSelectChip label="Категории" list={["Клуб Слизней", "Участники Битвы за Хогвартс", "Деканы Хогвартса", "Пожиратели смерти", "Убитые Волан-де-Мортом", "Зельевары", "Участники встречи в Поместье Малфоев", "Защитники философского камня", "Преподаватели Хогвартса"]} />
        </Stack>
  );
};

export default observer(Filter);
