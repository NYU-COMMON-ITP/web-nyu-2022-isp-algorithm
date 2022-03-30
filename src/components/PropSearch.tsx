import * as React from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import SearchIcon from '@mui/icons-material/Search';


export default function PropSearchField({ setIdSelected, setHomeSelected }) {
    interface propArr {
        id: number,
        home_name: string,
    };

    const [prop, setProp] = React.useState<propArr>({ id: null, home_name: "" });

    const handleClick = () => {
        console.log("input" + this.state.home_name)
        setIdSelected(this.state.id);
        setHomeSelected(this.state.home_name);
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
                    value={prop.id}
                    onChange={(e) => {
                        setProp({
                            id: parseInt(e.target.value),
                        })
                    }
                    }
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
                    value={prop.home_name}
                    onChange={e => {
                        setProp({
                            home_name: e.target.value,
                        })
                    }
                    }
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
                    Search
                </Button>
            </div>
        </Box >
    );
}
function props(props: any) {
    throw new Error('Function not implemented.');
}

