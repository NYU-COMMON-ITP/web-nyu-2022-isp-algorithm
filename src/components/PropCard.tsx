import * as React from "react";
import { useEffect, useState } from "react";
import { Doughnut } from "react-chartjs-2";
import { ArcElement, Chart as ChartJS, Tooltip } from "chart.js";
import CardContent from "@mui/material/CardContent";
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import { makeStyles } from "@mui/styles";
import { Grid } from "@mui/material";

ChartJS.register(ArcElement, Tooltip);

const useStyles = makeStyles({
  root: {
    maxWidth: "100%",
  },
  media: {
    height: 130,
  },
  alignItemsAndJustifyContent: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
});

const boxStyle_wb = {
  display: "block",
  color: "grey.800",
  border: "1px solid",
  borderColor: "grey.300",
  borderRadius: 1,
  fontSize: "0.6rem",
  fontWeight: "700",
  m: 0.2,
  overflow: "hidden",
  textOverflow: "ellipsis",
};

const boxStyle_nb = {
  display: "block",
  color: "grey.800",
  borderColor: "grey.300",
  borderRadius: 1,
  fontSize: "0.6rem",
  fontWeight: "700",
  alignCenter: "center",
  m: 0.2,
};

function PropCard({ data }) {
  const classes = useStyles();
  //String
  const home_name = String(data.home_name).split(".")[1]
    ? String(data.home_name).split(".")[1]
    : "";
  const home_id = String(data.id) ? String(data.id) : "";
  const city_1 = String(data.home_name).split(".")[0]
    ? String(data.home_name).split(".")[0]
    : "";
  const city_2 = String(data.city_name) ? String(data.city_name) : "";
  const room_name = String(data.space_info.room_name)
    ? data.space_info.room_name
    : "";
  const space_id = String(data.space_info.space_id)
    ? data.space_info.space_id
    : "";

  //Diff Score
  const dist_score = data.distance ? data.distance : 0;

  const price_score = data.weights.diff_price ? data.weights.diff_price : 0;
  const time_score = data.weights.diff_time ? data.weights.diff_time : 0;

  //Weight factors
  const price_wf = data.weights.price_wf ? data.weights.price_wf : 0;

  const dist_wf = data.weights.dist_wf ? data.weights.dist_wf : 1;

  const time_wf = data.weights.time_wf ? data.weights.time_wf : 0;
  const market_wf = data.weights.market_wf ? data.weights.market_wf : 0;

  const scores = data.sumWeight ? data.sumWeight : 0;

  const disValue = data.distance_values ? data.distance_values : 0;
  console.log("?????", data);

  const [chartData, setChartData] = useState({
    labels: ["Distance", "Price", "Time", "Market"],
    datasets: [
      {
        data: [
          0,
          Math.abs(price_wf * price_score),
          Math.abs(time_wf * time_score),
          Math.abs(market_wf),
        ],
        backgroundColor: [
          "#003f5c",
          "#58508d",
          "#bc5090",
          "#ff6361",
          "#ffa600",
        ],
      },
    ],
  });
  useEffect(() => {
    setChartData({
      labels: ["Distance", "Price", "Time", "Market"],
      datasets: [
        {
          data: [dist_score, price_wf * price_score, time_wf * time_score, market_wf],
          backgroundColor: [
            "#003f5c",
            "#58508d",
            "#bc5090",
            "#ff6361",
            "#ffa600",
          ],
        },
      ],
    });
  }, [price_score, time_score]);

  return (
    <Card className={classes.root}>
      <Box display="flex" justifyContent="space-between">
        <Grid item xs={4}>
          <CardContent>
            <Box
              sx={{
                mb: 0.5,
                p: 0.5,
                fontSize: "0.7rem",
                fontWeight: "700",
                colorScheme: "init",
                display: "block",
                color: "#1a76d2",
                border: "1px solid",
                borderColor: "#8cbae8",
                borderRadius: 1,
                alignCenter: "center",
              }}
            >
              Briefing:
            </Box>
            <Box component="span" sx={boxStyle_nb}>
              Home:
            </Box>
            <Box
              component="span"
              sx={boxStyle_wb}
              className={classes.alignItemsAndJustifyContent}
            >
              {home_name}
            </Box>
            <Box component="span" sx={boxStyle_nb}>
              Home ID:
            </Box>
            <Box
              component="span"
              sx={boxStyle_wb}
              className={classes.alignItemsAndJustifyContent}
            >
              {home_id}
            </Box>
            <Box component="span" sx={boxStyle_nb}>
              City:
            </Box>
            <Box
              component="span"
              sx={boxStyle_wb}
              className={classes.alignItemsAndJustifyContent}
            >
              {city_1 + " " + city_2}
            </Box>
            <Box component="span" sx={boxStyle_nb}>
              Room:
            </Box>
            <Box
              component="span"
              sx={boxStyle_wb}
              className={classes.alignItemsAndJustifyContent}
            >
              {room_name}
            </Box>
            <Box component="span" sx={boxStyle_nb}>
              Room ID:
            </Box>
            <Box
              component="span"
              sx={boxStyle_wb}
              className={classes.alignItemsAndJustifyContent}
            >
              {space_id}
            </Box>
          </CardContent>
        </Grid>
        <Grid item xs={4}>
          <CardContent>
            <Box
              sx={{
                mb: 0.5,
                p: 0.5,
                fontSize: "0.7rem",
                fontWeight: "700",
                colorScheme: "init",
                display: "block",
                color: "#1a76d2",
                border: "1px solid",
                borderColor: "#8cbae8",
                borderRadius: 1,
                alignCenter: "center",
              }}
            >
              Weights:
            </Box>
            <Box component="span" sx={boxStyle_nb}>
              {"Dist Score: "}
            </Box>
            <Box
              component="span"
              sx={boxStyle_wb}
              className={classes.alignItemsAndJustifyContent}
            >
              {distance_wf + " x " + disValue}
            </Box>
            <Box component="span" sx={boxStyle_nb}>
              {"Price Score: "}
            </Box>
            <Box
              component="span"
              sx={boxStyle_wb}
              className={classes.alignItemsAndJustifyContent}
            >
              {price_wf + " x " + price_score}
            </Box>
            <Box component="span" sx={boxStyle_nb}>
              {"Time Score: "}
            </Box>
            <Box
              component="span"
              sx={boxStyle_wb}
              className={classes.alignItemsAndJustifyContent}
            >
              {time_wf + " x " + time_score}
            </Box>
            <Box component="span" sx={boxStyle_nb}>
              {"Market Score: "}
            </Box>
            <Box
              component="span"
              sx={boxStyle_wb}
              className={classes.alignItemsAndJustifyContent}
            >
              {market_wf}
            </Box>
            <Box component="span" sx={boxStyle_nb}>
              {"Scores Sum:"}
            </Box>
            <Box
              component="span"
              sx={boxStyle_wb}
              className={classes.alignItemsAndJustifyContent}
            >
              {scores}
            </Box>
          </CardContent>
        </Grid>
        <Grid item xs={4} sx={{ m: 1 }}>
          <CardContent
            sx={{
              mb: 1,
              fontSize: "0.8rem",
              float: "middle",
            }}
          ></CardContent>
          <Doughnut
            data={{
              labels: chartData.labels,
              datasets: chartData.datasets,
            }}
          />
          <Box
            component="span"
            sx={boxStyle_nb}
            className={classes.alignItemsAndJustifyContent}
          >
            Distribution of Weights
          </Box>
        </Grid>
      </Box>
      <Grid item xs={12}>
        <Box
          component="span"
          sx={boxStyle_wb}
          className={classes.alignItemsAndJustifyContent}
        >
          Score: Factor x Score
        </Box>
      </Grid>
    </Card>
  );
}

export default PropCard;
