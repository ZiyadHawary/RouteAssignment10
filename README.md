# Assignment 10: Saraha App with login protection

A modular Node.js ES module backend built as an incremental diploma submission, with small feature folders and course-aligned middleware.

## Setup

1. Install Node.js 20+ and MongoDB (local or hosted).
2. Copy `.env.example` to `.env`, then set `MONGO_URI`, both JWT secrets, and `PHONE_ENCRYPTION_KEY`.
3. Run `npm install` and `npm start`.
4. Visit `http://localhost:3000/health` to check the server.

SMTP settings are optional. When SMTP credentials are absent, OTPs are printed to the server console for local learning/testing. Google login needs a Google OAuth client ID. Uploaded images are stored in `uploads/` (max 2 MB).

## Environment variables

| Variable | Purpose |
|---|---|
| PORT | HTTP port (default 3000) |
| MONGO_URI | MongoDB connection string |
| JWT_ACCESS_SECRET / JWT_REFRESH_SECRET | Separate signing keys for access and refresh tokens |
| JWT_ACCESS_EXPIRES / JWT_REFRESH_EXPIRES | Token lifetime (defaults 15m and 30d) |
| PHONE_ENCRYPTION_KEY | AES key used for the phone field |
| GOOGLE_CLIENT_ID | Audience expected for Google ID tokens |
| SMTP_HOST, SMTP_PORT, SMTP_SECURE, SMTP_USER, SMTP_PASS, EMAIL_FROM | Nodemailer delivery settings |
| CLIENT_ORIGIN | CORS origin (default `*`) |

## Endpoint guide

Protected routes use `Authorization: Bearer {{accessToken}}`. OTP codes are six digits and expire after ten minutes. For multipart upload use field `image`.

| Method | Path | Auth | Body |
|---|---|---:|---|
| POST | /api/auth/signup | No | name, email, password, phone |
| POST | /api/auth/confirm-email | No | email, otp |
| POST | /api/auth/resend-otp | No | email |
| POST | /api/auth/login | No | email, password |
| POST | /api/auth/login/confirm | No | email, otp |
| POST | /api/auth/refresh | No | refreshToken |
| POST | /api/auth/forgot-password | No | email |
| POST | /api/auth/reset-password | No | email, otp, password |
| POST | /api/auth/google | No | idToken |
| POST | /api/auth/two-step/enable | Yes | none |
| POST | /api/auth/two-step/verify | Yes | otp |
| POST | /api/auth/logout | Yes | optional refreshToken (revokes both tokens when supplied) |
| POST | /api/auth/logout-all | Yes | none |
| GET | /api/users/me | Yes | none |
| PATCH | /api/users/me | Yes | name and/or email and/or phone |
| PATCH | /api/users/me/password | Yes | currentPassword, newPassword |
| POST | /api/users/me/image | Yes | multipart image |
| GET | /api/users/:id | No | none |
| POST | /api/messages | Yes | receiverId, body |
| GET | /api/messages/received | Yes | none |
| GET | /health | No | none |

All request-validation failures return HTTP 400. Anonymous message responses omit the sender until an identity request is accepted.

## Project map

- `src/DB`: Mongo connection and one Mongoose model per collection.
- `src/modules`: feature-specific validation, controller logic, and routers.
- `src/middleware`: authentication, roles, Joi validation, uploads, and error handling.
- `src/utils`: shared errors, async wrapper, tokens, phone encryption, OTP email template, and response shape.
- `index.js`: startup, middleware, route mounting, and database connection.

## Study concepts

ES modules and imports; REST routes; middleware chaining; Joi schemas; password hashing; JWT access/refresh tokens and `jti`; OTP hashing and expiry; AES encryption; MongoDB references and TTL indexes; authorization and ownership checks; background email delivery; file uploads; environment configuration; global errors; rate limiting and security headers.


## Assignment scope

This submission adds the Assignment 10 five-failure temporary login ban and optional two-step email verification. It intentionally stops before Assignment 11 identity requests/conversations.


## Course topics used

- `src/DB/connection.js` starts the Mongoose connection; `src/DB/db.service.js` shows reusable database operations.
- The auth and user features apply password hashing, JWT signing and verification, AES phone encryption, Google ID-token verification, Joi validation middleware, and global error handling.
- OTP delivery uses Nodemailer in the background with an HTML template; uploads use Multer disk storage and an image-only filter.
- Routers use strict and case-sensitive matching, with merged parameters where child routes need parent values. Helmet, CORS, and rate limiting are configured in `index.js`.
