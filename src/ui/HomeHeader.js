import { AppBar, IconButton, Toolbar } from '@mui/material';
import React from 'react';
import classes from './HomeHeader.module.css';
import MenuIcon from '@mui/icons-material/Menu';

function HomeHeader() {
  return (
    <AppBar position="absolute" className={classes.toolbar}>
        <Toolbar>
          <IconButton size="large" color="inherit">
            <MenuIcon />
          </IconButton>
          <div><p>HOME</p></div>
        </Toolbar>
    </AppBar>
  );
}

export default HomeHeader;