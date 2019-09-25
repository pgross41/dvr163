import express = require('express');
import { error } from '../dbgConsole';
import nvrService from '../services/nvrService';

export default async (req: express.Request, res: express.Response) => {
  try {
    const config = await nvrService.getDevinfo();
    config.screens = [];
    const camCount = parseInt(config.camcnt, 10);
    for (let i = 0; i < camCount; i++) {
      config.screens.push(await nvrService.getScreen(i));
    }
    res.send(config);
  } catch (e) {
    error(e);
    res.send(e.message);
  }
};
