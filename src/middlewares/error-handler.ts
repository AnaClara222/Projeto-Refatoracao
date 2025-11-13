import { Request, Response, NextFunction } from "express";

import httpStatus from "http-status";

type AppError = Error & {
  type: string;
};

const errorStatusMap: Record<string, number> = {
  NotFound: httpStatus.NOT_FOUND,
  Conflict: httpStatus.CONFLICT,
  BadRequest: httpStatus.BAD_REQUEST,
  UnprocessableEntity: httpStatus.UNPROCESSABLE_ENTITY,
  Forbidden: httpStatus.FORBIDDEN,
};

export default function errorHandlingMiddleware(
  error: Error | AppError,
  req: Request,
  res: Response,
  next: NextFunction
) {
  console.error(error);

  const { name, message } = error as AppError;
  const status = errorStatusMap[name] || httpStatus.INTERNAL_SERVER_ERROR;

  return res.status(status).send(message || "Internal Server Error");
}
