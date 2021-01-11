
import DragNDrop from './DragNDrop';
import styled from '@emotion/styled';
import AppBar from './AppBar'
import {Container} from 'react-bootstrap'
import Signup from './components/Signup'
import Login from './components/Login'
import { AuthProvider } from "./contexts/AuthContext"
import { BrowserRouter as Router, Switch, Route } from "react-router-dom"
import Dashboard from "./Dashboard"
import PrivateRoute from './PrivateRoute'
function App() {

  // const Title= styled.h1`
  // color: #111; font-family: 'Helvetica Neue', sans-serif; font-size: 75px; 
  // font-weight: bold; letter-spacing: -1px; line-height: 1; text-align: center;

  // &:hover{
    
  //       color: brown;
  //       transition: .is ease-in all;
    
  // `
  return (
    
    
      
      <Container >
        
      <Router>
      <AuthProvider>
        <Switch>
          <Route path="/signup" component={Signup} />
          <PrivateRoute exact path="/" component={Dashboard} />
          <Route exact path="/login" component={Login} />
        </Switch>
      </AuthProvider>
      </Router>

        
        
        </Container>
      // <AppBar/>      <DragNDrop/> 
      
    
    

  );
}

export default App;
