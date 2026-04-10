# CertifyHub - Event Management System

An event management platform designed to streamline event creation, participant registration, payment processing, and certificate generation.

## 📋 Table of Contents

- [Overview](#overview)
- [Features](#features)
- [Screenshots](#screenshots)
- [Tech Stack](#tech-stack)
- [Project Structure](#project-structure)
- [Prerequisites](#prerequisites)
- [Installation & Setup](#installation--setup)
- [Running the Application](#running-the-application)
- [Environment Variables](#environment-variables)
- [API Endpoints](#api-endpoints)
- [Database Models](#database-models)
- [Deployment](#deployment)
- [Contributing](#contributing)
- [License](#license)

## 🎯 Overview

CertifyHub is a full-stack web application that enables organizers to create and manage events, allows participants to register and pay for events, and automates certificate generation upon completion. The platform provides an intuitive interface for both event organizers and participants with features including payment processing via Razorpay, automated email notifications, and PDF certificate generation.

## ✨ Features

### For Event Organizers
- 🎪 Create and manage events with detailed information
- 👥 View event registrations and participant details
- 📊 Event analytics and attendance tracking
- 🎖️ Automatic certificate generation for participants
- 💰 Payment management and transaction tracking
- 📧 Automated email notifications to participants
- 🔐 Secure event management dashboard

### For Participants
- 🔍 Browse and discover events
- 📝 Easy event registration and checkout
- 💳 Integrated payment processing (Razorpay)
- ✅ Registration confirmation via email
- 🎓 Automatic certificate generation and download
- 📜 Certificate verification system
- 👤 User profile and registration history

### Platform Features
- 🔒 JWT-based authentication
- 🗄️ MongoDB database for reliability
- 📧 Email notifications with Nodemailer
- 📄 PDF certificate generation
- ⏱️ Scheduled cron jobs for automated tasks
- 🌐 CORS-enabled for cross-origin requests
- 🎨 Responsive UI with Tailwind CSS

## � Screenshots

### Landing Page & Navigation
<div style="display: flex; gap: 10px; margin-bottom: 20px; flex-wrap: wrap; justify-content: space-between;">
  <div style="flex: 0 1 calc(25% - 8px); text-align: center;">
    <img src="outputImages/Screenshot 2026-04-09 235055.png" alt="Landing Page" style="width: 100%; border-radius: 8px; box-shadow: 0 4px 6px rgba(0,0,0,0.1);">
    <p><small><strong>Landing Page</strong></small></p>
  </div>
  <div style="flex: 0 1 calc(25% - 8px); text-align: center;">
    <img src="outputImages/Screenshot 2026-04-09 235109.png" alt="Navigation & Features" style="width: 100%; border-radius: 8px; box-shadow: 0 4px 6px rgba(0,0,0,0.1);">
    <p><small><strong>Features Overview</strong></small></p>
  </div>
  <div style="flex: 0 1 calc(25% - 8px); text-align: center;">
    <img src="outputImages/Screenshot 2026-04-09 235117.png" alt="Event Discovery" style="width: 100%; border-radius: 8px; box-shadow: 0 4px 6px rgba(0,0,0,0.1);">
    <p><small><strong>Event Discovery</strong></small></p>
  </div>
  <div style="flex: 0 1 calc(25% - 8px); text-align: center;">
    <img src="outputImages/Screenshot 2026-04-09 235203.png" alt="Event Details" style="width: 100%; border-radius: 8px; box-shadow: 0 4px 6px rgba(0,0,0,0.1);">
    <p><small><strong>Event Details</strong></small></p>
  </div>
</div>

### Event Registration & Payment
<div style="display: flex; gap: 10px; margin-bottom: 20px; flex-wrap: wrap; justify-content: space-between;">
  <div style="flex: 0 1 calc(25% - 8px); text-align: center;">
    <img src="outputImages/Screenshot 2026-04-09 235213.png" alt="Registration Form" style="width: 100%; border-radius: 8px; box-shadow: 0 4px 6px rgba(0,0,0,0.1);">
    <p><small><strong>Registration Form</strong></small></p>
  </div>
  <div style="flex: 0 1 calc(25% - 8px); text-align: center;">
    <img src="outputImages/Screenshot 2026-04-09 235220.png" alt="Payment Gateway" style="width: 100%; border-radius: 8px; box-shadow: 0 4px 6px rgba(0,0,0,0.1);">
    <p><small><strong>Payment Processing</strong></small></p>
  </div>
  <div style="flex: 0 1 calc(25% - 8px); text-align: center;">
    <img src="outputImages/Screenshot 2026-04-09 235232.png" alt="Payment Success" style="width: 100%; border-radius: 8px; box-shadow: 0 4px 6px rgba(0,0,0,0.1);">
    <p><small><strong>Payment Success</strong></small></p>
  </div>
  <div style="flex: 0 1 calc(25% - 8px); text-align: center;">
    <img src="outputImages/Screenshot 2026-04-09 235256.png" alt="Certificate Generation" style="width: 100%; border-radius: 8px; box-shadow: 0 4px 6px rgba(0,0,0,0.1);">
    <p><small><strong>Certificate Generated</strong></small></p>
  </div>
</div>

### Dashboard & User Profile
<div style="display: flex; gap: 10px; margin-bottom: 20px; flex-wrap: wrap; justify-content: space-between;">
  <div style="flex: 0 1 calc(25% - 8px); text-align: center;">
    <img src="outputImages/Screenshot 2026-04-09 235343.png" alt="User Dashboard" style="width: 100%; border-radius: 8px; box-shadow: 0 4px 6px rgba(0,0,0,0.1);">
    <p><small><strong>User Dashboard</strong></small></p>
  </div>
  <div style="flex: 0 1 calc(25% - 8px); text-align: center;">
    <img src="outputImages/Screenshot 2026-04-09 235351.png" alt="User Profile" style="width: 100%; border-radius: 8px; box-shadow: 0 4px 6px rgba(0,0,0,0.1);">
    <p><small><strong>User Profile</strong></small></p>
  </div>
  <div style="flex: 0 1 calc(25% - 8px); text-align: center;">
    <img src="outputImages/Screenshot 2026-04-09 235359.png" alt="Organizer Dashboard" style="width: 100%; border-radius: 8px; box-shadow: 0 4px 6px rgba(0,0,0,0.1);">
    <p><small><strong>Organizer Dashboard</strong></small></p>
  </div>
  <div style="flex: 0 1 calc(25% - 8px); text-align: center;">
    <img src="outputImages/Screenshot 2026-04-09 235406.png" alt="My Registrations" style="width: 100%; border-radius: 8px; box-shadow: 0 4px 6px rgba(0,0,0,0.1);">
    <p><small><strong>My Registrations</strong></small></p>
  </div>
</div>

### Additional Features & Pages
<div style="display: flex; gap: 10px; margin-bottom: 20px; flex-wrap: wrap; justify-content: space-between;">
  <div style="flex: 0 1 calc(25% - 8px); text-align: center;">
    <img src="outputImages/Screenshot 2026-04-09 235412.png" alt="Certificate Verification" style="width: 100%; border-radius: 8px; box-shadow: 0 4px 6px rgba(0,0,0,0.1);">
    <p><small><strong>Certificate Verify</strong></small></p>
  </div>
  <div style="flex: 0 1 calc(25% - 8px); text-align: center;">
    <img src="outputImages/Screenshot 2026-04-09 235422.png" alt="About Page" style="width: 100%; border-radius: 8px; box-shadow: 0 4px 6px rgba(0,0,0,0.1);">
    <p><small><strong>About Page</strong></small></p>
  </div>
  <div style="flex: 0 1 calc(25% - 8px); text-align: center;">
    <img src="outputImages/Screenshot 2026-04-09 235433.png" alt="Contact Page" style="width: 100%; border-radius: 8px; box-shadow: 0 4px 6px rgba(0,0,0,0.1);">
    <p><small><strong>Contact Page</strong></small></p>
  </div>
  <div style="flex: 0 1 calc(25% - 8px); text-align: center;">
    <img src="outputImages/Screenshot 2026-04-09 235440.png" alt="Pricing Plans" style="width: 100%; border-radius: 8px; box-shadow: 0 4px 6px rgba(0,0,0,0.1);">
    <p><small><strong>Pricing Plans</strong></small></p>
  </div>
</div>

### Additional Page Views
<div style="display: flex; gap: 10px; margin-bottom: 20px; flex-wrap: wrap; justify-content: space-between;">
  <div style="flex: 0 1 calc(33.33% - 7px); text-align: center;">
    <img src="outputImages/Screenshot 2026-04-10 000014.png" alt="Event Community" style="width: 100%; border-radius: 8px; box-shadow: 0 4px 6px rgba(0,0,0,0.1);">
    <p><small><strong>Event Community</strong></small></p>
  </div>
  <div style="flex: 0 1 calc(33.33% - 7px); text-align: center;">
    <img src="outputImages/Screenshot 2026-04-10 000035.png" alt="Integrations Page" style="width: 100%; border-radius: 8px; box-shadow: 0 4px 6px rgba(0,0,0,0.1);">
    <p><small><strong>Integrations</strong></small></p>
  </div>
</div>

## �🛠️ Tech Stack

### Frontend
- **Framework**: React 19.2
- **Build Tool**: Vite 8
- **Styling**: Tailwind CSS
- **Routing**: React Router v7
- **HTTP Client**: Axios
- **Animations**: Framer Motion
- **Other**: PostCSS, Autoprefixer

### Backend
- **Runtime**: Node.js (v18+)
- **Framework**: Express 5.2
- **Database**: MongoDB with Mongoose
- **Authentication**: JsonWebToken (JWT), bcryptjs
- **Payments**: Razorpay SDK
- **PDF Generation**: pdf-lib
- **Email**: Nodemailer
- **Validation**: express-validator
- **Scheduling**: node-cron
- **CORS**: cors middleware

## 🏗️ Project Structure

```
event-system/
├── client/                          # React + Vite frontend
│   ├── src/
│   │   ├── pages/                  # Page components
│   │   │   ├── Landing.jsx         # Home page
│   │   │   ├── Auth.jsx            # Login/Signup
│   │   │   ├── Events.jsx          # Browse events
│   │   │   ├── EventLanding.jsx    # Event details
│   │   │   ├── Dashboard.jsx       # Organizer dashboard
│   │   │   ├── Register.jsx        # Event registration
│   │   │   ├── VerifyCertificate.jsx # Certificate verification
│   │   │   ├── Profile.jsx         # User profile
│   │   │   ├── PaymentSuccess.jsx  # Payment confirmation
│   │   │   ├── PaymentFailure.jsx  # Payment error
│   │   │   ├── EventCommunity.jsx  # Community features
│   │   │   ├── Pricing.jsx         # Pricing page
│   │   │   ├── About.jsx           # About page
│   │   │   ├── Contact.jsx         # Contact page
│   │   │   ├── Help.jsx            # Help/FAQ
│   │   │   ├── Blog.jsx            # Blog
│   │   │   ├── Integrations.jsx    # Integrations
│   │   │   └── OrganizerProfile.jsx # Organizer profile
│   │   ├── components/
│   │   │   ├── Navbar.jsx          # Navigation bar
│   │   │   ├── Footer.jsx          # Footer
│   │   │   └── RegistrationModal.jsx # Modal for registration
│   │   ├── assets/                 # Images and static files
│   │   ├── App.jsx                 # Main app component
│   │   ├── App.css                 # Global styles
│   │   ├── index.css               # Base styles
│   │   └── main.jsx                # React DOM render
│   ├── public/
│   ├── index.html                  # HTML entry point
│   ├── vite.config.js              # Vite config
│   ├── tailwind.config.js          # Tailwind config
│   ├── eslint.config.js            # ESLint config
│   ├── postcss.config.js           # PostCSS config
│   └── package.json
│
├── server/                          # Express backend
│   ├── routes/                     # API route handlers
│   │   ├── authRoutes.js           # Authentication endpoints
│   │   ├── userRoutes.js           # User management
│   │   ├── eventRoutes.js          # Event CRUD operations
│   │   ├── registrationRoutes.js   # Event registration
│   │   ├── certificateRoutes.js    # Certificate generation & verification
│   │   ├── emailRoutes.js          # Email notifications
│   │   └── paymentRoutes.js        # Payment processing
│   ├── models/                     # Mongoose schemas
│   │   ├── User.js                 # User model
│   │   ├── Event.js                # Event model
│   │   └── Registration.js         # Registration model
│   ├── middleware/
│   │   └── authMiddleware.js       # JWT verification middleware
│   ├── index.js                    # Server entry point
│   ├── cronJob.js                  # Scheduled tasks
│   ├── seedEvents.js               # Database seeding script
│   └── package.json
│
├── BACKEND_REPO_SETUP.md           # Backend setup guide
├── RENDER_DEPLOYMENT.md            # Render deployment guide
├── RAILWAY_DEPLOYMENT.md           # Railway deployment guide
├── setup-backend-repo.sh            # Linux/Mac setup script
├── setup-backend-repo.ps1           # Windows setup script
└── README.md                        # This file
```

## 📋 Prerequisites

Before you begin, ensure you have the following installed:

- **Node.js**: v18.0.0 or higher ([Download](https://nodejs.org/))
- **npm** or **yarn**: Package managers for Node.js
- **MongoDB**: v4.4 or higher ([Download](https://www.mongodb.com//) or use [MongoDB Atlas](https://www.mongodb.com/cloud/atlas))
- **Git**: Version control system

## 🚀 Installation & Setup

### Option 1: Manual Setup

#### Step 1: Clone the Repository

```bash
git clone https://github.com/Harsh181507/CertifyHub.git
cd event-system
```

#### Step 2: Setup Backend

```bash
cd server
npm install
```

#### Step 3: Setup Frontend

```bash
cd ../client
npm install
```

### Option 2: Automated Setup (Recommended)

**For Windows (PowerShell):**
```bash
.\setup-backend-repo.ps1
```

**For Linux/Mac (Bash):**
```bash
bash setup-backend-repo.sh
```

## 🔐 Environment Variables

### Server Configuration

Create a `.env` file in the `server/` directory:

```env
# Server
PORT=5000
NODE_ENV=development

# Database
MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/event-system?retryWrites=true&w=majority

# Authentication
JWT_SECRET=your_jwt_secret_key_here
JWT_EXPIRE=7d

# Email Service (using Gmail or other providers)
EMAIL_SERVICE=gmail
EMAIL_USER=your_email@gmail.com
EMAIL_PASSWORD=your_app_password

# Razorpay Payment Gateway
RAZORPAY_KEY_ID=your_razorpay_key_id
RAZORPAY_KEY_SECRET=your_razorpay_key_secret

# Frontend URL (for CORS)
CLIENT_URL=http://localhost:5173

# Other Services (optional)
OPENAI_API_KEY=your_openai_key
STRIPE_SECRET_KEY=your_stripe_key
```

### Client Configuration

Create a `.env` file in the `client/` directory:

```env
VITE_API_URL=http://localhost:5000
VITE_APP_NAME=CertifyHub
```

## ▶️ Running the Application

### Development Mode

**Terminal 1 - Start Backend Server:**
```bash
cd server
npm run dev
```

**Terminal 2 - Start Frontend Application (in a new terminal):**
```bash
cd client
npm run dev
```

The application will be available at:
- **Frontend**: http://localhost:5173
- **Backend**: http://localhost:5000

### Production Build

**Build Frontend:**
```bash
cd client
npm run build
npm run preview  # Preview the production build locally
```

**Start Backend in Production:**
```bash
cd server
NODE_ENV=production npm start
```

## 📚 Available Scripts

### Client Scripts

```bash
npm run dev      # Start development server with hot reload
npm run build    # Build for production (dist/)
npm run preview  # Preview the production build
npm run lint     # Run ESLint to check code quality
```

### Server Scripts

```bash
npm start        # Start the production server
npm run dev      # Start with nodemon for auto-reload during development
```

## 🔌 API Endpoints Overview

### Authentication Routes (`/api/auth`)
| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | `/register` | Register a new user |
| POST | `/login` | User login |
| POST | `/refresh` | Refresh JWT token |

### User Routes (`/api/users`)
| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/:id` | Get user profile |
| PUT | `/:id` | Update user profile |
| DELETE | `/:id` | Delete user account |

### Event Routes (`/api/events`)
| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/` | Get all events |
| POST | `/` | Create new event |
| GET | `/:id` | Get event details |
| PUT | `/:id` | Update event |
| DELETE | `/:id` | Delete event |

### Registration Routes (`/api/registrations`)
| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | `/` | Register participant for event |
| GET | `/:eventId` | Get event registrations |
| GET | `/user/:userId` | Get user's registrations |
| DELETE | `/:id` | Cancel registration |

### Certificate Routes (`/api/certificates`)
| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/:registrationId` | Generate/download certificate |
| POST | `/verify` | Verify certificate authenticity |
| POST | `/email` | Email certificate to participant |

### Payment Routes (`/api/payments`)
| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | `/create-order` | Create Razorpay payment order |
| POST | `/verify` | Verify payment success |

### Email Routes (`/api/email`)
| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | `/send` | Send email notification |
| POST | `/reminder` | Send event reminder email |

## 📦 Database Models

### User Model
```javascript
{
  _id: ObjectId,
  firstName: String,
  lastName: String,
  email: String (unique),
  password: String (hashed),
  phone: String,
  role: String (enum: ['user', 'organizer', 'admin']),
  profileImage: String (URL),
  createdAt: Date,
  updatedAt: Date
}
```

### Event Model
```javascript
{
  _id: ObjectId,
  title: String,
  description: String,
  category: String,
  date: Date,
  startTime: String,
  endTime: String,
  location: String,
  maxParticipants: Number,
  registeredCount: Number,
  price: Number,
  organizer: ObjectId (ref: User),
  image: String (URL),
  certificateTemplate: String,
  status: String (enum: ['upcoming', 'ongoing', 'completed', 'cancelled']),
  createdAt: Date,
  updatedAt: Date
}
```

### Registration Model
```javascript
{
  _id: ObjectId,
  user: ObjectId (ref: User),
  event: ObjectId (ref: Event),
  registrationDate: Date,
  paymentStatus: String (enum: ['pending', 'completed', 'failed']),
  paymentId: String,
  certificateGenerated: Boolean,
  certificateUrl: String,
  attendanceStatus: String (enum: ['pending', 'attended', 'absent']),
  createdAt: Date,
  updatedAt: Date
}
```

## 🚀 Deployment

### Render Deployment

See [RENDER_DEPLOYMENT.md](./RENDER_DEPLOYMENT.md) for detailed instructions on deploying to Render.

### Railway Deployment

See [RAILWAY_DEPLOYMENT.md](./RAILWAY_DEPLOYMENT.md) for detailed instructions on deploying to Railway.

### Vercel Deployment (Frontend)

See [client/VERCEL_DEPLOYMENT.md](./client/VERCEL_DEPLOYMENT.md) for frontend deployment details.

### Manual Deployment Steps

1. **Build the application:**
   ```bash
   # Backend
   cd server
   npm install --production
   
   # Frontend
   cd ../client
   npm install
   npm run build
   ```

2. **Set environment variables** on your hosting platform

3. **Start the server:**
   ```bash
   npm start
   ```

## 🔐 Security Features

- **JWT Authentication** - Secure token-based authentication
- **Password Hashing** - bcryptjs for secure password storage
- **CORS Configuration** - Restricted cross-origin requests
- **Input Validation** - express-validator for request validation
- **Environment Variables** - Sensitive data stored securely
- **Middleware Protection** - Auth middleware for protected routes

## 🔧 Configuration Files

### Vite Configuration
- [vite.config.js](./client/vite.config.js) - Frontend build configuration
- [postcss.config.js](./client/postcss.config.js) - CSS processing
- [tailwind.config.js](./client/tailwind.config.js) - Tailwind CSS customization

### Express Configuration
- [index.js](./server/index.js) - Server setup and middleware
- [middleware/authMiddleware.js](./server/middleware/authMiddleware.js) - JWT verification
- [cronJob.js](./server/cronJob.js) - Scheduled tasks (email reminders, etc.)

## 📊 Project Statistics

- **Total Pages**: 24+ (Landing, Dashboard, Events, etc.)
- **API Routes**: 30+ endpoints
- **Database Models**: 3 main collections
- **Components**: Reusable UI components with animations

## ✅ Testing

To test the application:

1. **Create test events** using the dashboard
2. **Register for events** with test user accounts
3. **Process test payments** using Razorpay test credentials
4. **Verify certificate generation** for completed registrations
5. **Check email notifications** in your email inbox

### Test Credentials (Razorpay)

For payment testing, use Razorpay's test credentials:
- Card Number: `4111 1111 1111 1111`
- Expiry: Any future date
- CVV: Any 3 digits

## 🤝 Contributing

We welcome contributions! Please follow these steps:

1. **Fork the repository**
   ```bash
   git clone https://github.com/Harsh181507/CertifyHub.git
   ```

2. **Create a feature branch**
   ```bash
   git checkout -b feature/your-feature-name
   ```

3. **Make your changes** and commit
   ```bash
   git commit -m 'Add your feature description'
   ```

4. **Push to the branch**
   ```bash
   git push origin feature/your-feature-name
   ```

5. **Open a Pull Request** with a clear description of changes

### Code Style Guidelines

- Use consistent naming conventions
- Add comments for complex logic
- Follow existing code patterns
- Test your changes before submitting

## 🐛 Bug Reports

If you find a bug, please:
1. Check if it's already reported in Issues
2. Provide a clear description and steps to reproduce
3. Include screenshots or error messages if applicable
4. Submit an issue on GitHub

## 📄 License

This project is licensed under the **MIT License** - see the [LICENSE](./LICENSE) file for details.

## 👤 Author

**Harsh Verma**
- GitHub: [@Harsh181507](https://github.com/Harsh181507)
- Email: dev.kumarharshraj@gmail.com

## 🙏 Acknowledgments

- **React & React Router** - UI framework and routing
- **Vite** - Fast build tool and dev server
- **Tailwind CSS** - Utility-first CSS framework
- **Express.js** - Backend web framework
- **MongoDB** - NoSQL database
- **Razorpay** - Payment gateway
- **Nodemailer** - Email service
- **Framer Motion** - Animation library
- All open-source contributors and the community

## 📞 Support & Contact

- **Issues**: Report bugs on [GitHub Issues](https://github.com/Harsh181507/CertifyHub/issues)
- **Email**: dev.kumarharshraj@gmail.com
- **Documentation**: Refer to deployment guides in the root directory

## 🎯 Roadmap

Planned features for future releases:
- [ ] Real-time notifications
- [ ] Advanced analytics dashboard
- [ ] Group event registrations
- [ ] Custom certificate templates
- [ ] Mobile app
- [ ] API rate limiting
- [ ] Advanced search and filters
- [ ] Social sharing features

## 🎉 Quick Start Summary

```bash
# 1. Clone repository
git clone https://github.com/Harsh181507/CertifyHub.git
cd event-system

# 2. Setup (choose one)
# Option A: Manual
cd server && npm install && cd ../client && npm install

# Option B: Automated script
./setup-backend-repo.ps1  # Windows
bash setup-backend-repo.sh # Linux/Mac

# 3. Configure environment variables
# Create .env files in both server/ and client/ directories

# 4. Run development server
# Terminal 1:
cd server && npm run dev

# Terminal 2:
cd client && npm run dev

# 5. Open browser
# Go to http://localhost:5173
```

---

**Made with ❤️ by the CertifyHub Team**

**Happy Coding! 🚀**
