import { Router, Request, Response } from 'express';
import * as friendsFlow from '../flows/friends';
import { asyncMiddleware } from '../utils/middlewares';

const friends = Router();

async function getFriendRequests(req: Request, res: Response) {
  const friendRequests = await friendsFlow.getFriendRequests(req.params.addressee);
  return res.send(friendRequests);
}

async function sendFriendCode(req: Request, res: Response) {
  const { fromPlayerId } = req.params;
  const { friendCode } = req.body; 
  const status = await friendsFlow.sendFriendRequest(fromPlayerId, friendCode );
  return res.send({ status });
}

friends.get('/requests/:addressee', asyncMiddleware(getFriendRequests));
friends.post('/request/:fromPlayerId', asyncMiddleware(sendFriendCode));

export { friends };
