import { useState } from 'react';
import PublicIcon from '@mui/icons-material/Public';
import { AppBar, Box, Typography, Toolbar, Button } from '@mui/material/';
import { DataGrid } from '@mui/x-data-grid';
import './App.css';;

const columns = [
  {field: 'id', headerName: 'ID', flex: 1},
  {field: 'title', headerName: 'Title', flex: 1},
  {field: 'place', headerName: 'Place', flex: 1},
  {field: 'magnitude', headerName: 'Magnitude', flex: 1},
  {field: 'tsunami', headerName: 'Tsunami', flex: 1},
];

const defaults = {
  page: 1,
  limit: 100,
  perPage: 5,
  pageSizeOptions: [25, 30, 35, 40, 45, 50]
}

function App() {
  const [earthquakeData, setEarthquakeData] = useState([]);
  const [rows, setRows] = useState([]);
  const fetchEarthquakeData = (page, perPage) => {
    const featuresEndpoint = `http://localhost:3000/api/features?page=${page}&per_page=${perPage}`;
    fetch(featuresEndpoint, {
      method: 'get',
      mode: 'cors'
    })
    .then(res => res.json())
    .then(json => {
      setEarthquakeData(json.data)
      const rws = earthquakeData.map((obj) => {
        return { 
          id: obj['id'],
          title: obj['attributes_']['title'],
          place: obj['attributes_']['place'],
          magnitude: obj['attributes_']['magnitude'],
          tsunami: obj['attributes_']['tsunami']
        }
      });
      setRows(rws);
    })
    .catch(err => console.error(err));
   
  }


  return (
    <Box>
      <AppBar position='static'>
        <Toolbar>
          <PublicIcon></PublicIcon> 
          <Typography margin={1} variant="h6" component="div" sx={{ flexGrow: 1 }}>
            EarthQuake View
          </Typography>
          <Button variant="outlined" color="inherit" onClick={() => fetchEarthquakeData(defaults.page, defaults.limit)}>GET</Button>
        </Toolbar>
      </AppBar>

      <DataGrid
        rows={rows}
        columns={columns}
        initialState={{
          pagination: {
            paginationModel: { page: defaults.page, pageSize: defaults.perPage}
          },
        }}
        pageSizeOptions={[5, 10, 20, 30, 40, 50]}
        autoHeight
      >

      </DataGrid>
      
    </Box>
  );
}

export default App;
