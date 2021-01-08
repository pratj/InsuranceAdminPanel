import './App.css';
import DragNDrop from './DragNDrop';
import styled from '@emotion/styled';
import AppBar from './AppBar'

function App() {

  const Title= styled.h1`
  color: #111; font-family: 'Helvetica Neue', sans-serif; font-size: 75px; 
  font-weight: bold; letter-spacing: -1px; line-height: 1; text-align: center;

  &:hover{
    
        color: brown;
        transition: .is ease-in all;
    
  `
  return (
    <div className="app">
      <AppBar/>
      
      <DragNDrop/>
    </div>
  );
}

export default App;
