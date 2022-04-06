import * as React from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import SearchIcon from '@mui/icons-material/Search';
import { useState } from "react";


export default function PropSearchField({ propAttr, setPropAttr,setTrig }) {
    const [id,setId] = useState("")
    const [home,setHome] = useState("")
    const handleIdChange = (event) => {
        setId(event.target.value)
        setPropAttr({
            ...propAttr,
            id: event.target.value
        })
    };
    const handleHomeChange = (event) => {
        setHome(event.target.value)
        setPropAttr({
            ...propAttr,
            home_name: event.target.value
        })
    };
    const handleClick = () => {
        setPropAttr({
            id:id,
            home_name:home,
            property_id:"",
            brand: "",
            city_name:"",
            neighborhood:"",
        })
        setTrig(true)
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
                    // value={propAttr.id}
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
                    // value={propAttr.home_name}
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
// function props(props: any) {
//     throw new Error('Function not implemented.');
// }

