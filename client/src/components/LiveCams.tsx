import Button from '@material-ui/core/Button';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import Pause from '@material-ui/icons/Pause';
import PlayArrow from '@material-ui/icons/PlayArrow';
import SystemUpdateAltIcon from '@material-ui/icons/SystemUpdateAlt';
import React from 'react';
import styles from './LiveCams.module.css';

const cams = [{ title: 'Living Room' }, { title: 'Garage' }, { title: 'Basement' }, { title: 'Front Porch' }];

interface Props {}

export default function LiveCams(props: Props) {
  return (
    <main>
      <Container className={styles.cardGrid} maxWidth="xl">
        <Grid container spacing={2}>
          {cams.map((cam, idx) => (
            <Grid item key={idx} sm={12} md={6}>
              <Card className={styles.card}>
                <CardContent className={styles.cardContent}>
                  <Typography variant="h5" component="h2">
                    {cam.title}
                  </Typography>
                </CardContent>
                <CardMedia
                  className={styles.cardMedia}
                  image="https://source.unsplash.com/random/"
                  title="Image title"
                />
                <CardActions>
                  <Button variant="contained" size="small" color="primary">
                    {Math.random() >= 0.5 ? <Pause /> : <PlayArrow />}
                  </Button>
                  <Grid container justify="flex-end">
                    <Button size="small" color="default" title="Save Screenshot">
                      <SystemUpdateAltIcon />
                    </Button>
                  </Grid>
                </CardActions>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Container>
    </main>
  );
}
