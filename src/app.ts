import "express-async-errors";
import express, { Request, Response, NextFunction } from "express";
import cookieSession                                from "cookie-session";
import { routes }                                   from "./routes";
import { IError }                                   from "./types";
import createError                                  from "http-errors";

const app = express();

app.use(express.json());
app.use(cookieSession({
  name    : "sid",
  keys    : [ "keyboard", "cat" ],
  signed  : false,
  secure  : false,
  httpOnly: true
}));

app.use("/", routes);

app.use((_, __, next) => {
  return next(createError(404, "Route not found"));
});

app.use((error: IError, req: Request, res: Response, next: NextFunction) => {
  const { status = 500, message = "Something went wrong" } = error;

  res.status(status).send({ error: message });
});

export { app };