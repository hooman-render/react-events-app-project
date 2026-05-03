# Event Manager App

Event Manager App is a responsive React application built for the Winc Academy React Advanced Final Assignment.

The app lets users browse events, search by event title, filter by category, open event details, create new events, edit existing events, and delete events with a confirmation dialog.

## Assignment context

This project was built as the React Advanced Final Assignment for Winc Academy.

The assignment asks for an event management app with:

1. An events list page
2. A modal or dialog for creating new events
3. A modal or dialog for editing existing events
4. An option to delete events
5. A detailed page for specific events
6. React Router navigation
7. Context and Context.Provider
8. A design system
9. Responsive mobile and desktop layout
10. Required form fields
11. Success and failure messages for create, edit, and delete actions
12. UI skeleton placeholders while events are loading

This implementation uses React, React Router, React Context, Chakra UI 3, JSON Server, dialogs, forms, skeleton loading states, and toast feedback.

## Tech stack

1. React
2. React Router
3. Chakra UI 3
4. React Context
5. JSON Server
6. Vite
7. ESLint

## Assignment requirements coverage

### General requirements

1. The app uses Context and Context.Provider through the events context.
2. The app uses React Router for navigation between the Events page, Event detail page, and About page.
3. The app uses Chakra UI 3 as the design system.
4. The app is responsive and was checked on mobile, tablet, laptop, and desktop widths.
5. Form input fields use required attributes where user input is required.
6. Create, edit, and delete actions show success or failure feedback with toast messages.
7. The events page shows skeleton placeholders while events are loading.

### Events list page

1. Events are fetched from the JSON Server backend.
2. Categories are fetched from the JSON Server backend.
3. Each event card shows the event title, description, image, start time, end time, location, and category names.
4. Event cards can be opened with React Router to show the Event detail page.
5. The navigation header includes an Add Event action.
6. Users can search events by title.
7. Users can filter the event list by one or multiple selected categories.

### Event page

1. The Event detail page shows the selected event title, description, image, start time, end time, location, and category names.
2. Users can edit an event through an Edit Event dialog.
3. Edited data is saved back to the JSON Server backend.
4. Users can delete an event through a Delete Event action.
5. The delete flow includes an extra confirmation dialog.
6. After a successful delete, the user is redirected back to the events list page.

### Third page

The app includes an About page that is accessible through the navigation.

The About page explains the project, the app focus, the technical approach, and the future drawer sections.

## Features

### Events list page

1. Fetches events and categories from JSON Server
2. Displays event title, description, image, start time, end time, location, and category names
3. Supports search by event title
4. Supports filtering by one or multiple categories
5. Uses skeleton placeholders while events are loading
6. Shows a clear unavailable state when the backend cannot be reached
7. Uses optimized image loading behavior for the first visible event card
8. Lazy loads later event card images

### Event detail page

1. Shows the selected event title, description, image, date and time, location, and categories
2. Uses a responsive layout for mobile, tablet, laptop, and desktop screens
3. Provides an Edit Event dialog
4. Provides a Delete Event confirmation dialog
5. Redirects back to the events list after a successful delete
6. Keeps destructive actions clearly visible in the dark interface

### Create and edit flows

1. Add Event is available from the navigation header and drawer
2. Forms support title, description, image URL, location, start time, end time, and categories
3. Required fields are validated
4. Date and time validation prevents invalid date ranges
5. The DatePicker supports readable day, month, and year views
6. Dialogs do not close by accidental outside clicks
7. Users can close dialogs through the close button, Cancel action, or a successful save
8. Success and failure feedback is shown with Chakra UI toasts

### Navigation and drawer

1. The header provides quick access to Events, About, and Add Event
2. The drawer menu gives access to the main app sections
3. Some drawer sections are marked as coming soon, such as Calendar, Invites, Messages, Venues, Analytics, and Settings
4. These coming soon items are visual placeholders for possible future dashboard sections
5. Tooltips are used on important interactive controls to clarify their purpose

### Server unavailable UX

When the JSON Server backend is unavailable:

1. The events page shows an unavailable state instead of mixing it with empty results
2. Add Event actions are guarded
3. Event detail loading failures are shown clearly
4. Mutation failures show user friendly feedback
5. Static navigation and the About page remain accessible

## Design and styling

The app uses Chakra UI 3 for layout, components, dialogs, buttons, fields, skeletons, and responsive styling.

Shared visual styling is centralized in `src/theme/theme.js`.

This includes:

1. Color tokens
2. Typography tokens
3. Surface styles
4. Button styles
5. Dialog styles
6. Drawer styles
7. DatePicker styles
8. Skeleton styles
9. Input styles
10. Radius, shadow, and transition tokens

The app title uses a self hosted local font file from the `public/fonts` folder.

The font is registered globally in `src/index.css` with `@font-face`, while the actual app title typography is controlled through the theme file.

## JSON Server setup

The app expects JSON Server to run on `http://localhost:3000`.

### 1. Install JSON Server if needed

```bash
npm install -g json-server
```

### 2. Start the backend from the project folder

```bash
npx json-server --watch events.json --port 3000
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

The preview command usually opens the production build at:

```text
http://localhost:4173
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

The app was reviewed with manual checks for:

1. Mobile, tablet, laptop, and desktop responsiveness
2. Events page search and category filtering
3. Add Event dialog behavior
4. Edit Event dialog behavior
5. DatePicker day, month, and year views
6. Delete confirmation flow
7. Loading skeleton visibility
8. Server unavailable states
9. Tooltip behavior
10. Keyboard focus behavior
11. Basic accessibility checks
12. CRUD flows with JSON Server

The production preview was also reviewed with Lighthouse.

Latest local production preview results:

1. Performance: 77
2. Accessibility: 100
3. Best Practices: 100
4. SEO: 100

The remaining performance warnings mainly relate to normal client side React rendering, Chakra UI bundle cost, JSON Server requests, remote image delivery, and local preview caching behavior.

## Assets and images

The app uses event images hosted in my own GitHub assets repository.

Most images are based on the original Winc Academy starter image links.

A small number of replacement event visuals were generated and then hosted in my own assets repository. These images are used only as event visuals and do not change the assignment logic.

Some downloaded images were converted from `.jpeg` or `.jpg` to `.avif` to improve image delivery.

## AI usage

I built the application myself. AI was used as a support and review tool for specific parts where I wanted extra help with Chakra UI 3, responsive styling, debugging, and documentation.

### Specific AI support

1. `src/theme/theme.js`  
   AI helped review and organize shared visual styles, such as colors, typography, buttons, dialogs, DatePicker styles, skeleton styles, and danger action styles.

2. `src/components/EventFormDialog.jsx`  
   AI helped configure the DatePicker sub-component properties, review the mobile DatePicker layout, and apply specific CSS contrast fixes for dark mode.

3. `src/components/EventListSkeleton.jsx`  
   AI helped adjust the Chakra UI Skeleton component properties so the loading state aligned more closely with the final event card dimensions.

4. `src/pages/EventsPage.jsx` and `src/components/EventCard.jsx`  
   AI helped review the overview page spacing, event card grid, image loading behavior.

## Project focus

The focus of this version is a clear event management flow:

1. Browsing events
2. Filtering results by category
3. Opening event details
4. Creating events
5. Editing events
6. Deleting events with confirmation

The layout and navigation are structured so the app can be extended later without changing the core flow.
