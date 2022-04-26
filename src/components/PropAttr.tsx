import * as React from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import MenuItem from '@mui/material/MenuItem';
import { Grid } from "@mui/material";
import CardContent from "@mui/material/CardContent";
import { Doughnut } from "react-chartjs-2";
import Card from "@mui/material/Card";
import { makeStyles } from "@mui/styles";

// alignItemsAndJustifyContent: {
//   display: "flex",
//     alignItems: "center",
//     justifyContent: "center"
// }


const boxStyle_wb = {
  display: "block",
  color: "#1a76d1",
  border: "1px solid",
  borderColor: "#1a76d1",
  borderRadius: 1,
  fontSize: "0.8rem",
  fontWeight: "700",
  m: 0.2,
  overflow: "hidden",
  textOverflow: 'ellipsis',
  alignItems: "center",
  justifyContent: "center",
  textAlign: "center"
};

const boxStyle_nb = {
  display: "block",
  color: "#1a76d1",
  borderColor: "#1a76d1",
  borderRadius: 1,
  fontSize: "0.8rem",
  fontWeight: "700",
  alignCenter: "center",
  m: 0.2,
};

export default function PropAttrField({ wfs }) {
  return (

      <Box display="flex" justifyContent="space-between"
      >
          <CardContent >
            <Box
              component="span"
              sx={boxStyle_nb}
            >
              Distance Factor:
            </Box>
            <Box
              component="span"
              sx={boxStyle_wb}
            >
              {wfs.wf_dist}
            </Box>
            <Box
              component="span"
              sx={boxStyle_nb}
            >
              Price Factor:
            </Box>
            <Box
              component="span"
              sx={boxStyle_wb}
            >
              {wfs.wf_price}
            </Box>
            <Box
              component="span"
              sx={boxStyle_nb}
            >
              Time Factor:
            </Box>
            <Box
              component="span"
              sx={boxStyle_wb}
            >
              {wfs.wf_time}
            </Box>
            <Box
              component="span"
              sx={boxStyle_nb}
            >
              Market Factor:
            </Box>
            <Box
              component="span"
              sx={boxStyle_wb}
            >
              {wfs.wf_market}
            </Box>
          </CardContent>
      </Box>

  );
}
