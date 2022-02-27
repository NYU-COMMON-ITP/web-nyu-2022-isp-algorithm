import * as React from 'react';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import ListSubheader from '@mui/material/ListSubheader';
import DashboardIcon from '@mui/icons-material/Dashboard';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import PeopleIcon from '@mui/icons-material/People';
import BarChartIcon from '@mui/icons-material/BarChart';
import LayersIcon from '@mui/icons-material/Layers';
import AssignmentIcon from '@mui/icons-material/Assignment';
import MapsHomeWorkIcon from '@mui/icons-material/MapsHomeWork';
import BedIcon from '@mui/icons-material/Bed';

export const listItems = (
    <React.Fragment>
        <ListItemButton>
            <ListItemIcon>
                <DashboardIcon />
            </ListItemIcon>
            <ListItemText primary="DashBoard" />
        </ListItemButton>
        <ListItemButton>
            <ListItemIcon>
                <MapsHomeWorkIcon />
            </ListItemIcon>
            <ListItemText primary="Spaces" />
        </ListItemButton>
        <ListItemButton>
            <ListItemIcon>
                <BedIcon />
            </ListItemIcon>
            <ListItemText primary="Properties" />
        </ListItemButton>
    </React.Fragment>
);