# Candidate Shortlist AI Backend

Production-ready backend for AI-powered candidate shortlisting system built with Node.js, Express, and MongoDB.

## Features

- User authentication with JWT
- Candidate management (CRUD operations)
- Job requirement management
- Intelligent candidate-job matching algorithm
- OpenRouter AI integration for:
  - Candidate recommendations
  - Interview question generation
  - Candidate ranking
  - Improvement suggestions
- Advanced search and filtering
- Analytics dashboard
- Error handling and validation

## Tech Stack

- **Runtime**: Node.js
- **Framework**: Express.js
- **Database**: MongoDB with Mongoose
- **Authentication**: JWT + bcryptjs
- **AI**: OpenRouter API (GPT-3.5)
- **HTTP Client**: Axios

## Installation

1. Clone the repository
2. Install dependencies:
   ```bash
   npm install
   ```

3. Create `.env` file and add your configuration:
   ```
   PORT=5000
   MONGODB_URI=mongodb+srv://user:password@cluster.mongodb.net/candidate-shortlist
   JWT_SECRET=your_jwt_secret_key
   OPENROUTER_API_KEY=your_openrouter_api_key
   FRONTEND_URL=http://localhost:5173
   NODE_ENV=development
   ```

## Running the Server

Development mode with hot reload:
```bash
npm run dev
```

Production mode:
```bash
npm start
```

## API Documentation

### Authentication Endpoints

- **POST** `/api/auth/register` - Register new user
- **POST** `/api/auth/login` - Login user
- **GET** `/api/auth/profile` - Get user profile (Protected)
- **PUT** `/api/auth/profile` - Update user profile (Protected)
- **POST** `/api/auth/logout` - Logout user (Protected)

### Candidate Endpoints

- **POST** `/api/candidates` - Create candidate (Protected)
- **GET** `/api/candidates` - Get all candidates with pagination (Protected)
- **GET** `/api/candidates/:id` - Get candidate details (Protected)
- **PUT** `/api/candidates/:id` - Update candidate (Protected)
- **DELETE** `/api/candidates/:id` - Delete candidate (Protected)
- **GET** `/api/candidates/search` - Search candidates (Protected)

### Job Requirement Endpoints

- **POST** `/api/jobs` - Create job requirement (Protected)
- **GET** `/api/jobs` - Get all job requirements (Protected)
- **GET** `/api/jobs/:id` - Get job details (Protected)
- **PUT** `/api/jobs/:id` - Update job (Protected)
- **DELETE** `/api/jobs/:id` - Delete job (Protected)

### AI & Shortlist Endpoints

- **POST** `/api/ai/shortlist` - Shortlist candidates for job (Protected)
- **GET** `/api/ai/shortlist` - Get shortlisted candidates (Protected)
- **PUT** `/api/ai/shortlist/:id` - Update shortlist status (Protected)
- **POST** `/api/ai/recommend` - Get AI recommendation (Protected)
- **POST** `/api/ai/interview-questions` - Generate interview questions (Protected)
- **POST** `/api/ai/rank-candidates` - Rank candidates (Protected)
- **POST** `/api/ai/improvement-suggestions` - Get improvement suggestions (Protected)
- **GET** `/api/ai/analytics` - Get analytics data (Protected)

## Request/Response Examples

### Register User
```bash
POST /api/auth/register
Content-Type: application/json

{
  "name": "John Recruiter",
  "email": "john@example.com",
  "password": "securePassword123",
  "company": "Tech Corp",
  "department": "HR"
}

Response:
{
  "success": true,
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "user": {
    "id": "507f1f77bcf86cd799439011",
    "name": "John Recruiter",
    "email": "john@example.com",
    "role": "recruiter",
    "company": "Tech Corp"
  }
}
```

### Create Candidate
```bash
POST /api/candidates
Authorization: Bearer <token>
Content-Type: application/json

{
  "name": "Alice Developer",
  "email": "alice@example.com",
  "phone": "+1234567890",
  "skills": ["React", "Node.js", "MongoDB", "Python"],
  "experience": 5,
  "education": [
    {
      "degree": "B.Tech",
      "field": "Computer Science",
      "institution": "University XYZ",
      "graduationYear": 2018
    }
  ],
  "performanceScore": 85,
  "bio": "Full-stack developer with passion for building scalable applications",
  "github": "https://github.com/alice",
  "linkedin": "https://linkedin.com/in/alice"
}

Response:
{
  "success": true,
  "candidate": {
    "_id": "507f1f77bcf86cd799439012",
    "name": "Alice Developer",
    "email": "alice@example.com",
    "skills": ["React", "Node.js", "MongoDB", "Python"],
    "experience": 5,
    "performanceScore": 85,
    ...
  }
}
```

