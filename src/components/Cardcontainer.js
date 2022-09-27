import React from 'react';
import { Fab, Popper, Slide } from '@mui/material';
//import Container from '@mui/material/Container';
import classes from './Cardcontainer.module.css';
import CodeIcon from '@mui/icons-material/Code';

let code = 
`int main(){
  cout << "No Code here Yet." << endl;
}`;

function Cardcontainer(props) {
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [open, setOpen] = React.useState(false);
  const [placement, setPlacement] = React.useState();
  const handleClick = (newPlacement) => (event) => {
    setAnchorEl(event.currentTarget); 
    setOpen((prev) => placement !== newPlacement || !prev);
    setPlacement(newPlacement); 
  };
  return (
    <Slide direction="up" in={true} mountOnEnter unmountOnExit>
        <div
            className={classes.container}
        >
          {props.children}
          <Fab size="medium" color="secondary" aria-label='code' className={classes.codeBtn} onClick={handleClick('top-start')}>
            <CodeIcon />
          </Fab>
          <Popper
            open={open}
            anchorEl={anchorEl}
            placement={placement}
            sx={{
              backgroundColor: '#282c3c',
              border: 1,
              borderColor: 'turquoise',
              color: 'white',
              borderRadius: 2,
              padding: `${1}%`,
            }}
            >
            <code><pre>{code}</pre></code>
          </Popper>
              
        </div>
    </Slide>
  );
}

export function setCode(newCode){
  code = newCode;
}

export default Cardcontainer;






