import { CalendarDateTime } from '@internationalized/date';
import { useEffect, useId, useState } from 'react';
import {
    Box,
    Button,
    Checkbox,
    DatePicker,
    Dialog,
    Field,
    Fieldset,
    Flex,
    Input,
    Portal,
    SimpleGrid,
    Stack,
    Text,
    Textarea,
    useBreakpointValue,
} from '@chakra-ui/react';
import { toaster } from './ui/toaster';
import { buildEventPayload, createEventFormValues } from '../utils/event-utils';
import {
    appColors,
    appDialogSurfaceStyles,
    appInputStyles,
    appNeutralButtonStyles,
    appPrimaryButtonStyles,
    appRadii,
    appSectionSurfaceStyles,
    appTransitions,
} from '../theme/appTheme';

export const EventFormDialog = ({ categories, initialEvent, isSubmitting, mode, onOpenChange, onSubmit, open }) => {
    const [formValues, setFormValues] = useState(createEventFormValues(initialEvent));
    const [isCategoryInvalid, setIsCategoryInvalid] = useState(false);
    const [isSearchingLocation, setIsSearchingLocation] = useState(false);
    const [locationError, setLocationError] = useState(null);
    const [pickerSessionKey, setPickerSessionKey] = useState(0);
    const [basicFieldErrors, setBasicFieldErrors] = useState({
        title: null,
        description: null,
        image: null,
    });
    const [dateTimeErrors, setDateTimeErrors] = useState({
        startTime: null,
        endTime: null,
    });

    // Fills the form when the dialog opens.
    useEffect(() => {
        if (open) {
            const nextFormValues = createEventFormValues(initialEvent);

            setFormValues(nextFormValues);
            setIsCategoryInvalid(false);
            setIsSearchingLocation(false);
            setLocationError(null);
            setBasicFieldErrors({
                title: null,
                description: null,
                image: null,
            });
            setDateTimeErrors({
                startTime: null,
                endTime: null,
            });
            setPickerSessionKey((currentKey) => currentKey + 1);
        }
    }, [initialEvent, open]);

    const handleChange = ({ target }) => {
        const { name, value } = target;

        if (name === 'location') {
            setLocationError(null);
        }

        if (isBasicDetailsFieldName(name)) {
            setBasicFieldErrors((currentErrors) => ({
                ...currentErrors,
                [name]: getInputValidationMessage(target),
            }));
        }

        setFormValues((currentValues) => ({
            ...currentValues,
            [name]: value,
        }));
    };

    const handleBasicFieldInvalid = (invalidEvent) => {
        const { target } = invalidEvent;

        if (!isBasicDetailsFieldName(target.name)) {
            return;
        }

        invalidEvent.preventDefault();
        setBasicFieldErrors((currentErrors) => ({
            ...currentErrors,
            [target.name]: getInputValidationMessage(target),
        }));
    };

    const handleBasicFieldBlur = ({ target }) => {
        if (!isBasicDetailsFieldName(target.name)) {
            return;
        }

        setBasicFieldErrors((currentErrors) => ({
            ...currentErrors,
            [target.name]: getInputValidationMessage(target),
        }));
    };

    const handleCategoryChange = (values) => {
        setFormValues((currentValues) => ({
            ...currentValues,
            categoryIds: values,
        }));
        setIsCategoryInvalid(values.length === 0);
    };

    const handleDateTimeChange = (fieldName, value) => {
        const nextFormValues = {
            ...formValues,
            [fieldName]: value,
        };

        setFormValues((currentValues) => ({
            ...currentValues,
            [fieldName]: value,
        }));
        setDateTimeErrors(getDateTimeErrors(nextFormValues, mode, false));
    };

    // Stops submit when required values or dates are invalid.
    const handleSubmit = async (submitEvent) => {
        submitEvent.preventDefault();

        const nextDateTimeErrors = getDateTimeErrors(formValues, mode, true);

        if (formValues.categoryIds.length === 0 || nextDateTimeErrors.startTime || nextDateTimeErrors.endTime) {
            setIsCategoryInvalid(formValues.categoryIds.length === 0);
            setDateTimeErrors(nextDateTimeErrors);
            return;
        }

        await onSubmit(buildEventPayload(formValues, initialEvent));
    };

    // Finds a city and stores it as the event location.
    const handleFindLocation = async () => {
        const searchValue = formValues.location.trim();

        if (!searchValue) {
            setLocationError('Enter a city name to search.');
            return;
        }

        setIsSearchingLocation(true);
        setLocationError(null);

        try {
            const response = await fetch(
                `https://geocoding-api.open-meteo.com/v1/search?name=${encodeURIComponent(searchValue)}`,
            );

            if (!response.ok) {
                throw new Error('Location search failed');
            }

            const locationData = await response.json();
            const location = locationData.results?.[0];

            if (!location) {
                setLocationError('Location not found.');
                return;
            }

            setFormValues((currentValues) => ({
                ...currentValues,
                location: `${location.name}, ${location.country}`,
            }));
        } catch {
            setLocationError('Unable to search location.');
        } finally {
            setIsSearchingLocation(false);
        }
    };

    const dialogTitle = mode === 'create' ? 'Add event' : 'Edit event';
    const submitLabel = mode === 'create' ? 'Create event' : 'Save changes';
    const hasBasicDetailsError = Object.values(basicFieldErrors).some(Boolean);
    const hasDateTimeSectionError = Boolean(dateTimeErrors.startTime || dateTimeErrors.endTime);

    const handleCancel = () => {
        toaster.create({
            title:
                mode === 'create' ? (
                    <>
                        Event <strong>creation cancelled</strong>
                    </>
                ) : (
                    <>
                        Event <strong>editing cancelled</strong>
                    </>
                ),
            description: (
                <>
                    The event was <strong>not saved</strong>.
                </>
            ),
            type: 'error',
        });
        onOpenChange(false);
    };

    return (
        <Dialog.Root
            closeOnInteractOutside={!isSubmitting}
            open={open}
            onOpenChange={(details) => onOpenChange(details.open)}
        >
            <Portal>
                <Dialog.Backdrop bg="rgba(1, 8, 8, 0.82)" />
                <Dialog.Positioner maxH="100vh" overflow="hidden" padding={{ base: '2', sm: '4' }}>
                    <Dialog.Content
                        {...appDialogSurfaceStyles}
                        display="flex"
                        flexDirection="column"
                        maxH={{ base: '92vh', md: '90vh' }}
                        maxW={{ base: 'calc(100vw - 1rem)', md: '3xl' }}
                        minH="0"
                        overflow="hidden"
                        borderRadius={appRadii.panel}
                        w="full"
                    >
                        <form
                            onSubmit={(submitEvent) => void handleSubmit(submitEvent)}
                            style={{
                                display: 'flex',
                                flexDirection: 'column',
                                flex: 1,
                                minHeight: 0,
                                overflow: 'hidden',
                            }}
                        >
                            <Dialog.Header
                                borderBottomWidth="1px"
                                borderColor={appColors.border}
                                pb={{ base: '3', md: '4' }}
                                pt={{ base: '4', md: '6' }}
                                px={{ base: '3', md: '6' }}
                            >
                                <Stack align="start" gap={{ base: '0.5', md: '1.5' }}>
                                    <Dialog.Title
                                        color={appColors.text}
                                        fontSize={{ base: 'lg', md: 'xl' }}
                                        fontWeight="bold"
                                        lineHeight="short"
                                        overflow="hidden"
                                        textOverflow="ellipsis"
                                        whiteSpace="nowrap"
                                    >
                                        {dialogTitle}
                                    </Dialog.Title>
                                    <Dialog.Description color={appColors.textMuted} fontSize={{ base: 'xs', md: 'sm' }}>
                                        Provide the required event details and save them to the server.
                                    </Dialog.Description>
                                </Stack>
                            </Dialog.Header>
                            <Dialog.Body
                                flex="1"
                                minH="0"
                                overflowY="auto"
                                overscrollBehavior="contain"
                                pb={{ base: '3', md: '4' }}
                                pt="0"
                                px={{ base: '3', md: '6' }}
                            >
                                <Stack gap={{ base: '3', md: '4' }}>
                                    <Box
                                        {...appSectionSurfaceStyles}
                                        borderColor={hasBasicDetailsError ? 'red.400' : appColors.border}
                                        boxSizing="border-box"
                                        rounded="lg"
                                        p={{ base: '3', md: '4' }}
                                        w="full"
                                        transition={appTransitions.smooth}
                                        _hover={{
                                            borderColor: hasBasicDetailsError ? 'red.400' : appColors.borderStrong,
                                        }}
                                        _focusWithin={{
                                            borderColor: hasBasicDetailsError ? 'red.400' : appColors.borderStrong,
                                            boxShadow: hasBasicDetailsError
                                                ? '0 0 0 1px rgba(248, 113, 113, 0.36)'
                                                : `0 0 0 1px ${appColors.borderStrong}`,
                                        }}
                                    >
                                        <Stack gap={{ base: '3', md: '4' }}>
                                            <Text color={appColors.text} fontSize="sm" fontWeight="semibold">
                                                Basic details
                                            </Text>
                                            <Field.Root invalid={Boolean(basicFieldErrors.title)} required>
                                                <Field.Label color={appColors.text} fontSize="sm">
                                                    Title
                                                </Field.Label>
                                                <Input
                                                    {...appInputStyles}
                                                    name="title"
                                                    onBlur={handleBasicFieldBlur}
                                                    onChange={handleChange}
                                                    onInvalid={handleBasicFieldInvalid}
                                                    required
                                                    size="sm"
                                                    value={formValues.title}
                                                />
                                                {basicFieldErrors.title ? (
                                                    <Field.ErrorText>{basicFieldErrors.title}</Field.ErrorText>
                                                ) : null}
                                            </Field.Root>

                                            <Field.Root invalid={Boolean(basicFieldErrors.description)} required>
                                                <Field.Label color={appColors.text} fontSize="sm">
                                                    Description
                                                </Field.Label>
                                                <Textarea
                                                    {...appInputStyles}
                                                    fontSize="sm"
                                                    minHeight={{ base: '84px', md: '96px' }}
                                                    name="description"
                                                    onBlur={handleBasicFieldBlur}
                                                    onChange={handleChange}
                                                    onInvalid={handleBasicFieldInvalid}
                                                    required
                                                    value={formValues.description}
                                                />
                                                {basicFieldErrors.description ? (
                                                    <Field.ErrorText>{basicFieldErrors.description}</Field.ErrorText>
                                                ) : null}
                                            </Field.Root>

                                            <Field.Root invalid={Boolean(basicFieldErrors.image)} required>
                                                <Field.Label color={appColors.text} fontSize="sm">
                                                    Image URL
                                                </Field.Label>
                                                <Input
                                                    {...appInputStyles}
                                                    name="image"
                                                    onBlur={handleBasicFieldBlur}
                                                    onChange={handleChange}
                                                    onInvalid={handleBasicFieldInvalid}
                                                    placeholder="https://example.com/image.jpg"
                                                    required
                                                    size="sm"
                                                    type="url"
                                                    value={formValues.image}
                                                />
                                                <Field.HelperText
                                                    color={appColors.textMuted}
                                                    fontSize={{ base: 'xs', md: 'sm' }}
                                                >
                                                    Paste a direct image URL.
                                                </Field.HelperText>
                                                {basicFieldErrors.image ? (
                                                    <Field.ErrorText>{basicFieldErrors.image}</Field.ErrorText>
                                                ) : null}
                                            </Field.Root>
                                        </Stack>
                                    </Box>

                                    <Box
                                        {...appSectionSurfaceStyles}
                                        borderColor={locationError ? 'red.400' : appColors.border}
                                        boxSizing="border-box"
                                        rounded="lg"
                                        p={{ base: '3', md: '4' }}
                                        w="full"
                                        transition={appTransitions.smooth}
                                        _hover={{ borderColor: locationError ? 'red.400' : appColors.borderStrong }}
                                        _focusWithin={{
                                            borderColor: locationError ? 'red.400' : appColors.borderStrong,
                                            boxShadow: locationError
                                                ? '0 0 0 1px rgba(248, 113, 113, 0.36)'
                                                : `0 0 0 1px ${appColors.borderStrong}`,
                                        }}
                                    >
                                        <Stack gap={{ base: '3', md: '4' }}>
                                            <Text color={appColors.text} fontSize="sm" fontWeight="semibold">
                                                Location
                                            </Text>
                                            <Field.Root invalid={Boolean(locationError)}>
                                                <Stack
                                                    align="stretch"
                                                    direction={{ base: 'column', md: 'row' }}
                                                    gap={{ base: '2', md: '3' }}
                                                >
                                                    <Input
                                                        {...appInputStyles}
                                                        aria-label="Location"
                                                        flex={{ base: 'none', md: '1' }}
                                                        minW="0"
                                                        name="location"
                                                        onChange={handleChange}
                                                        placeholder="Amsterdam, The Netherlands"
                                                        size="sm"
                                                        value={formValues.location}
                                                        w="full"
                                                    />
                                                    <Button
                                                        {...appPrimaryButtonStyles}
                                                        disabled={isSearchingLocation}
                                                        minW={{ md: '10rem' }}
                                                        onClick={() => void handleFindLocation()}
                                                        size="sm"
                                                        whiteSpace="nowrap"
                                                        type="button"
                                                        w={{ base: 'full', md: 'auto' }}
                                                    >
                                                        {isSearchingLocation ? 'Searching...' : 'Find location'}
                                                    </Button>
                                                </Stack>
                                                <Field.HelperText
                                                    color={appColors.textMuted}
                                                    fontSize={{ base: 'xs', md: 'sm' }}
                                                >
                                                    Optional. Enter a city name and click Find location, or type a
                                                    location manually.
                                                </Field.HelperText>
                                                {locationError ? (
                                                    <Field.ErrorText>{locationError}</Field.ErrorText>
                                                ) : null}
                                            </Field.Root>
                                        </Stack>
                                    </Box>

                                    <Box
                                        {...appSectionSurfaceStyles}
                                        borderColor={hasDateTimeSectionError ? 'red.400' : appColors.border}
                                        boxSizing="border-box"
                                        rounded="lg"
                                        p={{ base: '3', md: '4' }}
                                        w="full"
                                    >
                                        <Stack gap={{ base: '3', md: '4' }}>
                                            <Text color={appColors.text} fontSize="sm" fontWeight="semibold">
                                                Date and time
                                            </Text>
                                            <SimpleGrid columns={{ base: 1, md: 2 }} gap={{ base: '3', md: '4' }}>
                                                <DateTimePickerField
                                                    errorMessage={dateTimeErrors.startTime}
                                                    fieldName="startTime"
                                                    key={`startTime-${pickerSessionKey}`}
                                                    label="Start time"
                                                    mode={mode}
                                                    onChange={handleDateTimeChange}
                                                    relatedValue={null}
                                                    value={formValues.startTime}
                                                />

                                                <DateTimePickerField
                                                    errorMessage={dateTimeErrors.endTime}
                                                    fieldName="endTime"
                                                    key={`endTime-${pickerSessionKey}`}
                                                    label="End time"
                                                    mode={mode}
                                                    onChange={handleDateTimeChange}
                                                    relatedValue={formValues.startTime}
                                                    value={formValues.endTime}
                                                />
                                            </SimpleGrid>
                                        </Stack>
                                    </Box>

                                    <Box
                                        {...appSectionSurfaceStyles}
                                        borderColor={isCategoryInvalid ? 'red.400' : appColors.border}
                                        boxSizing="border-box"
                                        rounded="lg"
                                        p={{ base: '3', md: '4' }}
                                        w="full"
                                        transition={appTransitions.smooth}
                                        _hover={{ borderColor: isCategoryInvalid ? 'red.400' : appColors.borderStrong }}
                                        _focusWithin={{
                                            borderColor: isCategoryInvalid ? 'red.400' : appColors.borderStrong,
                                            boxShadow: isCategoryInvalid
                                                ? '0 0 0 1px rgba(248, 113, 113, 0.36)'
                                                : `0 0 0 1px ${appColors.borderStrong}`,
                                        }}
                                    >
                                        <Fieldset.Root invalid={isCategoryInvalid} required>
                                            <Stack gap={{ base: '3', md: '4' }}>
                                                <Fieldset.Legend
                                                    color={appColors.text}
                                                    fontSize="sm"
                                                    fontWeight="semibold"
                                                >
                                                    Categories
                                                </Fieldset.Legend>
                                                <Text color={appColors.textMuted} fontSize={{ base: 'xs', md: 'sm' }}>
                                                    Select one or more categories.
                                                </Text>
                                                <Checkbox.Group
                                                    name="categoryIds"
                                                    onValueChange={handleCategoryChange}
                                                    value={formValues.categoryIds}
                                                >
                                                    <Flex
                                                        align="center"
                                                        columnGap={{ base: '2', sm: '3', md: '4' }}
                                                        justify="flex-start"
                                                        mt="1"
                                                        rowGap={{ base: '2', md: '3' }}
                                                        wrap={{ base: 'nowrap', sm: 'wrap' }}
                                                    >
                                                        {categories.map((category) => (
                                                            <Checkbox.Root
                                                                alignItems="center"
                                                                borderColor="transparent"
                                                                borderRadius="full"
                                                                borderWidth="1px"
                                                                px={{ base: '0', sm: '1' }}
                                                                py="1"
                                                                display="inline-flex"
                                                                flex="0 0 auto"
                                                                flexShrink={0}
                                                                gap={{ base: '1.5', md: '2' }}
                                                                key={category.id}
                                                                transition={appTransitions.smooth}
                                                                value={String(category.id)}
                                                                _hover={{
                                                                    bg: 'rgba(203, 184, 255, 0.08)',
                                                                    borderColor: appColors.borderStrong,
                                                                }}
                                                                _focusWithin={{
                                                                    borderColor: appColors.borderStrong,
                                                                    boxShadow: `0 0 0 3px ${appColors.focusRing}`,
                                                                }}
                                                            >
                                                                <Checkbox.HiddenInput />
                                                                <Checkbox.Control
                                                                    transition={appTransitions.smooth}
                                                                    _checked={{
                                                                        bg: appColors.primary,
                                                                        borderColor: appColors.primary,
                                                                        color: '#120f1e',
                                                                    }}
                                                                >
                                                                    <Checkbox.Indicator />
                                                                </Checkbox.Control>
                                                                <Checkbox.Label
                                                                    color={appColors.text}
                                                                    fontSize={{ base: 'sm', md: 'sm' }}
                                                                    fontWeight="medium"
                                                                    textTransform="capitalize"
                                                                    whiteSpace="nowrap"
                                                                >
                                                                    {category.name}
                                                                </Checkbox.Label>
                                                            </Checkbox.Root>
                                                        ))}
                                                    </Flex>
                                                </Checkbox.Group>
                                                {isCategoryInvalid ? (
                                                    <Fieldset.ErrorText>
                                                        Select at least one category.
                                                    </Fieldset.ErrorText>
                                                ) : null}
                                            </Stack>
                                        </Fieldset.Root>
                                    </Box>
                                </Stack>
                            </Dialog.Body>
                            <Dialog.Footer
                                borderTopWidth="1px"
                                borderColor={appColors.border}
                                pb={{ base: '4', md: '6' }}
                                pt={{ base: '3', md: '4' }}
                                px={{ base: '3', md: '6' }}
                            >
                                <SimpleGrid columns={2} gap={{ base: '2', md: '3' }} w="full">
                                    <Button
                                        {...appNeutralButtonStyles}
                                        disabled={isSubmitting}
                                        onClick={handleCancel}
                                        size="sm"
                                        width="full"
                                    >
                                        Cancel
                                    </Button>
                                    <Button
                                        {...appPrimaryButtonStyles}
                                        disabled={isSubmitting}
                                        size="sm"
                                        type="submit"
                                        width="full"
                                    >
                                        {isSubmitting ? 'Saving...' : submitLabel}
                                    </Button>
                                </SimpleGrid>
                            </Dialog.Footer>
                        </form>
                    </Dialog.Content>
                </Dialog.Positioner>
            </Portal>
        </Dialog.Root>
    );
};

