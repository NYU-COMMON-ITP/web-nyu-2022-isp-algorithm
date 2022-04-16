import * as React from "react";
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
import PropSearchField from "../../src/components/PropSearch";
import SpaceSearchField from "../../src/components/SpaceSearch";
import PropAttrField from "../../src/components/PropAttr";
import SpaceAttrField from "../../src/components/SpaceAttr";
import Copyright from "../../src/components/Copyright";
import AppBar from "../../src/components/AppBar";
import Drawer from "../../src/components/Drawer";
import { properties, spaces } from "../../src/data-access/searches";
import { DataGrid, GridColDef } from "@mui/x-data-grid";

const drawerWidth: number = 240;

export const getStaticProps: GetStaticProps = async () => {
    const spacesJson = []
    const propertiesJson = []
    return {
        props: { propertiesJson, spacesJson }
    }
};

const propColumns: GridColDef[] = [
    { field: 'id', headerName: 'ID', width: 50 },
    { field: 'home_name', headerName: 'Home', width: 150 },
    { field: 'property_id', headerName: 'Prop_ID', width: 120 },
    { field: 'brand', headerName: 'Brand', width: 70 },
    { field: 'city_name', headerName: 'City', width: 100 },
    { field: 'neighborhood', headerName: 'Neighborhood', width: 150 },
    { field: 'unit_count', headerName: 'Unit', width: 70 },
];

const spaceColumns: GridColDef[] = [
    { field: 'space_id', headerName: 'ID', width: 70 },
    // { field: 'date_available', headerName: 'DATE_AVALBE', width: 70 },
    { field: 'property_id', headerName: 'P_NAME', width: 150 },
    { field: 'room_name', headerName: 'ROOM', width: 200 },
    { field: 'status', headerName: 'STATUS', width: 200 },
    // { field: 'mo6_price', headerName: '6MONTH_PRICE', width: 200 },
    // { field: 'mo9_price', headerName: '9MONTH_PRICE', width: 200 },
    // { field: 'mo12_price', headerName: '12MONTH_PRICE', width: 200 },
];

const mdTheme = createTheme();

