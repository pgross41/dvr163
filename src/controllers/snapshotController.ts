import express = require('express');
import { error } from './../dbgConsole';
import nvrService from './../nvr/nvrService';

export default async (req: express.Request, res: express.Response) => {
  const channelNumber = parseInt(req.params.channelNumber, 10);
  try {
    nvrService.getSnapshot(channelNumber).pipe(res);
  } catch (e) {
    error(e);
    res.send(e.message);
  }
};
