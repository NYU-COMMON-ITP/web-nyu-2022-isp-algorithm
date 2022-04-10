import * as React from "react";
import usePagination from "./Paginations";
import Grid from "@mui/material/Grid";
import PropCard from "./PropCard";
import Pagination from "@mui/material/Pagination";
import Paper from "@mui/material/Paper";
import { useState } from "react";


function CardField({data}){

  const PER_PAGE = 6;
  const [page, setPage] = useState(1);
  const count = Math.ceil(data.length / PER_PAGE);
  const pageDate = usePagination(data, PER_PAGE);
  const handlePageChange = (e, p) => {
    setPage(p);
    pageDate.jump(p);
  };

  const cardItems = [];
  for (const prop of pageDate.currentData()) {
    cardItems.push(<Grid item xs={6} sx={{ mx: "auto", }}><PropCard data={prop}/></Grid>);
  }

  return (
    <Paper sx={{ p: 2, display: 'flex', flexDirection: 'column' }}>
      <Grid
        container
        spacing={3}
        alignItems="center"
        justifyContent="center">
        {cardItems}
      </Grid>

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

    </Paper>
  );
}

export default CardField;