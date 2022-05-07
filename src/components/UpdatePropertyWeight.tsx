import * as React from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import SearchIcon from "@mui/icons-material/Search";

export default function UpdateProperty({
  setproperty_id,
  set_wf_distance,
  set_wf_price,
  set_wf_time,
  set_wf_market,
  setUpdatePropWeightTrig,
}) {
  const [propertyid, setpropertyid] = React.useState(null);
  const [wf_distance, setWf_distance] = React.useState(null);
  const [wf_price, setWf_price] = React.useState(null);
  const [wf_time, setWf_time] = React.useState(null);
  const [wf_market, setWf_market] = React.useState(null);
  const [updatePropWeightTrig, setUpdatePropWeight_Trig] =
    React.useState(false);
  const [newProp, setnewProp] = React.useState(null);
  // const [room, setRoom] = React.useState();

  const handlePropChange = (event) => {
    setpropertyid(event.target.value);
    setproperty_id(event.target.value);
  };

  const handleDistanceChange = (event) => {
    set_wf_distance(event.target.value);
    setWf_distance(event.target.value);
  };
  const handlePriceChange = (event) => {
    set_wf_price(event.target.value);
    setWf_price(event.target.value);
  };
  const handleTimeChange = (event) => {
    set_wf_time(event.target.value);
    setWf_time(event.target.value);
  };

  const handleMarketChange = (event) => {
    set_wf_market(event.target.value);
    setWf_market(event.target.value);
  };

  const handleClickP = (event) => {
    setUpdatePropWeightTrig(true);
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
          label="New Distance Weight"
          size="small"
          onChange={handleDistanceChange}
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
          label="New Price Weight"
          size="small"
          onChange={handlePriceChange}
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
          label="New Time Weight"
          size="small"
          onChange={handleTimeChange}
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
          label="New Market Weight"
          size="small"
          onChange={handleMarketChange}
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
