import * as React from "react";
import { GetStaticProps } from "next";
import { styled, createTheme, ThemeProvider } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import MuiDrawer from "@mui/material/Drawer";
import Box from "@mui/material/Box";
import MuiAppBar, { AppBarProps as MuiAppBarProps } from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import List from "@mui/material/List";
import Typography from "@mui/material/Typography";
import Divider from "@mui/material/Divider";
import IconButton from "@mui/material/IconButton";
import Badge from "@mui/material/Badge";
import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid";
import Link from "@mui/material/Link";
import Paper from "@mui/material/Paper";
import MenuIcon from "@mui/icons-material/Menu";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import NotificationsIcon from "@mui/icons-material/Notifications";
import { ListItems } from "../../src/components/ListItems";
import PropSearchField from "../../src/components/PropSearch";
import SpaceSearchField from "../../src/components/SpaceSearch";
import PropOpsField from "../../src/components/PropOps";
import SpaceOpsField from "../../src/components/SpaceOps";
import PropAttrField from "../../src/components/PropAttr";
import Copyright from "../../src/components/Copyright";
import AppBar from "../../src/components/AppBar";
import Drawer from "../../src/components/Drawer";
import SpaceAttrField from "../../src/components/SpaceAttr";
import { DataGrid, GridColDef } from "@mui/x-data-grid";
import { properties, spaces } from "../../src/data-access/searches";

export const getStaticProps: GetStaticProps = async () => {
  const spacesJson = [];
  const propertiesJson = [];
  return {
    props: { propertiesJson, spacesJson },
  };
};

const propColumns: GridColDef[] = [
  { field: "id", headerName: "ID", width: 50 },
  { field: "home_name", headerName: "Home", width: 150 },
  { field: "property_id", headerName: "Prop_ID", width: 120 },
  { field: "brand", headerName: "Brand", width: 70 },
  { field: "city_name", headerName: "City", width: 100 },
  { field: "neighborhood", headerName: "Neighborhood", width: 150 },
  { field: "unit_count", headerName: "Unit", width: 70 },
];

const spaceColumns: GridColDef[] = [
  { field: "space_id", headerName: "ID", width: 70 },
  { field: "date_available", headerName: "DATE_AVA", width: 100 },
  { field: "property_id", headerName: "Prop_ID", width: 100 },
  { field: "room_name", headerName: "ROOM", width: 150 },
  { field: "status", headerName: "STATUS", width: 200 },
];

const mdTheme = createTheme();

function resToJson(props) {
  const propertiesJson = [];
  const spacesJson = [];
  for (const [index, prop] of Object.entries(props)) {
    propertiesJson.push({
      id: prop["id"],
      home_name: prop["home_name"],
      property_id: prop["property_id"],
      brand: prop["brand"],
      city_name: prop["city_name"],
      neighborhood: prop["neighborhood"],
      timezone: prop["timezone"],
      unit_count: prop["unit_count"],
      wf_distance: prop["wf_distance"],
      wf_price: prop["wf_price"],
      wf_time: prop["wf_time"],
      wf_market: prop["wf_market"],
    });
    if (prop["spaces"]) {
      for (const space of prop["spaces"]) {
        spacesJson.push({
          id: space["space_id"],
          space_id: space["space_id"],
          date_available: String(space["date_available"]).split("T")[0],
          property_id: space["property_id"],
          room_name: space["room_name"],
          status: space["status"],
        });
      }
    }
  }
  return { propertiesJson, spacesJson };
}

