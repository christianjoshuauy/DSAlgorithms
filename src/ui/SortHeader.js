import { AppBar, Button, FormControl, IconButton, InputLabel, MenuItem, Select, Slider, Toolbar } from '@mui/material';
import React, { useState } from 'react';
import classes from './SortHeader.module.css';
import MenuIcon from '@mui/icons-material/Menu';
import PlayArrowIcon from '@mui/icons-material/PlayArrow';

function SortHeader(props) {
  const [type, setType] = useState();
  const [sz, setSz] = useState();
  const [tm, setTm] = useState();

  const handleChange = (event) => {
    setType(event.target.value);
    props.changeType(event.target.value);
  };

  const handleChange2 = (event) => {
    setSz(event.target.value);
    props.changeArray(event.target.value);
  }

  const handleChange3 = (event) => {
    setTm(event.target.value);
    props.changeTime(event.target.value);
  }

  return (
    <AppBar position="absolute" className={classes.toolbar}>
        <Toolbar>
          <IconButton size="large" color="inherit">
            <MenuIcon />
          </IconButton>
          <div><p>SORT</p></div>
          <div className={classes.slidiv}>
            <Button variant="outlined" sx={{borderColor: "inherit", color: "inherit"}} onClick={props.onReset}>Reset</Button>
            <FormControl variant="standard" sx={{ m: 1, minWidth: 120 }}>
              <InputLabel id="demo-simple-select-label" sx={{color: "inherit"}}>Type</InputLabel>
              <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select" 
                value={type}
                label="Type"
                onChange={handleChange}
                sx={{color: "inherit"}}
              >
                <MenuItem value={undefined}></MenuItem>
                <MenuItem value={1}>Bubble Sort</MenuItem>
                <MenuItem value={2}>Merge Sort</MenuItem>
                <MenuItem value={3}>Selection Sort</MenuItem>
                <MenuItem value={4}>Insertion Sort</MenuItem>
                <MenuItem value={5}>Quick Sort</MenuItem>
                <MenuItem value={6}>Heap Sort</MenuItem>
              </Select>
            </FormControl>
            <div className={classes.sliderlabel2}>Speed</div>
            <Slider size="small" className={classes.slider} sx={{color: 'white'}} value={tm} min={1} max={10} defaultValue={3} onChange={handleChange3} >
            </Slider>
            <div className={classes.sliderlabel}>Array Size</div>
            <Slider size="small" className={classes.slider} sx={{color: 'white'}} value={sz} min={50} max={310} defaultValue={200} onChange={handleChange2} >
            </Slider>
            <IconButton onClick={props.onPlay}>
              <PlayArrowIcon className={classes.play} sx={{color: 'white'}} />
            </IconButton>
          </div>
        </Toolbar>
    </AppBar>
  );
}

export default SortHeader;