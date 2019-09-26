import express = require('express');
import { error } from '../dbgConsole';
import nvrService from '../nvr/nvrService';

export default async (req: express.Request, res: express.Response) => {
  try {
    res.send(await nvrService.getConfig());
  } catch (e) {
    error(e);
    res.send(e.message);
  }
};
