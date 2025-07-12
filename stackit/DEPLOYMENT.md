# StackIt Deployment Guide

This guide will help you deploy the StackIt Q&A platform to GitHub and Vercel.

## Prerequisites

- GitHub account
- Vercel account (free tier available)
- Git installed on your local machine

## Step 1: Push to GitHub

1. **Create a new repository on GitHub:**
   - Go to [GitHub](https://github.com) and click "New repository"
   - Name it `stackit-qa-platform` (or your preferred name)
   - Make it public or private as desired
   - Don't initialize with README (we already have one)

2. **Push your code to GitHub:**
   ```bash
   # Navigate to your project directory
   cd stackit
   
   # Initialize git (if not already done)
   git init
   
   # Add all files
   git add .
   
   # Commit the code
   git commit -m "Initial commit: StackIt Q&A Platform"
   
   # Add your GitHub repository as origin
   git remote add origin https://github.com/YOUR_USERNAME/stackit-qa-platform.git
   
   # Push to GitHub
   git push -u origin main
   ```

## Step 2: Deploy to Vercel

### Option A: Deploy via Vercel Dashboard (Recommended)

1. **Connect to Vercel:**
   - Go to [Vercel](https://vercel.com)
   - Sign up/login with your GitHub account
   - Click "New Project"

2. **Import your repository:**
   - Select "Import Git Repository"
   - Choose your `stackit-qa-platform` repository
   - Click "Import"

3. **Configure deployment:**
   - Vercel will automatically detect it's a Vite project
   - Framework Preset: `Vite`
   - Build Command: `pnpm run build` (or `npm run build`)
   - Output Directory: `dist`
   - Install Command: `pnpm install` (or `npm install`)

4. **Deploy:**
   - Click "Deploy"
   - Wait for the build to complete (usually 1-2 minutes)
   - Your app will be live at `https://your-project-name.vercel.app`

### Option B: Deploy via Vercel CLI

1. **Install Vercel CLI:**
   ```bash
   npm install -g vercel
   ```

2. **Login to Vercel:**
   ```bash
   vercel login
   ```

3. **Deploy:**
   ```bash
   # Navigate to your project directory
   cd stackit
   
   # Deploy to Vercel
   vercel
   
   # Follow the prompts:
   # - Set up and deploy? Yes
   # - Which scope? (select your account)
   # - Link to existing project? No
   # - Project name: stackit-qa-platform
   # - Directory: ./
   ```

## Step 3: Configure Custom Domain (Optional)

1. **In Vercel Dashboard:**
   - Go to your project settings
   - Click "Domains"
   - Add your custom domain
   - Follow DNS configuration instructions

## Environment Variables (Future Enhancement)

If you add backend functionality later, you can set environment variables in Vercel:

1. Go to your project in Vercel Dashboard
2. Click "Settings" → "Environment Variables"
3. Add variables like:
   - `VITE_API_URL`
   - `VITE_DATABASE_URL`
   - etc.

## Automatic Deployments

Once connected to GitHub, Vercel will automatically:
- Deploy on every push to the main branch
- Create preview deployments for pull requests
- Show build logs and deployment status

## Troubleshooting

### Build Fails
- Check that all dependencies are in `package.json`
- Ensure build command is correct: `pnpm run build`
- Check build logs in Vercel dashboard

### Routing Issues
- The `vercel.json` file is included to handle SPA routing
- All routes will serve `index.html` for client-side routing

### Performance
- The app is optimized with Vite's built-in optimizations
- Static assets are automatically cached by Vercel's CDN
- Consider adding a service worker for offline functionality

## Post-Deployment Checklist

- [ ] Test all pages and functionality
- [ ] Verify responsive design on mobile
- [ ] Check that routing works correctly
- [ ] Test login/signup flows
- [ ] Verify question posting and answering
- [ ] Test tag filtering and search
- [ ] Check notification system

## Monitoring and Analytics

Consider adding:
- Vercel Analytics (built-in)
- Google Analytics
- Error tracking (Sentry)
- Performance monitoring

## Future Enhancements

The application is ready for these additions:
- Backend API integration
- Database connectivity
- Real-time features with WebSockets
- Email notifications
- Advanced search functionality
- User reputation system
- Admin dashboard

---

Your StackIt Q&A platform is now live and ready for users! 🚀

