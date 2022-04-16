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

ChartJS.register(ArcElement, Tooltip);

const useStyles = makeStyles({
  root: {
    maxWidth: "100%",
  },
  media: {
    height: 130,
  },
  alignItemsAndJustifyContent: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
});

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

const boxStyle_wb={
  display: 'block',
  color: 'grey.800' ,
  border: '1px solid',
  borderColor: 'grey.300',
  borderRadius: 1,
  fontSize: '0.6rem',
  fontWeight: '700',
  m:0.2,
  // display: 'inline'
}

const boxStyle_nb={
  display: 'block',
  color: 'grey.800' ,
  borderColor: 'grey.300',
  borderRadius: 1,
  fontSize: '0.6rem',
  fontWeight: '700',
  alignCenter:"center",
  m:0.2,
}

function PropCard({data}) {
  const classes = useStyles();
  console.log(data.weights)
  chartData.datasets[0].data=[data['weights'].wf_distance,data['weights'].wf_price,data['weights'].wf_time,data.weights.wf_market]
  return (
    <Card className={classes.root}>
      <Box display="flex" justifyContent="space-between">
        <Grid item xs={4}>
          <CardContent >
            <Button
              variant="outlined"
              size='small'
              sx={{
                mb: 1,
              }}
            >
              Briefing:
            </Button>
            <Box
              component="span"
              sx={boxStyle_nb}

            >
              Name:
            </Box>
            <Box
              component="span"
              sx={boxStyle_wb}
              className={classes.alignItemsAndJustifyContent}

            >
              {data.home_name.split('.')[1]}
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
              {data.home_name.split('.')[0]+" "+data.city_name}
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
              {data.city_name}
            </Box>
          </CardContent>
        </Grid>
        <Grid item xs={4}>
          <CardContent >
            <Button
              variant="outlined"
              size='small'
              sx={{
                mb: 1,
              }}
            >
              Weights:
            </Button>
            <Box
              component="span"
              sx={boxStyle_nb}
              >
              {"Dist: "}
            </Box>
            <Box
                component="span"
                sx={boxStyle_wb}
                className={classes.alignItemsAndJustifyContent}
            >
              {data.weights.wf_distance}
            </Box>
            <Box
              component="span"
              sx={boxStyle_nb}
            >
              {"Price: "}
            </Box>
            <Box
              component="span"
              sx={boxStyle_wb}
              className={classes.alignItemsAndJustifyContent}
            >
              {data.weights.wf_price}
            </Box>
            <Box
              component="span"
              sx={boxStyle_nb}
            >
              {"Time: "}
            </Box>
            <Box
              component="span"
              sx={boxStyle_wb}
              className={classes.alignItemsAndJustifyContent}
            >
              {data.weights.wf_time}
            </Box>
            <Box
              component="span"
              sx={boxStyle_nb}
            >
              {"Market: "}
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
              {"Sum:"}
            </Box>
            <Box
              component="span"
              sx={boxStyle_wb}
              className={classes.alignItemsAndJustifyContent}
            >
              {data.weights.wf_market}
            </Box>
          </CardContent>
        </Grid>
        <Grid item xs={4} >
          <CardContent sx={{
            mb: 1,
            fontSize: '0.8rem',
            float: 'middle',
          }}>
            {/*<Button*/}
            {/*  variant="outlined"*/}
            {/*  size='small'*/}
            {/*  sx={{*/}
            {/*    mb: 1,*/}
            {/*  }}*/}
            {/*>*/}
            {/*  Chart:*/}
            {/*</Button>*/}
          </CardContent>
          <Doughnut
            data={{labels: chartData.labels,
              datasets: chartData.datasets}}
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
          Score: Factor x Weight x Score
        </Box>
      </Grid>
    </Card>
  );
}

export default PropCard;