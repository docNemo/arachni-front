import React from 'react';
import { observer } from "mobx-react-lite";
import moment, { Moment } from 'moment';
import 'moment/locale/de';
import Stack from '@mui/material/Stack';
import Box from '@mui/material/Box';
import FormControl from '@mui/material/FormControl';
import IconButton from "@mui/material/Button";
import CloseIcon from "@mui/icons-material/Close";
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterMoment } from '@mui/x-date-pickers/AdapterMoment';
import { DateField } from '@mui/x-date-pickers/DateField';
import store from "./Store";

const DatePickers = () => {
    const newStart = (newValue: Moment | null) => store.filter.beginDate = newValue?.format("YYYY-MM-DD");
    const newEnd = (newValue: Moment | null) => store.filter.endDate = newValue?.format("YYYY-MM-DD");

    return (
        <LocalizationProvider dateAdapter={AdapterMoment} adapterLocale="ru">
            <Stack>
                <FormControl variant="standard" sx={{ m: 1, minWidth: 120 }} size="small">
                    <Box sx={{ display: "flex", alignItems: "center" }}>
                        <DateField
                            fullWidth
                            variant="standard"
                            label="Начальная дата"
                            value={store.filter.beginDate ? moment(store.filter.beginDate) : undefined}
                            onChange={newStart}
                        />
                        {store.filter.beginDate &&
                            <IconButton
                                size="small"
                                sx={{ minWidth: 0, color: "#c0c0c0" }}
                                onClick={() => newStart(null)}
                            >
                                <CloseIcon />
                            </IconButton>
                        }
                    </Box>
                    <Box sx={{ display: "flex", alignItems: "center" }}>
                        <DateField
                            fullWidth
                            variant="standard"
                            label="Конечная дата"
                            value={store.filter.endDate ? moment(store.filter.endDate) : undefined}
                            onChange={newEnd}
                        />
                        {store.filter.endDate &&
                            <IconButton
                                size="small"
                                sx={{ minWidth: 0, color: "#c0c0c0" }}
                                onClick={() => newEnd(null)}
                            >
                                <CloseIcon />
                            </IconButton>
                        }
                    </Box>
                </FormControl>
            </Stack>
        </LocalizationProvider>
    );
}

export default observer(DatePickers);
