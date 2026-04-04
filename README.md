# CertifyHub

An event management system designed to streamline event creation, registration, and certificate generation.

## 📋 Overview

CertifyHub is a full-stack web application that enables users to create and manage events, register participants, and automatically generate certificates upon completion. The platform provides an intuitive interface for event organizers and seamless registration for participants.

## 🏗️ Project Structure

```
event-system/
├── client/                 # React + Vite frontend application
│   ├── src/
│   │   ├── pages/         # Page components (Auth, Dashboard, Events, Landing)
│   │   ├── components/    # Reusable components (Navbar)
│   │   ├── assets/        # Images and static assets
│   │   ├── App.jsx        # Main app component
│   │   └── main.jsx       # Entry point
│   ├── index.html         # HTML template
│   ├── vite.config.js     # Vite configuration
│   ├── tailwind.config.js # Tailwind CSS configuration
│   └── package.json       # Client dependencies
│
└── server/                # Node.js Express backend
    ├── routes/            # API route handlers
    │   ├── authRoutes.js
    │   ├── userRoutes.js
    │   ├── eventRoutes.js
    │   ├── registrationRoutes.js
    │   ├── certificateRoutes.js
    │   └── emailRoutes.js
    ├── models/            # Database models
    │   ├── User.js
    │   ├── Event.js
    │   └── Registration.js
    ├── middleware/        # Custom middleware
    │   └── authMiddleware.js
    ├── index.js           # Server entry point
    └── package.json       # Server dependencies
```

## 🚀 Getting Started

### Prerequisites

- Node.js (v14 or higher)
- npm or yarn
- MongoDB (if using local database)

### Installation

#### 1. Clone the Repository

```bash
git clone https://github.com/Harsh181507/CertifyHub.git
cd event-system
```

#### 2. Setup Server

```bash
cd server
npm install
```

Create a `.env` file in the server directory with the following variables:
```
PORT=5000
MONGODB_URI=your_mongodb_connection_string
JWT_SECRET=your_secret_key
EMAIL_SERVICE=your_email_service
EMAIL_USER=your_email
EMAIL_PASSWORD=your_email_password
```

#### 3. Setup Client

```bash
cd ../client
npm install
```

Create a `.env` file in the client directory with the following variables:
```
VITE_API_URL=http://localhost:5000
```

### Running the Application

#### Development Mode

**Terminal 1 - Start the Server:**
```bash
cd server
npm start
```

**Terminal 2 - Start the Client:**
```bash
cd client
npm run dev
```

The application will be available at:
- Client: `http://localhost:5173`
- Server: `http://localhost:5000`

#### Production Build

**Client:**
```bash
cd client
npm run build
```

## 📚 Available Scripts

### Client

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run lint` - Run ESLint

### Server

- `npm start` - Start the server
- `npm run dev` - Start with nodemon for development

## 🔑 Key Features

- **User Authentication** - Secure login and registration
- **Event Management** - Create and manage events
- **Event Registration** - Register participants for events
- **Certificate Generation** - Automatic certificate generation for event completions
- **Email Notifications** - Automated email communications
- **Responsive Design** - Mobile-friendly interface using Tailwind CSS

## 🛠️ Technology Stack

### Frontend

- React 18
- Vite
- Tailwind CSS
- RESTful API integration

### Backend

- Node.js
- Express.js
- MongoDB
- JWT Authentication
- Nodemailer (for email notifications)

## 📝 API Endpoints

### Authentication
- `POST /api/auth/register` - Register a new user
- `POST /api/auth/login` - Login user

### Users
- `GET /api/users/:id` - Get user profile
- `PUT /api/users/:id` - Update user profile

### Events
- `GET /api/events` - Get all events
- `POST /api/events` - Create new event (admin only)
- `GET /api/events/:id` - Get event details
- `PUT /api/events/:id` - Update event (admin only)
- `DELETE /api/events/:id` - Delete event (admin only)

### Registrations
- `POST /api/registrations` - Register for event
- `GET /api/registrations/:eventId` - Get event registrations
- `DELETE /api/registrations/:id` - Cancel registration

### Certificates
- `GET /api/certificates/:registrationId` - Generate certificate
- `POST /api/certificates/email` - Email certificate to participant

## 🔒 Environment Variables

### Server (.env)
```
PORT=5000
MONGODB_URI=mongodb://localhost:27017/certifyhub
JWT_SECRET=your_jwt_secret_key
JWT_EXPIRE=7d
EMAIL_SERVICE=gmail
EMAIL_USER=your_email@gmail.com
EMAIL_PASSWORD=your_app_password
NODE_ENV=development
```

### Client (.env)
```
VITE_API_URL=http://localhost:5000
```

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the LICENSE file for details.

## 👤 Author

**Harsh Verma**
- GitHub: [@Harsh181507](https://github.com/Harsh181507)

## 🙏 Acknowledgments

- React and Vite communities
- Tailwind CSS documentation
- Express.js guides
- MongoDB documentation

## 📞 Support

For support, email dev.kumarharshraj@gmail.com or open an issue on GitHub.

---

**Happy Coding! 🎉**
