import * as React from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import MenuItem from '@mui/material/MenuItem';
import DesktopDatePicker from '@mui/lab/DesktopDatePicker';
import AdapterDateFns from '@mui/lab/AdapterDateFns';
import LocalizationProvider from '@mui/lab/LocalizationProvider';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormControl from '@mui/material/FormControl';
import FormLabel from '@mui/material/FormLabel';
import SearchIcon from '@mui/icons-material/Search';


export default function UpdateProperty({ setproperty_id,setDeletePropTrig}) {
    const [propertyid, setpropertyid] = React.useState(null);
    const [deletePropTrig, setdeleteProp_Trig] = React.useState(false);
    const [newProp, setnewProp] = React.useState(null);
  // const [room, setRoom] = React.useState();

  const handleDeletePropid = (event) => {
    setproperty_id(event.target.value);
    setpropertyid(event.target.value);
  };

  const handleDeleteP= (event) => {
    setDeletePropTrig(true)
  };



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
      </div>
            <div style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
      }}>
        <TextField
          id="Property_ID"
          label="Property ID"
          size="small"
          onChange={handleDeletePropid}
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
        <Button variant="outlined" onClick={handleDeleteP} endIcon={<SearchIcon />} >
          {/*type="submit"*/}
          Delete Property
        </Button>
      </div>
    </Box >
  );
}
