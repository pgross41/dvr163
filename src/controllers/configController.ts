import express = require('express');
import nvrService from '../services/nvrService';

export default async (req: express.Request, res: express.Response) => {
  res.send(await nvrService.getDevinfo());
};
