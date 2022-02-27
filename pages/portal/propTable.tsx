import React, { useEffect } from "react";
import { GetStaticProps } from "next";
import { getProperties, properties } from "../../src/data-access/properties";
import getPropertiesHandler from "../api/v1/properties"
import { DataGrid, GridColDef } from '@mui/x-data-grid';
// import properties from "../api/v1/properties";

const SERVERURL = "http://localhost"
const PORT = 3000

// This page will be statically rendered at build time
export const getStaticProps: GetStaticProps = async () => {
    // const properties = await getProperties();

    // const options =

    const res = await fetch(SERVERURL + ":" + PORT + '/api/v1/properties',
        {
            method: "GET",
            headers: {
                'Content-Type': 'application/json'
            }
        })
    // const res = reqFn(options)
    const rawProp = JSON.stringify(res)
    const properties = []
    for (var line of properties) {
        line = line.json
        line.data_avaliable = line.data_avaliable.toDateString()
    }
    console.log(res)
    return {
        props: { properties }
    }

};

const columns: GridColDef[] = [
    { field: 'id', headerName: 'ID', width: 70 },
    { field: 'home_name', headerName: 'NAME', width: 200 },
    { field: 'city_name', headerName: 'CITY', width: 200 },
    { field: 'neighborhood', headerName: 'NEIGNBORHOOD', width: 200 },
    { field: 'unit_count', headerName: 'UNIT', width: 200 },
];

function PropTable(props) {
    console.log(props.properties)
    return (
        // <div>test{props.properties}</div>
        <div style={{ height: 1080, width: '100%' }}>
            <DataGrid
                rows={props.properties}
                getRowId={(props) => props.id}
                columns={columns}
                pageSize={20}
                rowsPerPageOptions={[20, 50, 100]}
                checkboxSelection
            />
        </div>
    );
};
export default PropTable

