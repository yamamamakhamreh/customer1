import { Request, Response, NextFunction } from 'express';
import { AppError } from '../errors/AppError.js';

// Custom Error handler middleware 
export function customErrorHandler(err: any, req: Request, res: Response, next: NextFunction) {
    if (err instanceof AppError) {
        res.status(err.httpCode).json({ success: false, error: err.message });
    } else {
        // Handle other errors here
        console.error("Error :( => ", err);
        res.status(500).json({ success: false, error: "Something went wrong" });
    }
}

// default error handler
export function DefaultErrorHandler(err: any, req: Request, res: Response, next: NextFunction) {
    res.locals.message = err.message;
    res.locals.error = req.app.get('env') === 'development' ? err : {};

    // render the error page
    console.log("Catch Error :(( => ", err);
    res.status(err.status || 500).send({ error: "Internal server error" });
}