# Deployment Guide

Complete step-by-step guide for deploying the Candidate Shortlisting System to production.

## Prerequisites

- GitHub account
- MongoDB Atlas account
- OpenRouter API key
- Vercel account (for frontend)
- Render account (for backend)

## Part 1: MongoDB Atlas Setup

### 1. Create MongoDB Atlas Account

1. Go to [mongodb.com](https://www.mongodb.com)
2. Click "Sign up"
3. Create account with email
4. Verify email

### 2. Create a Cluster

1. Click "Create" in MongoDB Atlas
2. Choose free tier (M0)
3. Select cloud provider and region (closest to you)
4. Click "Create Cluster"
5. Wait for cluster to be ready (2-3 minutes)

### 3. Create Database User

1. Go to "Database Access" in left sidebar
2. Click "Add New Database User"
3. Choose "Password" authentication
4. Enter username and password (strong password!)
5. Click "Add User"

### 4. Whitelist IP Address

1. Go to "Network Access"
2. Click "Add IP Address"
3. Click "Allow Access from Anywhere" (for testing)
4. For production, add specific IPs
5. Click "Confirm"

### 5. Get Connection String

1. Click "Connect" on your cluster
2. Choose "Connect your application"
3. Copy the connection string
4. Replace `<username>` and `<password>` with database user credentials
5. Replace `myFirstDatabase` with `candidate-shortlist`

Example:
```
mongodb+srv://user:password@cluster0.xxxxx.mongodb.net/candidate-shortlist?retryWrites=true&w=majority
```

## Part 2: OpenRouter API Setup

### 1. Get OpenRouter API Key

1. Go to [openrouter.ai](https://openrouter.ai)
2. Sign up for account
3. Go to Settings > API Keys
4. Click "Create API Key"
5. Copy the key

### 2. Add Credit (Free Trial)

- OpenRouter provides free trial credits
- Add payment method for production use
- Monitor usage in dashboard

## Part 3: Backend Deployment (Render)

### 1. Push Code to GitHub

```bash
cd backend
git init
git add .
git commit -m "Initial commit"
git remote add origin https://github.com/yourusername/employee-analytics-backend.git
git push -u origin main
```

### 2. Create Render Service

1. Go to [render.com](https://render.com)
2. Click "New +"
3. Select "Web Service"
4. Connect GitHub account
5. Search for your repository
6. Click "Connect"

### 3. Configure Service

Fill in the following:

**Name:** `candidate-shortlist-api`

**Environment:** Node

**Build Command:** `npm install`

**Start Command:** `npm start`

**Instance Type:** Free tier (for testing)

### 4. Add Environment Variables

Click "Add Environment Variable" for each:

```
PORT=5000
MONGODB_URI=your_mongodb_connection_string
JWT_SECRET=generate_a_random_string_here
JWT_EXPIRE=7d
OPENROUTER_API_KEY=your_openrouter_api_key
FRONTEND_URL=https://your-frontend-url.vercel.app
NODE_ENV=production
```

### 5. Deploy

1. Click "Create Web Service"
2. Wait for deployment (2-3 minutes)
3. Note your backend URL (will be like `https://candidate-shortlist-api.onrender.com`)
4. Test with: `curl https://candidate-shortlist-api.onrender.com/api/health`

## Part 4: Frontend Deployment (Vercel)

### 1. Push Frontend Code to GitHub

```bash
cd frontend
git init
git add .
git commit -m "Initial commit"
git remote add origin https://github.com/yourusername/employee-analytics-frontend.git
git push -u origin main
```

### 2. Create Vercel Project

1. Go to [vercel.com](https://vercel.com)
2. Click "Add New..." > "Project"
3. Import GitHub repository
4. Select the frontend repository
5. Click "Import"

### 3. Configure Project

**Project Settings:**
- Framework: Vite
- Build Output Directory: dist

**Environment Variables:**

```
VITE_API_BASE_URL=https://your-backend-url.onrender.com/api
```

### 4. Deploy

1. Click "Deploy"
2. Wait for build and deployment (2-3 minutes)
3. Note your frontend URL
4. Update Render environment variable `FRONTEND_URL` with this URL

## Part 5: Alternative Frontend Deployment (Netlify)

### 1. Connect GitHub Repository

1. Go to [netlify.com](https://netlify.com)
2. Click "Add new site" > "Import an existing project"
3. Select GitHub
4. Authorize and select repository

### 2. Configure Build

**Build command:** `npm run build`

**Publish directory:** `dist`

### 3. Add Environment Variables

- VITE_API_BASE_URL: `https://your-backend-url.onrender.com/api`

### 4. Deploy

1. Click "Deploy site"
2. Wait for deployment
3. Note your Netlify URL

## Testing Production Deployment

### 1. Test Backend API

```bash
# Health check
curl https://your-backend-url.onrender.com/api/health

# Test registration
curl -X POST https://your-backend-url.onrender.com/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Test User",
    "email": "test@example.com",
    "password": "password123"
  }'
```

### 2. Test Frontend

1. Open frontend URL in browser
2. Register new account
3. Login
4. Add a candidate
5. Create a job
6. Shortlist candidates

### 3. Verify Database

1. Go to MongoDB Atlas
2. Browse Collections
3. Check if data was saved correctly

## Production Checklist

- [ ] Backend deployed and running
- [ ] Frontend deployed and running
- [ ] Database connection verified
- [ ] Environment variables all set
- [ ] API endpoints responding
- [ ] Frontend can communicate with backend
- [ ] User can register and login
- [ ] Can create candidates
- [ ] Can create jobs
- [ ] Can shortlist candidates
- [ ] AI API responding correctly
- [ ] All CORS issues resolved

## Monitoring and Maintenance

### Backend Monitoring (Render)

1. Go to Render dashboard
2. Check "Logs" for errors
3. Monitor "Analytics" for usage
4. Check "Events" for deployments

### Frontend Monitoring (Vercel)

1. Go to Vercel dashboard
2. Check "Analytics" for traffic
3. Check "Deployments" for status
4. Monitor "Build & Development" logs

### Database Monitoring (MongoDB)

1. Go to MongoDB Atlas
2. Check "Metrics" for usage
3. Monitor "Alerts" settings
4. Review "Activity" logs

## Updating Production

### Backend Updates

```bash
cd backend
git add .
git commit -m "Feature: description"
git push origin main
# Render auto-deploys on push
```

### Frontend Updates

```bash
cd frontend
git add .
git commit -m "Feature: description"
git push origin main
# Vercel auto-deploys on push
```

## Troubleshooting

### Backend Won't Deploy

1. Check build logs in Render
2. Verify environment variables are set
3. Check MongoDB connection string
4. Ensure port is not hardcoded

### Frontend Won't Build

1. Check build logs in Vercel
2. Verify environment variables
3. Check for console errors
4. Clear node_modules and reinstall

### CORS Errors

1. Update backend `FRONTEND_URL` environment variable
2. Check CORS configuration in server.js
3. Verify origin matches exactly

### Database Connection Failed

1. Verify MongoDB URI is correct
2. Check IP whitelisting in Atlas
3. Verify database user credentials
4. Test connection string locally first

### API Not Responding

1. Check backend logs on Render
2. Verify backend service is running
3. Check frontend `VITE_API_BASE_URL` environment variable
4. Verify network connectivity

## Performance Optimization

### Backend Optimization

- Enable response compression
- Implement caching strategies
- Optimize database indexes
- Use connection pooling

### Frontend Optimization

- Enable build minification
- Optimize images
- Implement code splitting
- Use CDN for static assets

## Security Checklist

- [ ] Change default MongoDB password
- [ ] Use strong JWT secret
- [ ] Enable HTTPS (automatic on Render/Vercel)
- [ ] Implement rate limiting
- [ ] Add input validation
- [ ] Sanitize user inputs
- [ ] Use environment variables for secrets
- [ ] Enable MongoDB authentication
- [ ] Set CORS properly
- [ ] Monitor for security alerts

## Backup Strategy

### MongoDB Backups

1. Go to MongoDB Atlas
2. Navigate to "Backup"
3. Enable automatic backups
4. Configure backup frequency
5. Test restore procedures

### Code Backups

- Code is in Git repository
- Regular commits as backups
- GitHub provides version control
- Can revert to any previous version

## Cost Estimation (Monthly)

- **MongoDB Atlas**: Free tier (~$0)
- **Render**: $7/month (basic web service)
- **Vercel**: Free tier (~$0)
- **OpenRouter API**: Pay-as-you-go (~$5-50 depending on usage)

**Total**: ~$12-60/month

## Scaling for Production

As usage grows:

1. Upgrade MongoDB to paid tier
2. Upgrade Render instance type
3. Add caching layer (Redis)
4. Implement CDN for static assets
5. Add load balancing
6. Implement horizontal scaling

## Support and Documentation

- Render documentation: [docs.render.com](https://docs.render.com)
- Vercel documentation: [vercel.com/docs](https://vercel.com/docs)
- MongoDB documentation: [docs.mongodb.com](https://docs.mongodb.com)
- Express.js documentation: [expressjs.com](https://expressjs.com)
- React documentation: [react.dev](https://react.dev)

---

**Congratulations!** Your application is now deployed to production! 🎉
