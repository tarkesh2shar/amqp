import { Router }          from "express";
import { User }            from "../models/User";
import createError         from "http-errors";
import { guest }           from "../middlewares/guest";
import { isAuthenticated } from "../middlewares/isAuthenticated";

const router = Router();

router.get("/me", (req, res) => {
  res.send(req.session?.user || null);
});

router.post("/signup", guest, async (req, res, next) => {
  const { email, password }: { email: string, password: string } = req.body;

  if (!email || !password) {
    return next(createError(422, "Missing email or password"));
  }

  const exists = await User.exists({ email });
  if (exists) {
    return next(createError(409, "User already exists"));
  }

  const user = await User.create({ email, password });

  req.session = { user };

  res.send(user);
});

router.post("/signin", guest, async (req, res, next) => {
  const { email, password }: { email: string, password: string } = req.body;

  if (!email || !password) {
    return next(createError(422, "Missing email or password"));
  }

  const user = await User.findOne({ email });
  if (!user) {
    return next(createError(404, "User does not exist"));
  }

  const match = await user.comparePassword(password);
  if (!match) {
    return next(createError(422, "Incorrect password"));
  }

  req.session = { user };

  res.send(user);
});

router.post("/signout", isAuthenticated, async (req, res) => {
  req.session = null;
  res.send();
});

export { router as authRouter };