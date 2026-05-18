# AI-Powered Candidate Shortlisting System

Complete Full-Stack MERN application for intelligent candidate shortlisting and recruitment using AI.

## Project Overview

**ShortList AI** is a production-ready recruitment platform that leverages artificial intelligence to help HR professionals efficiently manage candidates and make data-driven hiring decisions.

### Key Features

✅ **AI-Powered Matching** - Intelligent candidate-job matching algorithm
✅ **Candidate Management** - Full CRUD operations with advanced filtering
✅ **Job Requirements** - Create and manage job openings
✅ **Shortlisting** - AI-based candidate shortlisting
✅ **Recommendations** - OpenRouter AI for hiring recommendations
✅ **Interview Questions** - Automated interview question generation
✅ **Analytics Dashboard** - Real-time recruitment metrics
✅ **JWT Authentication** - Secure user authentication
✅ **Responsive Design** - Mobile-first UI with Tailwind CSS

## Project Structure

```
employee-analytics/
├── backend/                 # Node.js + Express.js
│   ├── config/              # Database configuration
│   ├── controllers/         # Business logic
│   ├── models/              # MongoDB schemas
│   ├── routes/              # API endpoints
│   ├── middleware/          # Auth & error handling
│   ├── services/            # External API integration
│   ├── validators/          # Input validation
│   ├── utils/               # Utility functions
│   ├── server.js            # Entry point
│   ├── package.json
│   └── README.md
│
└── frontend/                # React.js + Vite
    ├── src/
    │   ├── components/      # Reusable components
    │   ├── pages/           # Page components
    │   ├── services/        # API service layer
    │   ├── store/           # Zustand stores
    │   ├── App.jsx
    │   └── index.css
    ├── index.html
    ├── vite.config.js
    ├── package.json
    └── README.md
```

## Tech Stack

### Backend
- **Runtime**: Node.js
- **Framework**: Express.js
- **Database**: MongoDB with Mongoose
- **Authentication**: JWT + bcryptjs
- **AI Integration**: OpenRouter API (GPT-3.5)
- **HTTP**: Axios

### Frontend
- **Framework**: React 18 with Vite
- **Styling**: Tailwind CSS
- **State**: Zustand
- **UI Components**: React Icons
- **Charts**: Recharts
- **Notifications**: React Hot Toast
- **Routing**: React Router DOM

## Quick Start

### Prerequisites

- Node.js (v16 or higher)
- npm or yarn
- MongoDB Atlas account (free tier available)
- OpenRouter API key

### Backend Setup

```bash
cd backend
npm install
```

Create `.env` file:
```env
PORT=5000
MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/candidate-shortlist
JWT_SECRET=your_jwt_secret_key
OPENROUTER_API_KEY=your_openrouter_api_key
FRONTEND_URL=http://localhost:5173
NODE_ENV=development
```

Start development server:
```bash
npm run dev
```

Backend runs on `http://localhost:5000`

### Frontend Setup

```bash
cd frontend
npm install
```

Create `.env` file:
```env
VITE_API_BASE_URL=http://localhost:5000/api
```

Start development server:
```bash
npm run dev
```

Frontend runs on `http://localhost:5173`

## API Endpoints

### Authentication
- `POST /api/auth/register` - Register user
- `POST /api/auth/login` - Login user
- `GET /api/auth/profile` - Get user profile
- `PUT /api/auth/profile` - Update profile
- `POST /api/auth/logout` - Logout

### Candidates
- `POST /api/candidates` - Create candidate
- `GET /api/candidates` - Get all candidates
- `GET /api/candidates/:id` - Get candidate
- `PUT /api/candidates/:id` - Update candidate
- `DELETE /api/candidates/:id` - Delete candidate
- `GET /api/candidates/search` - Search candidates

### Jobs
- `POST /api/jobs` - Create job
- `GET /api/jobs` - Get all jobs
- `GET /api/jobs/:id` - Get job
- `PUT /api/jobs/:id` - Update job
- `DELETE /api/jobs/:id` - Delete job

### AI & Shortlisting
- `POST /api/ai/shortlist` - Shortlist candidates
- `GET /api/ai/shortlist` - Get shortlisted candidates
- `PUT /api/ai/shortlist/:id` - Update shortlist status
- `POST /api/ai/recommend` - Get AI recommendation
- `POST /api/ai/interview-questions` - Generate questions
- `POST /api/ai/rank-candidates` - Rank candidates
- `POST /api/ai/improvement-suggestions` - Get suggestions
- `GET /api/ai/analytics` - Get analytics

## Database Schema

### Users
```javascript
{
  name: String,
  email: String (unique),
  password: String (hashed),
  role: String (recruiter/admin),
  company: String,
  department: String,
  isActive: Boolean,
  createdAt: Date
}
```

### Candidates
```javascript
{
  name: String,
  email: String,
  phone: String,
  skills: [String],
  experience: Number,
  education: [{degree, field, institution, graduationYear}],
  projects: [{title, description, technologies, link}],
  performanceScore: Number,
  bio: String,
  github: String,
  linkedin: String,
  isShortlisted: Boolean,
  createdBy: ObjectId,
  createdAt: Date
}
```

