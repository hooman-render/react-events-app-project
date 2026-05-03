const API_BASE_URL = 'http://localhost:3000';

// Keeps the JSON Server fetch logic in one place.
async function request(path, options = {}) {
    const response = await fetch(`${API_BASE_URL}${path}`, {
        headers: {
            'Content-Type': 'application/json',
            ...options.headers,
        },
        ...options,
    });

    if (!response.ok) {
        let errorMessage = `Request failed with status ${response.status}`;

        try {
            const data = await response.json();
            errorMessage = data?.message || errorMessage;
        } catch {
            errorMessage = response.statusText || errorMessage;
        }

        throw new Error(errorMessage);
    }

    if (response.status === 204) {
        return null;
    }

    return response.json();
}

// Keeps API details out of the page components.
export const fetchEventsRequest = () => request('/events');

export const fetchCategoriesRequest = () => request('/categories');

export const createEventRequest = (eventData) =>
    request('/events', {
        method: 'POST',
        body: JSON.stringify(eventData),
    });

export const updateEventRequest = (eventId, eventData) =>
    request(`/events/${eventId}`, {
        method: 'PUT',
        body: JSON.stringify(eventData),
    });

export const deleteEventRequest = (eventId) =>
    request(`/events/${eventId}`, {
        method: 'DELETE',
    });
