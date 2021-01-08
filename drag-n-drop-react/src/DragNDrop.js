import React, {useState, useEffect} from 'react'
import {useDropzone} from 'react-dropzone';
import axios from 'axios'
import Button from '@material-ui/core/Button';
import { makeStyles } from '@material-ui/core/styles';
import Icon from '@material-ui/core/Icon';
import SendRoundedIcon from '@material-ui/icons/SendRounded';
import Accordion from '@material-ui/core/Accordion';
import AccordionDetails from '@material-ui/core/AccordionDetails';
import AccordionSummary from '@material-ui/core/AccordionSummary';
import Typography from '@material-ui/core/Typography';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';




import * as s from './DragNDrop.styles';

const useStyles = makeStyles((theme) => ({
    button: {
      margin: theme.spacing(1),
    },
  }));
  const useStylesAccordion = makeStyles((theme) => ({
    root: {
      width: '100%',
    },
    heading: {
      fontSize: theme.typography.pxToRem(15),
      flexBasis: '33.33%',
      flexShrink: 0,
    },
    secondaryHeading: {
      fontSize: theme.typography.pxToRem(15),
      color: theme.palette.text.secondary,
    },
  }));


function DragNDrop() {
    const classes = useStyles();
    const classesAccordion = useStylesAccordion();

    const [expanded, setExpanded] = React.useState(false);
    const handleChange = (panel) => (event, isExpanded) => {
      setExpanded(isExpanded ? panel : false);
    };

    const { getRootProps, getInputProps } = useDropzone();
    const [config, setConfig] = useState()
    const [highlighted, setHighlighted] = useState(false);
    
    
    
    
    ondragenter=(e)=>{
        setHighlighted(true)
        console.log("DRAG ENTER")
    }
    ondragleave=(e)=>{
        setHighlighted(false)
        console.log("DRAG LEAVE")
    }

    ondragover = (e) => {
        e.preventDefault()
        setHighlighted(true)
    }

    ondrop = (e) => {
        e.preventDefault()
        //console.log(e.dataTransfer.files)
        setHighlighted(false)
        Array.from(e.dataTransfer.files)
        .filter((file) => file.type === "application/json" && file.name === "insurance_config.json")
        .forEach(async (file) => {
            const text = await file.text()
            console.log(text)
            setConfig(text)
        })
    }

    const sendConfigData = () => {
        (
            typeof config !== 'undefined'
             &&
            axios.post("https://reqres.in/api/users", config).then((response) => {
                console.log("Config Data Sent")
                console.log(response)
            })
        )
    }

    useEffect(() => {
        (
            typeof config !== 'undefined'
             &&
            console.log("Changes in File Detected")
            // axios.post("https://reqres.in/api/users", config).then((response) => {
            //     console.log("Config Data Sent")
            //     console.log(response)
            // })
        )
    }, [config])

    return (
        <s.DragDrop style={{marginTop:"90px"}}>
            <small style={{color:"gray"}}>*Note: File name should be 'insurance_config.json'</small>
            <s.DragContainer {...getRootProps({className: 'dropzone'})} highlighted={highlighted} >
                <input {...getInputProps()}/> 
                <p style={{marginTop:"90px"}}>Drag 'n' drop some files here, or click to select files</p>
            </s.DragContainer>
            {/* <p>{config}</p> */}


            <Accordion expanded={expanded === 'panel1'} onChange={handleChange('panel1')}>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel1bh-content"
          id="panel1bh-header"
        >
          <Typography className={classes.heading}>Data Sent</Typography>
          <Typography className={classes.secondaryHeading}>   JSON Config file</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Typography>
          {config}
          </Typography>
        </AccordionDetails>
      </Accordion>




            
            <Button
        variant="outlined" 
        color="primary"
        className={classes.button}
        onClick={sendConfigData}
        endIcon={<SendRoundedIcon/>}
      >
        Send Config Data
      </Button>
        </s.DragDrop>
        
    )
}

export default DragNDrop
