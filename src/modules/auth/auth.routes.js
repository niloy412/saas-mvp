import express from 'express';
import {signup, login, forgotPasswordController, resetPasswordController, adminLoginController} from './auth.controller.js';

const router = express.Router();

router.post('/sign-up', signup);
router.post('/sign-in', login);
router.post("/forgot-password", forgotPasswordController);
router.post("/reset-password", resetPasswordController);
router.post("/admin/login", adminLoginController);

export default router;