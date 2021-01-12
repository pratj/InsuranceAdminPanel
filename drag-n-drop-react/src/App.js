import {Container} from 'react-bootstrap'
import Signup from './components/Signup'
import Login from './components/Login'
import { AuthProvider } from "./contexts/AuthContext"
import { BrowserRouter as Router, Switch, Route } from "react-router-dom"
import Dashboard from "./Dashboard"
import PrivateRoute from './PrivateRoute'
import ForgotPassword from "./components/ForgotPassword"
import Analytics from './Analytics';
function App() {

    return (
    
    
      
      <Container >
        
      <Router>
      <AuthProvider>
        <Switch>
          <Route path="/signup" component={Signup} />
          <PrivateRoute exact path="/" component={Dashboard} />
          <PrivateRoute path="/analytics" exact component={Analytics}></PrivateRoute>
          <Route exact path="/login" component={Login} />
          <Route exact path="/forgot-password" component={ForgotPassword} />
        </Switch>
      </AuthProvider>
      </Router>

        
        
        </Container>
      
      
    
    

  );
}

export default App;
