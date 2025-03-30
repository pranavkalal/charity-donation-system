# Charity Donation System

This is a full-stack web application that allows users to register, log in, view active charity campaigns, and make donations. The system includes user authentication, campaign listings, donation history, and is deployed using GitHub Actions and AWS EC2.

## Features

- User registration and login with JWT authentication
- View and browse active charity campaigns
- Make donations to selected campaigns
- View donation history
- RESTful API built with Node.js and Express
- MongoDB for database management
- CI/CD pipeline with GitHub Actions
- Deployed on Amazon EC2 with NGINX as a reverse proxy

## Tech Stack

**Frontend:**
- React
- Axios
- React Router

**Backend:**
- Node.js
- Express
- Mongoose (MongoDB)
- JWT for authentication

**Deployment:**
- GitHub Actions for CI/CD
- PM2 for process management
- NGINX as reverse proxy
- Amazon EC2 for hosting


## How to Run Locally

1. **Clone the repository:**
   ```bash
   git clone https://github.com/your-username/charity-donation-system.git
   
cd backend
npm install
npm run dev

cd frontend
yarn install
yarn start

PORT=5002
MONGO_URI=your_mongodb_uri
JWT_SECRET=your_jwt_secret


## CI/CD Workflow

Pushes to the main branch trigger GitHub Actions
Tests are run before deployment
Successful builds are deployed to EC2 via SSH
PM2 and NGINX handle backend and frontend services

## License

This project is for educational purposes.
