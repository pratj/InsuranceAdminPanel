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
    const url =
    "http://localhost:9090/api/map/location";
  const { data, error } = useSwr(url, { fetcher });
  const crimes = data && !error ? data.slice(0,200) : [];
// const crimes=[
//   {
//       "product": "Car Insurance",
//       "ViewTime": "Wed Jan 20 14:13:05 IST 2021",
//       "userBought": false,
//       "userLocation": {
//           "loaded": true,
//           "userAllowed": true,
//           "coordinates": {
//               "lng": 70.8856,
//               "lat": 19.0748
//           }
//       },
//       "category": "Motor Insurance"
//   },
//   {
//       "product": "Car Insurance",
//       "ViewTime": "Wed Jan 20 15:40:31 IST 2021",
//       "userBought": true,
//       "userLocation": {
//           "loaded": true,
//           "userAllowed": true,
//           "coordinates": {
//               "lng": 72.8856,
//               "lat": 19.0748
//           }
//       },
//       "category": "Motor Insurance"
//   }
// ]

    return (
        <div style={{ height: "90.9vh", width: "100%" }}>
            <AppBar/>
      <GoogleMapReact
        bootstrapURLKeys={{ key: process.env.REACT_APP_GOOGLE_MAP_KEY}}
        defaultCenter={{ lat: 20.59, lng: 78.96 }}
        //defaultCenter={{ lat: 52.6376, lng: -1.135171 }}
        defaultZoom={5}
        
        
      >
        {crimes.map(crime=>(
            <Marker key={crime.ViewTime} lat={crime.userLocation.coordinates.lat} lng={crime.userLocation.coordinates.lng}>
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
            <Typography style={{display:"inline"}}color="inherit">{'       '}Motor Insurance</Typography>
            {/* <em>{"And here's"}</em> <b>{'some'}</b> <u>{'amazing content'}</u>.{' '}
            {""} */}
            <p>Product Chosen: {crime.product}</p>
            <p>Time viwed: {crime.ViewTime}</p>
            <p>User Bought: {crime.userBought.toString()}</p>
            {crime.userBought===true?<p>Partner Bought: {crime.partner}</p>:
            <p></p>}
          </React.Fragment>
        }
      >
        {crime.userBought===true?<RoomIcon style={{color:"yellow"}}/>:<RoomIcon style={{color:"red"}}/>}
      </HtmlTooltip>
                
            </Marker>
        ))}
      </GoogleMapReact>
    </div>
    )
}

export default Map
