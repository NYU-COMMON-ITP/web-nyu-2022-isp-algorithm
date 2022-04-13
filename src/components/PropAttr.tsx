import * as React from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import SearchIcon from "@mui/icons-material/Search";
import Link from "next/link";
import { useState } from "react";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";

export default function PropAttrField({ setIdSelected, setHomeSelected }) {
  const [isUpdate, setData] = useState({ isUpdate: false });
  const [isCreate, setData1] = useState({ isCreate: false });
  const [isDelete, setData2] = useState({ isDelete: false });
  // const [id, setId] = React.useState(null);
  // const [home, setHome] = React.useState("");

  // const handleIdChange = (event) => {
  //     setId(event.target.value);
  // };
  // const handleHomeChange = (event) => {
  //     setHome(event.target.value);
  // };

  //   const handleClick = (event) => {
  //     setIdSelected(id);
  //     setHomeSelected(home);
  //   };

  return (
    <Box
      component="form"
      sx={{
        "& .MuiTextField-root": { m: 1, width: "50px" },
      }}
      noValidate
      autoComplete="off"
      justifyContent="center"
    >
      {/* <div style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
            }}>Property Attributes</div>
            <div style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
            }}>
                <TextField
                    id="input-zipcode"
                    label="ID"
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
                <TextField
                    id="input-zipcode"
                    label="Home Name"
                    size="small"
                    onChange={handleHomeChange}
                    InputLabelProps={{
                        shrink: true,
                    }}
                />
            </div> */}
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          border: "1px solid #c9dcf4",
          cursor: "pointer",
          marginTop: "10%",
        }}
      >
        {/* <Button variant="outlined" type="submit" onClick={handleClick} endIcon={<SearchIcon />} >
                    Update
                </Button> */}
        <Link
          href={{
            pathname: "/portal/operations",
            query: { isUpdate: true, isCreate: false, isDelete: false }, // the data
          }}
        >
          <a style={{ color: "#1876d1" }}>Update Property or/and Space</a>
        </Link>
        <EditIcon style={{ color: "#1876d1" }}></EditIcon>
      </div>
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          border: "1px solid #c9dcf4",
          cursor: "pointer",
          marginTop: "10%",
        }}
      >
        {/* <Button variant="outlined" type="submit" onClick={handleClick} endIcon={<SearchIcon />} >
                    Update
                </Button> */}
        <Link
          href={{
            pathname: "/portal/operations",
            query: { isUpdate: false, isCreate: true, isDelete: false }, // the data
          }}
        >
          <a style={{ color: "#1876d1" }}>create Property or/and Space</a>
        </Link>
        <AddCircleOutlineIcon
          style={{ color: "#1876d1" }}
        ></AddCircleOutlineIcon>
      </div>
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          border: "1px solid #c9dcf4",
          cursor: "pointer",
          marginTop: "10%",
        }}
      >
        {/* <Button variant="outlined" type="submit" onClick={handleClick} endIcon={<SearchIcon />} >
                    Update
                </Button> */}
        <Link
          href={{
            pathname: "/portal/operations",
            query: { isUpdate: false, isCreate: false, isDelete: true }, // the data
          }}
        >
          <a style={{ color: "#1876d1" }}>Delete Property or/and Space</a>
        </Link>
        <DeleteIcon style={{ color: "#1876d1" }}></DeleteIcon>
      </div>
    </Box>
  );
}
