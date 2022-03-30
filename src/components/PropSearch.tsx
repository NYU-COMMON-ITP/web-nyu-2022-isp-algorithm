import * as React from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import SearchIcon from '@mui/icons-material/Search';


export default function PropSearchField({ setIdSelected, setHomeSelected }) {

    const onKeyDown = (event) => {
        if (event.keyCode === 13) {
            setIdSelected(event.target.value)
        }
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
                    onKeyDown={onKeyDown}
                    // onChange={e => {
                    //     setIdSelected(e.target.value)
                    // }}
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
                    onChange={e => {
                        setHomeSelected(e.target.value)
                    }}
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
                {/* <Button variant="outlined" type="submit" onClick={handleClick} endIcon={<SearchIcon />} >
                    Search
                </Button> */}
            </div>
        </Box >
    );
}
function props(props: any) {
    throw new Error('Function not implemented.');
}

