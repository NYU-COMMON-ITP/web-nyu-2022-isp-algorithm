import * as React from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import SearchIcon from '@mui/icons-material/Search';


export default function SpaceAttrField({ setIdSelected, setHomeSelected }) {
    const [id, setId] = React.useState(null);
    // const [room, setRoom] = React.useState();

    const handleIdChange = (event) => {
        setId(event.target.value);
    };


    const handleClick = (event) => {
        setIdSelected(id);
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
                <Button variant="outlined" type="submit" onClick={handleClick} endIcon={<SearchIcon />} >
                    Update
                </Button>
            </div>
        </Box >
    );
}
