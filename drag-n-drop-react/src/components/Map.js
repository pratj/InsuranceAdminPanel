import GoogleMapReact from 'google-map-react'
import React, {useRef} from 'react'
import useSwr from 'swr'
import './Map.css'
import RoomIcon from '@material-ui/icons/Room';
import { Tooltip } from '@material-ui/core';
import { withStyles, makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import AppBar from '../AppBar';

const fetcher = (...args) => fetch(...args).then(response => response.json());
const Marker = ({ children }) => children;
const HtmlTooltip = withStyles((theme) => ({
    tooltip: {
      backgroundColor: 'gray',
      color: 'yellow',
      maxWidth: 220,
      fontSize: theme.typography.pxToRem(12),
      border: '1px solid #dadde9',
    },
  }))(Tooltip);

function Map() {
//     const url =
//     "https://data.police.uk/api/crimes-street/all-crime?lat=52.629729&lng=-1.131592&date=2019-10";
//   const { data, error } = useSwr(url, { fetcher });
//   const crimes = data && !error ? data.slice(0,200) : [];
const crimes=[
    {
      "category": "anti-social-behaviour",
      "location_type": "Force",
      "location": {
        "latitude": "52.628613",
        "street": {
          "id": 883221,
          "name": "On or near Highfield Street"
        },
        "longitude": "-1.118388"
      },
      "context": "",
      "outcome_status": null,
      "persistent_id": "",
      "id": 78209889,
      "location_subtype": "",
      "month": "2019-10"
    },
    {
      "category": "anti-social-behaviour",
      "location_type": "Force",
      "location": {
        "latitude": "52.634693",
        "street": {
          "id": 883424,
          "name": "On or near St Nicholas Circle"
        },
        "longitude": "-1.140799"
      },
      "context": "",
      "outcome_status": null,
      "persistent_id": "",
      "id": 78215173,
      "location_subtype": "",
      "month": "2019-10"
    },
    {
      "category": "anti-social-behaviour",
      "location_type": "Force",
      "location": {
        "latitude": "52.631392",
        "street": {
          "id": 883371,
          "name": "On or near East Street"
        },
        "longitude": "-1.127064"
      },
      "context": "",
      "outcome_status": null,
      "persistent_id": "",
      "id": 78210437,
      "location_subtype": "",
      "month": "2019-10"
    }]

    return (
        <div style={{ height: "90.9vh", width: "100%" }}>
            <AppBar/>
      <GoogleMapReact
        bootstrapURLKeys={{ key: process.env.REACT_APP_GOOGLE_MAP_KEY}}
        //defaultCenter={{ lat: 20.59, lng: 78.96 }}
        defaultCenter={{ lat: 52.6376, lng: -1.135171 }}
        defaultZoom={14}
        
        
      >
        {crimes.map(crime=>(
            <Marker key={crime.id} lat={crime.location.latitude} lng={crime.location.longitude}>
                {console.log(crime)}
                {/* <button className="crime-marker">
                    <img src="favicon.ico"/>
                </button> */}
                {/* <Tooltip title="categories" >
                
                </Tooltip> */}
                <HtmlTooltip
        title={
          <React.Fragment>
              <img style={{width:"30px", height:"30px", display:"inline", marginTop:"10px"}} src="favicon.ico"/>
            <Typography style={{display:"inline"}}color="inherit">{'       '}Category</Typography>
            {/* <em>{"And here's"}</em> <b>{'some'}</b> <u>{'amazing content'}</u>.{' '}
            {""} */}
            <p>Product Chosen</p>
            <p>Time viwed</p>
          </React.Fragment>
        }
      >
        <RoomIcon style={{color:"yellow"}}/>
      </HtmlTooltip>
                
            </Marker>
        ))}
      </GoogleMapReact>
    </div>
    )
}

export default Map
