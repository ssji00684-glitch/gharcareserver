        GharCare Backend - Expanded

Key endpoints:
- POST /api/auth/register {name,phone,password,role}
- POST /api/auth/login {phone,password}
- GET /api/services
- POST /api/bookings
- POST /api/payments/order {amount,bookingId}

Set .env from .env.example and run:
cd backend
npm install
npm run dev
