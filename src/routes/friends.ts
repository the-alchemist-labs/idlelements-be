import { Router, Request, Response } from 'express';
import * as friendsFlow from '../flows/friends';
import { asyncMiddleware } from '../utils/middlewares';

const friends = Router();

async function getFriendRequests(req: Request, res: Response) {
  const friendRequests = await friendsFlow.getFriendRequests(req.params.addressee);
  return res.send(friendRequests);
}

friends.get('/requests/:addressee', asyncMiddleware(getFriendRequests));

export { friends };
