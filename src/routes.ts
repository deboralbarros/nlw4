import {Router} from "express";
import {UserController} from "./controllers/UserController";
import {SurveysController} from "./controllers/SurveysController";

const router = Router();

const userController = new UserController();
const surveyController = new SurveysController();

router.post('/users', userController.create);

router.get('/surveys', surveyController.show);
router.post('/surveys', surveyController.create);

export {router};