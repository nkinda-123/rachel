# Cloud Portfolio Assignment

This project includes a personal portfolio frontend and a simple backend API.

## Structure
- `frontend/` — Static portfolio website ready for deployment to Vercel.
- `backend/` — Node.js Express backend API ready for deployment to Render.

## Deployment
1. Deploy `frontend/` on Vercel as a static site.
2. Deploy `backend/` on Render as a web service.
3. Update the backend URL in `frontend/script.js` if needed:
   - `const backendUrl = 'https://your-render-service.onrender.com/api';`

## Backend Endpoints
- `GET /api/portfolio` — portfolio JSON data
- `POST /api/contact` — contact form submissions

## Notes
- The frontend includes sections for profile, skills, qualifications, projects, and contact.
- The backend uses CORS so the frontend can post from a different domain.
