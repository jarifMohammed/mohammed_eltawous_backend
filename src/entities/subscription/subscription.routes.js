import express from 'express';
import auth from '../../core/middlewares/authMiddleware.js';
import * as paymentController from './payment.controller.js';
import * as subscriptionController from './subscription.controller.js';
import { USER_ROLE } from '../user/user.constant.js';

const router = express.Router();
const authenticate = auth();
const adminAuth = auth(USER_ROLE.admin);

// Payment endpoints
router.post(
  '/initialize-payment',
  authenticate,
  paymentController.initializePayment
);

router.get(
  '/payment-status/:paymentId',
  authenticate,
  paymentController.getPaymentStatus
);

router.get(
  '/admin/payments',
  adminAuth,
  paymentController.getAllPaymentsForAdmin
);

router.get(
  '/admin/payment-summary',
  adminAuth,
  paymentController.getPaymentSummaryForAdmin
);

router.get(
  '/admin/users/:userId/payments',
  adminAuth,
  paymentController.getPaymentsByUserForAdmin
);

// Subscription endpoints
router.get(
  '/status',
  authenticate,
  subscriptionController.getSubscriptionStatus
);

router.get(
  '/credit-history',
  authenticate,
  subscriptionController.getCreditHistory
);

router.get(
  '/plans',
  subscriptionController.getAvailablePlans
);

export default router;