### Job Requirements
```javascript
{
  jobTitle: String,
  description: String,
  requiredSkills: [String],
  preferredSkills: [String],
  minExperience: Number,
  maxExperience: Number,
  minSalary: Number,
  maxSalary: Number,
  department: String,
  location: String,
  jobType: String,
  isActive: Boolean,
  createdBy: ObjectId,
  createdAt: Date
}
```

### Shortlisted Candidates
```javascript
{
  candidate: ObjectId,
  jobRequirement: ObjectId,
  matchScore: Number,
  matchCategory: String,
  matchedSkills: [String],
  missingSkills: [String],
  aiRecommendation: String,
  interviewQuestions: [String],
  status: String,
  notes: String,
  createdBy: ObjectId,
  createdAt: Date
}
```

## Deployment Guide

### MongoDB Atlas Setup

1. Create account at mongodb.com
2. Create new cluster
3. Create database user
4. Whitelist your IP
5. Get connection string
6. Add to backend `.env` as `MONGODB_URI`

### Backend Deployment (Render)

1. Push code to GitHub
2. Create new Web Service on Render
3. Connect GitHub repository
4. Set environment variables
5. Deploy

### Frontend Deployment (Vercel)

1. Push code to GitHub
2. Import project to Vercel
3. Set `VITE_API_BASE_URL` environment variable
4. Deploy

### Frontend Deployment (Netlify)

1. Connect GitHub repository
2. Set build command: `npm run build`
3. Set publish directory: `dist`
4. Add environment variables
5. Deploy

## Usage Guide

### 1. Register and Login
- Create account with email and password
- Login to access the platform

### 2. Add Candidates
- Navigate to Candidates page
- Click "Add Candidate"
- Fill in candidate details and skills
- Submit to save

### 3. Create Job Requirements
- Navigate to Jobs page
- Click "Create Job"
- Specify required and preferred skills
- Set minimum experience
- Submit to save

### 4. Shortlist Candidates
- Go to Jobs page
- Click "Match Candidates" on a job
- Select candidates to shortlist
- Submit to process matching

### 5. View AI Recommendations
- Access shortlisted candidates
- View match scores and AI recommendations
- Generate interview questions
- Get improvement suggestions

### 6. Manage Shortlist
- Update candidate status (shortlisted, rejected, offered, etc.)
- Add notes about candidates
- Track hiring pipeline

## Features in Detail

### Intelligent Matching Algorithm
- Calculates skill overlap percentage
- Evaluates years of experience
- Assigns weighted match score
- Categorizes matches (High/Medium/Low)

### AI Integration
- Promotion recommendations
- Interview question generation
- Candidate ranking analysis
- Improvement suggestions

### Analytics Dashboard
- Total candidates count
- Shortlisted candidates count
- Rejected candidates count
- Average match score

## Error Handling

The application includes comprehensive error handling:
- Input validation on backend and frontend
- Consistent error response format
- User-friendly error messages
- Detailed logging for debugging

## Security Features

- JWT authentication with expiration
- Password hashing with bcrypt
- Protected API routes
- Input validation and sanitization
- CORS configuration
- Secure token storage

## Performance Considerations

- Indexed MongoDB queries
- Pagination for large datasets
- Optimized API requests
- Efficient state management
- Code splitting and lazy loading
- Responsive image handling

## Testing

### Manual Testing
- Test all API endpoints with Postman
- Verify authentication flow
- Test candidate matching accuracy
- Validate AI responses

### Automated Testing (Future)
```bash
npm test
```

## Troubleshooting

### Backend Won't Start
- Check MongoDB URI is correct
- Verify all environment variables are set
- Check if port 5000 is available

### Frontend Can't Connect to Backend
- Verify backend is running on port 5000
- Check VITE_API_BASE_URL in .env
- Clear browser cache

### AI API Errors
- Verify OpenRouter API key is valid
- Check API quota/rate limits
- Ensure JSON formatting in prompts

## File Structure Best Practices

- Modular component design
- Separation of concerns
- Reusable utility functions
- Centralized API service
- Clean state management
- Proper error boundaries

## Future Enhancements

- Email notifications
- Resume parsing
- Bulk candidate upload
- Advanced analytics/reporting
- Team collaboration features
- Multi-language support
- Mobile app
- Real-time notifications
- Integration with LinkedIn

## Contributing

1. Create feature branches
2. Follow code style conventions
3. Write meaningful commit messages
4. Test changes thoroughly
5. Submit pull requests

## License

MIT License

## Support

For issues and questions:
1. Check documentation
2. Review existing issues
3. Create new issue with details

## Authors

Created for educational and production use.

## Acknowledgments

- OpenRouter for AI API
- MongoDB for database
- Vercel for frontend hosting
- Render for backend hosting
- Tailwind CSS team
- React community

---

**Start shortlisting smarter with AI today!** 🚀
