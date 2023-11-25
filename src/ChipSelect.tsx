import * as React from "react";
import {useTheme} from "@mui/material/styles";
import FormControl from "@mui/material/FormControl";
import {Autocomplete, AutocompleteChangeDetails, AutocompleteChangeReason} from "@mui/material";
import filterStore from "./FilterStore";
import TextField from "@mui/material/TextField";
import {SyntheticEvent} from "react";

interface ISelectProps {
    label: string;
    list: Array<string>;
    value: Array<string>;
    setValue: (newValue: Array<string>) => void;
}

const MultipleSelectChip = ({label, list, value, setValue}: ISelectProps) => {
    const theme = useTheme();

    const handleChange = (event: SyntheticEvent<Element, Event>, value: string[], reason: AutocompleteChangeReason, details?: AutocompleteChangeDetails<string> | undefined) => {
        setValue(value)
    }

    return (
        <FormControl variant="standard" size="small" sx={{m: 1}}>
            <Autocomplete
                multiple
                limitTags={2}
                renderInput={(params) => <TextField {...params} label={label}/>}
                options={list}
                value={value}
                onChange={handleChange}
                onInputChange={(event: React.SyntheticEvent, inputValue: string) => {
                    filterStore.loadCategories(inputValue)
                }}
            />
        </FormControl>
    );
};

const LongSelect = ({label, list, value, setValue}: ISelectProps) => {
    const handleChange = (event: SyntheticEvent<Element, Event>, value: string | null, reason: AutocompleteChangeReason, details?: AutocompleteChangeDetails<string> | undefined) => {
        setValue([value ?? ""])
    }

    return (
        <FormControl variant="standard" sx={{m: 1, minWidth: 120}} size="small">
            <Autocomplete
                renderInput={(params) => <TextField {...params} label={label}/>}
                options={list}
                value={value[0]}
                onChange={handleChange}
                onInputChange={(event: React.SyntheticEvent, value: string) => {
                    setValue([value ?? ""])
                    filterStore.loadCreators()
                }}
            />
        </FormControl>
    );
}

export {MultipleSelectChip, LongSelect};
