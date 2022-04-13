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
import AddProperty from "../../src/components/AddProperty";
import AddSpace from "../../src/components/AddSpace";
import UpdateProperty from "../../src/components/UpdateProperty";
import UpdateSpace from "../../src/components/UpdateSpace";
import DeleteSpace from "../../src/components/DeleteSpace";
import DeleteProperty from "../../src/components/DeleteProperty";
import { useRouter } from "next/router";

import {
  properties,
  getCities,
  getProperties,
} from "../../src/data-access/searches";
import { createProperty, createSpace } from "../../src/data-access/OpsCreate";
import { borderLeft } from "@mui/system";
// import { DataGrid, GridColDef } from '@mui/x-data-grid';
const drawerWidth: number = 240;

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

function PortalContent({ propertiesJson }) {
  const router = useRouter();
  const query = router.query;
  const isUpdate = query.isUpdate;
  const isCreate = query.isCreate;
  const isDelete = query.isDelete;

  const [open, setOpen] = React.useState(false);
  const [home_name, sethome_name] = React.useState(null);
  const [property_id, setproperty_id] = React.useState(null);
  const [brand, setbrand] = React.useState(null);
  const [city_name, setcity_name] = React.useState(null);
  const [neighborhood, setneighborhood] = React.useState(null);
  const [timezone, settimezone] = React.useState(new Date());
  const [unit_count, setunit_count] = React.useState(null);
  const [rownum, setrownum] = React.useState(null);
  const [createSpaceTrig, setcreateSpaceTrig] = React.useState(false);
  const [createPropTrig, setcreatePropTrig] = React.useState(false);
  const [newProp, setnewProp] = React.useState(null);
  const [space_id, setspace_id] = React.useState(null);
  const [apartment_name, setapartment_name] = React.useState(null);
  const [room_name, setroom_name] = React.useState(null);
  const [occupancy_type, setoccupancy_type] = React.useState(null);
  const [security_deposit, setsecurity_dep] = React.useState(null);
  const [date_available, setdate_available] = React.useState(null);
  const [status, setstatus] = React.useState(null);
  const [created_at, setcreated_at] = React.useState(null);
  const [updated_at, set_updated_at] = React.useState(null);
  const [mo3_price, set_mo3_price] = React.useState(null);
  const [mo6_price, set_mo6_price] = React.useState(null);
  const [mo9_price, set_mo9_price] = React.useState(null);
  const [mo12_price, set_mo12_price] = React.useState(null);
  const [bedroom_count, setbed_roomcount] = React.useState(null);
  const [bath_count, setbath_count] = React.useState(null);
  const [min_price, set_min_price] = React.useState(null);
  const [max_price, set_max_price] = React.useState(null);
  const [deleteSpaceTrig, setDeleteSpaceTrig] = React.useState(false);
  const [deletePropTrig, setDeletePropTrig] = React.useState(false);
  const [updateSpaceTrig, setUpdateSpaceTrig] = React.useState(false);
  const [updatePropTrig, setUpdatePropTrig] = React.useState(false);

  const toggleDrawer = () => {
    setOpen(!open);
  };

  React.useEffect(() => {
    async function createProperty() {
      const PropertyData = {
        operation: "UserModification",
        variables: {
          home_name: home_name,
          property_id: Math.random().toString(36).substring(2, 11),
          brand: brand,
          city_name: city_name,
          neighborhood: neighborhood,
          timezone: timezone,
          unit_count: parseInt(unit_count),
          rownum: parseInt(rownum),
        },
      };
      const response = await fetch(
        `http://localhost:6003/api/v1/userPropCreate`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(PropertyData),
        }
      );
      console.log("result: ");
      console.log(response);
    }
    async function createSpace() {
      const data = {
        operation: "UserModification",
        variables: {
          property_id: property_id,
          apartment_name: apartment_name,
          room_name: room_name,
          occupancy_type: occupancy_type,
          security_deposit: parseInt(security_deposit),
          date_available: new Date(date_available),
          status: status,
          created_at: new Date(created_at),
          updated_at: new Date(updated_at),
          mo3_price: parseInt(mo3_price),
          mo6_price: parseInt(mo6_price),
          mo9_price: parseInt(mo9_price),
          mo12_price: parseInt(mo12_price),
          bedroom_count: parseInt(bedroom_count),
          bath_count: parseInt(bath_count),
          min_price: parseInt(min_price),
          max_price: parseInt(max_price),
        },
      };
      const response = await fetch(
        `http://localhost:6003/api/v1/userSpaceCreate`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(data),
        }
      );
      console.log("result: ");
      console.log(response);
    }

    async function deleteSpace() {
      const data = {
        operation: "UserModification",
        variables: {
          space_id: parseInt(space_id),
        },
      };
      const response = await fetch(
        `http://localhost:6003/api/v1/userSpaceDelete`,
        {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(data),
        }
      );
      console.log("result: ");
      console.log(response);
    }

    async function deleteProp() {
      const data = {
        operation: "UserModification",
        variables: {
          property_id: property_id,
        },
      };
      const response = await fetch(
        `http://localhost:6003/api/v1/userPropDelete`,
        {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(data),
        }
      );
      console.log("result: ");
      console.log(response);
    }

    async function updateProp() {
      const data = {
        operation: "UserModification",
        variables: {
          home_name: home_name,
          property_id: property_id,
          brand: brand,
          city_name: city_name,
          neighborhood: neighborhood,
          timezone: timezone,
          unit_count: parseInt(unit_count),
          rownum: parseInt(rownum),
        },
      };
      const tempVar = data.variables;
      Object.keys(tempVar).forEach((key) => {
        if (tempVar[key] == null) {
          delete tempVar[key];
        }
        if ((key == "unit_count" || key == "rownum") && isNaN(tempVar[key])) {
          delete tempVar[key];
        }
      });
      data.variables = tempVar;
      if (data.variables.property_id) {
        const response = await fetch(
          `http://localhost:6003/api/v1/userPropUpdate`,
          {
            method: "PATCH",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(data),
          }
        );
        console.log("result: ");
        console.log(response);
      } else console.log("Property ID missing");
    }

    async function updateSpace() {
      const data = {
        operation: "UserModification",
        variables: {
          space_id: parseInt(space_id),
          property_id: property_id,
          city_name: city_name,
          apartment_name: apartment_name,
          room_name: room_name,
          occupancy_type: occupancy_type,
          security_deposit: parseInt(security_deposit),
          date_available: new Date(date_available),
          status: status,
          created_at: new Date(created_at),
          updated_at: new Date(updated_at),
          mo3_price: parseInt(mo3_price),
          mo6_price: parseInt(mo6_price),
          mo9_price: parseInt(mo9_price),
          mo12_price: parseInt(mo12_price),
          bedroom_count: parseInt(bedroom_count),
          bath_count: parseInt(bath_count),
          min_price: parseInt(min_price),
          max_price: parseInt(max_price),
        },
      };
      const tempVar = data.variables;
      Object.keys(tempVar).forEach((key) => {
        if (tempVar[key] == null) {
          delete tempVar[key];
        }
        if (
          (key == "security_deposit" ||
            key == "mo3_price" ||
            key == "mo6_price" ||
            key == "mo9_price" ||
            key == "mo12_price" ||
            key == "bedroom_count" ||
            key == "bath_count" ||
            key == "min_price" ||
            key == "max_price") &&
          isNaN(tempVar[key])
        ) {
          delete tempVar[key];
        }
      });
      data.variables = tempVar;

      if (data.variables.space_id) {
        const response = await fetch(
          `http://localhost:6003/api/v1/userSpaceUpdate`,
          {
            method: "PATCH",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(data),
          }
        );
        console.log("result: ");
        console.log(response);
      } else console.log("Space ID missing");
    }

    if (createPropTrig) {
      console.log("Property Add");
      createProperty();
      setcreatePropTrig(false);
    }
    if (createSpaceTrig) {
      console.log("Space Add");
      createSpace();
      setcreateSpaceTrig(false);
    }

    if (deleteSpaceTrig) {
      console.log("Space Delete");
      deleteSpace();
      setDeleteSpaceTrig(false);
    }
    if (deletePropTrig) {
      console.log("Space Delete");
      deleteProp();
      setDeletePropTrig(false);
    }

    if (updateSpaceTrig) {
      console.log("Space Update");
      updateSpace();
      setUpdateSpaceTrig(false);
    }
    if (updatePropTrig) {
      console.log("Property Update");
      updateProp();
      setUpdatePropTrig(false);
    }

    if (isUpdate == "true") {
      var cp = document.getElementById("createProperty");
      cp.style.display = "none";
      var cs = document.getElementById("createSpace");
      cs.style.display = "none";
      var dp = document.getElementById("deleteProperty");
      dp.style.display = "none";
      var ds = document.getElementById("deleteSpace");
      ds.style.display = "none";
    }
    if (isCreate == "true") {
      var up = document.getElementById("updateProperty");
      up.style.display = "none";
      var us = document.getElementById("updateSpace");
      us.style.display = "none";
      var dp = document.getElementById("deleteProperty");
      dp.style.display = "none";
      var ds = document.getElementById("deleteSpace");
      ds.style.display = "none";
    }
    if (isDelete == "true") {
      var cp = document.getElementById("createProperty");
      cp.style.display = "none";
      var cs = document.getElementById("createSpace");
      cs.style.display = "none";
      var up = document.getElementById("updateProperty");
      up.style.display = "none";
      var us = document.getElementById("updateSpace");
      us.style.display = "none";
    }
  }, [
    createPropTrig,
    createSpaceTrig,
    deleteSpaceTrig,
    deletePropTrig,
    updateSpaceTrig,
    updatePropTrig,
    isUpdate,
    isCreate,
    isDelete,
  ]);
  return (
    <ThemeProvider theme={mdTheme}>
      <Box sx={{ display: "flex" }}>
        <CssBaseline />
        <AppBar position="absolute" open={open}>
          <Toolbar
            sx={{
              pr: "24px",
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
              <div id="createProperty" style={{ width: "inherit" }}>
                <Grid item xs={3}>
                  <Paper
                    sx={{ p: 2, display: "flex", flexDirection: "column" }}
                  >
                    {" "}
                    Create property
                    <AddProperty
                      setproperty_id={setproperty_id}
                      setbrand={setbrand}
                      sethome_name={sethome_name}
                      setcity_name={setcity_name}
                      setneighborhood={setneighborhood}
                      settimezone={settimezone}
                      setunit_count={setunit_count}
                      setrownum={setrownum}
                      setcreatePropTrig={setcreatePropTrig}
                    />
                  </Paper>
                </Grid>
              </div>
              <div id="createSpace" style={{ width: "inherit" }}>
                <Grid item xs={4}>
                  <Paper
                    sx={{ p: 2, display: "flex", flexDirection: "column" }}
                  >
                    {" "}
                    Create Space
                    <AddSpace
                      setproperty_id={setproperty_id}
                      setapartment_name={setapartment_name}
                      setroom_name={setroom_name}
                      setoccupancy_type={setoccupancy_type}
                      setsecurity_dep={setsecurity_dep}
                      setdate_available={setdate_available}
                      setstatus={setstatus}
                      setcreated_at={setcreated_at}
                      set_updated_at={set_updated_at}
                      set_mo3_price={set_mo3_price}
                      set_mo6_price={set_mo6_price}
                      set_mo9_price={set_mo9_price}
                      set_mo12_price={set_mo12_price}
                      setbed_roomcount={setbed_roomcount}
                      setbath_count={setbath_count}
                      set_min_price={set_min_price}
                      set_max_price={set_max_price}
                      setcreateSpaceTrig={setcreateSpaceTrig}
                    />
                  </Paper>
                </Grid>
              </div>
              <div id="updateProperty" style={{ width: "inherit" }}>
                <Grid item xs={4}>
                  <Paper
                    sx={{ p: 3, display: "flex", flexDirection: "column" }}
                  >
                    {" "}
                    Update Property
                    <UpdateProperty
                      setproperty_id={setproperty_id}
                      setbrand={setbrand}
                      sethome_name={sethome_name}
                      setcity_name={setcity_name}
                      setneighborhood={setneighborhood}
                      settimezone={settimezone}
                      setunit_count={setunit_count}
                      setrownum={setrownum}
                      setUpdatePropTrig={setUpdatePropTrig}
                    />
                  </Paper>
                </Grid>
              </div>
              <div id="updateSpace" style={{ width: "inherit" }}>
                <Grid item xs={4}>
                  <Paper
                    sx={{ p: 3, display: "flex", flexDirection: "column" }}
                  >
                    {" "}
                    Update Space
                    <UpdateSpace
                      setspace_id={setspace_id}
                      setproperty_id={setproperty_id}
                      setapartment_name={setapartment_name}
                      setroom_name={setroom_name}
                      setoccupancy_type={setoccupancy_type}
                      setsecurity_dep={setsecurity_dep}
                      setdate_available={setdate_available}
                      setstatus={setstatus}
                      setcreated_at={setcreated_at}
                      set_updated_at={set_updated_at}
                      set_mo3_price={set_mo3_price}
                      set_mo6_price={set_mo6_price}
                      set_mo9_price={set_mo9_price}
                      set_mo12_price={set_mo12_price}
                      setbed_roomcount={setbed_roomcount}
                      setbath_count={setbath_count}
                      set_min_price={set_min_price}
                      set_max_price={set_max_price}
                      setUpdateSpaceTrig={setUpdateSpaceTrig}
                    />
                  </Paper>
                </Grid>
              </div>
              <div id="deleteSpace" style={{ width: "inherit" }}>
                <Grid item xs={4}>
                  <Paper
                    sx={{ p: 3, display: "flex", flexDirection: "column" }}
                  >
                    {" "}
                    Delete Space
                    <DeleteSpace
                      setspace_id={setspace_id}
                      setDeleteSpaceTrig={setDeleteSpaceTrig}
                    />
                  </Paper>
                </Grid>
              </div>
              <div id="deleteProperty" style={{ width: "inherit" }}>
                <Grid item xs={4}>
                  <Paper
                    sx={{ p: 3, display: "flex", flexDirection: "column" }}
                  >
                    {" "}
                    Delete Property
                    <DeleteProperty
                      setproperty_id={setproperty_id}
                      setDeletePropTrig={setDeletePropTrig}
                    />
                  </Paper>
                </Grid>
              </div>
            </Grid>
            <Copyright sx={{ pt: 4 }} />
          </Container>
        </Box>
      </Box>
    </ThemeProvider>
  );
}

export default function Portal({ cityMenu, propertiesJson }) {
  return <PortalContent propertiesJson={propertiesJson} />;
}
