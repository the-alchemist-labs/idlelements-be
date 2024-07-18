import { Router, Request, Response } from 'express'; 
import * as playersFlow from '../flows/players';
import { asyncMiddleware } from '../utils/middlewares';

const players = Router();

async function getPlayer(req: Request, res: Response) {
  const shouldRegister = req.query.shouldRegister === "True";
  const player = await playersFlow.getPlayer(req.params.playerId, shouldRegister);
  return res.send({ player });
}

players.get('/:playerId', asyncMiddleware(getPlayer));

export { players };
