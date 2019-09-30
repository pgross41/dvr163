import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';
import React from 'react';
import Cam from './Cam';
import styles from './LiveCams.module.css';

// TODO: API
const cams = [
  { chn: '0', title: 'Living Room' },
  { chn: '1', title: 'Front Porch' },
  { chn: '2', title: 'Basement' },
  { chn: '3', title: 'Garage' },
];

interface Props {}

export default function LiveCams(props: Props) {
  return (
    <main>
      <Container className={styles.cardGrid} maxWidth="xl">
        <Grid container spacing={2}>
          {cams.map((cam) => (
            <Cam cam={cam} key={cam.chn} />
          ))}
        </Grid>
      </Container>
    </main>
  );
}
