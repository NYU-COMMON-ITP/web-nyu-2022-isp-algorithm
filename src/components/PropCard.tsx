import * as React from "react";
import { Doughnut } from "react-chartjs-2";
import { ArcElement, Chart as ChartJS, Tooltip } from "chart.js";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import { makeStyles } from "@mui/styles";
import { Grid } from "@mui/material";
import { properties } from "../../src/data-access/searches";
import { useEffect, useState } from "react";

ChartJS.register(ArcElement, Tooltip);

const useStyles = makeStyles({
  root: {
    maxWidth: "100%"
  },
  media: {
    height: 130
  },
  alignItemsAndJustifyContent: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center"
  }
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
  overflow: "auto"
};

const boxStyle_nb = {
  display: "block",
  color: "grey.800",
  borderColor: "grey.300",
  borderRadius: 1,
  fontSize: "0.6rem",
  fontWeight: "700",
  alignCenter: "center",
  m: 0.2
};

function PropCard({ data }) {
  const classes = useStyles();
  // const [values,setValue] = useState([0,0,0,0])
  const [chartData, setChartData] = useState({
    labels: ["Distance", "Price", "Time", "Market"],
    datasets: [
      {
        data: [0, data["weights"].wf_price * data["weights"].diff_price, data["weights"].wf_time * data["weights"].diff_time, data["weights"].wf_market],
        backgroundColor: ["#003f5c", "#58508d", "#bc5090", "#ff6361", "#ffa600"]
      }
    ]
  });
  useEffect(() => {
    setChartData({
        labels: ["Distance", "Price", "Time", "Market"],
        datasets: [
          {
            data: [0, data["weights"].wf_price * data["weights"].diff_price, data["weights"].wf_time * data["weights"].diff_time, data["weights"].wf_market],
            backgroundColor: ["#003f5c", "#58508d", "#bc5090", "#ff6361", "#ffa600"]
          }
        ]
      }
    );
  }, [data["weights"].diff_price, data["weights"].diff_time]);

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
            <Box
              component="span"
              sx={boxStyle_nb}

            >
              Home:
            </Box>
            <Box
              component="span"
              sx={boxStyle_wb}
              className={classes.alignItemsAndJustifyContent}

            >
              {String(data.home_name).split(".")[1]!}
            </Box>
            <Box
              component="span"
              sx={boxStyle_nb}
            >
              ID:
            </Box>
            <Box
              component="span"
              sx={boxStyle_wb}
              className={classes.alignItemsAndJustifyContent}
            >
              {data.id}
            </Box>
            <Box
              component="span"
              sx={boxStyle_nb}
            >
              City:
            </Box>
            <Box
              component="span"
              sx={boxStyle_wb}
              className={classes.alignItemsAndJustifyContent}
            >
              {String(data!.home_name).split(".")[0] + " " + data!.city_name}
            </Box>
            <Box
              component="span"
              sx={boxStyle_nb}
            >
              Room:
            </Box>
            <Box
              component="span"
              sx={boxStyle_wb}
              className={classes.alignItemsAndJustifyContent}
            >
              {data.room_name}
            </Box>
            <Box
              component="span"
              sx={boxStyle_nb}
            >
              Price:
            </Box>
            <Box
              component="span"
              sx={boxStyle_wb}
              className={classes.alignItemsAndJustifyContent}
            >
              {data.price}
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
            <Box
              component="span"
              sx={boxStyle_nb}
            >
              {"Dist Score: "}
            </Box>
            <Box
              component="span"
              sx={boxStyle_wb}
              className={classes.alignItemsAndJustifyContent}
            >
              {data!.weights.wf_distance + " x "}
            </Box>
            <Box
              component="span"
              sx={boxStyle_nb}
            >
              {"Price Score: "}
            </Box>
            <Box
              component="span"
              sx={boxStyle_wb}
              className={classes.alignItemsAndJustifyContent}
            >
              {data!.weights.wf_price + " x " + data!.weights.diff_price}
            </Box>
            <Box
              component="span"
              sx={boxStyle_nb}
            >
              {"Time Score: "}
            </Box>
            <Box
              component="span"
              sx={boxStyle_wb}
              className={classes.alignItemsAndJustifyContent}
            >
              {data!.weights.wf_time + " x " + data!.weights.diff_time}
            </Box>
            <Box
              component="span"
              sx={boxStyle_nb}
            >
              {"Market Score: "}
            </Box>
            <Box
              component="span"
              sx={boxStyle_wb}
              className={classes.alignItemsAndJustifyContent}
            >
              {data.weights.wf_market}
            </Box>
            <Box
              component="span"
              sx={boxStyle_nb}
            >
              {"Scores Sum:"}
            </Box>
            <Box
              component="span"
              sx={boxStyle_wb}
              className={classes.alignItemsAndJustifyContent}
            >
              {data!["weights"].wf_price * data!["weights"].diff_price + data!["weights"].wf_time * data!["weights"].diff_time + data!["weights"].wf_market}
            </Box>
          </CardContent>
        </Grid>
        <Grid item xs={4} sx={{ m: 1 }}>
          <CardContent sx={{
            mb: 1,
            fontSize: "0.8rem",
            float: "middle"
          }}>
          </CardContent>
          <Doughnut
            data={{
              labels: chartData.labels,
              datasets: chartData.datasets
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