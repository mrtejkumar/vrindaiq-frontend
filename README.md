# Vrinda IQ Frontend

## Overview
This project is a React application built with TypeScript and Vite. It includes Material-UI for UI components and FastAPI for backend integration.

## Features
- Authentication (Login and Registration)
- Dashboard with navigation sidebar
- Responsive design
- Animated UI elements

## Project Setup
### Prerequisites
- Node.js (v16 or higher)
- npm or yarn

### Installation
1. Clone the repository:
   ```bash
   git clone https://github.com/your-repo/vrindaiq-frontend.git
   ```
2. Navigate to the project directory:
   ```bash
   cd vrindaiq-frontend
   ```
3. Install dependencies:
   ```bash
   npm install
   ```

### Running the Application
1. Start the development server:
   ```bash
   npm run dev
   ```
2. Open the application in your browser:
   ```
   http://localhost:5173/
   ```

### Build for Production
```bash
npm run build
```

### Linting and Formatting
```bash
npm run lint
npm run format
```

## Packages Used
- React
- TypeScript
- Vite
- Material-UI
- React Router
- Axios

## Current Implementation
### Authentication
- Login and Registration pages integrated with FastAPI backend.
- Environment variables used for API endpoints.

### UI Enhancements
- Header and footer added to Login and Register pages.
- Animated welcome text.

### Routing
- Private routes for authenticated users.
- Redirects for unauthenticated users to login.

## Future Additions
- Heatmap visualization.
- Portfolio management.
- News and screener pages.
- Enhanced animations and transitions.

## Environment Variables
Create a `.env` file in the root directory with the following:
```
REACT_APP_API_BASE_URL=https://your-api-url.com
```

## Folder Structure
```
├── src
│   ├── components
│   ├── pages
│   ├── layouts
│   ├── services
│   ├── config
│   ├── assets
│   └── features
├── public
├── .gitignore
├── package.json
├── README.md
└── vite.config.ts
```

## Commands
- `npm run dev`: Start the development server.
- `npm run build`: Build the application for production.
- `npm run lint`: Run ESLint.
- `npm run format`: Format code using Prettier.

## Contributing
Feel free to fork the repository and submit pull requests.

## License
This project is licensed under the MIT License.
