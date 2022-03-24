import * as React from 'react';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormControl from '@mui/material/FormControl';
import FormGroup from '@mui/material/FormGroup';
import FormLabel from '@mui/material/FormLabel';
import AdapterDateFns from '@mui/lab/AdapterDateFns';
import LocalizationProvider from '@mui/lab/LocalizationProvider';
import DatePicker from '@mui/lab/DatePicker';
import MobileDatePicker from '@mui/lab/MobileDatePicker';
import DesktopDatePicker from '@mui/lab/DesktopDatePicker';
import Stack from '@mui/material/Stack';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import FormHelperText from '@mui/material/FormHelperText';
import Switch from '@mui/material/Switch';
import Slider from '@mui/material/Slider';
import Button from '@mui/material/Button';
import ButtonGroup from '@mui/material/ButtonGroup';




function ManagementPage() {
    const [value, setValue] = React.useState(new Date());
    const [state, setState] = React.useState({
        gilad: true,
        jason: false,
        antoine: true,
    });
    // const [rangevalue, setValue] = React.useState([20, 37]);

    const handleChange = (event) => {
        setState({
            ...state,
            [event.target.name]: event.target.checked,
        });
    };

    return (
        <Box
            component="form"
            sx={{
                '& .MuiTextField-root': { m: 1, width: '25ch' },
            }}
            noValidate
            autoComplete="off"
        >
            <div>
                <h1>Property Search Function</h1>
                <Stack>
                    <TextField
                        required
                        id="outlined-required"
                        label="ID"
                        defaultValue="ID"
                    />
                    <TextField
                        disabled
                        id="outlined-disabled"
                        label="Property Name"
                        defaultValue="Property Name"
                    />
                    <TextField
                        required
                        id="outlined-required"
                        label="Property ID"
                        defaultValue="Property ID"
                    />
                    <TextField
                        required
                        id="outlined-required"
                        label="Weight Value"
                        defaultValue="Weight Value"
                    />

                    <LocalizationProvider dateAdapter={AdapterDateFns}>

                        <DesktopDatePicker
                            label="CheckIn"
                            value={value}
                            minDate={new Date('2017-01-01')}
                            onChange={(newValue1) => {
                                setValue(newValue1);
                            }}
                            renderInput={(params) => <TextField {...params} />}
                        />
                        <DesktopDatePicker
                            label="CheckOut"
                            value={value}
                            minDate={new Date('2017-01-01')}
                            onChange={(newValue2) => {
                                setValue(newValue2);
                            }}
                            renderInput={(params) => <TextField {...params} />}
                        />

                    </LocalizationProvider>
                    <Box width={300}>
                        <Slider defaultValue={1500} aria-label="Default" valueLabelDisplay="auto" />
                    </Box>

                </Stack>
                <div>
                    <ButtonGroup variant="outlined" aria-label="outlined primary button group">
                        <Button>retrieve Info</Button>
                        <Button>Update Info</Button>
                        <Button>Delete Info</Button>
                    </ButtonGroup>
                </div>
                <div>



                    <h1> </h1>
                </div>
                <div>
                    <h1>Unit Search Function</h1>
                    <Stack>
                        <TextField
                            required
                            id="outlined-required"
                            label="ID"
                            defaultValue="ID"
                        />
                        <TextField
                            required
                            id="outlined-required"
                            label="Property ID"
                            defaultValue="Property ID"
                        />
                        <TextField
                            disabled
                            id="outlined-disabled"
                            label="Apt Num"
                            defaultValue="Apt Num"
                        />
                        <TextField
                            disabled
                            id="outlined-disabled"
                            label="Neighborhood"
                            defaultValue="Neighborhood"
                        />
                        <TextField
                            disabled
                            id="outlined-disabled"
                            label="room"
                            defaultValue="room"
                        />
                        <FormControl component="fieldset" variant="standard">
                            <FormLabel component="legend"></FormLabel>
                            <FormGroup>
                                <FormControlLabel
                                    control={
                                        <Switch checked={state.gilad} onChange={handleChange} name="gilad" />
                                    }
                                    label="Avaliable"
                                />
                                <FormControlLabel
                                    control={
                                        <Switch checked={state.jason} onChange={handleChange} name="jason" />
                                    }
                                    label="Coliving"
                                />
                            </FormGroup>
                            <FormHelperText></FormHelperText>
                        </FormControl>
                    </Stack>
                    <div>
                        <ButtonGroup variant="outlined" aria-label="outlined primary button group">
                            <Button>retrieve Info</Button>
                            <Button>Update Info</Button>
                            <Button>Delete Info</Button>
                        </ButtonGroup>
                    </div>
                </div>



                {/* <FormControl>
                    <FormLabel id="demo-row-radio-buttons-group-label">Gender</FormLabel>
                    <RadioGroup
                        row
                        aria-labelledby="demo-row-radio-buttons-group-label"
                        name="row-radio-buttons-group"
                    >
                        <FormControlLabel value="female" control={<Radio />} label="Female" />
                        <FormControlLabel value="male" control={<Radio />} label="Male" />
                        <FormControlLabel value="other" control={<Radio />} label="Other" />
                        <FormControlLabel
                            value="disabled"
                            disabled
                            control={<Radio />}
                            label="other"
                        />
                    </RadioGroup>
                </FormControl> */}





            </div>
        </Box>
    );
}

export default ManagementPage