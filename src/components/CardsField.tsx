import * as React from "react";
import usePagination from "./Paginations";
import Grid from "@mui/material/Grid";
import PropCard from "./PropCard";
import Pagination from "@mui/material/Pagination";
import Paper from "@mui/material/Paper";
import Link from '@mui/material/Link';
import { useState } from "react";
import ListItemIcon from "@mui/material/ListItemIcon";
import SearchIcon from "@mui/icons-material/Search";
import ListItemText from "@mui/material/ListItemText";
import ListItemButton from "@mui/material/ListItemButton";

function CardField({data}){
  const PER_PAGE = 4;
  const [page, setPage] = useState(1);
  const count = Math.ceil(data.length / PER_PAGE);
  const pageData = usePagination(data, PER_PAGE);
  const handlePageChange = (e, p) => {
    setPage(p);
    pageData.jump(p);
  };

  const cardItems = [];
  for (const prop of pageData.currentData()) {
    cardItems.push(<Grid key={prop.id} item xs={6} sx={{ mx: "auto", }}><PropCard data={prop}/></Grid>);
  }
  console.log(cardItems)
  if (cardItems.length==0){
    return(
      <Paper sx={{ p: 2, display: 'flex', flexDirection: 'column',alignItems: "center"}} >
          <Link component={'button'} href="/portal/search">
            <ListItemButton>
              <ListItemIcon>
                <SearchIcon />
              </ListItemIcon>
              <ListItemText primary="No Qualified Result" />
            </ListItemButton>
          </Link>
      </Paper>
    )
  }

  return (
    <Paper sx={{ p: 1, display: 'flex', flexDirection: 'column' }}>
      <Grid
        container
        spacing={3}
        alignItems="center"
        justifyContent="center">
        {cardItems}
      </Grid>
      <Grid item xs={12} sx={{ m: 0.5 ,p:0.5 }}>
        <Pagination
          size="small"
          count={count}
          page={page}
          variant="outlined"
          shape="rounded"
          onChange={handlePageChange}
        />
      </Grid>

    </Paper>
  );
}

export default CardField;