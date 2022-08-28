import React from 'react';
import { Slide } from '@mui/material';
//import Container from '@mui/material/Container';
import classes from './Cardcontainer.module.css';

function Cardcontainer(props) {
  return (
    <Slide direction="up" in={true} mountOnEnter unmountOnExit>
        <div
            className={classes.container}
        >
          {props.children}
        </div>
    </Slide>
  );
}

export default Cardcontainer;






