import express from 'express';
import auth from '../../core/middlewares/authMiddleware.js';
import { USER_ROLE } from './user.constant.js';
import * as userController from './user.controller.js';

const router = express.Router();
const adminAuth = auth(USER_ROLE.admin);

router.get('/admin/all', adminAuth, userController.getAllUsers);
router.get('/admin/:userId', adminAuth, userController.getUserById);

export default router;
