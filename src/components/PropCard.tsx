import * as React from "react";
import { Doughnut } from 'react-chartjs-2';
import { useState, useEffect } from "react";
import Paper from "@mui/material/Paper";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import { Animation } from "@mui/icons-material";
import CardActionArea from "@mui/material/CardActionArea";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import CardActions from "@mui/material/CardActions";
import Button from "@mui/material/Button";
import CardMedia from '@mui/material/CardMedia';
import IconButton from '@mui/material/IconButton';
import SkipPreviousIcon from '@mui/icons-material/SkipPrevious';
import PlayArrowIcon from '@mui/icons-material/PlayArrow';
import SkipNextIcon from '@mui/icons-material/SkipNext';

import Box from '@mui/material/Box';
import Card from "@mui/material/Card";
import { makeStyles } from "@mui/styles";
import { Grid } from "@mui/material";
import usePagination from "./Paginations";
import { properties } from "../data-access/searches";

ChartJS.register(ArcElement, Tooltip);

const useStyles = makeStyles({
  root: {
    maxWidth: "100%",
  },
  media: {
    height: 130,
  },
});

// interface chartData {
//   data: number[];
//   backgroundColor: string[];
// }

const chartData = {
  labels : ["Distance", "Price", "Date", "Time", "Market"],
  datasets : [
    {
      label: '# of Votes',
      data: [0, 0, 0, 0],
      backgroundColor: ["#003f5c", "#58508d", "#bc5090", "#ff6361", "#ffa600"]
    }
  ]
}

function PropCard({data}) {
  const classes = useStyles();
  chartData.datasets[0].data=[1,2,3,4]
  return (
    <Card className={classes.root}>
      <Box display="flex" justifyContent="space-between">
        <Grid item xs={4}>
          <CardContent >
            <Button
              variant="outlined"
            >
              Briefing:
            </Button>
            <Typography variant={"body2"} color="text.secondary" component="div">
              Name:
            </Typography>
            <Typography variant={"caption"} color="text.secondary" component="div">
              {data.home_name}
            </Typography>
            <Typography variant={"body2"} color="text.secondary" component="div">
              ID:
            </Typography>
            <Typography variant={"caption"} color="text.secondary" component="div">
              {data.id}
            </Typography>
            <Typography variant={"body2"} color="text.secondary" component="div">
              City:
            </Typography>
            <Typography variant={"caption"} color="text.secondary" component="div">
              {data.city_name}
            </Typography>
            <Typography variant={"body1"} color="text.secondary" component="div">
              Price:
            </Typography>
          </CardContent>
        </Grid>
        <Grid item xs={4}>
          <CardContent >
            <Button
              variant="outlined"
            >
              Weights:
            </Button>
            <Typography variant={"body2"} color="text.secondary" component="div">
              Dist:
            </Typography>
            <Typography align={"center"} variant={"body1"} color="text.secondary" component="div">
              +
            </Typography>
            <Typography variant={"body2"} color="text.secondary" component="div">
              Price:
            </Typography>
            <Typography align={"center"} variant={"body1"} color="text.secondary" component="div">
              +
            </Typography>
            <Typography variant={"body2"} color="text.secondary" component="div">
              Time:
            </Typography>
            <Typography align={"center"} variant={"body1"} color="text.secondary" component="div">
              +
            </Typography>
            <Typography variant={"body2"} color="text.secondary" component="div">
              Markt:
            </Typography>
            <Typography align={"center"} variant={"body1"} color="text.secondary" component="div">
              =
            </Typography>
            <Typography variant={"body2"} color="text.secondary" component="div">
              Sum:
            </Typography>
          </CardContent>
        </Grid>
        <Grid item xs={4}>
          <CardContent>
          <Typography  variant={"body1"} color="text.secondary" component="div">
            Weight
            Distributions
          </Typography>
        </CardContent>
          <Doughnut
            data={{labels: chartData.labels,
              datasets: chartData.datasets}}
          />
        </Grid>
      </Box>
    </Card>
  );
}

export default PropCard;