const DateTimePickerField = ({ errorMessage, fieldName, label, mode, onChange, relatedValue, value }) => {
    const [draftValue, setDraftValue] = useState(() => splitStoredDateTime(value));
    const [isOpen, setIsOpen] = useState(false);
    const fieldId = useId();
    const labelId = `${fieldId}-label`;
    const errorId = `${fieldId}-error`;

    useEffect(() => {
        if (!isOpen) {
            setDraftValue(splitStoredDateTime(value));
        }
    }, [isOpen, value]);

    const pickerValue = createPickerValue(draftValue);
    const hasSelectedDate = draftValue.date !== '';
    const nextStoredValue = createStoredDateTimeValue(draftValue.date, draftValue.time);
    const confirmLabel = fieldName === 'startTime' ? 'Confirm start date and time' : 'Confirm end date and time';
    const pickerPlacement =
        useBreakpointValue({
            base: 'bottom-start',
            sm: 'bottom-start',
            md: fieldName === 'endTime' ? 'bottom-end' : 'bottom-start',
        }) ?? 'bottom-start';
    const minimumDatePart = getMinimumDatePart({
        fieldName,
        mode,
        relatedValue,
    });
    const minimumTimeValue = getMinimumTimeValue({
        draftDate: draftValue.date,
        fieldName,
        mode,
        relatedValue,
    });

    const handleOpenChange = (details) => {
        if (details.open) {
            setDraftValue(splitStoredDateTime(value));
        }

        setIsOpen(details.open);
    };

    const handleValueChange = (details) => {
        const nextValue = details.value[0];

        if (!nextValue) {
            setDraftValue((currentValue) => ({
                ...currentValue,
                date: '',
            }));
            return;
        }

        setDraftValue((currentValue) => ({
            ...currentValue,
            date: formatDatePart(nextValue.year, nextValue.month, nextValue.day),
        }));
    };

    const handleTimeChange = (event) => {
        setDraftValue((currentValue) => ({
            ...currentValue,
            time: event.target.value,
        }));
    };

    const handleConfirm = () => {
        if (!nextStoredValue) {
            return;
        }

        onChange(fieldName, nextStoredValue);
        setIsOpen(false);
    };

    const pickerContent = (
        <DatePicker.Content
            {...appDialogSurfaceStyles}
            boxSizing="border-box"
            fontSize={{ base: 'xs', sm: 'sm', md: 'md' }}
            maxH={{ base: 'calc(100vh - 10rem)', sm: 'none' }}
            maxW={{ base: '19rem', sm: '22rem', md: 'sm' }}
            minW="0"
            mx="0"
            overflowX="hidden"
            overflowY={{ base: 'auto', sm: 'visible' }}
            overscrollBehavior="contain"
            borderRadius={appRadii.inner}
            w={{ base: '19rem', sm: '22rem', md: 'auto' }}
            css={{
                '& [data-scope="date-picker"][data-part="content"]': {
                    boxSizing: 'border-box',
                    maxWidth: '100%',
                    minWidth: 0,
                },
                '& [data-scope="date-picker"][data-part="view"]': {
                    boxSizing: 'border-box',
                    width: '100%',
                    maxWidth: '100%',
                    minWidth: 0,
                },
                '& [data-scope="date-picker"][data-part="view-control"]': {
                    display: 'flex',
                    alignItems: 'center',
                    gap: '0.25rem',
                    width: '100%',
                    maxWidth: '100%',
                    minWidth: 0,
                },
                '& [data-scope="date-picker"][data-part="view-trigger"]': {
                    flex: '1 1 auto',
                    minWidth: 0,
                    paddingInline: '0.25rem',
                    fontSize: '0.8125rem',
                    overflow: 'hidden',
                    textOverflow: 'ellipsis',
                    whiteSpace: 'nowrap',
                },
                '& [data-scope="date-picker"][data-part="prev-trigger"], & [data-scope="date-picker"][data-part="next-trigger"]':
                    {
                        flex: '0 0 auto',
                        width: '1.75rem',
                        minWidth: 0,
                        height: '1.75rem',
                        paddingInline: 0,
                    },
                '& [data-scope="date-picker"][data-part="table"]': {
                    width: '100%',
                    maxWidth: '100%',
                    minWidth: 0,
                    tableLayout: 'fixed',
                    borderCollapse: 'collapse',
                },
                '& [data-scope="date-picker"][data-part="table-row"]': {
                    width: '100%',
                },
                '& [data-scope="date-picker"][data-part="table-header"]': {
                    width: '14.285%',
                    minWidth: 0,
                    padding: 0,
                    fontSize: '0.6875rem',
                    lineHeight: 1.6,
                    textAlign: 'center',
                },
                '& [data-scope="date-picker"][data-part="table-cell"]': {
                    width: '14.285%',
                    minWidth: 0,
                    padding: 0,
                    textAlign: 'center',
                },
                '& [data-scope="date-picker"][data-part="table-cell-trigger"]': {
                    display: 'inline-flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    width: '100%',
                    minWidth: 0,
                    height: '2rem',
                    paddingInline: 0,
                    fontSize: '0.8125rem',
                },
                '& [role="grid"]': {
                    width: '100%',
                    maxWidth: '100%',
                    minWidth: 0,
                    tableLayout: 'fixed',
                },
                '& [role="grid"] th, & [role="grid"] td': {
                    width: '14.285%',
                    minWidth: 0,
                    padding: 0,
                    textAlign: 'center',
                },
                '& [role="grid"] button': {
                    minWidth: 0,
                    paddingInline: 0,
                },
                '@media (max-width: 360px)': {
                    '& [data-scope="date-picker"][data-part="view-trigger"]': {
                        fontSize: '0.75rem',
                    },
                    '& [data-scope="date-picker"][data-part="prev-trigger"], & [data-scope="date-picker"][data-part="next-trigger"]':
                        {
                            width: '1.625rem',
                            height: '1.625rem',
                        },
                    '& [data-scope="date-picker"][data-part="table-cell-trigger"]': {
                        height: '1.75rem',
                        fontSize: '0.75rem',
                    },
                    '& [role="grid"] button': {
                        minWidth: 0,
                        height: '1.75rem',
                        fontSize: '0.75rem',
                        paddingInline: 0,
                    },
                },
            }}
        >
            <Stack gap={{ base: '1', sm: '4' }} p={{ base: '1', sm: '4' }}>
                <Box {...appSectionSurfaceStyles} borderRadius={appRadii.inner} p={{ base: '1', sm: '3' }}>
                    <DatePicker.View view="day">
                        <DatePicker.Header />
                        <DatePicker.DayTable />
                    </DatePicker.View>
                </Box>

                <Stack
                    {...appSectionSurfaceStyles}
                    borderRadius={appRadii.inner}
                    gap={{ base: '1.5', md: '2' }}
                    p={{ base: '2.5', sm: '3' }}
                >
                    <Text color={appColors.text} fontSize={{ base: 'xs', sm: 'sm' }} fontWeight="medium">
                        Time
                    </Text>
                    <Input
                        {...appInputStyles}
                        disabled={!hasSelectedDate}
                        fontSize={{ base: 'xs', sm: 'sm' }}
                        height={{ base: '8', sm: '9' }}
                        min={minimumTimeValue}
                        onChange={handleTimeChange}
                        placeholder="hh:mm"
                        size="sm"
                        step="60"
                        type="time"
                        value={draftValue.time}
                    />
                </Stack>

                <Button
                    {...appPrimaryButtonStyles}
                    disabled={!nextStoredValue}
                    fontSize={{ base: 'xs', sm: 'sm' }}
                    height={{ base: '8', sm: '9' }}
                    onClick={handleConfirm}
                    size="sm"
                    type="button"
                    transition="background-color 0.2s ease, border-color 0.2s ease, box-shadow 0.2s ease, color 0.2s ease"
                    width="full"
                    _hover={{
                        bg: appColors.primaryHover,
                        boxShadow: '0 16px 30px rgba(203, 184, 255, 0.28)',
                        transform: 'none',
                    }}
                    _active={{
                        bg: '#bea8ff',
                        transform: 'none',
                    }}
                >
                    {confirmLabel}
                </Button>
            </Stack>
        </DatePicker.Content>
    );

    return (
        <DatePicker.Root
            closeOnSelect={false}
            invalid={Boolean(errorMessage)}
            isDateUnavailable={(date) => isDateBeforeMinimumDatePart(date, minimumDatePart)}
            name={fieldName}
            onOpenChange={handleOpenChange}
            onValueChange={handleValueChange}
            open={isOpen}
            positioning={{
                hideWhenDetached: true,
                placement: pickerPlacement,
                strategy: 'fixed',
            }}
            required
            value={pickerValue}
            width="full"
        >
            <Stack gap={{ base: '1.5', md: '2' }} width="full">
                <Text color={appColors.text} fontSize="sm" fontWeight="medium" id={labelId}>
                    {label}
                </Text>
                <DatePicker.Control width="full">
                    <DatePicker.Trigger asChild>
                        <Button
                            aria-describedby={errorMessage ? errorId : undefined}
                            aria-invalid={Boolean(errorMessage)}
                            aria-labelledby={labelId}
                            aria-required="true"
                            bg={appColors.surfaceInset}
                            borderColor={appColors.border}
                            borderWidth="1px"
                            boxShadow="inset 0 1px 0 rgba(255, 255, 255, 0.02)"
                            color={isStoredDateTimeValid(value) ? appColors.text : appColors.textMuted}
                            fontSize="sm"
                            fontWeight="normal"
                            height={{ base: '9', md: '10' }}
                            justifyContent="flex-start"
                            px={{ base: '3', md: '4' }}
                            type="button"
                            transition="background-color 0.2s ease, border-color 0.2s ease, box-shadow 0.2s ease, color 0.2s ease"
                            width="full"
                            _hover={{ borderColor: 'rgba(180, 255, 245, 0.28)' }}
                            _focusVisible={{
                                borderColor: appColors.primary,
                                boxShadow: `0 0 0 3px ${appColors.focusRing}`,
                            }}
                        >
                            {formatStoredDateTimeForDisplay(value)}
                        </Button>
                    </DatePicker.Trigger>
                </DatePicker.Control>
                {errorMessage ? (
                    <Text color="red.400" fontSize="sm" id={errorId}>
                        {errorMessage}
                    </Text>
                ) : null}
            </Stack>
            <DatePicker.Positioner boxSizing="border-box" maxW="none" minW="0" w="auto">
                {pickerContent}
            </DatePicker.Positioner>
        </DatePicker.Root>
    );
};

