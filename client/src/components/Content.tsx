import { Box } from '@material-ui/core';
import AppBar from '@material-ui/core/AppBar';
import CssBaseline from '@material-ui/core/CssBaseline';
import IconButton from '@material-ui/core/IconButton';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import MenuIcon from '@material-ui/icons/Menu';
import CameraIcon from '@material-ui/icons/PhotoCamera';
import { useRedirect, useRoutes } from 'hookrouter';
import React from 'react';
import LiveCams from './cams/LiveCams';
import styles from './Content.module.css';

enum View {
  'cams',
  'snapshots',
  'player',
}

export default function Content() {
  const [anchorEl, setAnchorEl] = React.useState<Element | null>(null);

  useRedirect('/', '/cams');
  const routeResult = useRoutes({
    '/cams': () => <LiveCams />,
    '/player': () => <div>player Coming soon</div>,
    '/snapshots': () => <div>snapshot Coming soon</div>,
    '/snapshots/:id': ({ id }) => <div>{id}</div>,
  });

  const onMenuOpen = (event: React.MouseEvent) => setAnchorEl(event.currentTarget);
  const onMenuClose = () => setAnchorEl(null);

  const onMenuItemClick = (view: View) => {
    setAnchorEl(null);
    window.history.pushState(null, '', View[view]);
  };

  return (
    <>
      <CssBaseline />
      <AppBar position="fixed">
        <Toolbar>
          <IconButton
            edge="start"
            aria-controls="simple-menu"
            aria-haspopup="true"
            className={styles.menuButton}
            onClick={onMenuOpen}
          >
            <MenuIcon />
          </IconButton>
          <Menu id="simple-menu" anchorEl={anchorEl} keepMounted open={Boolean(anchorEl)} onClose={onMenuClose}>
            <MenuItem onClick={() => onMenuItemClick(View.cams)}>Live Cams</MenuItem>
            <MenuItem onClick={() => onMenuItemClick(View.snapshots)}>Snapshots</MenuItem>
            <MenuItem onClick={() => onMenuItemClick(View.player)}>Player</MenuItem>
          </Menu>
          <CameraIcon className={styles.icon} />
          <Typography variant="h6" noWrap>
            DVR163 Dashboard
          </Typography>
        </Toolbar>
      </AppBar>
      <main>
        <Box pt={10}>{routeResult || 'Not found'}</Box>
      </main>
    </>
  );
}
