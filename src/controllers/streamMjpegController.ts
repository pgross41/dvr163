import express = require('express');
import nvrService from '../services/nvrService';

export default (req: express.Request, res: express.Response) => {
  // TODO: get channel number
  const pipe = nvrService.getMjpegStream(1).pipe(res);

  // Client quit normally
  req.on('end', () => {
    pipe.end();
  });

  // Client quit unexpectedly
  req.on('close', () => {
    pipe.end();
  });

  // Error occurred (including req close)
  pipe.on('error', () => {
    /* */
  });
};
