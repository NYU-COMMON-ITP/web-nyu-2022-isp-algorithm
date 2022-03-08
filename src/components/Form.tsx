import * as React from 'react';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import MenuItem from '@mui/material/MenuItem';
import { getSpaces, spaces } from "../data-access/spaces";


export default function SelectTextFields({menuSelect,setcitiesSelected}) {
  const [city, setCity] = React.useState('');

  const handleChange = (event) => {
    setCity(event.target.value);
    setcitiesSelected(event.target.value);

  };

  // const [data, dataSet] = React.useState<any>(null)

  // React.useEffect(() => {
  //   const fetchSpace = async () => {
  //     const response = await fetch(`/api/v1/spaces/`, {
  //       method: "GET",
  //       headers: {
  //         "Content-Type": "application/json"
  //       },
  //     });

  //     if (!response.ok) {
  //       throw new Error(`Error: ${response.status}`);
  //     }

  //     const spacesData = await response.json();
  //     dataSet(spacesData);
  //     console.log("spacesData",spacesData);
      
  //   }
  
  //   fetchSpace();
  // }, [])

  return (
    <Box
      component="form"
      sx={{
        '& .MuiTextField-root': { m: 1, width: '25ch' },
      }}
      noValidate
      autoComplete="off"
    >
      <div>
        <TextField
          id="outlined-select-city"
          select
          label="Select City"
          value={city}
          onChange={handleChange}
          helperText="Please select your City"
        >
          {menuSelect.map((option) => (
            <MenuItem key={option.value} value={option.value}>
              {option.label}
            </MenuItem>
          ))}
        </TextField>
        {/* <TextField
          id="outlined-select-currency-native"
          select
          label="Native select"
          value={city}
          onChange={handleChange}
          SelectProps={{
            native: true,
          }}
          helperText="Please select your currency"
        >
          {currencies.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </TextField> */}
      </div>
      {/* <div>
        <TextField
          id="filled-select-currency"
          select
          label="Select City"
          value={currency}
          onChange={handleChange}
          helperText="Please select your currency"
          variant="filled"
        >
          {currencies.map((option) => (
            <MenuItem key={option.value} value={option.value}>
              {option.label}
            </MenuItem>
          ))}
        </TextField>
        <TextField
          id="filled-select-currency-native"
          select
          label="Native select"
          value={currency}
          onChange={handleChange}
          SelectProps={{
            native: true,
          }}
          helperText="Please select your currency"
          variant="filled"
        >
          {currencies.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </TextField>
      </div> */}
    </Box>
  );
}
