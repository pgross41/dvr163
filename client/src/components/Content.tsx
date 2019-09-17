import AppBar from '@material-ui/core/AppBar';
import CssBaseline from '@material-ui/core/CssBaseline';
import IconButton from '@material-ui/core/IconButton';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import MenuIcon from '@material-ui/icons/Menu';
import CameraIcon from '@material-ui/icons/PhotoCamera';
import React from 'react';
import CamView from './CamView';
import styles from './Content.module.css';

export default function Content() {

  const [anchorEl, setAnchorEl] = React.useState<Element | null>(null);

  function handleClick(event: React.MouseEvent) {
    setAnchorEl(event.currentTarget);
  }

  function handleClose() {
    setAnchorEl(null);
  }

  return (<>
    <CssBaseline />
    <AppBar position="fixed">
      <Toolbar>
        <IconButton edge="start" aria-controls="simple-menu" aria-haspopup="true" className={styles.menuButton} onClick={handleClick}>
          <MenuIcon />
        </IconButton>
        <Menu
          id="simple-menu"
          anchorEl={anchorEl}
          keepMounted
          open={Boolean(anchorEl)}
          onClose={handleClose}
        >
          <MenuItem onClick={handleClose}>Cams</MenuItem>
          <MenuItem onClick={handleClose}>Snapshots</MenuItem>
          <MenuItem onClick={handleClose}>Download?</MenuItem>
        </Menu>
        <CameraIcon className={styles.icon} />
        <Typography variant="h6" noWrap>
          DVR163 Dashboard
        </Typography>
      </Toolbar>
    </AppBar>
    <main>
      <CamView />
    </main>
  </>);
}