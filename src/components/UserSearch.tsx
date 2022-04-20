import * as React from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import MenuItem from '@mui/material/MenuItem';
import MenuList from '@mui/material/MenuList';
import DesktopDatePicker from '@mui/lab/DesktopDatePicker';
import AdapterDateFns from '@mui/lab/AdapterDateFns';
import LocalizationProvider from '@mui/lab/LocalizationProvider';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormControl from '@mui/material/FormControl';
import FormLabel from '@mui/material/FormLabel';
import SearchIcon from '@mui/icons-material/Search';


export default function UserSearchField({ cityMenu, searchConditions,setSearchConditions,setSearch }) {
  const [city, setCity] = React.useState("");
  const [date, setDate] = React.useState(new Date());
  const [budget, setBudget] = React.useState("");
  const [pet, setPet] = React.useState(false);
  const [term, setTerm] = React.useState("12Mon");

  const handleCityChange = (event) => {
    setCity(event.target.value);
    setSearchConditions({
      ...searchConditions,
      city: event.target.value
    })
  };

  const handleZipChange = (event) => {
    setTerm(event.target.value);
    setSearchConditions({
      ...searchConditions,
      zip: event.target.value
    })
  };

  const handleBudgetChange = (event) => {
    setBudget(event.target.value)
    setSearchConditions({
      ...searchConditions,
      budget: event.target.value
    })
  };

  const handleTermChange = (event) => {
    setTerm(event.target.value);
    setSearchConditions({
      ...searchConditions,
      term: event.target.value
    })
  };

  const handlePetChange = (event) => {
    setPet(event.target.value)
    setSearchConditions({
      ...searchConditions,
      pet: event.target.value
    })
  };
  const handleDateChange = (date) => {
    setDate(date)
    setSearchConditions({
      ...searchConditions,
      move_in: date
    })
  }

  const handleClick = () => {
    setSearch(true)
  }

  return (
    <Box
      component="form"
      sx={{
        '& .MuiTextField-root': { m: 1, width: '20ch' },
      }}
      noValidate
      autoComplete="off"
      justifyContent="center"
    >
      <div style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
      }}>
        <TextField
          id="select-city"
          select
          label="Select City"
          size="small"
          value={city}
          onChange={handleCityChange}
          InputLabelProps={{
            shrink: true,
          }}
        >
          {cityMenu.map((option) => (
            <MenuItem key={option.value} value={option.value}>
              {option.label}
            </MenuItem>
          ))}
        </TextField>
      </div>
      <div style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
      }}>
        <TextField
          id="input-zipcode"
          label="Zip Code"
          size="small"
          onChange={handleZipChange}
          InputLabelProps={{
            shrink: true,
          }}
        />
      </div>
      <div style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
      }}>
        <TextField
          id="outlined-number"
          label="Budget"
          type="number"
          size="small"
          onChange={handleBudgetChange}
          InputLabelProps={{
            shrink: true,
          }}
        />
      </div>
      <div style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
      }}>
        <LocalizationProvider dateAdapter={AdapterDateFns}>
          <DesktopDatePicker
            label="Move in"
            value={date}
            disablePast
            onChange={(date) => handleDateChange(date)}
            renderInput={(params) => <TextField {...params} />}
          />
        </LocalizationProvider>
      </div>
      <div style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'left',
        paddingLeft: 30,
      }}>
        <FormControl>
          <FormLabel id="term-selection">Term</FormLabel>
          <RadioGroup
            aria-labelledby="term-of-lease"
            name="leasing-term"
            value={term}
            onChange={handleTermChange}
            defaultValue="12Mon"
          >
            <FormControlLabel value="3Mon" control={<Radio />} label="3 Months" />
            <FormControlLabel value="6Mon" control={<Radio />} label="6 Months" />
            <FormControlLabel value="9Mon" control={<Radio />} label="9 Months" />
            <FormControlLabel value="12Mon" control={<Radio />} label="12 Months" />
          </RadioGroup>
        </FormControl>
      </div>

      {/*<div style={{*/}
      {/*  display: 'flex',*/}
      {/*  alignItems: 'center',*/}
      {/*  justifyContent: 'left',*/}
      {/*  paddingLeft: 30,*/}
      {/*}}>*/}
      {/*  <FormControl>*/}
      {/*    <FormLabel id="pet-selection">Pet</FormLabel>*/}
      {/*    <RadioGroup*/}
      {/*      aria-labelledby="pet-allow"*/}
      {/*      name="pet-allow"*/}
      {/*      value={pet}*/}
      {/*      onChange={handlePetChange}*/}
      {/*      defaultValue="false"*/}
      {/*    >*/}
      {/*      <FormControlLabel value="false" control={<Radio />} label="False" />*/}
      {/*      <FormControlLabel value="true" control={<Radio />} label="True" />*/}
      {/*    </RadioGroup>*/}
      {/*  </FormControl>*/}
      {/*</div>*/}

      <div style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
      }}>
        <Button variant="outlined" onClick={handleClick} endIcon={<SearchIcon />} >
          Search
        </Button>
      </div>
    </Box >
  );
}
