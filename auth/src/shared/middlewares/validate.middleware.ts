import { Request, Response, NextFunction } from 'express';
import { Schema } from 'joi';

export function validate(schema: Schema) {
  return (req: Request, _res: Response, next: NextFunction) => {
    const { error } = schema.validate(req.body);
    if (error) {
      return next(new Error(error.details[0].message));
    }
    next();
  };
}