function PortalContent({ propertiesJson, spacesJson }) {
  const [open, setOpen] = React.useState(false);
  const [propSelected, setIdSelected] = React.useState(null);
  const [spSelected, setSpSelected] = React.useState(null);
  const [spStatus, setSpaceStatus] = React.useState(String("Any"));
  const [homeSelected, setHomeSelected] = React.useState("");
  const [searchPropTrig, setPropSearch] = React.useState(false);
  const [searchSpaceTrig, setSpaceSearch] = React.useState(false);
  const [newProp, setNewProp] = React.useState([]);
  const [newSpace, setNewSpace] = React.useState([]);
  const [propWfs, setPropWfs] = React.useState({
    wf_price: 0,
    wf_time: 0,
    wf_market: 0,
    wf_distance: 0,
  });

  const toggleDrawer = () => {
    setOpen(!open);
  };

  React.useEffect(() => {
    async function fetchProp() {
      const data = {
        operation: "managePropSearch",
        variables: {
          id: propSelected,
          home_name: homeSelected,
          space_status: spStatus,
        },
      };
      const response = await fetch(
        "http://localhost:6003/api/v1/managtPropSearch",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(data),
        }
      );
      const properties = await response.json();
      if (!properties || properties.length == 0) {
        setNewProp([]);
        setNewSpace([]);
        return;
      }
      const { propertiesJson, spacesJson } = resToJson(properties);
      setNewProp(propertiesJson);
      setNewSpace(spacesJson);
    }
    fetchProp().then(() => console.log("Search Prop"));
    setPropSearch(false);
  }, [searchPropTrig]);

  React.useEffect(() => {
    async function fetchSpace() {
      const data = {
        operation: "manageSpaceSearch",
        variables: {
          space_id: spSelected,
        },
      };
      const response = await fetch(
        "http://localhost:6003/api/v1/managtSpaceSearch",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(data),
        }
      );
      const properties = await response.json();
      if (!properties || properties.length == 0) {
        setNewProp([]);
        setNewSpace([]);
        return;
      }
      const { propertiesJson, spacesJson } = resToJson(properties);
      setNewProp(propertiesJson);
      setNewSpace(spacesJson);
    }
    fetchSpace().then(() => console.log("Search Space"));
    setSpaceSearch(false);
  }, [searchSpaceTrig]);

  return (
    <ThemeProvider theme={mdTheme}>
      <Box sx={{ display: "flex" }}>
        <CssBaseline />
        <AppBar position="absolute" open={open}>
          <Toolbar
            sx={{
              pr: "24px", // keep right padding when drawer closed
            }}
          >
            <IconButton
              edge="start"
              color="inherit"
              aria-label="open drawer"
              onClick={toggleDrawer}
              sx={{
                marginRight: "36px",
                ...(open && { display: "none" }),
              }}
            >
              <MenuIcon />
            </IconButton>
            <Typography
              component="h1"
              variant="h6"
              color="inherit"
              noWrap
              sx={{ flexGrow: 1 }}
            >
              Dashboard
            </Typography>
            <IconButton color="inherit">
              <Badge badgeContent={0} color="secondary">
                <NotificationsIcon />
              </Badge>
            </IconButton>
          </Toolbar>
        </AppBar>
        <Drawer variant="permanent" open={open}>
          <Toolbar
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "flex-end",
              px: [1],
            }}
          >
            <IconButton onClick={toggleDrawer}>
              <ChevronLeftIcon />
            </IconButton>
          </Toolbar>
          <Divider />
          <List component="nav">{ListItems}</List>
        </Drawer>
        <Box
          component="main"
          sx={{
            backgroundColor: (theme) =>
              theme.palette.mode === "light"
                ? theme.palette.grey[100]
                : theme.palette.grey[900],
            flexGrow: 1,
            height: "100vh",
            overflow: "auto",
          }}
        >
          <Toolbar />

          <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
            <Grid container spacing={3}>
              <Grid item xs={12} md={2} lg={2}>
                <Paper sx={{ p: 2, display: "flex", flexDirection: "column" }}>
                  <PropSearchField
                    setIdSelected={setIdSelected}
                    setHomeSelected={setHomeSelected}
                    setSpaceStatus={setSpaceStatus}
                    setPropSearch={setPropSearch}
                  />
                </Paper>
              </Grid>
              <Grid item xs={12} md={8} lg={8}>
                <Paper sx={{ p: 2, display: "flex", flexDirection: "column" }}>
                  <div style={{ height: 400, width: "100%", fontSize: 8 }}>
                    <DataGrid
                      getRowId={(row) => row.id}
                      rows={newProp != null ? Array.from(newProp) : []}
                      columns={propColumns}
                      pageSize={5}
                      rowsPerPageOptions={[5, 20, 50]}
                      checkboxSelection={false}
                      onSelectionModelChange={(ids) => {
                        if (ids) {
                          const selectedProp: properties[] = newProp.filter(
                            function (obj, index) {
                              return obj.id == ids;
                            }
                          );
                          if (selectedProp.length != 0) {
                            setPropWfs({
                              ...propWfs,
                              wf_price: selectedProp[0].wf_price
                                ? parseInt(String(selectedProp[0].wf_price))
                                : 0,
                              wf_time: selectedProp[0].wf_time
                                ? parseInt(String(selectedProp[0].wf_time))
                                : 0,
                              wf_market: selectedProp[0].wf_market
                                ? parseInt(String(selectedProp[0].wf_market))
                                : 0,
                              wf_distance: selectedProp[0].wf_distance
                                ? parseInt(String(selectedProp[0].wf_distance))
                                : 0,
                            });
                          }
                        }
                      }}
                    />
                  </div>
                </Paper>
              </Grid>
              <Grid item xs={12} md={2} lg={2}>
                <Paper sx={{ p: 2, display: "flex", flexDirection: "column" }}>
                  <PropOpsField
                    setIdSelected={setIdSelected}
                    setHomeSelected={setHomeSelected}
                  />
                </Paper>

                <Paper
                  sx={{ mt: 2, p: 2, display: "flex", flexDirection: "column" }}
                >
                  <PropAttrField wfs={propWfs} />
                </Paper>
              </Grid>

              <Grid item xs={12} md={2} lg={2}>
                <Paper sx={{ p: 2, display: "flex", flexDirection: "column" }}>
                  <SpaceSearchField
                    setSpaceSelected={setSpSelected}
                    setSpaceSearch={setSpaceSearch}
                  />
                </Paper>
              </Grid>
              <Grid item xs={12} md={8} lg={8}>
                <Paper sx={{ p: 2, display: "flex", flexDirection: "column" }}>
                  <div style={{ height: 400, width: "100%", fontSize: 8 }}>
                    <DataGrid
                      getRowId={(row) => row["space_id"]}
                      rows={
                        newSpace != null
                          ? Array.from(newSpace)
                          : Array.from(spacesJson)
                      }
                      columns={spaceColumns}
                      pageSize={5}
                      rowsPerPageOptions={[5, 20, 50]}
                      checkboxSelection={false}
                    />
                  </div>
                </Paper>
              </Grid>
              <Grid item xs={12} md={2} lg={2}>
                <Paper sx={{ p: 2, display: "flex", flexDirection: "column" }}>
                  <SpaceOpsField
                    setIdSelected={setIdSelected}
                    setHomeSelected={setHomeSelected}
                  />
                </Paper>
              </Grid>
            </Grid>
            <Copyright sx={{ pt: 4 }} />
          </Container>
        </Box>
      </Box>
    </ThemeProvider>
  );
}

export default function Portal({ propertiesJson, spacesJson }) {
  return (
    <PortalContent spacesJson={spacesJson} propertiesJson={propertiesJson} />
  );
}
