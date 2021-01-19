import React from 'react';
import clsx from 'clsx';
import { makeStyles } from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';
import Button from '@material-ui/core/Button';
import List from '@material-ui/core/List';
import Divider from '@material-ui/core/Divider';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import InboxIcon from '@material-ui/icons/MoveToInbox';
import MailIcon from '@material-ui/icons/Mail';
import { Link, useHistory } from "react-router-dom"

const useStyles = makeStyles({
  list: {
    width: 250,
  },
  fullList: {
    width: 'auto',
  },
});

export default function AppDrawer() {
  const classes = useStyles();
  const history = useHistory()
  const [state, setState] = React.useState({
    top: false,
    left: false,
    bottom: false,
    right: false,
  });

  const toggleDrawer = (anchor, open) => (event) => {
    if (event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
      return;
    }

    setState({ ...state, [anchor]: open });
  };
  
  const handleBarChart=() =>
  {
    
    history.push("/analytics/barchart")
  }
  
  const handleDoughnutChart1=() =>
  {
    
    history.push("/analytics/doughnutchart1")
  }
  const handleDoughnutChart2=() =>
  {
    
    history.push("/analytics/doughnutchart2")
  }
  const list = (anchor) => (
    <div
      className={clsx(classes.list, {
        [classes.fullList]: anchor === 'top' || anchor === 'bottom',
      })}
      role="presentation"
      onClick={toggleDrawer(anchor, false)}
      onKeyDown={toggleDrawer(anchor, false)}
    >
      
          <ListItem button key="BarChart">
            <ListItemIcon> <MailIcon /></ListItemIcon>
            <ListItemText primary="Partners in each Category"onClick={handleBarChart}/>
          </ListItem>
        
      <Divider />
      <ListItem button key="DoughnutChart1">
            <ListItemIcon> <MailIcon /></ListItemIcon>
            <ListItemText primary="Data on Partners"onClick={handleDoughnutChart1}/>
          </ListItem>
      
      <Divider />
      <ListItem button key="DoughnutChart2">
            <ListItemIcon> <MailIcon /></ListItemIcon>
            <ListItemText primary="Insurances Bought"onClick={handleDoughnutChart2}/>
          </ListItem>
      
      <Divider />
        
    </div>
  );

  return (
    <div>
      {['left', 'right', 'top', 'bottom'].map((anchor) => (
        <React.Fragment key={anchor}>
          <Button onClick={toggleDrawer(anchor, true)}>{anchor}</Button>
          <Drawer anchor={anchor} open={state[anchor]} onClose={toggleDrawer(anchor, false)}>
            {list(anchor)}
          </Drawer>
        </React.Fragment>
      ))}
    </div>
  );
}