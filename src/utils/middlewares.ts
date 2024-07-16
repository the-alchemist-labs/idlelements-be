import { Request, Response, NextFunction, RequestHandler } from 'express';

export function asyncMiddleware(fn: RequestHandler) {
    return (req: Request, res: Response, next: NextFunction) => {
        Promise.resolve(fn(req, res, next))
            .catch(next)
    }
}

export function errorMiddleware(error: any, _req: Request, res: Response, _next: NextFunction) {
    console.error(error.stack);

    res.status(error.status || 500).json({
        message: error.message || 'Internal Server Error',
        error,
    });
};
