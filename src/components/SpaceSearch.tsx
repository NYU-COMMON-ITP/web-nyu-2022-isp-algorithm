import * as React from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import SearchIcon from '@mui/icons-material/Search';


export default function SpaceSearchField({ setSpaceSelected, setSpaceSearch }) {
    const [space_id, setId] = React.useState(null);
    const handleIdChange = (event) => {
        setId(parseInt(event.target.value));
        setSpaceSelected(parseInt(event.target.value))
    };

    const handleClick = (event) => {
        setSpaceSearch(true)
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
          }}>Space</div>
          <div style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
          }}>
              <TextField
                id="input-zipcode"
                label="Space ID"
                size="small"
                onChange={handleIdChange}
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
              <Button variant="outlined" onClick={handleClick} endIcon={<SearchIcon />} >
                  Search
              </Button>
          </div>
      </Box >
    );
}