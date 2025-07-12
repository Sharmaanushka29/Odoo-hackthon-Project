
# STACKIT- Q&A Platform

A minimal, clean, and user-friendly Q&A web application designed for structured knowledge sharing and collaborative learning. Built with React, Tailwind CSS, and modern web technologies.

## Features

### Core Functionality
- *Question & Answer System*: Users can ask questions and provide answers with rich text formatting
- *Voting System*: Upvote/downvote questions and answers
- *Answer Acceptance*: Question authors can mark the best answer as accepted
- *Tag System*: Organize questions with relevant tags and filter by tags
- *User Authentication*: Login/signup with guest browsing support
- *Notification System*: Real-time notifications for user interactions

### User Roles
- *Guest*: Browse all questions and answers (read-only)
- *User*: Full access to post questions, answers, vote, and receive notifications
- *Admin*: Moderate content and manage tags (framework ready)

### UI/UX Features
- *Clean Design*: Minimal layout with white background and subtle shadows
- *Responsive*: Optimized for both desktop and mobile devices
- *Rich Text Editor*: Support for bold, italic, lists, links, and more
- *Real-time Updates*: Live vote counts and notifications
- *Intuitive Navigation*: Easy-to-use interface with clear visual hierarchy

## Technology Stack

- *Frontend*: React 19, Vite
- *Styling*: Tailwind CSS, shadcn/ui components
- *Icons*: Lucide React
- *Routing*: React Router DOM
- *State Management*: React Context API
- *Form Handling*: React Hook Form with Zod validation

## Getting Started

### Prerequisites
- Node.js 18+ 
- pnpm (recommended) or npm

### Installation

1. Clone the repository:
bash
git clone <repository-url>
cd stackit


2. Install dependencies:
bash
pnpm install


3. Start the development server:
bash
pnpm run dev


4. Open your browser and navigate to http://localhost:5173

### Building for Production

bash
pnpm run build


The built files will be in the dist directory, ready for deployment.

## Deployment

### Vercel (Recommended)

1. Push your code to GitHub
2. Connect your GitHub repository to Vercel
3. Vercel will automatically detect it's a Vite project and deploy it

### Manual Deployment

1. Build the project: pnpm run build
2. Upload the dist folder contents to your web server
3. Configure your server to serve index.html for all routes (SPA routing)

## Project Structure


src/

├── components/
│   ├── ui/              # shadcn/ui components
│   └── Navbar.jsx       # Navigation component
├── pages/
│   ├── HomePage.jsx     # Main question listing
│   ├── AskQuestion.jsx  # Question submission form
│   ├── QuestionDetail.jsx # Individual question view
│   ├── LoginPage.jsx    # User authentication
│   ├── SignupPage.jsx   # User registration
│   └── TagPage.jsx      # Tag-filtered questions
├── App.jsx              # Main app component with routing
├── App.css              # Global styles
└── main.jsx             # Application entry point


## Features in Detail

### Question Management
- Rich text editor with formatting toolbar
- Tag-based categorization (up to 5 tags per question)
- Question validation and error handling
- View counts and engagement metrics

### Answer System
- Threaded answer display
- Answer acceptance by question author
- Visual highlighting for accepted answers
- Answer voting and ranking

### User Experience
- Guest mode for browsing without registration
- Persistent login state
- Real-time notification system
- Responsive design for all screen sizes

## Contributing

1. Fork the repository
2. Create a feature branch: git checkout -b feature-name
3. Commit your changes: git commit -am 'Add feature'
4. Push to the branch: git push origin feature-name
5. Submit a pull request

## License

This project is open source and available under the [MIT License](LICENSE).

## Support

For support, please open an issue on GitHub or contact the development team.

---

Built with ❤ for the developer community
