import * as React from 'react';
import { useState, useEffect } from "react";
import { styled, createTheme, ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import List from '@mui/material/List';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import Badge from '@mui/material/Badge';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import MenuIcon from '@mui/icons-material/Menu';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import NotificationsIcon from '@mui/icons-material/Notifications';
import {ListItems} from '../../src/components/ListItems';
import Copyright from '../../src/components/Copyright';
import PropCard from '../../src/components/PropCard';
import { properties, getCities, getProperties } from "../../src/data-access/searches";
import { GetStaticProps } from "next";
import { Pagination } from "@material-ui/lab";
import usePagination from "../../src/components/Paginations";
import MuiDrawer from '@mui/material/Drawer';
import MuiAppBar, { AppBarProps as MuiAppBarProps } from '@mui/material/AppBar';
import UserSearchFields from '../../src/components/UserSearch'
import { DataGrid, GridColDef } from '@mui/x-data-grid';

const drawerWidth: number = 240;

export const getStaticProps: GetStaticProps = async () => {
  const cityLists = await getCities();
  const cityMenu = []

  for (const city of cityLists) {
    cityMenu.push(
      {
        value: city.city_name,
        label: city.city_name,
      }
    )
  }
  const properties: properties[] = await getProperties();
  const propertiesJson = []
  for (const prop of properties) {
    propertiesJson.push(
      {
        id: prop.id,
        home_name: prop.home_name,
        property_id: prop.property_id,
        brand: prop.brand,
        city_name: prop.city_name,
        neighborhood: prop.neighborhood,
        timezone: prop.timezone,
        unit_count: prop.unit_count,
      }
    )
  }
  return {
    props: { cityMenu, propertiesJson }
  }
};

const columns: GridColDef[] = [
  { field: 'id', headerName: 'ID', width: 50 },
  { field: 'home_name', headerName: 'Home', width: 150 },
  { field: 'property_id', headerName: 'Prop_ID', width: 120 },
  { field: 'brand', headerName: 'Brand', width: 70 },
  { field: 'city_name', headerName: 'City', width: 100 },
  { field: 'neighborhood', headerName: 'Neighborhood', width: 150 },
  { field: 'unit_count', headerName: 'Unit', width: 70 },
];

interface AppBarProps extends MuiAppBarProps {
  open?: boolean;
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

function PortalContent({ propertiesJson }) {
  const [open, setOpen] = React.useState(false);
  const [searchTrig, setSearch] = React.useState(false);
  const [newProp, setNewProp] = React.useState(null);
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

  const [page, setPage] = useState(1);
  const PER_PAGE = 6;
  const count = Math.ceil(propertiesJson.length / PER_PAGE);
  const _DATA = usePagination(propertiesJson, PER_PAGE);

  const handlePageChange = (e, p) => {
    setPage(p);
    _DATA.jump(p);
  };

  const cardItems = [];
  for (const prop of _DATA.currentData()) {
    cardItems.push(<Grid item xs={6} sx={{ mx: "auto", }}><PropCard data={prop}/></Grid>);
  }

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
        ><Toolbar />

          <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
            <Grid container spacing={3}>
              <Grid item xs={9}>
                <Paper sx={{ p: 2, display: 'flex', flexDirection: 'column' }}>
                  <Grid
                    container
                    spacing={3}
                    alignItems="center"
                    justifyContent="center">
                  {cardItems}
                  </Grid>
                  <Grid
                    container
                    spacing={5}
                    alignItems="center"
                    justifyContent="center"
                    direction="column">
                    <Grid item xs={12} sx={{ m: 2 }}>
                      <Pagination
                        size="small"
                        count={count}
                        page={page}
                        variant="outlined"
                        shape="rounded"
                        onChange={handlePageChange}
                      />
                    </Grid>
                  </Grid>
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
