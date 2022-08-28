import { AppBar, Button, IconButton, MenuItem, Select, TextField, Toolbar } from '@mui/material';
import React, { useState } from 'react';
import classes from './LinkedlistHeader.module.css';
import MenuIcon from '@mui/icons-material/Menu';
import PlayArrowIcon from '@mui/icons-material/PlayArrow';

function LinkedlistHeader(props) {
  const [type, setType] = useState();
  const [value, setValue] = useState();
  const [index, setIndex] = useState();

  const handleChange = (event) => {
    setType(event.target.value);
    props.changeType(event.target.value);
  };

  const handleChange2 = (event) => {
    setValue(event.target.value);
    props.changeValue(event.target.value);
  };

  const handleChange3 = (event) => {
    setIndex(event.target.value);
    props.changeIndex(event.target.value);
  };
 
  return (
    <AppBar position="absolute" className={classes.toolbar}>
        <Toolbar>
          <IconButton size="large" color="inherit">
            <MenuIcon />
          </IconButton>
          <div><p>LINKED LIST</p></div>
          <div className={classes.slidiv}>
            <Button variant="outlined" sx={{borderColor: "inherit", color: "inherit"}} onClick={props.onReset}>Reset</Button>
            <div className={classes.sliderlabel}>CHOOSE</div>
            <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select" 
                value={type}
                label="Type"
                onChange={handleChange}
                sx={{color: "inherit"}}
                className={classes.select}
              >
                <MenuItem value={undefined}></MenuItem>
                <MenuItem value={1}>Add at Head</MenuItem>
                <MenuItem value={2}>Add at Index</MenuItem>
                <MenuItem value={3}>Add at Tail</MenuItem>
                <MenuItem value={4}>Delete at Index</MenuItem>
                <MenuItem value={5}>Reverse Linked List</MenuItem>
              </Select>
              <TextField variant='outlined' type="number" label="Value" value={value} className={classes.textbox} onChange={handleChange2} />
              <TextField variant='outlined' type="number" label="Index" value={index} className={classes.textbox} onChange={handleChange3} />
            <IconButton onClick={props.onPlay}>
              <PlayArrowIcon className={classes.play} sx={{color: 'white'}} />
            </IconButton>
          </div>
        </Toolbar>
    </AppBar>
  );
}

export default LinkedlistHeader;