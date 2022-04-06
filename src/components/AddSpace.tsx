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


export default function AddSpace({ setspace_id, setproperty_id, setapartment_name, setroom_name, setoccupancy_type,
  setsecurity_dep,setdate_available,setstatus, setcreated_at, set_updated_at, set_mo3_price,set_mo6_price,set_mo9_price, 
  set_mo12_price,setbed_roomcount,setbath_count,set_min_price, set_max_price,setcreateSpaceTrig }) {
    const [space_id, setspaceid] = React.useState(null);
    const [property_id, setpropertyid] = React.useState(null);
    const [apartment_name, setpapartmentname] = React.useState(null);
    const [room_name, setroomname] = React.useState(null);
    const [occupancytype, setoccupancytype] = React.useState(null);
    const [security_deposit, setsecuritydeposit] = React.useState(new Date());
    const [dateavailable, setdateavailable] = React.useState(null);
    const [status, set_status] = React.useState(null);
    const [createdat, setcreatedat] = React.useState(null);
    const [updatedat, setupdatedat] = React.useState(null);
    const [mo6Price, setmo6Price] = React.useState(null);
    const [mo9Price, setmo9Price] = React.useState(null);
    const [mo3Price, setmo3Price] = React.useState(null);
    const [mo12Price, setmo12Price] = React.useState(null);
    const [bedroomcount, setbedroomcount] = React.useState(null);
    const [bathcount, setbathcount] = React.useState(null);
    const [maxprice, setmaxprice] = React.useState(null);
    const [minprice, setminprice] = React.useState(null);
    const [createSpaceTrig, setcreateSpace_Trig] = React.useState(false);
    const [newSpace, setnewSpace] = React.useState(null);
  // const [room, setRoom] = React.useState();

  const handlePropertyId = (event) => {
    setproperty_id(event.target.value);
    setpropertyid(event.target.value);
  };

  const handleApartmentChange = (event) => {
    setapartment_name(event.target.value);
    setpapartmentname(event.target.value);
  };

  const handleRoomNameChange = (event) => {
    setroom_name(event.target.value);
    setroomname(event.target.value)
  };

  const handlOccupancyChange = (event) => {
    setoccupancy_type(event.target.value)
    setoccupancytype(event.target.value)
  };
  const handleCityChange = (event) => {
    setcityname(event.target.value)
    setcity_name(event.target.value)
  };
const handleSecurityDepositChange = (event) => {
    setsecurity_dep(event.target.value)
    setsecuritydeposit(event.target.value)
  };

const handleDateavailableChange = (event) => {
    setdate_available(event.target.value)
    setdateavailable(event.target.value)
  };

const handleCreatedatChange = (event) => {
    setcreated_at(event.target.value)
    setcreatedat(event.target.value)
  };

const handleUpdatedatChange = (event) => {
    set_updated_at(event.target.value)
    setupdatedat(event.target.value)
  };


const handleUnitCountChange = (event) => {
    setunit_count(event.target.value)
    setunitcount(event.target.value)
  };
const handleStatusChange = (event) => {
    setstatus(event.target.value)
    set_status(event.target.value)
  };

const handlesetmo3priceChange = (event) => {
    set_mo3_price(event.target.value)
    setmo3Price(event.target.value)
  };

const handlesetmo6priceChange = (event) => {
    set_mo6_price(event.target.value)
    setmo6Price(event.target.value)
  };

const handlesetmo9priceChange = (event) => {
    set_mo9_price(event.target.value)
    setmo9Price(event.target.value)
  };

const handlesetmo12priceChange = (event) => {
    set_mo12_price(event.target.value)
    setmo12Price(event.target.value)
  };

const handlesbedroomChange = (event) => {
    setbed_roomcount(event.target.value)
    setbedroomcount(event.target.value)
  };

const handlesbathChange = (event) => {
    setbath_count(event.target.value)
    setbathcount(event.target.value)
  };

const handlesmaxpriceChange = (event) => {
    set_max_price(event.target.value)
    setmaxprice(event.target.value)
  };
const handlesminpriceChange = (event) => {
    set_min_price(event.target.value)
    setminprice(event.target.value)
  };

  const handleClickS= (event) => {
    setcreateSpaceTrig(true)
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
          label="Property ID"
          onChange={handlePropertyId}
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
        <TextField
          id="input-zipcode"
          label="Apartment Name"
          onChange={handleApartmentChange}
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
        <TextField
          id="input-zipcode"
          label="Room Name"
          onChange={handleRoomNameChange}
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
        <TextField
          id="input-zipcode"
          label="Occupency Type"
          onChange={handlOccupancyChange}
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
        <TextField
          id="input-zipcode"
          label="Security Deposit"
          type="number"
          onChange={handleSecurityDepositChange}
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
        <TextField
          id="input-zipcode"
          label="Date Available"
          onChange={handleDateavailableChange}
          size="small"
          type='date'
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
          id="input-zipcode"
          label="Status"
          onChange={handleStatusChange}
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
        <TextField
          id="input-zipcode"
          label="Created At"
          onChange={handleCreatedatChange}
          type="date"
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
        <TextField
          id="input-zipcode"
          label="Updated At"
          onChange={handleUpdatedatChange}
          type="date"
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
        <TextField
          id="input-zipcode"
          label="mo3 Price"
          onChange={handlesetmo3priceChange}
          type="number"
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
        <TextField
          id="input-zipcode"
          label="mo6 Price"
          onChange={handlesetmo6priceChange}
          type="number"
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
        <TextField
          id="input-zipcode"
          label="mo9 Price"
          onChange={handlesetmo9priceChange}
          type="number"
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
        <TextField
          id="outlined-number"
          label="mo12 Price"
          onChange={handlesetmo12priceChange}
          type="number"
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
        <TextField
          id="input-zipcode"
          label="Bedroom Count"
          onChange={handlesbedroomChange}
          type="number"
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
        <TextField
          id="input-zipcode"
          label="Bath Count"
          onChange={handlesbathChange}
          type="number"
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
        <TextField
          id="input-zipcode"
          label="Min Price"
          onChange={handlesminpriceChange}
          type="number"
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
        <TextField
          id="input-zipcode"
          label="Max price"
          onChange={handlesmaxpriceChange}
          type="number"
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
        <Button variant="outlined" onClick={handleClickS} endIcon={<SearchIcon />} >
          {/*type="submit"*/}
          Create Space
        </Button>
      </div>
    </Box >
  );
}
