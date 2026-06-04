import mongoose from 'mongoose';
import User from '../auth/auth.model.js';

const DEFAULT_LIMIT = 20;
const MAX_LIMIT = 100;

const escapeRegex = (value = '') => value.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');

const getPagination = (query = {}) => {
  const page = Math.max(parseInt(query.page, 10) || 1, 1);
  const requestedLimit = Math.max(parseInt(query.limit, 10) || DEFAULT_LIMIT, 1);
  const limit = Math.min(requestedLimit, MAX_LIMIT);
  const skip = (page - 1) * limit;

  return { page, limit, skip };
};

const buildUserFilter = (query = {}) => {
  const filter = {};

  if (query.role) {
    filter.role = query.role;
  }

  if (query.isActive === 'true' || query.isActive === 'false') {
    filter.isActive = query.isActive === 'true';
  }

  if (query.isVerified === 'true' || query.isVerified === 'false') {
    filter.isVerified = query.isVerified === 'true';
  }

  if (query.search) {
    const searchRegex = new RegExp(escapeRegex(query.search.trim()), 'i');
    filter.$or = [
      { name: searchRegex },
      { email: searchRegex },
      { phone: searchRegex }
    ];
  }

  return filter;
};

class UserService {
  async getAllUsers(query = {}) {
    const { page, limit, skip } = getPagination(query);
    const filter = buildUserFilter(query);

    const [users, total] = await Promise.all([
      User.find(filter)
        .select(
          '_id name email phone role isVerified isActive imageLink subscriptionId totalCreditsEverUsed lastPurchaseAt createdAt updatedAt'
        )
        .populate(
          'subscriptionId',
          'currentTier totalCredits usedCredits availableCredits isActive lastPaymentAmount lastPaymentCurrency paymentVerifiedAt'
        )
        .sort({ createdAt: -1 })
        .skip(skip)
        .limit(limit)
        .lean(),
      User.countDocuments(filter)
    ]);

    return {
      users,
      pagination: {
        page,
        limit,
        total,
        totalPages: Math.ceil(total / limit)
      }
    };
  }

  async getUserById(userId) {
    if (!mongoose.Types.ObjectId.isValid(userId)) {
      throw new Error('Invalid user id');
    }

    const user = await User.findById(userId)
      .select(
        '_id name email phone bio jobTitle address role isVerified isActive imageLink subscriptionId totalCreditsEverUsed lastPurchaseAt createdAt updatedAt'
      )
      .populate(
        'subscriptionId',
        'currentTier totalCredits usedCredits availableCredits isActive stripeCustomerId lastPaymentId lastPaymentStatus lastPaymentAmount lastPaymentCurrency paymentVerifiedAt lastCronCheckAt createdAt updatedAt'
      )
      .lean();

    if (!user) {
      throw new Error('User not found');
    }

    return user;
  }
}

export default new UserService();
