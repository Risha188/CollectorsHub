# Collector’s Hub

A responsive React web application for collectors to browse marketplace listings, interact with the community, and manage their personal collection.

## Setup Instructions

### 1. Clone the repository

```bash
git clone <your-github-repository-url>
cd CollectorsHub
```

### 2. Install dependencies

```bash
npm install
```

### 3. Start the development server

```bash
npm run dev
```

The application will be available at the local URL shown in the terminal, usually:

```text
http://localhost:5173
```

### 4. Build for production

```bash
npm run build
```

### 5. Preview the production build

```bash
npm run preview
```

## Libraries Used

* **React** — Building the user interface
* **React Router DOM** — Client-side routing and navigation
* **Vite** — Development server and build tool
* **Tailwind CSS** — Responsive styling and UI design
* **Lucide React** — Icons
* **JavaScript (ES6+)** — Application logic and state handling

## Assumptions Made

* Product, community post, comment, and collection data are currently handled using mock/local data.
* No backend or database is required for the assignment.
* Authentication and user accounts are not required for the core functionality.
* Marketplace prices are assumed to use a single currency.
* "Newest" sorting is based on the available listing date data.
* Collection data represents the currently logged-in/demo user's collection.
* The application is designed to work on modern desktop and mobile browsers.

## Features Implemented

### Marketplace

* Browse collectible products/listings
* Search products by title
* Filter listings by category
* Filter listings by condition
* Sort listings by:

  * Price: Low to High
  * Price: High to Low
  * Newest
* Responsive product grid
* Product cards with relevant item information
* Empty-state message when no products match the selected filters

### Community Feed

* Display community posts
* View post content and user information
* Like/interact with posts
* View comments
* Responsive feed layout

### My Collection

* Display collected items
* Organized collection interface
* Responsive design for desktop and mobile

### Additional Features

* Fully responsive desktop and mobile layouts
* React Router navigation
* Reusable React components
* Clean component-based project structure
* Search and filter state handled through URL search parameters
* Responsive navigation
* User-friendly empty/status messages
* Modern UI using Tailwind CSS
* Icons using Lucide React
* Mobile-friendly layout and spacing

## Project Structure

```text
src/
├── components/
│   ├── common/
│   ├── marketplace/
│   └── ...
├── data/
│   └── products.js
├── pages/
│   ├── Marketplace.jsx
│   ├── Community.jsx
│   └── Collection.jsx
├── App.jsx
├── main.jsx
└── index.css
```

## Responsive Design

The application has been designed to provide a consistent experience across:

* Desktop
* Laptop
* Tablet
* Mobile devices

The layout, navigation, product grid, filters, and community feed adapt to different screen sizes.

## Assignment Objective

Collector’s Hub demonstrates a responsive React-based platform where users can:

1. Discover collectible items through the Marketplace.
2. Search, filter, and sort available listings.
3. Participate in the Community Feed.
4. View and manage their personal collection.
