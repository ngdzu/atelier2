# Task Portal

A modern task management dashboard for visualizing, filtering, and managing tasks with real-time analytics and detailed insights. Built with **React**, **Vite**, and **TypeScript**.

## 📋 What is the Task Portal?

The Task Portal is an interactive web-based dashboard that provides:

- **Task Overview** - View all tasks at a glance with summary statistics
- **Advanced Filtering** - Filter tasks by search term, category, status, and priority
- **Analytics & Charts** - Visualize task distribution with bar charts, area charts, and pie charts
- **Detailed Task View** - Click any task to see full details in a modal dialog
- **Responsive Interface** - Works seamlessly on desktop, tablet, and mobile devices

Perfect for project managers, team leads, and anyone who needs to organize and monitor work effectively.

## 📦 Tech Stack

- **React 18** - Modern UI framework
- **Vite** - Lightning-fast build tool with instant HMR
- **TypeScript** - Type-safe development experience
- **CSS** - Clean, responsive styling

## 🚀 Getting Started

### Installation & Development

```bash
# Install dependencies
npm install

# Start development server (with hot reload)
npm run dev
```

The dashboard will open at [http://localhost:3000](http://localhost:3000) and automatically refresh as you make changes.

### Production Build

```bash
# Build for production
npm run build

# Preview the production build locally
npm run preview
```

## 💻 Available Commands

```bash
npm run dev          # Start development server with hot module reloading
npm run build        # Create optimized production build
npm run preview      # Preview production build locally
npm run test         # Run test suite
```

## 📊 Project Structure

```
src/
├── components/           # React components
│   ├── Header.tsx       # Dashboard header
│   ├── StatsCards.tsx   # Statistics overview
│   ├── Charts.tsx       # Chart displays
│   ├── Filters.tsx      # Filter controls
│   ├── TaskTable.tsx    # Task list
│   ├── TaskModal.tsx    # Task details modal
│   └── charts/          # Chart components (Bar, Area, Pie)
├── utils/               # Utility functions
│   ├── colors.ts        # Color utilities
│   └── stats.ts         # Statistics calculations
├── styles/              # Global styles
├── types.ts             # TypeScript type definitions
├── App.tsx              # Main application component
└── main.tsx             # Entry point
```

## 🎯 Key Features

- ✅ **Real-time Filtering** - Search and filter tasks instantly
- ✅ **Interactive Analytics** - Visualize task metrics with charts
- ✅ **Task Details** - Modal view for comprehensive task information
- ✅ **Type Safe** - Full TypeScript for reliable code
- ✅ **Fast Development** - Vite's HMR for instant updates
- ✅ **Mobile Ready** - Fully responsive design

---

**Built with React + Vite + TypeScript**
