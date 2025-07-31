# Learning Management System (LMS) Portal

A comprehensive Learning Management System built with .NET 8 Web API backend and Angular 19 frontend, designed to provide a complete learning experience for administrators, instructors, and learners.

## 🌟 Overview

This Learning Portal is a full-stack web application that enables organizations to create, manage, and deliver educational content effectively. The system supports multiple user roles including Admins, Subject Matter Experts (SMEs), Teaching Assistants (TAs), and Users, each with specific permissions and functionalities.

## 🏗️ Architecture

```
Learning-Portal/
├── Backend/           # .NET 8 Web API
│   └── lmsBackend/    # Main API project
└── Frontend/          # Angular 19 SPA
```

### Backend (.NET 8 Web API)
- **Framework**: .NET 8
- **Database**: SQL Server with Entity Framework Core 8.0
- **Architecture**: Repository Pattern with Dependency Injection
- **Authentication**: JWT-based authentication
- **API Documentation**: Swagger/OpenAPI

### Frontend (Angular 19)
- **Framework**: Angular 19
- **UI Libraries**: Bootstrap 5, PrimeNG, Material Design Bootstrap
- **Styling**: TailwindCSS, Custom CSS
- **State Management**: RxJS Observables
- **Authentication**: JWT token-based with guards

## ✨ Key Features

### 👥 User Management
- **Multi-role Support**: Admin, SME, TA, and User roles
- **User Authentication**: Secure login/logout with JWT tokens
- **Profile Management**: User profile creation and editing
- **Password Management**: Change password and forgot password functionality

### 📚 Course Management
- **Course Creation**: Create and manage courses with rich content
- **Module System**: Organize content into modules and sub-modules
- **Category Management**: Categorize courses by subjects/topics
- **Course Enrollment**: User enrollment and progress tracking

### 🎓 Learning Content
- **Video Lessons**: Upload and stream video content
- **Assignments**: Create and manage assignments with file uploads
- **Quizzes**: Interactive quiz system with CSV import
- **Resources**: PDF and document management
- **Certificates**: Generate completion certificates

### 📊 Analytics & Reporting
- **Progress Tracking**: Monitor user learning progress
- **Completion Reports**: Generate detailed completion reports
- **Dashboard Analytics**: Visual representations with Chart.js
- **Export Functionality**: Export reports to PDF

### 🔧 Administrative Features
- **Line of Business (LOB)**: Organize content by business units
- **Content Management**: Rich content editor with media support
- **File Management**: Organized file storage for images, videos, and documents
- **System Configuration**: Manage system settings and configurations

## 🚀 Technologies Used

### Backend Stack
- **.NET 8**: Latest .NET framework
- **Entity Framework Core 8.0**: ORM for database operations
- **SQL Server**: Primary database
- **AutoMapper**: Object-to-object mapping
- **BCrypt.Net**: Password hashing
- **Swagger**: API documentation

### Frontend Stack
- **Angular 19**: Latest Angular framework
- **TypeScript**: Type-safe JavaScript
- **Bootstrap 5**: Responsive UI framework
- **PrimeNG**: Rich UI component library
- **Chart.js**: Data visualization
- **Video.js**: Video player
- **GSAP**: Animations
- **HTML2Canvas & jsPDF**: PDF generation

### Development Tools
- **Angular CLI**: Development tooling
- **Entity Framework Migrations**: Database versioning
- **CORS**: Cross-origin resource sharing
- **JWT**: JSON Web Tokens for authentication

## 📋 Prerequisites

Before running this application, make sure you have the following installed:

- **.NET 8 SDK** or later
- **Node.js** (v18 or later) and **npm**
- **SQL Server** (LocalDB, Express, or Full version)
- **Angular CLI**: `npm install -g @angular/cli`
- **Git** for version control

## 🛠️ Installation & Setup

### 1. Clone the Repository
```bash
git clone <repository-url>
cd Learning-Portal
```

### 2. Backend Setup

#### Navigate to Backend Directory
```bash
cd Backend/lmsBackend
```

#### Configure Database Connection
Edit `appsettings.json` and update the connection string:
```json
{
  "ConnectionStrings": {
    "DefaultConnection": "Server=YOUR_SERVER;Database=LMSDatabase;Trusted_Connection=true;TrustServerCertificate=true"
  }
}
```

#### Install Dependencies & Run Migrations
```bash
# Restore NuGet packages
dotnet restore

# Create database and apply migrations
dotnet ef database update

# Run the API
dotnet run
```

The API will be available at: `https://localhost:5001` or `http://localhost:5000`

### 3. Frontend Setup

#### Navigate to Frontend Directory
```bash
cd Frontend
```

#### Install Dependencies
```bash
npm install
```

#### Configure API Endpoint
Update the API base URL in your environment files to match your backend URL.

#### Run the Application
```bash
ng serve
```

The application will be available at: `http://localhost:4200`

## 📚 API Documentation

