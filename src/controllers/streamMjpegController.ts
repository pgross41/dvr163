import express = require('express');
import { error, log } from '../dbgConsole';
import nvrService from '../services/nvrService';

export default (req: express.Request, res: express.Response) => {
  const channelNumber = parseInt(req.params.channelNumber, 10);
  const pipe = nvrService.getMjpegStream(channelNumber).pipe(res);
  log(`stream mjpeg begin (${channelNumber})`);

  // Client quit normally
  req.on('end', () => {
    pipe.end();
    error(`stream mjpeg end (${channelNumber})`);
  });

  // Client quit unexpectedly
  req.on('close', () => {
    pipe.end();
    error(`stream mjpeg close (${channelNumber})`);
  });

  // Error occurred (including req close)
  pipe.on('error', () => {
    error(`stream mjpeg error (${channelNumber})`);
  });
};
