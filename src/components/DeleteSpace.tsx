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


export default function AddSpace({ setspace_id,setDeleteSpaceTrig }) {
    const [space_id, setspaceid] = React.useState(null);
    const [deleteSpaceTrig, setDeleteSpace_Trig] = React.useState(false);
    const [newSpace, setnewSpace] = React.useState(null);
  // const [room, setRoom] = React.useState();

  const deleteSpaceId = (event) => {
    setspace_id(event.target.value);
    setspaceid(event.target.value);
  };

  const deleteClickS= (event) => {
    setDeleteSpaceTrig(true)
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
          id="input-zipcode"
          label="Space ID"
          type= "number"
          onChange={deleteSpaceId}
          size="small"
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
        <Button variant="outlined" onClick={deleteClickS} endIcon={<SearchIcon />} >
          {/*type="submit"*/}
          Delete Space
        </Button>
      </div>
    </Box >
  );
}
