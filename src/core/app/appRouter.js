import { Router } from 'express';

import userRoutes from '../../entities/user/user.routes.js';
import workshopRoutes from '../../entities/workshop/workshop.routes.js';
import authRoutes from '../../entities/auth/auth.routes.js';

// const router = express.Router();

// router.use('/v1/auth', authRoutes);
// router.use('/v1/user', userRoutes);
// router.use('/v1/workshop', workshopRoutes);

// export default router;

const router = Router();

const moduleRouter = [
  {
    path: '/user',
    router: userRoutes
  },
  {
    path: '/auth',
    router: authRoutes
  },
  {
    path: '/workshop',
    router: workshopRoutes
  }
];

moduleRouter.forEach((route) => {
  router.use(route.path, route.router);
});

export default router;
