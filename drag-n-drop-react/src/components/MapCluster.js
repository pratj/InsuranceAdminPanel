import GoogleMapReact from 'google-map-react'
import React, {useState, useRef} from 'react'
import useSwr from 'swr'
import useSupercluster from "use-supercluster";
import './Map.css'
import RoomIcon from '@material-ui/icons/Room';
import { Tooltip } from '@material-ui/core';
import { withStyles, makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import AppBar from '../AppBar';
import DataUsageRoundedIcon from '@material-ui/icons/DataUsageRounded';
import './MapCluster.css'
import MenuAppBar from '../AppBar';

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

function MapCluster() {
    const url =
    "https://data.police.uk/api/crimes-street/all-crime?lat=52.629729&lng=-1.131592&date=2019-10";
  const { data, error } = useSwr(url, { fetcher });
  const crimes = data && !error ? data.slice(0,200) : [];
  const mapRef = useRef();
const [zoom, setZoom]=useState(10);
const [bounds, setBounds] = useState(null)

const points = crimes.map(crime => ({
    type: "Feature",
    properties: { cluster: false, crimeId: crime.id, category: crime.category },
    geometry: {
      type: "Point",
      coordinates: [
        parseFloat(crime.location.longitude),
        parseFloat(crime.location.latitude)
      ]
    }
  }));
const  {clusters, supercluster} = useSupercluster({
    points,
    bounds,
    zoom,
    options: {radius:75, maxZoom:20}
})


return (
    <div style={{ height: "90.9vh", width: "100%" }}>
        <MenuAppBar/>
      <GoogleMapReact
        bootstrapURLKeys={{ key: process.env.REACT_APP_GOOGLE_MAP_KEY }}
        defaultCenter={{ lat: 52.6376, lng: -1.135171 }}
        defaultZoom={10}
        yesIWantToUseGoogleMapApiInternals
        onGoogleApiLoaded={({ map }) => {
          mapRef.current = map;
        }}
        onChange={({ zoom, bounds }) => {
          setZoom(zoom);
          setBounds([
            bounds.nw.lng,
            bounds.se.lat,
            bounds.se.lng,
            bounds.nw.lat
          ]);
        }}
      >
        {clusters.map(cluster => {
          const [longitude, latitude] = cluster.geometry.coordinates;
          const {
            cluster: isCluster,
            point_count: pointCount
          } = cluster.properties;

          if (isCluster) {
            return (
              <Marker
                key={`cluster-${cluster.id}`}
                lat={latitude}
                lng={longitude}
              >
                  <HtmlTooltip
        title={
          <React.Fragment>
              <DataUsageRoundedIcon/>
            <Typography style={{display:"inline"}}color="inherit">Number of Requests</Typography>
            <p>{pointCount}</p>
          </React.Fragment>
        }
      >
                <div
                  className="cluster-marker"
                  style={{
                    width: `${10 + (pointCount / points.length) * 20}px`,
                    height: `${10 + (pointCount / points.length) * 20}px`
                  }}
                  onClick={() => {
                    const expansionZoom = Math.min(
                      supercluster.getClusterExpansionZoom(cluster.id),
                      20
                    );
                    mapRef.current.setZoom(expansionZoom);
                    mapRef.current.panTo({ lat: latitude, lng: longitude });
                  }}
                >
                    {pointCount}
                  
                </div>
                </HtmlTooltip>
              </Marker>
            );
          }

          return (
            <Marker
              key={`crime-${cluster.properties.crimeId}`}
              lat={latitude}
              lng={longitude}
            >
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
              <button className="crime-marker">
              <RoomIcon style={{color:"white"}}/>
              </button>
    </HtmlTooltip>
            </Marker>
            
          );
        })}
      </GoogleMapReact>
    </div>
  );
}

export default MapCluster
