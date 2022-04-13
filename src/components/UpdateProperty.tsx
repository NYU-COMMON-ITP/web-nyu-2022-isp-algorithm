import * as React from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import MenuItem from "@mui/material/MenuItem";
import DesktopDatePicker from "@mui/lab/DesktopDatePicker";
import AdapterDateFns from "@mui/lab/AdapterDateFns";
import LocalizationProvider from "@mui/lab/LocalizationProvider";
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormControl from "@mui/material/FormControl";
import FormLabel from "@mui/material/FormLabel";
import SearchIcon from "@mui/icons-material/Search";

export default function UpdateProperty({
  setproperty_id,
  setbrand,
  sethome_name,
  setcity_name,
  setneighborhood,
  settimezone,
  setunit_count,
  setrownum,
  setUpdatePropTrig,
}) {
  const [homename, sethomename] = React.useState(null);
  const [propertyid, setpropertyid] = React.useState(null);
  const [pbrand, setPbrand] = React.useState(null);
  const [cityname, setcityname] = React.useState(null);
  const [pneighborhood, setPneighborhood] = React.useState(null);
  const [time_zone, settime_zone] = React.useState(new Date());
  const [unitcount, setunitcount] = React.useState(null);
  const [row_num, setrow_num] = React.useState(null);
  const [updateSpaceTrig, setupdateSpace_Trig] = React.useState(false);
  const [updatePropTrig, setUpdateProp_Trig] = React.useState(false);
  const [newProp, setnewProp] = React.useState(null);
  // const [room, setRoom] = React.useState();

  const handleHomeChange = (event) => {
    sethomename(event.target.value);
    sethome_name(event.target.value);
  };

  const handlePropChange = (event) => {
    setpropertyid(event.target.value);
    setproperty_id(event.target.value);
  };

  const handleBrandChange = (event) => {
    setPbrand(event.target.value);
    setbrand(event.target.value);
  };
  const handleCityChange = (event) => {
    setcityname(event.target.value);
    setcity_name(event.target.value);
  };
  const handleNeighborhoodChange = (event) => {
    setneighborhood(event.target.value);
    setPneighborhood(event.target.value);
  };

  const handleTimezoneChange = (date) => {
    settimezone(date);
    settime_zone(date);
  };
  const handleUnitCountChange = (event) => {
    setunit_count(event.target.value);
    setunitcount(event.target.value);
  };
  const handleRowChange = (event) => {
    setrownum(event.target.value);
    setrow_num(event.target.value);
  };

  const handleClickP = (event) => {
    setUpdatePropTrig(true);
  };

  return (
    <Box
      component="form"
      sx={{
        "& .MuiTextField-root": { m: 1, width: "20ch" },
      }}
      noValidate
      autoComplete="off"
      justifyContent="center"
    >
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        {/* <TextField
          id="select-city"
          select
          label="Select City"
          size="small"
          value={city}
          onChange={handleCityChange}
          InputLabelProps={{
            shrink: true,
          }}
        >
          {cityMenu.map((option) => (
            <MenuItem key={option.value} value={option.value}>
              {option.label}
            </MenuItem>
          ))}
        </TextField> */}
      </div>
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <TextField
          id="input-ID"
          label="Id for Updation"
          size="small"
          onChange={handlePropChange}
          InputLabelProps={{
            shrink: true,
          }}
        />
      </div>
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <TextField
          id="input-zipcode"
          label="Home Name"
          size="small"
          onChange={handleHomeChange}
          InputLabelProps={{
            shrink: true,
          }}
        />
      </div>
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <TextField
          id="input-zipcode"
          label="Brand"
          size="small"
          onChange={handleBrandChange}
          InputLabelProps={{
            shrink: true,
          }}
        />
      </div>
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <TextField
          id="input-zipcode"
          label="City Name"
          size="small"
          onChange={handleCityChange}
          InputLabelProps={{
            shrink: true,
          }}
        />
      </div>
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <TextField
          id="input-zipcode"
          label="Neighborhood"
          size="small"
          onChange={handleNeighborhoodChange}
          InputLabelProps={{
            shrink: true,
          }}
        />
      </div>
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <TextField
          id="input-zipcode"
          label="Timezone"
          size="small"
          onChange={handleTimezoneChange}
          InputLabelProps={{
            shrink: true,
          }}
        />
      </div>
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <TextField
          id="outlined-number"
          label="Unit Count"
          type="number"
          size="small"
          onChange={handleUnitCountChange}
          InputLabelProps={{
            shrink: true,
          }}
        />
      </div>
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <TextField
          id="input-zipcode"
          label="Row Number"
          type="number"
          size="small"
          onChange={handleRowChange}
          InputLabelProps={{
            shrink: true,
          }}
        />
      </div>
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <Button
          variant="outlined"
          onClick={handleClickP}
          endIcon={<SearchIcon />}
        >
          {/*type="submit"*/}
          Update Property
        </Button>
      </div>
    </Box>
  );
}
