import dotenv from 'dotenv';
dotenv.config();

// Server config
export const port = process.env.PORT || 5000;
export const mongoURI = process.env.MONGO_URI;
export const env = process.env.NODE_ENV || 'development';

export const jwtSecret = process.env.JWT_SECRET;
export const jwtExpire = process.env.JWT_EXPIRES_IN || '7d';

export const refreshTokenSecrete = process.env.JWT_REFRESH_TOKEN_SECRET;
export const refreshTokenExpiresIn =
  process.env.JWT_REFRESH_EXPIRES_IN || '30d';
export const salt = process.env.SALT;

// EMAIL config
export const emailExpires = parseInt(
  process.env.EMAIL_EXPIRES || 15 * 60 * 1000
);
export const emailHost = process.env.EMAIL_HOST;
export const emailPort = process.env.EMAIL_PORT;
export const emailAddress = process.env.EMAIL_ADDRESS;
export const emailPass = process.env.EMAIL_PASS;
export const emailFrom = process.env.EMAIL_FROM;
export const adminMail = process.env.ADMIN_EMAIL;
export const emailTo = process.env.EMAIL_TO;

// Cloudinary config
export const cloudinaryCloudName = process.env.CLOUDINARY_CLOUD_NAME;
export const cloudinaryApiKey = process.env.CLOUDINARY_API_KEY;
export const cloudinarySecret = process.env.CLOUDINARY_API_SECRET;
