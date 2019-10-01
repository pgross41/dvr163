import { Box, CardMedia, CircularProgress } from '@material-ui/core';
import Button from '@material-ui/core/Button';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import Pause from '@material-ui/icons/Pause';
import PlayArrow from '@material-ui/icons/PlayArrow';
import React from 'react';
import styles from './Cam.module.css';
import ScreenshotButton from './ScreenshotButton';

// TODO: Re-use GwEnvloadScreenAttrs
interface Props {
  cam: {
    chn: string;
    title?: string;
  };
}

const now = () => new Date().toLocaleTimeString();

const fullscreen = (img: HTMLImageElement | null) => {
  if (img) {
    img.requestFullscreen();
  }
};

export default function Cam(props: Props) {
  const [isLoading, setIsLoading] = React.useState(false);
  const [isLive, setIsLive] = React.useState(false);
  const [isFail, setIsFail] = React.useState(false);
  const [lastUpdated, setLastUpdated] = React.useState(now());
  const ref = React.useRef<HTMLImageElement>(null);
  const cam = props.cam;
  const image = isLive ? `/api/stream/mjpeg/${cam.chn}` : `/api/snapshot/${cam.chn}`;
  const TogglePlay = () => (isLive ? <Pause /> : <PlayArrow />);

  React.useEffect(() => {
    if (ref && ref.current) {
      ref.current.onload = () => {
        setLastUpdated(now());
        if (isLive) {
          console.log(`Loaded ${cam.title}`);
          setIsLoading(false);
          setIsFail(false);
        }
      };
      ref.current.onerror = () => {
        console.error(`Error loading ${cam.title}`);
        setIsLoading(false);
        setIsLive(false);
        setIsFail(true);
      };
    }
  });

  return (
    <Grid item sm={12} md={6}>
      <Card className={styles.card}>
        <CardContent className={styles.cardContent}>
          <Typography variant="h5" component="h2">
            {cam.title}
          </Typography>
        </CardContent>
        <CardMedia className={styles.camContainer}>
          <img
            className={styles.camImg}
            src={image}
            alt={cam.title}
            ref={ref}
            onDoubleClick={() => fullscreen(ref.current)}
          />
        </CardMedia>
        <CardActions>
          <Button
            disabled={isLoading}
            variant="contained"
            size="small"
            color="primary"
            onClick={() => {
              setIsLive(!isLive);
              setIsLoading(!isLive);
            }}
          >
            <TogglePlay />
          </Button>
          <Box width="100%">
            {isLive && !isLoading ? (
              <Typography color="inherit" variant="h6" style={{ textShadow: '#f44336 0 0 2px' }}>
                Live
              </Typography>
            ) : (
              <Typography color={isFail ? 'error' : 'inherit'}>As of {lastUpdated}</Typography>
            )}
          </Box>
          <Box>{isLoading && <CircularProgress size={25} color="inherit" />}</Box>
          <ScreenshotButton getImg={() => ref.current} title={cam.title} />
        </CardActions>
      </Card>
    </Grid>
  );
}
