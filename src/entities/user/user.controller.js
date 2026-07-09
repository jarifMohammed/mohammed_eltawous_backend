import userService from './user.service.js';
import { catchAsync } from '../../utility/catchAsync.js';

export const getAllUsers = catchAsync(async (req, res) => {
  const result = await userService.getAllUsers(req.query);

  res.status(200).json({
    success: true,
    data: result
  });
});

export const getUserById = catchAsync(async (req, res) => {
  const user = await userService.getUserById(req.params.userId);

  res.status(200).json({
    success: true,
    data: user
  });
});

export const getSubscriberDashboard = catchAsync(async (req, res) => {
  const userId = req.user.userId || req.user.id;
  const dashboardData = await userService.getSubscriberDashboard(userId);

  res.status(200).json({
    success: true,
    data: dashboardData
  });
});

