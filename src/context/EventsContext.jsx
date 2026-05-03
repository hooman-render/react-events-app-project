import { createContext, useCallback, useContext, useEffect, useState } from 'react';
import {
    createEventRequest,
    deleteEventRequest,
    fetchCategoriesRequest,
    fetchEventsRequest,
    updateEventRequest,
} from '../api/events';

const EventsContext = createContext(null);

export const EventsProvider = ({ children }) => {
    const [events, setEvents] = useState([]);
    const [categories, setCategories] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [isServerAvailable, setIsServerAvailable] = useState(true);
    const [error, setError] = useState(null);

    // Loads the events and categories used across the app.
    const refreshData = useCallback(async () => {
        setIsLoading(true);
        setError(null);

        try {
            const [eventsData, categoriesData] = await Promise.all([fetchEventsRequest(), fetchCategoriesRequest()]);

            setEvents(eventsData);
            setCategories(categoriesData);
            setIsServerAvailable(true);
        } catch (refreshError) {
            setEvents([]);
            setCategories([]);
            setError(refreshError);
            setIsServerAvailable(false);
        } finally {
            setIsLoading(false);
        }
    }, []);

    useEffect(() => {
        void refreshData();
    }, [refreshData]);

    // Adds a new event and refreshes the list.
    const createEvent = useCallback(
        async (eventData) => {
            const createdEvent = await createEventRequest(eventData);
            await refreshData();
            return createdEvent;
        },
        [refreshData],
    );

    // Saves event changes and reloads the shared data.
    const updateEvent = useCallback(
        async (eventId, eventData) => {
            const updatedEvent = await updateEventRequest(eventId, eventData);
            await refreshData();
            return updatedEvent;
        },
        [refreshData],
    );

    // Deletes an event and reloads the shared data.
    const deleteEvent = useCallback(
        async (eventId) => {
            await deleteEventRequest(eventId);
            await refreshData();
        },
        [refreshData],
    );

    return (
        <EventsContext.Provider
            value={{
                categories,
                createEvent,
                deleteEvent,
                error,
                events,
                isLoading,
                isServerAvailable,
                refreshData,
                updateEvent,
            }}
        >
            {children}
        </EventsContext.Provider>
    );
};

export const useEvents = () => {
    const context = useContext(EventsContext);

    if (!context) {
        throw new Error('useEvents must be used within an EventsProvider');
    }

    return context;
};
