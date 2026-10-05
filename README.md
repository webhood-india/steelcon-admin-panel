# Steelcon Management System

Full-stack React + Node/Express + MongoDB company management system for Steelcon.

## Roles

- **Super Admin** — complete company control; can create additional Admins.
- **Admin** — company-wide HR, payroll, loans, resignations, settings and management access.
- **Manager** — can view/manage their own team, attendance, leave and permitted team workflows; cannot edit employee master data and cannot manage loans or resignations.
- **Employee** — own attendance, leave, payroll/payslips, profile, announcements, policies, training, referrals and support.

## 1. Frontend setup

From the project root:

```bash
npm install
```

Copy `.env.example` to `.env` and set:

```env
VITE_API_URL=http://localhost:5000
```

Start the frontend:

```bash
npm run dev
```

## 2. Backend setup

Open a second terminal:

```bash
cd steelcon-backend-main/backend
npm install
```

Copy:

```text
.env.example -> .env
```

Configure at minimum:

```env
MONGODB_URI=mongodb+srv://...
JWT_SECRET=<long-random-secret>
PORT=5000
FRONTEND_URL=http://localhost:5173

SEED_ADMIN_USERNAME=admin
SEED_ADMIN_EMAIL=admin@steelcon.com
SEED_ADMIN_PASSWORD=<strong-password-at-least-12-characters>
```

SMTP values are required for email OTP/password-reset/notification workflows.

Optional Cloudinary values are required only when using the configured Cloudinary document-upload workflow.

## 3. Create the initial Super Admin

**Do this before starting the application for the first time.**

Run:

```bash
npm run seed
```

The seed reads the Super Admin username, email and password from `.env`. It does not contain a hardcoded password.

The seed is safe to re-run: if a Super Admin already exists, it makes no changes.

## 4. Start the backend

```bash
npm start
```

The API should be available at:

```text
http://localhost:5000
```

## 5. Recommended first review

After logging in as Super Admin, test in this order:

1. Create an Admin.
2. Create departments/designations.
3. Create a Manager and assign individualized leave balances.
4. Create test employees under that Manager.
5. Log in as an Employee and mark attendance/apply leave.
6. Approve those requests as the Manager.
7. Test Manager attendance approval as Admin.
8. Create both a salary-deduction loan and a one-time loan.
9. Generate a previous-month payroll and verify the payslip.
10. Test resignation, discipline, manpower, referrals, announcements, training, policies, offer letters and support.
11. Test every role by attempting direct access to restricted URLs/APIs.

Use dummy data for the first QA pass. Do not enter real Aadhaar, PAN, bank or salary information until the complete workflow has been verified.

## 6. Production notes

- Never commit `.env` files.
- Rotate any credential that has ever been exposed outside the server environment.
- Use HTTPS in production.
- Use a production MongoDB user with the minimum required permissions.
- Configure a real SMTP provider before relying on OTP/reset/notification workflows.
- Configure the production frontend URL in `FRONTEND_URL` and `VITE_API_URL`.

## 7. Build checks

Frontend production build:

```bash
npm run build
```

Backend syntax can be checked with:

```bash
node --check server.js
```

The application source is packaged without `node_modules`, local `.env` files, or production secrets.
