import { AppBar, Button, IconButton, MenuItem, Select, TextField, Toolbar } from "@mui/material";
import React, { useState } from "react";
import classes from "./TreesHeader.module.css";
import MenuIcon from "@mui/icons-material/Menu";
import PlayArrowIcon from "@mui/icons-material/PlayArrow";

function TreesHeader(props) {
  const [type, setType] = useState("");
  const [value, setValue] = useState();
  
  const handleChange = (event) => {
    setType(event.target.value);
    props.changeType(event.target.value);
  };

  const handleChange2 = (event) => {
    setValue(event.target.value);
    props.changeValue(parseInt(event.target.value, 10));
  };

  return (
    <AppBar position="absolute" className={classes.toolbar}>
      <Toolbar>
        <IconButton size="large" color="inherit">
          <MenuIcon />
        </IconButton>
        <div>
          <p>TREES</p>
        </div>
        <div className={classes.slidiv}>
          <Button variant="outlined" sx={{borderColor: "inherit", color: "inherit"}} onClick={props.onReset}>Reset</Button>
          <Select
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            value={type}
            label="Type"
            onChange={handleChange}
            sx={{ color: "inherit" }}
            className={classes.select}
          >
            <MenuItem value={undefined}></MenuItem>
            <MenuItem value={1}>Insert</MenuItem>
            <MenuItem value={2}>Delete</MenuItem>
            <MenuItem value={3}>Find</MenuItem>
            <MenuItem value={4}>Preorder Traversal</MenuItem>
            <MenuItem value={5}>Inorder Traversal</MenuItem>
            <MenuItem value={6}>Postorder Traversal</MenuItem>
            <MenuItem value={7}>Breadth-First Traversal</MenuItem>
          </Select>
          <TextField
            variant="outlined"
            type="number"
            label="Value"
            value={value}
            className={classes.textbox}
            onChange={handleChange2}
          />
          <IconButton onClick={props.onPlay}>
            <PlayArrowIcon className={classes.play} sx={{ color: "white" }} />
          </IconButton>
        </div>
      </Toolbar>
    </AppBar>
  );
}

export default TreesHeader;
