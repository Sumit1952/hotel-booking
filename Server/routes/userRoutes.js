import express from "express";
import { getUserData } from "../controllers/userController.js";
import { protect } from "../middleware/authMiddleware.js";
import { storeRecentSearchCities } from "../controllers/userController.js";

const userRouter = express.Router();

userRouter.get("/",protect , getUserData);
userRouter.post("/store-recent-search",protect , storeRecentSearchCities);

export default userRouter;
