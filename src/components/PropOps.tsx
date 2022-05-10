import * as React from "react";
import Box from "@mui/material/Box";
import Link from "next/link";
import { useState } from "react";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";

export default function PropOpsField({ setIdSelected, setHomeSelected }) {
  const [isUpdate, setData] = useState({ isUpdate: false });
  const [isCreate, setData1] = useState({ isCreate: false });
  const [isDelete, setData2] = useState({ isDelete: false });
  const [isUpdateWeight, setData3] = useState({ isDelete: false });

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
      <div className="editButton">
        <Link
          href={{
            pathname: "/portal/operations",
            query: {
              isUpdate: false,
              isCreate: true,
              isDelete: false,
              isUpdateWeight: false,
            }, // the data
          }}
        >
          <a style={{ color: "#1876d1" }}>Create Property</a>
        </Link>
        <AddCircleOutlineIcon
          style={{ color: "#1876d1" }}
        ></AddCircleOutlineIcon>
      </div>

      <div className="editButton">
        <Link
          href={{
            pathname: "/portal/operations",
            query: {
              isUpdate: true,
              isCreate: false,
              isDelete: false,
              isUpdateWeight: false,
            }, // the data
          }}
        >
          <a style={{ color: "#1876d1" }}>Update Property</a>
        </Link>
        <EditIcon style={{ color: "#1876d1" }}></EditIcon>
      </div>

      <div className="editButton">
        <Link
          href={{
            pathname: "/portal/operations",
            query: {
              isUpdate: false,
              isCreate: false,
              isDelete: false,
              isUpdateWeight: true,
            }, // the data
          }}
        >
          <a style={{ color: "#1876d1" }}>Update Property Weight</a>
        </Link>
        <EditIcon style={{ color: "#1876d1" }}></EditIcon>
      </div>

      <div className="editButton">
        <Link
          href={{
            pathname: "/portal/operations",
            query: {
              isUpdate: false,
              isCreate: false,
              isDelete: true,
              isUpdateWeight: false,
            }, // the data
          }}
        >
          <a style={{ color: "#1876d1" }}>Delete Property</a>
        </Link>
        <DeleteIcon style={{ color: "#1876d1" }}></DeleteIcon>
      </div>
    </Box>
  );
}
