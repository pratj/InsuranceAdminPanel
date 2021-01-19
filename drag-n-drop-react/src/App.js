import {Container} from 'react-bootstrap'
import Signup from './components/Signup'
import Login from './components/Login'
import { AuthProvider } from "./contexts/AuthContext"
import { BrowserRouter as Router, Switch, Route } from "react-router-dom"
import Dashboard from "./Dashboard"
import PrivateRoute from './PrivateRoute'
import ForgotPassword from "./components/ForgotPassword"
import Analytics from './Analytics';
import Map from './components/Map'
import LeafletMap from './components/LeafletMap'
import MapCluster from './components/MapCluster'
import AnalyticsComponent from './AnalyticsComponent'

function App() {

    return (
    
    
      
      <Container >
        
      <Router>
      <AuthProvider>
        <Switch>
          <Route path="/signup" component={Signup} />
          <Route exact path="/" component={Login} />
          <PrivateRoute exact path="/home" component={Dashboard} />
          <PrivateRoute path="/analytics" exact component={AnalyticsComponent}/>
          <PrivateRoute exact path="/analytics/barchart" exact component={Analytics.BarChart}/>
          <PrivateRoute exact path="/analytics/doughnutchart2" exact component={Analytics.DoughnutChart2}/>
          <PrivateRoute exact path="/analytics/doughnutchart1" exact component={Analytics.DoughnutChart1}/>
          <Route exact path="/login" component={Login} />
          <Route exact path="/forgot-password" component={ForgotPassword} />
          {/* <PrivateRoute exact path="/map" component={LeafletMap} /> */}
          <PrivateRoute exact path="/map" component={Map} />
          <PrivateRoute exact path="/mapcluster" component={MapCluster} />
          <PrivateRoute exact path="/map2" component={LeafletMap} />
        </Switch>
      </AuthProvider>
      </Router>

        
        
        </Container>
      
      
    
    

  );
}

export default App;