Once the backend is running, you can access the Swagger documentation at:
- **Swagger UI**: `https://localhost:5001/swagger`

### Main API Endpoints

#### Authentication
- `POST /api/auth/login` - User login
- `POST /api/auth/register` - User registration
- `POST /api/auth/forgot-password` - Forgot password

#### Users & Roles
- `GET /api/users` - Get all users
- `POST /api/users` - Create user
- `GET /api/roles` - Get all roles
- `POST /api/admins` - Create admin

#### Courses & Content
- `GET /api/courses` - Get all courses
- `POST /api/courses` - Create course
- `GET /api/modules` - Get course modules
- `POST /api/modules` - Create module

#### Categories & LOBs
- `GET /api/categories` - Get categories
- `POST /api/categories` - Create category
- `GET /api/lobs` - Get Lines of Business

## 🔒 Security Features

- **JWT Authentication**: Secure token-based authentication
- **Password Hashing**: BCrypt for secure password storage
- **Role-based Authorization**: Different access levels for different user types
- **CORS Configuration**: Controlled cross-origin access
- **Input Validation**: Comprehensive input validation and sanitization

## 📁 Project Structure

### Backend Structure
```
Backend/lmsBackend/
├── Controllers/          # API Controllers
├── Models/              # Entity models
├── Dtos/                # Data Transfer Objects
├── Repository/          # Repository pattern implementation
├── DataAccessLayer/     # Entity Framework DbContext
├── AutomapperProfile/   # AutoMapper configurations
└── wwwroot/            # Static file storage
    ├── uploadImages/    # Course images
    ├── VideoUpload/     # Video files
    ├── PdfUpload/      # PDF documents
    └── uploadQuiz/     # Quiz files
```

### Frontend Structure
```
Frontend/src/
├── app/
│   ├── components/      # Angular components
│   │   ├── dashboard/   # Admin dashboard components
│   │   ├── main/       # Main user interface components
│   │   └── unauthorized/ # Unauthorized access components
│   ├── services/       # Angular services
│   ├── guards/         # Route guards
│   ├── models/         # TypeScript interfaces
│   └── app.module.ts   # Main app module
├── assets/             # Static assets
└── styles.css          # Global styles
```

## 🎯 User Roles & Permissions

### Admin
- Full system access
- User management (create, edit, delete users)
- Course and content management
- System configuration
- Analytics and reporting

### Subject Matter Expert (SME)
- Create and manage courses
- Upload learning materials
- Create assignments and quizzes
- Monitor learner progress

### Teaching Assistant (TA)
- Assist with course delivery
- Grade assignments
- Provide learner support
- Generate reports

### User/Learner
- Access enrolled courses
- Complete assignments and quizzes
- Track learning progress
- Download certificates

## 🔧 Configuration

### Environment Variables
Create environment-specific configuration files:

#### Backend (`appsettings.Development.json`)
```json
{
  "ConnectionStrings": {
    "DefaultConnection": "Your development database connection string"
  },
  "Logging": {
    "LogLevel": {
      "Default": "Information"
    }
  }
}
```

#### Frontend Environment Files
- `src/environments/environment.ts` - Development
- `src/environments/environment.prod.ts` - Production

## 🧪 Testing

### Backend Testing
```bash
cd Backend/lmsBackend
dotnet test
```

### Frontend Testing
```bash
cd Frontend
ng test
ng e2e
```

## 🚀 Deployment

### Backend Deployment
1. Publish the application:
```bash
dotnet publish -c Release
```

2. Deploy to your hosting platform (IIS, Azure, AWS, etc.)
3. Update connection strings for production
4. Configure SSL certificates

### Frontend Deployment
1. Build for production:
```bash
ng build --prod
```

2. Deploy the `dist/` folder to your web server
3. Configure routing for Single Page Application

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch: `git checkout -b feature/new-feature`
3. Commit your changes: `git commit -am 'Add new feature'`
4. Push to the branch: `git push origin feature/new-feature`
5. Submit a pull request

### Development Guidelines
- Follow established coding conventions
- Write meaningful commit messages
- Add appropriate tests for new features
- Update documentation as needed

## 📝 License

This project is licensed under the MIT License - see the LICENSE file for details.

## 🆘 Support

For support and questions:
- Create an issue in the repository
- Check existing documentation
- Review API documentation in Swagger

## 🗺️ Roadmap

### Upcoming Features
- [ ] Real-time notifications with SignalR
- [ ] Mobile application support
- [ ] Advanced analytics dashboard
- [ ] Integration with external learning platforms
- [ ] Multilingual support
- [ ] Advanced quiz types and assessments

## 📊 Performance Considerations

- **Database Optimization**: Proper indexing and query optimization
- **Caching**: Implement caching strategies for frequently accessed data
- **File Storage**: Consider cloud storage for large files
- **CDN**: Use Content Delivery Network for static assets
- **Lazy Loading**: Implement lazy loading for Angular modules

---
