import * as React from 'react';
import { GetStaticProps } from "next";
import { styled, createTheme, ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import MuiDrawer from '@mui/material/Drawer';
import Box from '@mui/material/Box';
import MuiAppBar, { AppBarProps as MuiAppBarProps } from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import List from '@mui/material/List';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import Badge from '@mui/material/Badge';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import Link from '@mui/material/Link';
import Paper from '@mui/material/Paper';
import MenuIcon from '@mui/icons-material/Menu';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import NotificationsIcon from '@mui/icons-material/Notifications';
import { ListItems } from '../../src/components/ListItems';
import AddProperty from '../../src/components/AddProperty'
import AddSpace from '../../src/components/AddSpace';
import UpdateProperty from '../../src/components/UpdateProperty'
import UpdateSpace from '../../src/components/UpdateSpace';

import { properties, getCities, getProperties } from "../../src/data-access/searches"
import { createProperty, createSpace } from "../../src/data-access/OpsCreate"
// import { DataGrid, GridColDef } from '@mui/x-data-grid';
const drawerWidth: number = 240;

// export const getStaticProps: GetStaticProps = async () => {
//     var propertiesJson = []
//     for (var prop of properties) {
//         propertiesJson.push(
//             {
//                 id: prop.id,
//                 home_name: prop.home_name,
//                 property_id: prop.property_id,
//                 brand: prop.brand,
//                 city_name: prop.city_name,
//                 neighborhood: prop.neighborhood,
//                 timezone: prop.timezone,
//                 unit_count: prop.unit_count,
//                 rownum: prop.rownum,
//             }
//         )
//     }
//     return {
//         props: { cityMenu,propertiesJson }
//     }
// };

// const columns: GridColDef[] = [
//     { field: 'id', headerName: 'ID', width: 50 },
//     { field: 'home_name', headerName: 'Home', width: 150 },
//     { field: 'property_id', headerName: 'Prop_ID', width: 120 },
//     { field: 'brand', headerName: 'Brand', width: 70 },
//     { field: 'city_name', headerName: 'City', width: 100 },
//     { field: 'neighborhood', headerName: 'Neighborhood', width: 150 },
//     { field: 'unit_count', headerName: 'Unit', width: 70 },
// ];

interface AppBarProps extends MuiAppBarProps {
    open?: boolean;
}

function Copyright(props: any) {
    return (
        <Typography variant="body2" color="text.secondary" align="center" {...props}>
            {'Copyright © '}
            <Link color="inherit" href="https://mui.com/">
                Common
            </Link>{' '}
            {new Date().getFullYear()}
            {'.'}
        </Typography>
    );
}

const AppBar = styled(MuiAppBar, {
    shouldForwardProp: (prop) => prop !== 'open',
})<AppBarProps>(({ theme, open }) => ({
    zIndex: theme.zIndex.drawer + 1,
    transition: theme.transitions.create(['width', 'margin'], {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen,
    }),
    ...(open && {
        marginLeft: drawerWidth,
        width: `calc(100% - ${drawerWidth}px)`,
        transition: theme.transitions.create(['width', 'margin'], {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.enteringScreen,
        }),
    }),
}));

const Drawer = styled(MuiDrawer, { shouldForwardProp: (prop) => prop !== 'open' })(
    ({ theme, open }) => ({
        '& .MuiDrawer-paper': {
            position: 'relative',
            whiteSpace: 'nowrap',
            width: drawerWidth,
            transition: theme.transitions.create('width', {
                easing: theme.transitions.easing.sharp,
                duration: theme.transitions.duration.enteringScreen,
            }),
            boxSizing: 'border-box',
            ...(!open && {
                overflowX: 'hidden',
                transition: theme.transitions.create('width', {
                    easing: theme.transitions.easing.sharp,
                    duration: theme.transitions.duration.leavingScreen,
                }),
                width: theme.spacing(7),
                [theme.breakpoints.up('sm')]: {
                    width: theme.spacing(9),
                },
            }),
        },
    }),
);

const mdTheme = createTheme();

function PortalContent({propertiesJson }) {
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
    const [security_deposity,setsecurity_dep] = React.useState(null);
    const [date_available,setdate_available] = React.useState(null);   
    const [status,setstatus] = React.useState(null); 
    const [created_at,setcreated_at] = React.useState(null);
    const [updated_at,set_updated_at] = React.useState(null);
    const [mo3_price,set_mo3_price] = React.useState(null);
    const [mo6_price,set_mo6_price] = React.useState(null);
    const [mo9_price,set_mo9_price] = React.useState(null);
    const [mo12_price,set_mo12_price] = React.useState(null);
    const [bedroom_count,setbed_roomcount] = React.useState(null);
    const [bath_count,setbath_count] = React.useState(null);
    const [min_price,set_min_price] = React.useState(null);
    const [max_price,set_max_price] = React.useState(null);

    const toggleDrawer = () => {
        setOpen(!open);
    };

    React.useEffect(() => {
        async function createProperty() {
            console.log("hi")
            const PropertyData = {
                "operation": "UserModification",
                "variables": {
                    "home_name": home_name,
                    "property_id": Math.random().toString(36).substring(2,11),
                    "brand": brand,
                    "city_name": city_name,
                    "neighborhood":neighborhood,
                    "timezone": timezone,
                    "unit_count" : parseInt(unit_count),
                    "rownum": parseInt(rownum)
                }
            }
            const response = await fetch(`http://localhost:6003/api/v1/userPropCreate`, {
                method: 'POST',
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(PropertyData)
            });
            console.log("result: ")
            console.log(response)
        }
        async function createSpace() {
            const data = {
                "operation": "UserModification",
                "variables": {
                    "property_id": property_id,
                    "apartment_name":apartment_name,
                    "room_name":room_name,
                    "occupancy_type":occupancy_type,
                    "security_deposity":parseInt(security_deposity),
                    "date_available":new Date(date_available),
                    "status":status,
                    "created_at":new Date(created_at),
                    "updated_at":new Date(updated_at),
                    "mo3_price":parseInt(mo3_price),
                    "mo6_price":parseInt(mo6_price),
                    "mo9_price":parseInt(mo9_price),
                    "mo12_price":parseInt(mo12_price),
                    "bedroom_count":parseInt(bedroom_count),
                    "bath_count":parseInt(bath_count),
                    "min_price":parseInt(min_price),
                    "max_price":parseInt(max_price)
                }
            }
            const response = await fetch(`http://localhost:6003/api/v1/userSpaceCreate`, {
                method: 'POST',
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(data)
            });
            console.log("result: ")
            console.log(response)
        }
        if(createPropTrig){
            console.log("Property Add")
            createProperty()
            setcreatePropTrig(false);
        }
        if(createSpaceTrig){
            console.log("Space Add")
            createSpace()
            setcreateSpaceTrig(false);
        }

    }, [createPropTrig, createSpaceTrig])
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
                                <Paper sx={{ p: 2, display: 'flex', flexDirection: 'column' }}> Create property
                                    <AddProperty
                                        setproperty_id={setproperty_id}
                                        setbrand={setbrand}
                                        sethome_name={sethome_name}
                                        setcity_name={setcity_name}
                                        setneighborhood={setneighborhood}
                                        settimezone={settimezone}
                                        setunit_count={setunit_count}
                                        setrownum={setrownum}
                                        setcreatePropTrig = {setcreatePropTrig}
                                    />
                                </Paper>
                            </Grid>
                            <Grid item xs={4}>
                                <Paper sx={{ p: 2, display: 'flex', flexDirection: 'column' }}> Create Space
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
                                        setcreateSpaceTrig = {setcreateSpaceTrig}
                                    />
                                </Paper>
                            </Grid>
                            <Grid item xs={4}>
                                <Paper sx={{ p: 3, display: 'flex', flexDirection: 'column' }}> Update Property
                                    <UpdateProperty
                                        setproperty_id={setproperty_id}
                                        setbrand={setbrand}
                                        sethome_name={sethome_name}
                                        setcity_name={setcity_name}
                                        setneighborhood={setneighborhood}
                                        settimezone={settimezone}
                                        setunit_count={setunit_count}
                                        setrownum={setrownum}
                                    />
                                </Paper>
                            </Grid>
                            <Grid item xs={4}>
                                <Paper sx={{ p: 3, display: 'flex', flexDirection: 'column' }}> Update Space
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
                                    />
                                </Paper>
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

    return <PortalContent propertiesJson={propertiesJson} />;
}
