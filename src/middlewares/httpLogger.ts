import type { NextFunction, Request, Response } from "express";

import { TkMessage } from "../utils/tkMessage.js";

export const httpLogger = (req: Request, res: Response, next: NextFunction) => {
  const start = performance.now();
  res.on("finish", () => {
    const ms = Math.round(performance.now() - start);
    let routePath: string = req.route ? req.baseUrl + req.route.path :  req.originalUrl;
    TkMessage.http(req.method, res.statusCode, routePath, ms);
  }); // res'teki finish eventini yakalayınca çalışacak
  next();
};


