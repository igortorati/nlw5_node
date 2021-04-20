import {Router} from "express";
import { SettingController } from "./controllers/SettingsController";

const routes = Router();

const settingsController = new SettingController();

routes.post("/settings", settingsController.create)

export {routes}