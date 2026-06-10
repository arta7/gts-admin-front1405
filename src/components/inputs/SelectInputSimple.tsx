import { useState } from "react";
import Autocomplete from "@mui/material/Autocomplete";
import TextField from "@mui/material/TextField";

export default function SelectInputSimple({
  value,
  onChange,
  options = [],
  label,
  disabled,
  getOptionLabel,
  getOptionValue
}) {

  const [inputValue, setInputValue] = useState("");

  const selectedOption =
    options.find(o => getOptionValue(o) === value) || null;

  return (
    <Autocomplete
      options={options}

      value={selectedOption}
      onChange={(e, newVal) =>
        onChange(newVal ? getOptionValue(newVal) : null)
      }

      inputValue={inputValue}
      onInputChange={(event, newInputValue) => {
        if (event?.target?.value !== undefined) {
          setInputValue(event.target.value);
        } else {
          setInputValue(newInputValue || "");
        }
      }}

      getOptionLabel={(option) =>
        option ? getOptionLabel(option) : ""
      }

      isOptionEqualToValue={(a, b) =>
        getOptionValue(a) === getOptionValue(b)
      }

      filterOptions={(opts, { inputValue }) => {
        const search = inputValue.trim();
        if (!search) return opts;
      
        const words = search.split(/\s+/).filter(Boolean);
      
        return opts.filter(o => {
          const label = (getOptionLabel(o) || "").trim();
          return words.every(w => label.includes(w));
        });
      }}
      
      

      renderInput={(params) => (
        <TextField
          {...params}
          label={label}
          size="small"
        />
      )}
    />
  );
}