### Create Job Requirement
```bash
POST /api/jobs
Authorization: Bearer <token>
Content-Type: application/json

{
  "jobTitle": "Senior Full-Stack Developer",
  "description": "Looking for experienced full-stack developer",
  "requiredSkills": ["React", "Node.js", "MongoDB"],
  "preferredSkills": ["Python", "AWS", "Docker"],
  "minExperience": 3,
  "maxExperience": 8,
  "department": "Engineering",
  "location": "Remote",
  "jobType": "Full-time"
}

Response:
{
  "success": true,
  "job": {
    "_id": "507f1f77bcf86cd799439013",
    "jobTitle": "Senior Full-Stack Developer",
    "requiredSkills": ["React", "Node.js", "MongoDB"],
    ...
  }
}
```

### Shortlist Candidates
```bash
POST /api/ai/shortlist
Authorization: Bearer <token>
Content-Type: application/json

{
  "jobId": "507f1f77bcf86cd799439013",
  "candidateIds": ["507f1f77bcf86cd799439012"]
}

Response:
{
  "success": true,
  "count": 1,
  "shortlisted": [
    {
      "_id": "507f1f77bcf86cd799439014",
      "candidate": "507f1f77bcf86cd799439012",
      "jobRequirement": "507f1f77bcf86cd799439013",
      "matchScore": 87,
      "matchCategory": "High Match",
      "matchedSkills": ["React", "Node.js", "MongoDB"],
      "missingSkills": [],
      "status": "shortlisted"
    }
  ]
}
```

### Get AI Recommendation
```bash
POST /api/ai/recommend
Authorization: Bearer <token>
Content-Type: application/json

{
  "candidateId": "507f1f77bcf86cd799439012",
  "jobId": "507f1f77bcf86cd799439013"
}

Response:
{
  "success": true,
  "candidate": { ... },
  "job": { ... },
  "matchData": {
    "matchScore": 87,
    "matchCategory": "High Match",
    "skillMatch": 100,
    "experienceMatch": 75,
    "matchedSkills": ["React", "Node.js", "MongoDB"],
    "missingSkills": []
  },
  "aiRecommendation": "Alice is an excellent fit for this position..."
}
```

## Project Structure

```
backend/
├── config/
│   └── database.js           # MongoDB connection
├── models/
│   ├── User.js              # User schema
│   ├── Candidate.js         # Candidate schema
│   ├── JobRequirement.js    # Job schema
│   └── ShortlistedCandidate.js
├── controllers/
│   ├── authController.js    # Authentication logic
│   ├── candidateController.js
│   ├── jobController.js
│   └── aiController.js      # AI features
├── routes/
│   ├── authRoutes.js
│   ├── candidateRoutes.js
│   ├── jobRoutes.js
│   └── aiRoutes.js
├── middleware/
│   ├── auth.js              # JWT authentication
│   └── errorHandler.js      # Error handling
├── services/
│   ├── aiService.js         # OpenRouter integration
│   └── candidateService.js  # Matching logic
├── utils/
│   ├── tokenUtils.js        # JWT utilities
│   └── matchingUtils.js     # Matching algorithms
├── validators/
│   └── validators.js        # Input validation
├── server.js                # Entry point
├── package.json
└── .env.example
```

## Environment Variables

Required environment variables:

```
PORT=5000
MONGODB_URI=your_mongodb_connection_string
JWT_SECRET=your_secret_key_for_jwt
JWT_EXPIRE=7d
OPENROUTER_API_KEY=your_openrouter_api_key
FRONTEND_URL=http://localhost:5173
NODE_ENV=development
```

## Error Handling

The API returns consistent error responses:

```json
{
  "success": false,
  "message": "Error description",
  "errors": ["Field error 1", "Field error 2"]
}
```

Status codes:
- `200` - Success
- `201` - Created
- `400` - Bad Request
- `401` - Unauthorized
- `404` - Not Found
- `500` - Server Error

## Database Indexes

The application creates indexes for faster queries:
- `users`: email
- `candidates`: createdBy + email, skills, experience
- `shortlistedCandidates`: candidate + jobRequirement, createdBy, status

## Deployment

### Render Deployment Steps

1. Push code to GitHub
2. Create new service on Render
3. Connect GitHub repository
4. Set environment variables in Render dashboard
5. Deploy

### MongoDB Atlas Setup

1. Create cluster on MongoDB Atlas
2. Create database user
3. Whitelist IP addresses
4. Get connection string
5. Add to `.env` as `MONGODB_URI`

## License

MIT