function splitStoredDateTime(value) {
    const match = value?.match(STORED_DATE_TIME_PATTERN);

    if (!match) {
        return { date: '', time: '' };
    }

    return {
        date: `${match[1]}-${match[2]}-${match[3]}`,
        time: `${match[4]}:${match[5]}`,
    };
}

function createPickerValue(draftValue) {
    if (!DATE_PART_PATTERN.test(draftValue.date)) {
        return [];
    }

    const [year, month, day] = draftValue.date.split('-').map(Number);
    const [hour, minute] = (TIME_PART_PATTERN.test(draftValue.time) ? draftValue.time : '00:00').split(':').map(Number);

    return [new CalendarDateTime(year, month, day, hour, minute)];
}

function createStoredDateTimeValue(datePart, timePart) {
    if (!DATE_PART_PATTERN.test(datePart) || !TIME_PART_PATTERN.test(timePart)) {
        return '';
    }

    return `${datePart}T${timePart}`;
}

function formatStoredDateTimeForDisplay(value) {
    if (!isStoredDateTimeValid(value)) {
        return 'yyyy-mm-dd hh:mm';
    }

    return value.replace('T', ' ');
}

function formatDatePart(year, month, day) {
    return `${String(year).padStart(4, '0')}-${String(month).padStart(2, '0')}-${String(day).padStart(2, '0')}`;
}

