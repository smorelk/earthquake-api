import * as React from 'react';
import PublicIcon from '@mui/icons-material/Public';
import NumbersIcon from '@mui/icons-material/Numbers';
import { AppBar, Box, Divider, 
  Typography, Toolbar, Drawer, 
  List, ListItem, ListItemButton, ListItemIcon,
  ListItemText, TextField, InputAdornment,
  Button } from '@mui/material/';
import { DataGrid } from '@mui/x-data-grid';
import './App.css';
import Map from './components/Map';
import CommentSection from './components/CommentSection';
import CommentBox from './components/CommentBox';

const columns = [
  {field: 'id', headerName: 'ID', flex: 1},
  {field: 'title', headerName: 'Title', flex: 1},
  {field: 'place', headerName: 'Place', flex: 1},
  {field: 'magnitude', headerName: 'Magnitude', flex: 1},
  {field: 'tsunami', headerName: 'Tsunami', flex: 1},
];

const defaults = {
  page: 1,
  limit: 50,
  perPage: 50,
  pageSizeOptions: [25, 30, 35, 40, 45, 50],
  drawerWidth: 240
}




function App() {
  const [showMarker, setShowMarker] = React.useState(false);
  const text = React.createRef();
  const selectedID = React.useRef(0);
  const limit = React.createRef();
  const [comments, setComments] = React.useState([]);
  const [refreshCommenctSection, setRefreshCommentSection] = React.useState(false);
  const [coordinates, setCoordinates] = React.useState([]);
  const [rows, setRows] = React.useState([]);
  const commentsEndpoint = `http://localhost:3000/api/features/:id/comments`;

  React.useEffect(() => {
    fetchComments(selectedID);
    setRefreshCommentSection(false);
  } , [refreshCommenctSection])

  const fetchEarthquakeData = (page = defaults.page, perPage = defaults.limit) => {
    const featuresEndpoint = `http://localhost:3000/api/features?page=${page}&per_page=${perPage}`;
    fetch(featuresEndpoint, {
      method: 'get',
      mode: 'cors',
      cache: 'default'
    })
    .then(res => res.json())
    .then(json => {
      const rws = json.data.map((obj) => {
        return { 
          id: obj['id'],
          title: obj['attributes_']['title'],
          place: obj['attributes_']['place'],
          magnitude: obj['attributes_']['magnitude'],
          tsunami: obj['attributes_']['tsunami'],
          coordinates: [ obj['attributes_']['coordinates']['longitude'], obj['attributes_']['coordinates']['latitude']]
        }
      });

      setRows(rws);
      setEarthquakeData(json.data)
      
    })
    .catch(err => console.error(err));
  }

  const fetchComments = () => {
    const endpoint = commentsEndpoint.replace(':id', selectedID.current);
    fetch(endpoint, {
      method: 'get', 
      mode: 'cors',
      cache: 'default'
    })
    .then(resp => resp.json())
    .then(data => {
      setComments(data['comments'])
    })
    .catch(err => console.error(err));
  }

  const publishComment = () => {
    const endpoint = commentsEndpoint.replace(':id', selectedID.current);
    console.log('Publishing comment: ', text.current.value);
    fetch(endpoint, {
      mode: 'cors',
      method: 'post',
      headers: {
        'Content-Type': 'application/json'
      },
      body: `{ "body": "${text.current.value}"}`,
    })

    text.current.value = ''
  }

  const displayFeature = (params) => {
    setShowMarker(true);
    selectedID.current = params.id;

    console.log("Selected ID: ", selectedID.current);
    
    const rw = rows.find((r) => r.id === selectedID.current);
    setCoordinates(rw.coordinates);
    fetchComments(selectedID);
  }


  return (
    <Box>
      <AppBar  
        position='static'
        sx={{ backgroundColor: '#4c4c4c' }}
      >
        <Toolbar>
          <PublicIcon></PublicIcon> 
          <Typography margin={1} variant="h6" component="div" sx={{ flexGrow: 1 }}>
            EarthQuake View
          </Typography>
          <Box display='flex'>
            <TextField
              label="Limit"
              type="number"
              InputLabelProps={{
                shrink: true,
              }}
              size='small'
              inputRef={limit}
            />
            <Button sx={{ marginLeft: 1 }} variant='outlined' color='inherit' onClick={() => {
              if (limit.current.value)
                fetchEarthquakeData(defaults.page, limit.current.value)
              else
                fetchEarthquakeData(defaults.page, defaults.limit);
            }}>GET</Button>
          </Box>
        </Toolbar>
      </AppBar>
      <Box height={280}>
        <DataGrid
          rows={rows}
          columns={columns}
          initialState={{
            pagination: {
              paginationModel: { page: defaults.page, pageSize: defaults.perPage}
            },
          }}
          pageSizeOptions={[5, 10, 20, 30, 40, 50]}
          onRowClick={displayFeature}
        >

        </DataGrid>
      </Box>
      
    
      <Map width={defaults.drawerWidth} coordinates={coordinates} showMarker={showMarker} />
      
      <Divider />
      
      <Box width='100%' sx={{ display: 'flex' }} marginBottom={3}>
        <CommentSection show={showMarker}  comments={comments} />
        <Divider orientation='vertical'/>
        <CommentBox show={showMarker} inputRef={text} onButtonClick={publishComment} onSend={setRefreshCommentSection} />
      </Box>
    </Box>
  );
}

export default App;
