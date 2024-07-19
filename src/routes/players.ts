import { Router, Request, Response } from 'express'; 
import * as playersFlow from '../flows/players';
import { asyncMiddleware } from '../utils/middlewares';
import { playerSchema } from '../types/Player';

const players = Router();

async function getPlayer(req: Request, res: Response) {
  const shouldRegister = req.query.shouldRegister === "True";
  const player = await playersFlow.getPlayer(req.params.playerId, shouldRegister);
  return res.send({ player });
}

async function updatePlayer(req: Request, res: Response) {
  const player = playerSchema.parse(req.body.playerInfo);
  const status = await playersFlow.updatePlayer(player);
  return res.send({ status });
}

players.get('/:playerId', asyncMiddleware(getPlayer));
players.post('/:playerId', asyncMiddleware(updatePlayer));

export { players };
