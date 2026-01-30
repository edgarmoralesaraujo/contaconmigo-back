import { Response } from 'express';

export function ok(res: Response, data: any, status = 200) {
  return res.status(status).json({ data });
}
