import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { Root } from "./components/Root";
import { Provider } from "./components/ui/provider";
import { EventsProvider } from "./context/EventsContext";
import { AboutPage } from "./pages/AboutPage";
import { EventPage } from "./pages/EventPage";
import { EventsPage } from "./pages/EventsPage";

// Sets up the app routes and shared layout.
const router = createBrowserRouter([
  {
    path: "/",
    element: <Root />,
    children: [
      {
        index: true,
        element: <EventsPage />,
      },
      {
        path: "event/:eventId",
        element: <EventPage />,
      },
      {
        path: "about",
        element: <AboutPage />,
      },
    ],
  },
]);

// Wraps the app with Chakra and the events context.
createRoot(document.getElementById("root")).render(
  <StrictMode>
    <Provider>
      <EventsProvider>
        <RouterProvider router={router} />
      </EventsProvider>
    </Provider>
  </StrictMode>,
);
