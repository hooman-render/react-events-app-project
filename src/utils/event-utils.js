const dateFormatter = new Intl.DateTimeFormat(undefined, {
  dateStyle: "medium",
  timeStyle: "short",
});

export const createEventFormValues = (event) => ({
  title: event?.title ?? "",
  description: event?.description ?? "",
  image: event?.image ?? "",
  location: event?.location ?? "",
  startTime: formatForDateTimeInput(event?.startTime),
  endTime: formatForDateTimeInput(event?.endTime),
  categoryIds: event?.categoryIds?.map(String) ?? [],
});

export const buildEventPayload = (formValues, existingEvent) => ({
  id: existingEvent?.id,
  title: formValues.title.trim(),
  description: formValues.description.trim(),
  image: formValues.image.trim(),
  categoryIds: formValues.categoryIds.map(Number),
  location: formValues.location.trim(),
  startTime: formValues.startTime,
  endTime: formValues.endTime,
});

export const formatEventDateTime = (dateValue) => {
  if (!dateValue) {
    return "Unknown";
  }

  const parsedDate = new Date(dateValue);

  if (Number.isNaN(parsedDate.getTime())) {
    return dateValue;
  }

  return dateFormatter.format(parsedDate);
};

export const getCategoryNames = (categoryIds, categories) =>
  (categoryIds ?? [])
    .map((categoryId) =>
      categories.find((category) => category.id === categoryId)?.name,
    )
    .filter(Boolean);

export const matchesEventFilters = (event, searchTerm, selectedCategoryIds) => {
  const normalizedSearchTerm = searchTerm.trim().toLowerCase();
  const matchesSearch =
    normalizedSearchTerm.length === 0 ||
    event.title.toLowerCase().includes(normalizedSearchTerm);

  const matchesCategories =
    selectedCategoryIds.length === 0 ||
    event.categoryIds.some((categoryId) => selectedCategoryIds.includes(categoryId));

  return matchesSearch && matchesCategories;
};

function formatForDateTimeInput(dateValue) {
  if (!dateValue) {
    return "";
  }

  const parsedDate = new Date(dateValue);

  if (Number.isNaN(parsedDate.getTime())) {
    return typeof dateValue === "string" ? dateValue.slice(0, 16) : "";
  }

  const timezoneOffset = parsedDate.getTimezoneOffset() * 60_000;
  return new Date(parsedDate.getTime() - timezoneOffset)
    .toISOString()
    .slice(0, 16);
}
