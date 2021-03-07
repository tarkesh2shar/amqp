import { Application } from "express";
import consola         from "consola";
import { connectDB }   from "./config/db";

export const start = async (app: Application) => {
  await connectDB();
  const PORT = 5000;
  app.listen(PORT);
  consola.success(`App on 5k`);
};