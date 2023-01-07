import {getAuth} from 'firebase/auth';
import { app } from '../Firebase config/firebase';
import 'firebase/auth';
import {User} from "@firebase/auth"
import { NextApiRequest, NextApiResponse } from 'next';

type NextApiRequestWithUser = NextApiRequest & { user: User | null };

async function authMiddleware(req: NextApiRequest, res: NextApiResponse, next: Function) {
 
    const auth = getAuth(app)
 
 const user = await auth.currentUser;
 (req as NextApiRequestWithUser).user = user;
  next();
}

export default authMiddleware;