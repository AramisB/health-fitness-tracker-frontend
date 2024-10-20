- Health & Fitness Tracker - Frontend
This is the frontend for the Health & Fitness Tracker app, built using React. It provides users with an intuitive interface to log exercises, set fitness goals, and track progress over time. The frontend consumes a RESTful API provided by the backend and displays user-specific data.

- Features
User authentication via login and registration forms.

Logged-in users can log exercises, view progress charts, and set fitness goals.

Fully responsive design optimized for mobile, tablet, and desktop views.

Uses Chart.js for visualizing user progress data.

Deployed on DigitalOcean for stable and reliable access.


- Technologies Used

React.js: JavaScript library for building the user interface.

React Router: For handling navigation between pages.

Axios: For making HTTP requests to the backend API.

Chart.js: For creating data visualizations of user progress.

Bootstrap/Custom CSS: For responsive design.

DigitalOcean: Cloud provider for hosting the frontend.

- Installation

Clone the Repository:

git clone https://github.com/AramisB/health-fitness-tracker-frontend.git

cd health-fitness-tracker-frontend

- Install Dependencies:

npm install

Set Up Environment Variables: Create a .env file in the root 
directory and add the following:

REACT_APP_API_URL=http://localhost:5000/api

Run the Frontend Development Server:

npm start

Access the App:

The app will be available at http://localhost:3000.

- Pages

/register - User registration form.

/login - User login form.

/log-exercise - Log exercises (only accessible after login).

/goals - Set fitness goals (only accessible after login).

/progress - View progress charts based on logged exercises (only accessible after login).

- Deployment

The frontend is deployed using DigitalOcean and can be accessed at:

https://monkfish-app-od5cu.ondigitalocean.app