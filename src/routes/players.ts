import { Router, Request, Response } from 'express'; 
import * as playersFlow from '../flows/players';
import { asyncMiddleware } from '../utils/middlewares';

const players = Router();

async function getFriendCode(req: Request, res: Response) {
  const code = await playersFlow.getFriendCode(req.params.playerId);
  return res.send({ code });
}

players.get('/code/:playerId', asyncMiddleware(getFriendCode));

export { players };
