# Event Manager App

Event Manager App is a responsive React application built for the Winc Academy React Advanced Final Assignment. The app lets users browse events, search by event title, filter by category, open event details, create new events, edit existing events, and delete events with confirmation dialogs.

## Assignment context

This project was built as the React Advanced Final Assignment for Winc Academy. The implementation stays within the course scope by using React components, hooks, Context, React Router, Chakra UI, dialogs, forms, skeleton loading states, toast feedback, and JSON Server.

## Tech stack

1. React
2. React Router
3. Chakra UI 3
4. React Context
5. JSON Server
6. Vite
7. ESLint

## Features

### Events list page

1. Fetches events and categories from JSON Server
2. Displays event title, description, image, start time, end time, location, and category names
3. Supports search by event title
4. Supports filtering by one or multiple categories
5. Uses skeleton placeholders while events are loading
6. Shows a clear unavailable state when the backend cannot be reached

### Event detail page

1. Shows the selected event title, description, image, date and time, location, and categories
2. Provides an Edit Event dialog
3. Provides a Delete Event confirmation dialog
4. Redirects back to the events list after a successful delete

### Create and edit flows

1. Add Event is available from the navigation header and drawer
2. Forms support title, description, image URL, location, start time, end time, and categories
3. Required fields are validated
4. Date and time validation prevents invalid ranges
5. Success and failure feedback is shown with Chakra UI toasts

### Server unavailable UX

When the JSON Server backend is unavailable:

1. The events page shows an unavailable state instead of mixing it with empty results
2. Add Event actions are guarded
3. Event detail loading failures are shown clearly
4. Mutation failures show user-friendly feedback
5. Static navigation and the About page remain accessible

## JSON Server setup

The app expects JSON Server to run on `http://localhost:3000`.

### 1. Install JSON Server if needed

```bash
npm install -g json-server
```

### 2. Start the backend from the project folder

```bash
json-server --watch events.json
```

This starts the API with:

1. `http://localhost:3000/events`
2. `http://localhost:3000/categories`

## Frontend setup

### 1. Install dependencies

```bash
npm install
```

### 2. Start the frontend development server

```bash
npm run dev
```

### 3. Open the app

Use the local Vite URL shown in the terminal, usually:

```text
http://localhost:5173
```

## Build and preview commands

### Production build

```bash
npm run build
```

### Preview the production build

```bash
npm run preview
```

## Quality checks

### Lint

```bash
npm run lint
```

### Build verification

```bash
npm run build
```

The app was also reviewed with Lighthouse and manual checks for responsiveness, accessibility, unavailable server handling, dialogs, and CRUD flows.

## Assets and images

The app uses event images hosted in my own GitHub assets repository.

Most images are based on original Winc Academy starter image links.
For 3 of the 9 original events, I generated replacement images myself.
Some downloaded images were converted from `.jpeg` or `.jpg` to `.avif` to improve image delivery.

## AI usage disclosure

ChatGPT was used as support tools for planning, checking assignment requirements, reviewing React and Chakra UI usage, accessibility, server state, and performance issues, and preparing documentation.
The application was built, reviewed, tested, and adjusted by me.
