# Quick Start Guide

Get up and running with the AI-Powered Candidate Shortlisting System in 10 minutes!

## Prerequisites

- Node.js (v16+)
- npm or yarn
- MongoDB Atlas account (free)
- OpenRouter API key (free)

## 1. Clone and Setup

```bash
# Backend setup
cd backend
npm install
cp .env.example .env

# Frontend setup
cd ../frontend
npm install
cp .env.example .env
```

## 2. Configure Environment Variables

### Backend (.env)

```env
PORT=5000
MONGODB_URI=mongodb+srv://user:password@cluster.mongodb.net/candidate-shortlist
JWT_SECRET=your-super-secret-jwt-key-change-this
JWT_EXPIRE=7d
OPENROUTER_API_KEY=sk-or-xxx
FRONTEND_URL=http://localhost:5173
NODE_ENV=development
```

### Frontend (.env)

```env
VITE_API_BASE_URL=http://localhost:5000/api
```

## 3. Start the Application

### Terminal 1: Backend

```bash
cd backend
npm run dev
```

Expected output:
```
Server running on port 5000
MongoDB Connected: cluster0.xxxxx.mongodb.net
```

### Terminal 2: Frontend

```bash
cd frontend
npm run dev
```

Expected output:
```
  VITE v5.0.0  ready in 123 ms
  ➜  Local:   http://localhost:5173/
```

## 4. Create Your Account

1. Open `http://localhost:5173` in browser
2. Click "Register"
3. Fill in details:
   - Name: Your Name
   - Email: your@email.com
   - Password: Strong password
   - Company: Your Company (optional)
4. Click "Register"
5. You'll be logged in automatically

## 5. Add Your First Candidate

1. Click "Candidates" in sidebar
2. Click "Add Candidate"
3. Fill in:
   - Name: John Developer
   - Email: john@example.com
   - Phone: +1234567890
   - Skills: Add React, Node.js, MongoDB
   - Experience: 5 years
   - Performance Score: 85
4. Click "Add Candidate"

## 6. Create a Job

1. Click "Jobs" in sidebar
2. Click "Create Job"
3. Fill in:
   - Job Title: Senior Full-Stack Developer
   - Required Skills: React, Node.js, MongoDB
   - Min Experience: 3 years
   - Department: Engineering
   - Location: Remote
4. Click "Create Job"

## 7. Shortlist Candidates

1. Go to "Jobs"
2. Click "Match Candidates" on your job
3. Select "John Developer" checkbox
4. Click "Shortlist Selected"
5. Wait for AI matching (5-10 seconds)

## 8. View Results

1. Go back to the job
2. Click "View Shortlist"
3. See match scores and AI recommendations

## Troubleshooting

### Backend won't start

**Error:** `connect ECONNREFUSED 127.0.0.1:27017`
- MongoDB URI is wrong
- Solution: Verify MONGODB_URI in .env

**Error:** `JsonWebTokenError`
- JWT_SECRET is missing
- Solution: Add JWT_SECRET to .env

### Frontend won't load

**Error:** `Failed to fetch` or `Network Error`
- Backend not running
- Solution: Make sure backend is running on port 5000

**Error:** `VITE_API_BASE_URL not found`
- .env file not created
- Solution: Create .env and add VITE_API_BASE_URL

### Can't create candidates

**Error:** `Email already exists`
- Candidate with this email already added
- Solution: Use different email

**Error:** `Invalid email format`
- Solution: Use valid email format (user@domain.com)

### AI features not working

**Error:** `OpenRouter API Error`
- API key invalid or missing
- Solution: Check OPENROUTER_API_KEY in backend .env

## API Testing with Postman

1. Import `POSTMAN_COLLECTION.json`
2. Set variables:
   - baseUrl: http://localhost:5000/api
   - token: (set after login)
3. Run requests in order:
   - Login → Get token
   - Create Candidate
   - Create Job
   - Shortlist Candidates

## Next Steps

1. **Customize UI**: Modify colors in `tailwind.config.js`
2. **Add more features**: Create new pages in `src/pages/`
3. **Deploy**: Follow `DEPLOYMENT_GUIDE.md`
4. **Add tests**: Create test files in `backend/tests/`

## Project Structure Quick Reference

```
Frontend Pages:
  /login              - Login page
  /register           - Registration page
  /                   - Dashboard
  /candidates         - List candidates
  /candidates/new     - Add candidate
  /jobs               - List jobs
  /jobs/new           - Create job
  /jobs/:id/shortlist - Shortlist candidates

Backend Routes:
  POST   /api/auth/register      - Register
  POST   /api/auth/login         - Login
  POST   /api/candidates         - Create
  GET    /api/candidates         - List
  POST   /api/jobs               - Create
  GET    /api/jobs               - List
  POST   /api/ai/shortlist       - Shortlist
  POST   /api/ai/recommend       - Get recommendation
```

## Common Tasks

### Reset Database

```bash
# Delete all data in MongoDB
# Go to MongoDB Atlas > Database > Collections > Delete collection
```

### View Logs

**Backend:**
```bash
# Check terminal running `npm run dev`
```

**Frontend:**
```bash
# Check browser console (F12 > Console tab)
```

### Update API Key

1. Update `OPENROUTER_API_KEY` in backend `.env`
2. Restart backend server

### Change Database

1. Update `MONGODB_URI` in backend `.env`
2. Restart backend server

## Documentation

- Full docs: [README.md](./README.md)
- API docs: [backend/README.md](./backend/README.md)
- Frontend docs: [frontend/README.md](./frontend/README.md)
- Deployment: [DEPLOYMENT_GUIDE.md](./DEPLOYMENT_GUIDE.md)

## Support

### Check Logs

**Backend Errors:**
```bash
cd backend
npm run dev
# Look for error messages in terminal
```

**Frontend Errors:**
```bash
# Open browser DevTools (F12)
# Check Console tab for errors
# Check Network tab for API calls
```

### Common Solutions

1. **Clear Cache**: Ctrl+Shift+Delete → Clear all data
2. **Refresh**: Ctrl+F5 (hard refresh)
3. **Restart Servers**: Kill terminals and restart
4. **Reinstall Dependencies**: Delete node_modules, run npm install

## Quick Shortcuts

```bash
# Backend only
cd backend && npm run dev

# Frontend only
cd frontend && npm run dev

# Production build
cd frontend && npm run build

# Check if backend is running
curl http://localhost:5000/api/health
```

## Need Help?

1. Check documentation in README files
2. Review error messages in logs
3. Check Postman collection for API examples
4. Verify environment variables
5. Ensure MongoDB is connected

---

**You're all set!** Start recruiting smarter with AI. 🚀
