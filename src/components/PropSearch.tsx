import * as React from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import SearchIcon from '@mui/icons-material/Search';
import MenuItem from "@mui/material/MenuItem";


export default function PropSearchField({ setIdSelected,setHomeSelected, setSpaceStatus,setPropSearch }) {
    const [id, setId] = React.useState(null);
    const [home, setHome] = React.useState("");
    const [spaceStatus, setStatus] = React.useState("Any");
    const handleStatusChange = (event) => {
        setStatus(event.target.value);
        setSpaceStatus(event.target.value);
    };

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
              display: "flex",
              alignItems: "center",
              justifyContent: "center"
          }}>
              <TextField
                id="input-space-ava"
                select
                label="AVA_Status"
                size="small"
                InputLabelProps={{
                    shrink: true
                }}
                value={spaceStatus}
                onChange={handleStatusChange}
              >
                  <MenuItem value={String("Any")}>
                      {"Any"}
                  </MenuItem>
                  <MenuItem value={String("Vacant Ready (Available)")}>
                      {"Vacant Ready (Available)"}
                  </MenuItem>
                  <MenuItem value={String("Vacant Ready (Unavailable)")}>
                      {"Vacant Ready (Unavailable)"}
                  </MenuItem>
                  <MenuItem value={String("Vacant Not Ready (Available)")}>
                      {"Vacant Not Ready (Available)"}
                  </MenuItem>
                  <MenuItem value={String("On Notice (Available)")}>
                      {"On Notice (Available)"}
                  </MenuItem>
                  <MenuItem value={String("On Notice (Unavailable)")}>
                      {"On Notice (Unavailable)"}
                  </MenuItem>
                  <MenuItem value={String("Occupied (Unavailable)")}>
                      {"Occupied (Unavailable)"}
                  </MenuItem>
                  <MenuItem value={String("expired")}>
                      {"expired"}
                  </MenuItem>
              </TextField>
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
