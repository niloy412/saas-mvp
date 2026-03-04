import express from 'express';
import * as userController from './user.controller.js';
import { protect } from '../../middlewares/auth.middleware.js';

const router = express.Router();

router.post('/', protect, userController.createUser);
router.get('/', protect, userController.getUsers);
router.put("/profile", protect, userController.updateProfileController);
router.put("/:id", protect, userController.updateUserByIdController);
router.delete("/:id", protect, userController.deleteUserByIdController);

export default router;