import React from "react";
import { GetStaticProps } from "next";
import { getSpaces, spaces } from "../../src/data-access/spaces";
import { DataGrid, GridColDef } from '@mui/x-data-grid';

// This page will be statically rendered at build time
export const getStaticProps: GetStaticProps = async () => {
    const spaces: spaces[] = await getSpaces();
    var spaceJson = []
    for (var line of spaces) {
        spaceJson.push(
            {
                space_id: line.space_id,
                date_available: line.date_available.toDateString(),
                property_id: line.property_id,
                room_name: line.room_name,
                status: line.status,
                mo6_price: line.mo6_price,
                mo9_price: line.mo9_price,
                mo12_price: line.mo12_price,
            }
        )
    }
    return {
        props: { spaceJson }
    }
};

// type Props = {
//     spaces: spaces[];
// };

const columns: GridColDef[] = [
    { field: 'space_id', headerName: 'ID', width: 70 },
    { field: 'date_available', headerName: 'DATE_AVALBE', width: 70 },
    { field: 'property_id', headerName: 'P_NAME', width: 200 },
    { field: 'room_name', headerName: 'ROOM', width: 200 },
    { field: 'status', headerName: 'STATUS', width: 200 },
    { field: 'mo6_price', headerName: '6MONTH_PRICE', width: 200 },
    { field: 'mo9_price', headerName: '9MONTH_PRICE', width: 200 },
    { field: 'mo12_price', headerName: '12MONTH_PRICE', width: 200 },
];

function SpaceTable({ spaceJson }) {
    return (
        <div style={{ height: 1000, width: '100%' }}>
            <DataGrid
                rows={spaceJson}
                columns={columns}
                getRowId={(row) => row.space_id}
                pageSize={20}
                rowsPerPageOptions={[20, 50, 100]}
                checkboxSelection
            />
        </div>
    );
};

export default SpaceTable
