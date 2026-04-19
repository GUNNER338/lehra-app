import { Request, Response, NextFunction } from 'express';
import { HTTP_STATUS } from '../constants/app.constants';

/**
 * Global error handling middleware
 */
export const errorMiddleware = (
  err: any,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  console.error('[Error Middleware Caught]:', err);
  console.error('[Error Stack]:', err.stack);

  const status = err.status || HTTP_STATUS.INTERNAL_SERVER_ERROR;
  const message = err.message || 'Something went wrong on the server';

  res.status(status).json({
    error: message,
    status,
  });
};
