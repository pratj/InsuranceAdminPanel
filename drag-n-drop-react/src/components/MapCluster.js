import GoogleMapReact from 'google-map-react'
import React, {useState, useRef, useEffect} from 'react'
import useSwr from 'swr'
import useSupercluster from "use-supercluster";
import './Map.css'
import RoomIcon from '@material-ui/icons/Room';
import { Divider, Tooltip } from '@material-ui/core';
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
    "http://localhost:9090/api/map/location";
  const { data, error } = useSwr(url, { fetcher });
  const crimes = data && !error ? data.slice(0,200) : [];
  useEffect(()=>{
    {clusterData()}
  },[crimes])
  const mapRef = useRef();
const [zoom, setZoom]=useState(10);
const [bounds, setBounds] = useState(null)
const [maxProductCount, setmaxProductCount]=useState(0);
const [maxCategoryCount, setmaxCategoryCount] = useState(0);
const [maxProduct, setmaxProduct] = useState(null)
const [maxCategory, setmaxCategory] = useState(null)
const points = crimes.map(crime => ({
    type: "Feature",
    properties: { cluster: false, crimeId: crime.ViewTime, category: crime.category },
    geometry: {
      type: "Point",
      coordinates: [
        parseFloat(crime.userLocation.coordinates.lng),
        parseFloat(crime.userLocation.coordinates.lat)
      ]
    }
  }));
const  {clusters, supercluster} = useSupercluster({
    points,
    bounds,
    zoom,
    options: {radius:75, maxZoom:20}
})
function clusterData(){
  const data = crimes

//let [maxProductCount, maxCategoryCount, maxProduct, maxCategory, tmpObj] = [0, 0, null, null, {}];
let tmpObj ={}
data.forEach(({ product, category }) => {
    tmpObj[product] = (tmpObj[product] || 0) + 1;
    tmpObj[category] = (tmpObj[category] || 0) + 1;
    if (tmpObj[product] > maxProductCount) {
        setmaxProductCount (tmpObj[product]);
        setmaxProduct (product);
    }
    if (tmpObj[category] > maxCategoryCount) {
        setmaxCategoryCount ( tmpObj[category]);
        setmaxCategory (category);
    }
    
});

console.log({ maxProduct, maxCategory });
return { maxProduct, maxCategory }
}

return (
    <div style={{ height: "90.9vh", width: "100%" }}>
        <MenuAppBar/>
      <GoogleMapReact
        bootstrapURLKeys={{ key: process.env.REACT_APP_GOOGLE_MAP_KEY }}
        defaultCenter={{ lat: 20.59, lng: 78.96 }}
        defaultZoom={5}
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
            <Divider/>
            <Typography color="textSecondary">Most Requested</Typography>
            <Typography color="inherit"> Category:<span style={{color:"white"}}>{maxCategory}</span></Typography>
            <Typography color="inherit"> Product:<span style={{color:"white"}}>{maxProduct}</span></Typography>
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
