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
import LiveCams from './LiveCams';
import styles from './Content.module.css';
import { Box } from '@material-ui/core';
import { useRoutes, useRedirect, A } from 'hookrouter';

enum View {
  "cams",
  "snapshots",
  "player",
}

export default function Content() {

  const [anchorEl, setAnchorEl] = React.useState<Element | null>(null);
  const [activeView, setActiveView] = React.useState(View.cams);

  useRedirect('/', '/cams');
  const routeResult = useRoutes({
    '/cams': () => <LiveCams />,
    '/snapshots': () => <div>Coming soon</div>,
    '/snapshots/:id': ({ id }) => <div>{id}</div>,
    '/player': () => <div>Coming soon</div>,
  });

  const onMenuOpen = (event: React.MouseEvent) => setAnchorEl(event.currentTarget);
  const onMenuClose = () => setAnchorEl(null);

  const onMenuItemClick = (event: React.MouseEvent, view: View) => {
    setAnchorEl(null);
    setActiveView(view);
  }

  return (<>
    <CssBaseline />
    <AppBar position="fixed">
      <Toolbar>
        <IconButton edge="start" aria-controls="simple-menu" aria-haspopup="true" className={styles.menuButton} onClick={onMenuOpen}>
          <MenuIcon />
        </IconButton>
        <Menu
          id="simple-menu"
          anchorEl={anchorEl}
          keepMounted
          open={Boolean(anchorEl)}
          onClose={onMenuClose}
        >
          <MenuItem onClick={(event: React.MouseEvent) => onMenuItemClick(event, View.cams)} containerElement={A} to="/cams">
            Live Cams
          </MenuItem>
          <MenuItem onClick={(event: React.MouseEvent) => onMenuItemClick(event, View.snapshots)}>
            <A href="/snapshots">Snapshots</A>
          </MenuItem>
          <MenuItem onClick={(event: React.MouseEvent) => onMenuItemClick(event, View.player)}>
            <A href="/player">Player</A>
          </MenuItem>
        </Menu>
        <CameraIcon className={styles.icon} />
        <Typography variant="h6" noWrap>
          DVR163 Dashboard
        </Typography>
      </Toolbar>
    </AppBar>
    <main>
      <Box pt={10}>
        {routeResult || "Not found"}
        {/* {activeView === View.cams && <LiveCams />} */}
      </Box>
    </main>
  </>);
}