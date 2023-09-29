import React from "react";
import { observer } from "mobx-react-lite";
import Popover from '@mui/material/Popover';
import Stack from "@mui/material/Stack";
import IconButton from "@mui/material/IconButton";
import FilterAltIcon from "@mui/icons-material/FilterAlt";
import { MultipleSelectChip, LongSelect } from "./ChipSelect";
import DataPickers from "./DataPickers";

const FilterButton = () => {
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => setAnchorEl(null);

  return (
    <>
      <IconButton
        sx={{ color: "white" }}
        onClick={handleClick}
      >
        <FilterAltIcon />
      </IconButton>
      <Popover
        open={!!anchorEl}
        anchorEl={anchorEl}
        onClose={handleClose}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'left',
        }}
        transformOrigin={{
          vertical: 'top',
          horizontal: 'right',
        }}
        sx={{
          display: "flex",
          flexDirection: "column"
        }}
      >
        <Stack>
          <DataPickers />
          <LongSelect label="Автор" list={["Ниф-Ниф", "Наф-Наф", "Нуф-Нуф", "Ленин", "Жириновский", "Берия", "Троцкий", "Хрущев"]} />
          <MultipleSelectChip label="Категории" list={["Клуб Слизней", "Участники Битвы за Хогвартс", "Деканы Хогвартса", "Пожиратели смерти", "Убитые Волан-де-Мортом", "Зельевары", "Участники встречи в Поместье Малфоев", "Защитники философского камня", "Преподаватели Хогвартса"]} />
        </Stack>
      </Popover>
    </>
  );
};

export default observer(FilterButton);
