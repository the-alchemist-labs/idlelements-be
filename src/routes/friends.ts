import { Router, Request, Response } from 'express';
import * as friendsFlow from '../flows/friends';
import { asyncMiddleware } from '../utils/middlewares';

const friends = Router();

async function getFriends(req: Request, res: Response) {
  const friends = await friendsFlow.getFriends(req.params.playerId);
  return res.send({ friends });
}

async function getPendingFriendRequests(req: Request, res: Response) {
  const requests = await friendsFlow.getPendingFriendRequests(req.params.playerId);
  return res.send({ requests });

}

async function sendFriendRequest(req: Request, res: Response) {
  const { fromPlayerId } = req.params;
  const { friendCode } = req.body;
  const status = await friendsFlow.sendFriendRequest(fromPlayerId, friendCode);
  return res.send(status);
}

async function handleFriendRequestRespond(req: Request, res: Response) {
  const { fromPlayerId } = req.params;
  const { requestFrom, respond } = req.body;
  const status = await friendsFlow.handleFriendRequestRespond(fromPlayerId, requestFrom, respond);
  return res.send(status);
}

friends.get('/:playerId', asyncMiddleware(getFriends));
friends.get('/requests/pending/:playerId', asyncMiddleware(getPendingFriendRequests));
friends.post('/requests/send/:fromPlayerId', asyncMiddleware(sendFriendRequest));
friends.post('/requests/respond/:fromPlayerId', asyncMiddleware(handleFriendRequestRespond));

export { friends };