function PortalContent({ propertiesJson, spacesJson }) {
    const [open, setOpen] = React.useState(false);
    const [searchPropTrig, setSearchPropTrig] = React.useState(false);
    const [searchSpaceTrig, setSearchSpaceTrig] = React.useState(false);
    const [newProp, setNewProp] = React.useState([]);
    const [newSpace, setNewSpace] = React.useState([]);


    const [propAttr,setPropAttr] = React.useState({
        id: "",
        property_id:"",
        brand: "",
        home_name:"",
        city_name:"",
        neighborhood:"",
    })

    const [spaceAttr,setSpaceAttr] = React.useState({
        space_id: "",
        property_id: "",
        room_name:"",
        occupancy_type:"",
        mo3_price:"",
        mo6_price:"",
        bedroom_count:"",
        bath_count:"",
    })

    const toggleDrawer = () => {
        setOpen(!open);
    };

    React.useEffect(() => {
        async function fetchProp() {
            const data = {
                "operation": "managePropSearch",
                "variables": {
                    "id": parseInt(propAttr.id),
                    "home_name": propAttr.home_name,
                }
            }
            const response = await fetch('/api/v1/managtPropSearch', {
                method: 'POST',
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(data)
            });
            const properties: properties[] = await response.json();

            const propertiesJson = []
            const spacesJson = []
            if (!properties || properties.length == 0) {
                setNewProp([]);
                return
            }
            for (const line of properties) {
                propertiesJson.push(
                    {
                        id: line.id,
                        home_name: line.home_name,
                        property_id: line.property_id,
                        brand: line.brand,
                        city_name: line.city_name,
                        neighborhood: line.neighborhood,
                        unit_count: line.unit_count,
                    }
                )
            }

            setNewProp(propertiesJson);
            if (properties.length==1) {
                const spaces: spaces[] = properties[0]["spaces"]
                if (!spaces || spaces.length == 0) {
                    setNewSpace([]);
                    return
                }
                for (const sp of spaces) {
                    spacesJson.push(
                      {
                          id: sp.space_id,
                          space_id: sp.space_id,
                          room_name: sp.room_name,
                          status: sp.status,
                          property_id:sp.property_id,
                          occupancy_type: sp.occupancy_type
                      }
                    )
                }
                setNewSpace(spacesJson);
            }else{
                setNewSpace([])
            }
        }
        fetchProp().then(()=>console.log('Search Properties'))
        setSearchPropTrig(false)
    }, [searchPropTrig])

    React.useEffect(() => {
        async function fetchSpace() {
            const data = {
                "operation": "manageSpaceSearch",
                "variables": {
                    "space_id": parseInt(spaceAttr.space_id),
                }
            }
            const response = await fetch('/api/v1/managtSpaceSearch', {
                method: 'POST',
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(data)
            });
            const spaces: spaces[] = await response.json();
            const spacesJson = []
            if (!spaces || spaces.length == 0) {
                setNewSpace([]);
                return
            }
            for (const sp of spaces) {
                spacesJson.push(
                  {
                      id: sp.space_id,
                      space_id: sp.space_id,
                      room_name: sp.room_name,
                      status: sp.status,
                      property_id:sp.property_id,
                      occupancy_type: sp.occupancy_type
                  }
                )
            }
            setNewProp([]);
            setNewSpace(spacesJson);
        }
        fetchSpace().then(()=>console.log('Search Spaces'))
        setSearchSpaceTrig(false)
      }, [searchSpaceTrig])

    // React.useEffect(() => {
    //     async function fetchCreateProp() {
    //         const data = {
    //             "operation": "managePropUpdate",
    //             "variables": {
    //                 "home_name":home_nameInput,
    //                 "city_name":city_nameInput,
    //                 "neighborhood":neighborhood_Input,
    //             }
    //         }
    //         const response = await fetch('http://localhost:6003/api/v1/managtPropCreate', {
    //             method: 'PUT',
    //             headers: {
    //                 "Content-Type": "application/json"
    //             },
    //             body: JSON.stringify(data)
    //         });
    //     }
    //     fetchCreateProp()
    //     setPropSearch(true)
    //     setPropCreate(false)
    // }, [createPropTrig])

    // React.useEffect(() => {
    //     async function fetchCreateSpace() {
    //         const data = {
    //             "operation": "manageSpaceCreate",
    //             "variables": {
    //                 "property_id":
    //                 "apartment_room":aptRoomInput,
    //                 "room_name":roomNameInput,
    //                 "occupancy_type":ocpyInput,
    //                 "mo3_price":,
    //                 "mo6_price":,
    //                 "bedroom_count":
    //                 "bath_count":
    //             }
    //         }
    //         const response = await fetch('http://localhost:6003/api/v1/managtSpaceCreate', {
    //             method: 'PUT',
    //             headers: {
    //                 "Content-Type": "application/json"
    //             },
    //             body: JSON.stringify(data)
    //         });
    //     }
    //     fetchCreateSpace()
    //     setSpaceSearch(true)
    //     setSpCreate(false)
    // }, [createSpaceTrig])

    // React.useEffect(() => {
    //     async function fetchDeleteProp() {
    //         const data = {
    //             "operation": "managePropDelete",
    //             "variables": {
    //                 "id":selectedId,
    //             }
    //         }
    //         const response = await fetch('http://localhost:6003/api/v1/managtPropDelete', {
    //             method: 'DELETE',
    //             headers: {
    //                 "Content-Type": "application/json"
    //             },
    //             body: JSON.stringify(data)
    //         });
    //     }
    //     fetchDeleteProp()
    //     setPropSearch(true)
    //     setPropDelete(false)
    // }, [delPropTrig])

    // React.useEffect(() => {
    //     async function fetchDeleteSpace() {
    //         const data = {
    //             "operation": "manageSpaceCreate",
    //             "variables": {
    //                 "space_id":,
    //             }
    //         }
    //         const response = await fetch('http://localhost:6003/api/v1/managtSpaceDelete', {
    //             method: 'DELETE',
    //             headers: {
    //                 "Content-Type": "application/json"
    //             },
    //             body: JSON.stringify(data)
    //         });
    //     }
    //     fetchDeleteSpace()
    //     setSpaceSearch(true)
    //     setSppaceDel(false)
    // }, [delSpaceTrig])

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
                            <Grid item xs={12} md={2} lg={2}>
                                <Paper sx={{ p: 2, display: 'flex', flexDirection: 'column' }}>
                                    <PropSearchField
                                        // setIdSelected={setIdSelected}
                                        // setHomeSelected={setHomeSelected}
                                        propAttr={propAttr}
                                        setPropAttr={setPropAttr}
                                        setTrig={setSearchPropTrig}
                                    />
                                </Paper>
                            </Grid>
                            <Grid item xs={12} md={8} lg={8}>
                                <Paper sx={{ p: 2, display: 'flex', flexDirection: 'column' }}>
                                    <div style={{ height: 400, width: '100%', fontSize: 8 }}>
                                        <DataGrid
                                            rows={newProp != null ? newProp : propertiesJson}
                                            columns={propColumns}
                                            getRowId={(row) => row.id}
                                            pageSize={5}
                                            rowsPerPageOptions={[5, 20, 50]}
                                            checkboxSelection={false}
                                            onSelectionModelChange={
                                                (ids) => {
                                                    // let selectedProp = newProp.filter(e => e.id==ids)
                                                    const selectedProp = newProp.filter(
                                                      function(obj, index){
                                                        return obj.id==ids;
                                                    }
                                                    )
                                                    console.log(selectedProp)
                                                    if (selectedProp.length!=0){
                                                        setPropAttr({
                                                            ...propAttr,
                                                            id:String(ids),
                                                            home_name:selectedProp[0].home_name,
                                                            property_id:selectedProp[0].property_id,
                                                            brand: selectedProp[0].brand,
                                                            city_name:selectedProp[0].city_name,
                                                            neighborhood:selectedProp[0].neighborhood,
                                                        })

                                                    }

                                                }
                                        }
                                        />
                                    </div>
                                </Paper>
                            </Grid>
                            <Grid item xs={12} md={2} lg={2}>
                                <Paper sx={{ p: 2, display: 'flex', flexDirection: 'column' }}>
                                    <PropAttrField
                                      propAttr={propAttr}
                                      setPropAttr={setPropAttr}
                                      setTrig = {setSearchPropTrig}
                                    />
                                </Paper>
                            </Grid>
                            <Grid item xs={12} md={2} lg={2}>
                                <Paper sx={{ p: 2, display: 'flex', flexDirection: 'column' }}>
                                    <SpaceSearchField
                                        spaceAttr={spaceAttr}
                                        setSpaceAttr={setSpaceAttr}
                                        setTrig={setSearchSpaceTrig}
                                    />
                                </Paper>
                            </Grid>
                            <Grid item xs={12} md={8} lg={8}>
                                <Paper sx={{ p: 2, display: 'flex', flexDirection: 'column' }}>
                                    <div style={{ height: 400, width: '100%', fontSize: 8 }}>
                                        <DataGrid
                                            rows={newSpace != null ? newSpace : spacesJson}
                                            columns={spaceColumns}
                                            getRowId={(row) => row.space_id}
                                            pageSize={5}
                                            rowsPerPageOptions={[5, 20, 50]}
                                            checkboxSelection={false}
                                            onSelectionModelChange={
                                                (ids) => {
                                                    // const selectedSpace = newSpace.filter(e => e.id==ids)[0]
                                                    const selectedSpace = newSpace.filter(
                                                      function(obj, index){
                                                          return obj.space_id==ids;
                                                      }
                                                    )
                                                    console.log(selectedSpace)
                                                    if(selectedSpace.length!=0){
                                                        setSpaceAttr({
                                                            ...spaceAttr,
                                                            space_id: String(ids),
                                                            room_name: selectedSpace[0].room_name,
                                                            occupancy_type: selectedSpace[0].occupancy_type,
                                                            // room_name:"",
                                                            // mo3_price:"",
                                                            // mo6_price:"",
                                                            // bedroom_count:"",
                                                            // bath_count:"",
                                                        })
                                                    }
                                                }
                                            }
                                        />
                                    </div>
                                </Paper>
                            </Grid>
                            <Grid item xs={12} md={2} lg={2}>
                                <Paper sx={{ p: 2, display: 'flex', flexDirection: 'column' }}>
                                    <SpaceAttrField
                                      spaceAttr={spaceAttr}
                                      setSpaceAttr={setSpaceAttr}
                                      setTrig = {setSearchSpaceTrig}
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

export default function Portal({ propertiesJson, spacesJson }) {

    return <PortalContent spacesJson={spacesJson} propertiesJson={propertiesJson} />;
}
