import express = require('express');

export default (req: express.Request, res: express.Response) => {
    res.send({testValue: 'snapshot'});
};
