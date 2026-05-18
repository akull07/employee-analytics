# Candidate Shortlist AI Frontend

Modern React frontend for AI-powered candidate shortlisting system built with Vite, Tailwind CSS, and Zustand.

## Features

- Modern responsive UI with Tailwind CSS
- JWT authentication
- Candidate management interface
- Job requirement creation and management
- AI-powered candidate shortlisting
- Real-time matching scores
- Interactive dashboard with analytics
- Skill-based filtering and search
- Mobile-first design

## Tech Stack

- **Framework**: React 18
- **Build Tool**: Vite
- **Styling**: Tailwind CSS
- **State Management**: Zustand
- **HTTP Client**: Axios
- **Charts**: Recharts
- **Notifications**: React Hot Toast
- **Icons**: React Icons
- **Routing**: React Router DOM

## Installation

1. Install dependencies:
   ```bash
   npm install
   ```

2. Create `.env` file:
   ```
   VITE_API_BASE_URL=http://localhost:5000/api
   ```

## Running the Development Server

```bash
npm run dev
```

The frontend will start at `http://localhost:5173`

## Building for Production

```bash
npm run build
```

The build output will be in the `dist/` folder.

## Project Structure

```
frontend/
├── src/
│   ├── components/          # Reusable components
│   │   ├── Navigation.jsx   # Sidebar and navbar
│   │   ├── Cards.jsx        # Card components
│   │   ├── Common.jsx       # Common UI components
│   │   └── ProtectedRoute.jsx
│   ├── pages/               # Page components
│   │   ├── LoginPage.jsx
│   │   ├── RegisterPage.jsx
│   │   ├── DashboardPage.jsx
│   │   ├── CandidatesPage.jsx
│   │   ├── AddCandidatePage.jsx
│   │   ├── JobsPage.jsx
│   │   ├── CreateJobPage.jsx
│   │   └── ShortlistPage.jsx
│   ├── services/
│   │   └── api.js           # API service layer
│   ├── store/               # Zustand stores
│   │   ├── authStore.js
│   │   ├── candidateStore.js
│   │   └── jobStore.js
│   ├── App.jsx              # Main app component
│   ├── main.jsx             # Entry point
│   └── index.css            # Global styles
├── index.html
├── vite.config.js
├── tailwind.config.js
├── postcss.config.js
└── package.json
```

## API Integration

The frontend communicates with the backend through the API service layer (`src/services/api.js`).

### Authentication Flow

1. User registers/logs in
2. Backend returns JWT token
3. Token stored in localStorage
4. Token added to all subsequent requests via Axios interceptor
5. Protected routes redirect to login if not authenticated

### State Management

Uses Zustand for lightweight state management:

- **authStore**: User authentication state
- **candidateStore**: Candidate data and operations
- **jobStore**: Job requirement data and operations

Each store includes:
- Data state
- Loading and error states
- Async actions for API calls
- Methods to update state

## Components

### Navigation
- `Sidebar`: Navigation menu (collapsible on mobile)
- `Navbar`: Top navigation bar

### Cards
- `CandidateCard`: Display candidate information
- `MatchScoreBar`: Visual score representation
- `SkillTag`: Individual skill display
- `FilterPanel`: Search and filter options
- `Pagination`: Page navigation

### Common
- `LoadingSpinner`: Loading state indicator
- `EmptyState`: No data message
- `Modal`: Modal dialog

### ProtectedRoute
- Guards authenticated routes
- Redirects to login if not authenticated

## Pages

### LoginPage
- User login form
- Link to registration

### RegisterPage
- User registration form
- Company and department information

### DashboardPage
- Analytics overview
- Quick statistics
- Action buttons

### CandidatesPage
- List all candidates
- Search and filter candidates
- Edit/delete candidates
- Pagination

### AddCandidatePage
- Form to add new candidate
- Dynamic skill input
- Education and social links

### JobsPage
- List all job requirements
- Show key details
- Quick action buttons

### CreateJobPage
- Form to create new job
- Required and preferred skills
- Experience and salary ranges

### ShortlistPage
- Select candidates for a job
- Multi-select with checkboxes
- Shortlist candidates

## Styling

The project uses Tailwind CSS with custom utilities defined in `src/index.css`:

- `.btn` - Button base styles
- `.btn-primary` - Primary button style
- `.btn-secondary` - Secondary button style
- `.btn-danger` - Danger button style
- `.card` - Card container style
- `.input` - Input field style
- `.badge` - Badge styles with variants
- `.modal` - Modal dialog style

## Environment Variables

```
VITE_API_BASE_URL=http://localhost:5000/api  # Backend API URL
```

## Deployment

### Vercel Deployment

1. Push code to GitHub
2. Connect repository to Vercel
3. Set environment variable `VITE_API_BASE_URL`
4. Deploy automatically on push

### Netlify Deployment

1. Connect GitHub repository
2. Set build command: `npm run build`
3. Set publish directory: `dist`
4. Add environment variables
5. Deploy

### Custom Server Deployment

```bash
npm run build
# Upload dist/ folder to your server
# Configure your web server to serve index.html for all routes
```

## Performance Optimizations

- Code splitting with React Router
- Lazy loading components
- Optimized Tailwind CSS bundle
- Efficient state management with Zustand
- Request debouncing for searches

## Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

## Contributing

Follow the existing code style and structure when adding new features.

## License

MIT
