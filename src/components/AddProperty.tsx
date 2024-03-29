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

export default function AddProperty({
  setproperty_id,
  setbrand,
  sethome_name,
  setcity_name,
  setneighborhood,
  settimezone,
  setunit_count,
  setrownum,
  setcreatePropTrig,
}) {
  const [homename, sethomename] = React.useState(null);
  const [propertyid, setpropertyid] = React.useState(null);
  const [pbrand, setPbrand] = React.useState(null);
  const [cityname, setcityname] = React.useState(null);
  const [pneighborhood, setPneighborhood] = React.useState(null);
  const [time_zone, settime_zone] = React.useState(new Date());
  const [unitcount, setunitcount] = React.useState(null);
  const [row_num, setrow_num] = React.useState(null);
  const [createSpaceTrig, setcreateSpace_Trig] = React.useState(false);
  const [createPropTrig, setcreateProp_Trig] = React.useState(false);
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

  const handleTimezoneChange = (event) => {
    settimezone(event.target.value);
    settime_zone(event.target.value);
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
    setcreatePropTrig(true);
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
      ></div>
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
          onChange={handleHomeChange}
          size="small"
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
          onChange={handleBrandChange}
          size="small"
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
          onChange={handleCityChange}
          size="small"
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
          onChange={handleNeighborhoodChange}
          size="small"
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
          onChange={handleTimezoneChange}
          size="small"
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
          onChange={handleUnitCountChange}
          type="number"
          size="small"
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
          onChange={handleRowChange}
          type="number"
          size="small"
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
          Create Property
        </Button>
      </div>
    </Box>
  );
}
