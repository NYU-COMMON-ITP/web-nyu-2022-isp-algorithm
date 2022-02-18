import React, { useEffect } from "react";
import { GetStaticProps } from "next";
import Layout from "../src/components/Layout";
import Post, { PostProps } from "../src/components/Post";
import { getProperties, properties } from "../src/data-access/properties";
import { DataGrid, GridColDef, GridValueGetterParams } from '@mui/x-data-grid';


// This page will be statically rendered at build time
export const getStaticProps: GetStaticProps = async () => {
    const properties = await getProperties();
    return {
        props: { properties }
    }
};

type Props = {
    properties: properties[];
};

const columns: GridColDef[] = [
    { field: 'id', headerName: 'ID', width: 70 },
    { field: 'home_name', headerName: 'NAME', width: 200 },
    { field: 'city_name', headerName: 'CITY', width: 200 },
    { field: 'neighborhood', headerName: 'NEIGNBORHOOD', width: 200 },
    { field: 'unit_count', headerName: 'UNIT', width: 200 },
    // {
    //     field: 'fullName',
    //     headerName: 'Full name',
    //     description: 'This column has a value getter and is not sortable.',
    //     sortable: false,
    //     width: 160,
    //     valueGetter: (params: GridValueGetterParams) =>
    //         `${params.row.firstName || ''} ${params.row.lastName || ''}`,
    // },
];

const Blog: React.FC<Props> = (props) => {
    return (
        <div style={{ height: 1080, width: '100%' }}>
            <DataGrid
                rows={props.properties}
                columns={columns}
                pageSize={20}
                rowsPerPageOptions={[20, 50, 100]}
                checkboxSelection
            />
        </div>
    );
};

export default Blog;