function isBasicDetailsFieldName(fieldName) {
    return fieldName === 'title' || fieldName === 'description' || fieldName === 'image';
}

function getInputValidationMessage(input) {
    if (!input?.validity || input.validity.valid) {
        return null;
    }

    return input.validationMessage || 'This field is invalid.';
}

function isStoredDateTimeValid(value) {
    return STORED_DATE_TIME_PATTERN.test(value);
}

function getStoredDatePart(value) {
    return splitStoredDateTime(value).date;
}

function getStoredTimePart(value) {
    return splitStoredDateTime(value).time;
}

function getStoredDateTimeTimestamp(value) {
    const match = value?.match(STORED_DATE_TIME_PATTERN);

    if (!match) {
        return null;
    }

    const [, year, month, day, hour, minute] = match.map(Number);
    const date = new Date(year, month - 1, day, hour, minute);

    if (
        Number.isNaN(date.getTime()) ||
        date.getFullYear() !== year ||
        date.getMonth() !== month - 1 ||
        date.getDate() !== day ||
        date.getHours() !== hour ||
        date.getMinutes() !== minute
    ) {
        return null;
    }

    return date.getTime();
}

function getMinimumDatePart({ fieldName, mode, relatedValue }) {
    const minimumDateParts = [];

    if (mode === 'create') {
        minimumDateParts.push(splitStoredDateTime(getCurrentLocalStoredDateTime()).date);
    }

    if (fieldName === 'endTime' && isStoredDateTimeValid(relatedValue)) {
        minimumDateParts.push(splitStoredDateTime(relatedValue).date);
    }

    const minimumDate = minimumDateParts.filter(Boolean).sort().at(-1);

    if (!minimumDate) {
        return undefined;
    }

    return minimumDate;
}

