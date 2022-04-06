import * as React from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import MenuItem from '@mui/material/MenuItem';
import MenuList from '@mui/material/MenuList';
import SearchIcon from '@mui/icons-material/Search';


export default function SpaceAttrField({ spaceAttr,setSpaceAttr, setTrig }) {
    // const [id, setId] = React.useState(null);
    // const [room, setRoom] = React.useState();

    const handleIdChange = (event) => {
        setSpaceAttr({
            ...spaceAttr,
            space_id: parseInt(event.target.value)
        })
    };

    // const handleClick = (event) => {
    //     setTrig(true);
    // }

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
            }}>Space Attributes</div>
            <div style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
            }}>
                <TextField
                    id="input-zipcode"
                    label="Space ID"
                    size="small"
                    value = {spaceAttr.space_id}
                    // onChange={handleIdChange}
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
                  label="Room"
                  size="small"
                  value = {spaceAttr.room_name}
                  // onChange={handleIdChange}
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
                {/*<TextField*/}
                {/*  label="Occupancy Type"*/}
                {/*  size="small"*/}
                {/*  value={spaceAttr.occupancy_type}*/}
                {/*  InputLabelProps={{*/}
                {/*      shrink: true,*/}
                {/*  }}*/}
                {/*/>*/}

                {/*<MenuItem key={option.value} value={option.value}>*/}
                {/*    {option.label}*/}
                {/*</MenuItem>*/}
                <TextField
                  select
                  size="small"
                  InputLabelProps={{
                      shrink: true,
                  }}
                  value={spaceAttr.occupancy_type}
                >
                    <MenuItem key={"traditional"} value={"traditional"} >Traditional</MenuItem>
                    <MenuItem key={"coliving"} value={"coliving"}>Coliving</MenuItem>
            </TextField>
            </div>
            <div style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
            }}>
                <Button
                  variant="outlined"
                  // onClick={handleClick}
                >
                    Update
                </Button>
            </div>
        </Box >
    );
}
