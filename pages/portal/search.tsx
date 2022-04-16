import * as React from "react";
import { useState } from "react";
import { GetStaticProps } from "next";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import List from "@mui/material/List";
import Typography from "@mui/material/Typography";
import Divider from "@mui/material/Divider";
import IconButton from "@mui/material/IconButton";
import Badge from "@mui/material/Badge";
import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid";
import Paper from "@mui/material/Paper";
import MenuIcon from "@mui/icons-material/Menu";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import NotificationsIcon from "@mui/icons-material/Notifications";
import { ListItems } from "../../src/components/ListItems";
import CardsField from "../../src/components/CardsField";
import UserSearchFields from "../../src/components/UserSearch";
import Copyright from "../../src/components/Copyright";
import AppBar from "../../src/components/AppBar";
import Drawer from "../../src/components/Drawer";
import { getCities, getProperties, properties } from "../../src/data-access/searches";

export const getStaticProps: GetStaticProps = async () => {
    let cityLists = []
    try {
      cityLists = await getCities();
    }catch (error) {
      console.error(error);
    }
    const cityMenu = []

    for (const city of cityLists) {
        cityMenu.push(
            {
                value: city.city_name,
                label: city.city_name,
            }
        )
    }
    let properties: properties[] = []
    let  propertiesJson = []
    try {
      properties = await getProperties();
      propertiesJson = resToJson(properties);
    }catch (error) {
      console.error(error);
    }

    return {
        props: { cityMenu, propertiesJson }
    }
};

function resToJson(props){
  const propertiesJson = []
  for (const [index, prop] of Object.entries(props)){
    propertiesJson.push(
      {
        id: prop['id'],
        home_name: prop['home_name'],
        property_id: prop['property_id'],
        brand: prop['brand'],
        city_name: prop['city_name'],
        neighborhood: prop['neighborhood'],
        timezone: prop['timezone'],
        unit_count: prop['unit_count'],
        weights:{
          wf_distance: prop['wf_distance'],
          // wf_value:prop.dist_diff,
          // distance_value:
          wf_price: prop['wf_price'],
          // wf_value:prop.price_diff,
          // price_value:
          wf_time: prop['wf_time'],
          // wf_value:prop.time_diff,
          // time_value:
          wf_market: prop['wf_market'],
        }
      }
    )
  }
  return propertiesJson;
}

const mdTheme = createTheme();

function PortalContent({ cityMenu, propertiesJson }) {
    const [open, setOpen] = React.useState(false);
    const [searchTrig, setSearch] = React.useState(false);
    const [newProp, setNewProp] = React.useState([]);
    const [searchConditions,setSearchConditions] = useState({
        brand:"common",
        city: "any",
        zip_code:"",
        move_in: new Date(),
        term:"12Mon",
        pet: false,
        budget:"",
    })

    const toggleDrawer = () => {
      setOpen(!open);
    };

    React.useEffect(() => {
        async function fetchMyAPI() {
            const data = {
                "operation": "UserSearch",
                "variables": {
                    "brand": searchConditions.brand,
                    "city_name": searchConditions.city,
                    "zip_code":searchConditions.zip_code,
                    "budget": parseInt(searchConditions.budget),
                    "term": searchConditions.term,
                    "move_in": searchConditions.move_in,
                    "with_pet": searchConditions.pet,
                },
                "weight":{
                    "price_factor": 1.2,
                }
            }
            const response = await fetch(`/api/v1/userSearch`, {
                method: 'POST',
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(data)
            });
            const properties: properties[] = await response.json();
            console.log(typeof properties)
            if (!properties || properties.length == 0) {
                setNewProp([]);
                return
            }
            const propertiesJson = resToJson(properties)
            setNewProp(propertiesJson);
        }
      try {
        fetchMyAPI().then(() => console.log('Search by User Inputs'))
        setSearch(false);
      }catch (error) {
        console.error(error);
      }
    }, [searchTrig])

    return (
      <ThemeProvider theme={mdTheme}>
          <Box sx={{ display: 'flex' }}>

              <CssBaseline />
              <AppBar position="absolute" open={open}>
                  <Toolbar
                    sx={{
                        pr: '24px',
                    }}
                  >
                      <IconButton
                        edge="start"
                        color="inherit"
                        aria-label="open drawer"
                        onClick={toggleDrawer}
                        sx={{
                            marginRight: '36px',
                            ...(open && { display: 'none' }),
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
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'flex-end',
                        px: [1],
                    }}
                  >
                      <IconButton onClick={toggleDrawer}>
                          <ChevronLeftIcon />
                      </IconButton>
                  </Toolbar>
                  <Divider />
                  <List component="nav">
                      {ListItems}
                  </List>
              </Drawer>
              <Box
                component="main"
                sx={{
                    backgroundColor: (theme) =>
                      theme.palette.mode === 'light'
                        ? theme.palette.grey[100]
                        : theme.palette.grey[900],
                    flexGrow: 1,
                    height: '100vh',
                    overflow: 'auto',
                }}
              >
                  <Toolbar />

                  <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
                      <Grid container spacing={3}>
                          <Grid item xs={3}>
                              <Paper sx={{ p: 2, display: 'flex', flexDirection: 'column' }}>
                                  <UserSearchFields
                                    cityMenu={cityMenu}
                                    // setCitySelected={setCitySelected}
                                    // setTermSelected={setTermSelected}
                                    // setDateSelected={setDateSelected}
                                    // setPetSelected={setPetSelected}
                                    searchConditions={searchConditions}
                                    setSearchConditions={setSearchConditions}
                                    setSearch={setSearch}
                                  />
                              </Paper>
                          </Grid>
                          <Grid item xs={9}>
                            <CardsField data={newProp}/>
                          </Grid>
                      </Grid>
                      <Copyright sx={{ pt: 4 }} />
                  </Container>
              </Box>
          </Box>
      </ThemeProvider >
    );
}

export default function Portal({ cityMenu, propertiesJson }) {
    return <PortalContent cityMenu={cityMenu} propertiesJson={propertiesJson} />;
}