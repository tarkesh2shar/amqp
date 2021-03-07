import { Router }     from "express";
import { authRouter } from "./auth";

const router = Router();

router.get("/health", (req, res) => res.send("Ok"));

router.use(authRouter);

export { router as routes };