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
import PropAttrField from "../../src/components/PropAttr";
import SpaceAttrField from "../../src/components/SpaceAttr";

import {
  properties,
  getCities,
  getProperties,
  spaces,
} from "../../src/data-access/searches";
import { DataGrid, GridColDef } from "@mui/x-data-grid";
const drawerWidth: number = 240;

// This page will be statically rendered at build time
export const getStaticProps: GetStaticProps = async () => {
  const cityLists = await getCities();
  const cityMenu = [];

  for (const city of cityLists) {
    cityMenu.push({
      value: city.city_name,
      label: city.city_name,
    });
  }
  const properties: properties[] = await getProperties();
  const spacesJson = [];
  const propertiesJson = [];
  for (const prop of properties) {
    propertiesJson.push({
      id: prop.id,
      home_name: prop.home_name,
      property_id: prop.property_id,
      brand: prop.brand,
      city_name: prop.city_name,
      neighborhood: prop.neighborhood,
      timezone: prop.timezone,
      unit_count: prop.unit_count,
    });
  }
  return {
    props: { cityMenu, propertiesJson, spacesJson },
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
  // { field: 'date_available', headerName: 'DATE_AVALBE', width: 70 },
  { field: "property_id", headerName: "P_NAME", width: 150 },
  { field: "room_name", headerName: "ROOM", width: 200 },
  { field: "status", headerName: "STATUS", width: 200 },
  // { field: 'mo6_price', headerName: '6MONTH_PRICE', width: 200 },
  // { field: 'mo9_price', headerName: '9MONTH_PRICE', width: 200 },
  // { field: 'mo12_price', headerName: '12MONTH_PRICE', width: 200 },
];

interface AppBarProps extends MuiAppBarProps {
  open?: boolean;
}

function Copyright(props: any) {
  return (
    <Typography
      variant="body2"
      color="text.secondary"
      align="center"
      {...props}
    >
      {"Copyright © "}
      <Link color="inherit" href="https://mui.com/">
        Common
      </Link>{" "}
      {new Date().getFullYear()}
      {"."}
    </Typography>
  );
}

const AppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== "open",
})<AppBarProps>(({ theme, open }) => ({
  zIndex: theme.zIndex.drawer + 1,
  transition: theme.transitions.create(["width", "margin"], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  ...(open && {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(["width", "margin"], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  }),
}));

const Drawer = styled(MuiDrawer, {
  shouldForwardProp: (prop) => prop !== "open",
})(({ theme, open }) => ({
  "& .MuiDrawer-paper": {
    position: "relative",
    whiteSpace: "nowrap",
    width: drawerWidth,
    transition: theme.transitions.create("width", {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
    boxSizing: "border-box",
    ...(!open && {
      overflowX: "hidden",
      transition: theme.transitions.create("width", {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen,
      }),
      width: theme.spacing(7),
      [theme.breakpoints.up("sm")]: {
        width: theme.spacing(9),
      },
    }),
  },
}));

const mdTheme = createTheme();

function PortalContent({ propertiesJson, spacesJson }) {
  const [open, setOpen] = React.useState(false);
  const [propSelected, setIdSelected] = React.useState(null);
  const [spSelected, setSpSelected] = React.useState(null);
  const [homeSelected, setHomeSelected] = React.useState("");
  const [searchPropTrig, setPropSearch] = React.useState(false);
  const [searchSpaceTrig, setSpaceSearch] = React.useState(false);
  const [newProp, setNewProp] = React.useState(null);
  const [newSpace, setNewSpace] = React.useState(null);

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
      const properties: properties[] = await response.json();

      const propertiesJson = [];
      const spacesJson = [];
      if (!properties || properties.length == 0) {
        setNewProp({});
        return;
      }
      for (const line of properties) {
        propertiesJson.push({
          id: line.id,
          home_name: line.home_name,
          property_id: line.property_id,
          brand: line.brand,
          city_name: line.city_name,
          neighborhood: line.neighborhood,
          unit_count: line.unit_count,
        });
      }

      setNewProp(propertiesJson);
      if (properties.length == 1) {
        const spaces: spaces[] = await properties[0]["spaces"];
        if (!spaces || spaces.length == 0) {
          setNewSpace({});
          return;
        }
        for (const sp of spaces) {
          spacesJson.push({
            id: sp.space_id,
            space_id: sp.space_id,
            room_name: sp.room_name,
            status: sp.status,
          });
        }
        setNewSpace(spacesJson);
      } else {
        setNewSpace(null);
      }
    }
    fetchProp();
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
      const spaces: spaces[] = await response.json();
      const spacesJson = [];
      if (!spaces || spaces.length == 0) {
        setNewSpace({});
        return;
      }
      for (const sp of spaces) {
        spacesJson.push({
          id: sp.space_id,
          space_id: sp.space_id,
          room_name: sp.room_name,
          status: sp.status,
        });
      }
      setNewProp({});
      setNewSpace(spacesJson);
    }
    fetchSpace();
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
                    setPropSearch={setPropSearch}
                  />
                </Paper>
              </Grid>
              <Grid item xs={12} md={8} lg={8}>
                <Paper sx={{ p: 2, display: "flex", flexDirection: "column" }}>
                  <div style={{ height: 400, width: "100%", fontSize: 8 }}>
                    <DataGrid
                      rows={newProp != null ? newProp : propertiesJson}
                      columns={propColumns}
                      getRowId={(row) => row.id}
                      pageSize={5}
                      rowsPerPageOptions={[20, 50]}
                      checkboxSelection
                    />
                  </div>
                </Paper>
              </Grid>
              <Grid item xs={12} md={2} lg={2}>
                <Paper sx={{ p: 2, display: "flex", flexDirection: "column" }}>
                  <PropAttrField
                    setIdSelected={setIdSelected}
                    setHomeSelected={setHomeSelected}
                  />
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
                      rows={newSpace != null ? newSpace : spacesJson}
                      columns={spaceColumns}
                      getRowId={(row) => row.id}
                      pageSize={5}
                      rowsPerPageOptions={[5, 20, 50]}
                      checkboxSelection
                    />
                  </div>
                </Paper>
              </Grid>
              {/* <Grid item xs={12} md={2} lg={2}>
                                <Paper sx={{ p: 2, display: 'flex', flexDirection: 'column' }}>
                                    <SpaceAttrField
                                        setIdSelected={setIdSelected}
                                        setHomeSelected={setHomeSelected}
                                    />
                                </Paper>
                            </Grid> */}
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