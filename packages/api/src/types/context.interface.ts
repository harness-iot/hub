import { Response, Request } from 'express';

import { ApiAuthDto } from '../api/auth/auth.dto';

export interface ExpressContext {
  req: Request;
  res: Response;
  auth?: ApiAuthDto;
}