function getMinimumTimeValue({ draftDate, fieldName, mode, relatedValue }) {
    if (!DATE_PART_PATTERN.test(draftDate)) {
        return undefined;
    }

    const minimumTimes = [];
    const currentDateTime = splitStoredDateTime(getCurrentLocalStoredDateTime());

    if (mode === 'create' && draftDate === currentDateTime.date) {
        minimumTimes.push(currentDateTime.time);
    }

    if (fieldName === 'endTime' && isStoredDateTimeValid(relatedValue)) {
        const startDateTime = splitStoredDateTime(relatedValue);

        if (draftDate === startDateTime.date) {
            minimumTimes.push(startDateTime.time);
        }
    }

    return minimumTimes.length ? minimumTimes.sort().at(-1) : undefined;
}

function getCurrentLocalStoredDateTime() {
    const currentDate = new Date();

    return createStoredDateTimeValue(
        formatDatePart(currentDate.getFullYear(), currentDate.getMonth() + 1, currentDate.getDate()),
        `${String(currentDate.getHours()).padStart(2, '0')}:${String(currentDate.getMinutes()).padStart(2, '0')}`,
    );
}

function getDateTimeErrors(formValues, mode, includeInvalidMessages) {
    const startTimeTimestamp = getStoredDateTimeTimestamp(formValues.startTime);
    const endTimeTimestamp = getStoredDateTimeTimestamp(formValues.endTime);
    const currentDateTime = getCurrentLocalStoredDateTime();
    const currentDatePart = getStoredDatePart(currentDateTime);
    const currentTimePart = getStoredTimePart(currentDateTime);
    const startDatePart = getStoredDatePart(formValues.startTime);
    const endDatePart = getStoredDatePart(formValues.endTime);
    const startTimePart = getStoredTimePart(formValues.startTime);
    const endTimePart = getStoredTimePart(formValues.endTime);
    const nextDateTimeErrors = {
        startTime: null,
        endTime: null,
    };

    if (includeInvalidMessages && (!isStoredDateTimeValid(formValues.startTime) || startTimeTimestamp === null)) {
        nextDateTimeErrors.startTime = 'Select a valid date and time.';
    }

    if (includeInvalidMessages && (!isStoredDateTimeValid(formValues.endTime) || endTimeTimestamp === null)) {
        nextDateTimeErrors.endTime = 'Select a valid date and time.';
    }

    if (mode === 'create') {
        if (
            nextDateTimeErrors.startTime === null &&
            isStoredDateTimeValid(formValues.startTime) &&
            startTimeTimestamp !== null
        ) {
            nextDateTimeErrors.startTime = getPastCreateModeErrorMessage({
                currentDatePart,
                currentTimePart,
                datePart: startDatePart,
                timePart: startTimePart,
            });
        }

        if (
            nextDateTimeErrors.endTime === null &&
            isStoredDateTimeValid(formValues.endTime) &&
            endTimeTimestamp !== null
        ) {
            nextDateTimeErrors.endTime = getPastCreateModeErrorMessage({
                currentDatePart,
                currentTimePart,
                datePart: endDatePart,
                timePart: endTimePart,
            });
        }
    }

    if (
        isStoredDateTimeValid(formValues.startTime) &&
        isStoredDateTimeValid(formValues.endTime) &&
        startTimeTimestamp !== null &&
        endTimeTimestamp !== null &&
        nextDateTimeErrors.endTime === null &&
        endDatePart < startDatePart
    ) {
        nextDateTimeErrors.endTime = getEndDateOrderErrorMessage();
    }

    if (
        isStoredDateTimeValid(formValues.startTime) &&
        isStoredDateTimeValid(formValues.endTime) &&
        startTimeTimestamp !== null &&
        endTimeTimestamp !== null &&
        nextDateTimeErrors.endTime === null &&
        endDatePart === startDatePart &&
        endTimeTimestamp <= startTimeTimestamp
    ) {
        nextDateTimeErrors.endTime = getEndTimeOrderErrorMessage();
    }

    return nextDateTimeErrors;
}

