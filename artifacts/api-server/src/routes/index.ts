import { Router, type IRouter } from "express";
import healthRouter from "./health";
import authRouter from "./auth";
import leadsRouter from "./leads";
import blogAdminRouter from "./blog-admin";
import chatRouter from "./chat";
import analyticsRouter from "./analytics";
import dashboardRouter from "./dashboard";

const router: IRouter = Router();

router.use(healthRouter);
router.use(authRouter);
router.use(leadsRouter);
router.use(blogAdminRouter);
router.use(chatRouter);
router.use(analyticsRouter);
router.use(dashboardRouter);

export default router;
