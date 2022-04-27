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
import MediaCard from "../../src/components/MediaCard";
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import ButtonGroup from '@mui/material/ButtonGroup';
import { getCities, getProperties, properties } from "../../src/data-access/searches";

export const getStaticProps: GetStaticProps = async () => {
    let cityLists = []
    try {
        cityLists = await getCities();
    } catch (error) {
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
    const propertiesJson = []
    return {
        props: { cityMenu, propertiesJson }
    }
};

function resToJson(props) {
    const propertiesJson = []
    for (const [index, prop] of Object.entries(props)) {
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
                spaces: prop['spaces'],
                room_name: prop['room_name'],
                price: prop['price'],
                weights: {
                    wf_price: prop['wf_price'],
                    wf_time: prop['wf_time'],
                    wf_market: prop['wf_market'],
                    diff_price: prop['diff_price'],
                    diff_time: prop['diff_time'],
                    longitude: prop['longitude'],
                    latitude: prop['latitude'],
                }
            }
        )
    }
    return propertiesJson;
}

const mdTheme = createTheme();

function PortalContent({ cityMenu, propertiesJson }) {
    ///////////////////////////////////////////////////////////
    const [lat, setLat] = useState(null);
    const [lng, setLng] = useState(null);
    const [status, setStatus] = useState(null);
    const [nameOfPlace, setName] = useState("");

    const https = require('https');
    const [lat_gg_geo, setLat_gg_geo] = useState(null);
    const [lng_gg_geo, setLng_gg_geo] = useState(null);
    const [distance, setDistance] = useState(null);

    const getLocation = () => {
        if (!navigator.geolocation) {
            setStatus('Geolocation is not supported by your browser');
        } else {
            setStatus('Locating...');
            navigator.geolocation.getCurrentPosition((position) => {
                setStatus(null);
                setLat_gg_geo(position.coords.latitude);
                setLng_gg_geo(position.coords.longitude);
            }, () => {
                setStatus('Unable to retrieve your location');
            });
        }
    }
    const inputLocation = () => {

        var geocoder = require('google-geocoder');

        var geo = geocoder({

            key: '111AIzaSyBLgPwK9WQ-sQOl-0kVwHjHMlPPWa7Gn7E111'

        });

        geo.find(nameOfPlace, function (err, res) {
            var geoInfo = res;

            setLat_gg_geo(geoInfo[0].location.lat);
            setLng_gg_geo(geoInfo[0].location.lng);
            console.log("lat is: " + lat_gg_geo);
            console.log("lng is: " + lng_gg_geo);
            setDistance(Math.floor(getDistanceFromLatLonInKm(lat_gg_geo, lng_gg_geo, lat, lng)));
            console.log("The distance is: " + distance);
        });
    }


    function getDistanceFromLatLonInKm(lat1, lon1, lat2, lon2) {
        var R = 6371; // Radius of the earth in km
        var dLat = deg2rad(lat2 - lat1);  // deg2rad below
        var dLon = deg2rad(lon2 - lon1);
        var a =
            Math.sin(dLat / 2) * Math.sin(dLat / 2) +
            Math.cos(deg2rad(lat1)) * Math.cos(deg2rad(lat2)) *
            Math.sin(dLon / 2) * Math.sin(dLon / 2)
            ;
        var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
        var d = R * c; // Distance in km
        return d;
    }

    function deg2rad(deg) {
        return deg * (Math.PI / 180)
    }
    ///////////////////////////////////////////////////////////
    const [open, setOpen] = React.useState(false);
    const [searchTrig, setSearch] = React.useState(false);
    const [newProp, setNewProp] = React.useState([]);
    const [searchConditions, setSearchConditions] = useState({
        brand: "common",
        city: "any",
        zip_code: "",
        move_in: new Date(),
        term: "12Mon",
        pet: false,
        budget: "",
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
                    "zip_code": searchConditions.zip_code,
                    "budget": parseInt(searchConditions.budget),
                    "term": searchConditions.term,
                    "move_in": searchConditions.move_in,
                    "with_pet": searchConditions.pet,
                },
                "weight": {
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
            const properties = await response.json();
            console.log(typeof properties)
            if (!properties || properties.length == 0) {
                setNewProp([]);
                return
            }
            const propertiesJson = resToJson(properties);


            const propertiesJsonWithDistance = [];
            for (const property of propertiesJson) {
                const dis = getDistanceFromLatLonInKm(Math.abs(lat_gg_geo), Math.abs(lng_gg_geo), Math.abs(property.weights.longitude), Math.abs(property.weights.latitude));
                console.log("The distance for property " + property.id + " is: " + dis);
                propertiesJsonWithDistance.push(
                    {
                        id: property.id,
                        home_name: property.home_name,
                        property_id: property.property_id,
                        brand: property.brand,
                        city_name: property.city_name,
                        neighborhood: property.neighborhood,
                        timezone: property.timezone,
                        unit_count: property.unit_count,
                        spaces: property.spaces,
                        room_name: property.room_name,
                        price: property.price,
                        distance: dis,
                        weight: property.weight,
                        weights: {
                            wf_price: property.wf_price,
                            wf_time: property.wf_time,
                            wf_market: property.wf_market,
                            diff_price: property.diff_price,
                            diff_time: property.diff_time,
                            longitude: property.longitude,
                            latitude: property.latitude,
                            distance: dis,
                        }
                    }
                )
            }
            propertiesJsonWithDistance.sort((a, b) => a.distance < b.distance ? -1 : a.distance > b.distance ? 1 : 0)
            setNewProp(propertiesJsonWithDistance);
        }
        try {
            fetchMyAPI().then(() => console.log('Search by User Inputs'))
            setSearch(false);
        } catch (error) {
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
                                    <Box
                                        component="form"
                                        sx={{
                                            '& .MuiTextField-root': { m: 1, width: '20ch' },
                                        }}
                                        noValidate
                                        autoComplete="off"
                                        justifyContent="center">
                                        <div style={{
                                            display: 'flex',
                                            alignItems: 'center',
                                            justifyContent: 'center',
                                        }}>
                                            <TextField
                                                value={nameOfPlace}
                                                label="Preferred Neighborhood"
                                                size="small"
                                                onChange={(e) => setName(e.target.value)}
                                                InputLabelProps={{
                                                    shrink: true,
                                                }}
                                            />
                                        </div>

                                    </Box>
                                    <Box
                                        sx={{
                                            display: 'flex',
                                            flexDirection: 'column',
                                            alignItems: 'center',
                                            '& > *': {
                                                m: 1,
                                            },
                                        }}
                                    >
                                        <ButtonGroup size="small" variant="outlined" aria-label="outlined button group">
                                            <Button onClick={inputLocation} variant="outlined">Query Neighbor</Button>
                                            <Button onClick={getLocation} variant="outlined" >Get Location </Button>
                                        </ButtonGroup>
                                    </Box>
                                    <UserSearchFields
                                        cityMenu={cityMenu}
                                        searchConditions={searchConditions}
                                        setSearchConditions={setSearchConditions}
                                        setSearch={setSearch}
                                    />
                                </Paper>
                            </Grid>
                            <Grid item xs={9}>
                                <Grid container spacing={1}>
                                    {
                                        newProp.map((mediaCard, i) => {
                                            return (
                                                <Grid key={i} item>
                                                    <MediaCard {...mediaCard} />
                                                </Grid>
                                            );
                                        })}
                                </Grid>
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