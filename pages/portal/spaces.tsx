import React, { useEffect } from "react";
import superjson from 'superjson';
import { GetStaticProps } from "next";
import { getSpaces, spaces } from "../../src/data-access/spaces";
import { DataGrid, GridColDef, GridValueGetterParams } from '@mui/x-data-grid';
// import { spaces } from "@prisma/client";


// This page will be statically rendered at build time
export const getStaticProps: GetStaticProps = async () => {
    const spaces = await getSpaces();
    // const spacesJson = JSON.parse(JSON.stringify(spaces))
    // console.log(spaces)
    // for (var i = 0; i < spaces.length; i++) {
    //     // spaces[i].date_available = await new Date(spaces[i].date_available)
    //     // spaces[i].created_at = await new Date(spaces[i].created_at)
    //     // spaces[i].updated_at = await new Date(spaces[i].updated_at)
    // }
    return {
        props: { spaces: JSON.parse(JSON.stringify(spaces)) }
    }
};

type Props = {
    spaces: spaces[];
};

const columns: GridColDef[] = [
    // {
    //     field: 'space_id',
    //     headerName: 'ID',
    //     description: 'This column has a value getter and is not sortable.',
    //     sortable: false,
    //     width: 160,
    //     valueGetter: (params: GridValueGetterParams) =>
    //         `${params.row.getRowId}`,
    // },

    { field: 'space_id', headerName: 'ID', width: 70 },
    { field: 'property_id', headerName: 'P_NAME', width: 200 },
    { field: 'room_name', headerName: 'ROOM', width: 200 },
    { field: 'status', headerName: 'STATUS', width: 200 },
    { field: 'mo6_price', headerName: '6MONTH_PRICE', width: 200 },
    { field: 'mo9_price', headerName: '9MONTH_PRICE', width: 200 },
    { field: 'mo12_price', headerName: '12MONTH_PRICE', width: 200 },
    // {
    //     field: 'fullName',
    //     headerName: 'Full name',
    //     description: 'This column has a value getter and is not sortable.',
    //     sortable: false,
    //     width: 160,
    //     valueGetter: (params: GridValueGetterParams) =>
    //         `${ params.row.firstName || '' } ${ params.row.lastName || '' }`,
    // },
];

const Blog: React.FC<Props> = (props) => {
    return (
        <div style={{ height: 1080, width: '100%' }}>
            <DataGrid
                rows={props.spaces}
                columns={columns}
                getRowId={(props) => props.space_id}
                pageSize={20}
                rowsPerPageOptions={[20, 50, 100]}
                checkboxSelection
            />
        </div>
    );
};

export default Blog;
