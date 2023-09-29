import React, { useState } from 'react';
import moment from 'moment';
import 'moment/locale/de';
import Stack from '@mui/material/Stack';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterMoment } from '@mui/x-date-pickers/AdapterMoment';
import { DesktopDatePicker } from '@mui/x-date-pickers/DesktopDatePicker';
import { DateField } from '@mui/x-date-pickers/DateField';
import FormControl from '@mui/material/FormControl';

const DatePickers = () => {
    const [begin, setBegin] = useState<string | null>(null);
    const [end, setEnd] = useState<string | null>(null);

    return (
        <LocalizationProvider dateAdapter={AdapterMoment} adapterLocale="de">
            <Stack>
                {/* <DesktopDatePicker
                    label="Начальная дата"
                    value={begin}
                    onChange={(newValue) => {
                        setBegin(newValue);
                    }}
                /> */}
                {/* <DesktopDatePicker
                    label="Конечная дата"
                    value={end}
                    onChange={(newValue) => {
                        setEnd(newValue);
                    }}
                /> */}
                <FormControl variant="standard" sx={{ m: 1, minWidth: 120 }} size="small">
                    <DateField variant="standard" label="Начальная дата" defaultValue={moment('2022-04-17')} />
                    <DateField variant="standard" label="Конечная дата" defaultValue={moment('2022-05-17')} />
                </FormControl>
            </Stack>
        </LocalizationProvider>
    );
}

export default DatePickers;
