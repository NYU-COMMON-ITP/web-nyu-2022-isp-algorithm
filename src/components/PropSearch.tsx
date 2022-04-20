import * as React from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import SearchIcon from '@mui/icons-material/Search';


export default function PropSearchField({ setIdSelected, setHomeSelected,setPropSearch }) {
    const [id, setId] = React.useState(null);
    const [home, setHome] = React.useState('');

    // const onKeyDown = (event) => {
    //     if (event.keyCode === 13) {
    //         setIdSelected(event.target.value)
    //     }
    // };

    const handleIdChange = (event) => {
        setId(parseInt(event.target.value));
        setIdSelected(parseInt(event.target.value));
    };
    const handleHomeChange = (event) => {
        setHome(event.target.value);
        setHomeSelected(event.target.value);
    };
    const handleClick = (event) => {
        setPropSearch(true)
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
          }}>Property</div>
          <div style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
          }}>
              <TextField
                id="input-propid"
                label="ID"
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
              <TextField
                id="input-homename"
                label="Home Name"
                size="small"
                onChange={handleHomeChange}
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
                  {/*type="submit"*/}
                  Search
              </Button>
          </div>
      </Box >
    );
}
function props(props: any) {
    throw new Error('Function not implemented.');
}