function isDateBeforeMinimumDatePart(date, minimumDatePart) {
    if (!minimumDatePart || !date) {
        return false;
    }

    const datePart = formatDatePart(date.year, date.month, date.day);

    return datePart < minimumDatePart;
}

function getPastDateErrorMessage() {
    return (
        <>
            <strong>Date</strong> cannot be in the past.
        </>
    );
}

function getPastTimeErrorMessage() {
    return (
        <>
            <strong>Time</strong> cannot be in the past.
        </>
    );
}

function getEndDateOrderErrorMessage() {
    return (
        <>
            End <strong>date</strong> must be after start date.
        </>
    );
}

function getEndTimeOrderErrorMessage() {
    return (
        <>
            End <strong>time</strong> must be after start time.
        </>
    );
}

function getPastCreateModeErrorMessage({ currentDatePart, currentTimePart, datePart, timePart }) {
    if (datePart < currentDatePart) {
        return getPastDateErrorMessage();
    }

    if (datePart === currentDatePart && timePart <= currentTimePart) {
        return getPastTimeErrorMessage();
    }

    return null;
}

const DATE_PART_PATTERN = /^\d{4}-\d{2}-\d{2}$/;
const TIME_PART_PATTERN = /^\d{2}:\d{2}$/;
const STORED_DATE_TIME_PATTERN = /^(\d{4})-(\d{2})-(\d{2})T(\d{2}):(\d{2})$/;
