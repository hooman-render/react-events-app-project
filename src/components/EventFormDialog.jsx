import { CalendarDateTime } from '@internationalized/date';
import { useEffect, useId, useState } from 'react';
import {
    Box,
    Button,
    Checkbox,
    CloseButton,
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
import { Tooltip } from './ui/tooltip';
import { buildEventPayload, createEventFormValues } from '../utils/event-utils';
import {
    colorPalette,
    datePickerCss,
    datePickerPanel,
    dialogBackdrop,
    dialogCloseButton,
    inputStyles,
    secondaryButton,
    primaryButton,
    dialogPanel,
    radius,
    sectionPanel,
    transitions,
} from '../theme/theme';

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
            closeOnEscape={false}
            closeOnInteractOutside={false}
            open={open}
            onOpenChange={(details) => onOpenChange(details.open)}
        >
            <Portal>
                <Dialog.Backdrop {...dialogBackdrop} />
                <Dialog.Positioner maxH="100vh" overflow="hidden" padding={{ base: '2', sm: '4' }}>
                    <Dialog.Content
                        {...dialogPanel}
                        display="flex"
                        flexDirection="column"
                        maxH={{ base: '92vh', md: '90vh' }}
                        maxW={{ base: 'calc(100vw - 1rem)', md: '4xl' }}
                        minH="0"
                        overflow="hidden"
                        borderRadius={radius.panel}
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
                                borderColor={colorPalette.border}
                                pb={{ base: '3', md: '4' }}
                                position="relative"
                                pt={{ base: '4', md: '6' }}
                                px={{ base: '3', md: '6' }}
                            >
                                <Stack align="start" gap={{ base: '0.5', md: '1.5' }} pr={{ base: '16', md: '20' }}>
                                    <Dialog.Title
                                        color={colorPalette.text}
                                        fontSize={{ base: 'lg', md: 'xl' }}
                                        fontWeight="bold"
                                        lineHeight="short"
                                        overflow="hidden"
                                        textOverflow="ellipsis"
                                        whiteSpace="nowrap"
                                    >
                                        {dialogTitle}
                                    </Dialog.Title>
                                    <Dialog.Description
                                        color={colorPalette.textMuted}
                                        fontSize={{ base: 'xs', md: 'sm' }}
                                    >
                                        Provide the required event details and save them to the server.
                                    </Dialog.Description>
                                </Stack>

                                <Tooltip content="Close">
                                    <Dialog.CloseTrigger asChild>
                                        <CloseButton
                                            {...dialogCloseButton}
                                            aria-label={
                                                mode === 'create' ? 'Cancel event creation' : 'Cancel event editing'
                                            }
                                            disabled={isSubmitting}
                                            onClick={handleCancel}
                                            position="absolute"
                                            right={{ base: '3', md: '5' }}
                                            top={{ base: '3', md: '5' }}
                                        />
                                    </Dialog.CloseTrigger>
                                </Tooltip>
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
                                        {...sectionPanel}
                                        borderColor={hasBasicDetailsError ? 'red.400' : colorPalette.border}
                                        boxSizing="border-box"
                                        rounded="lg"
                                        p={{ base: '3', md: '4' }}
                                        w="full"
                                        transition={transitions.smooth}
                                        _hover={{
                                            borderColor: hasBasicDetailsError ? 'red.400' : colorPalette.borderStrong,
                                        }}
                                        _focusWithin={{
                                            borderColor: hasBasicDetailsError ? 'red.400' : colorPalette.borderStrong,
                                            boxShadow: hasBasicDetailsError
                                                ? `0 0 0 1px ${colorPalette.dangerFocus}`
                                                : `0 0 0 1px ${colorPalette.borderStrong}`,
                                        }}
                                    >
                                        <Stack gap={{ base: '3', md: '4' }}>
                                            <Text color={colorPalette.text} fontSize="sm" fontWeight="semibold">
                                                Basic details
                                            </Text>
                                            <Field.Root invalid={Boolean(basicFieldErrors.title)} required>
                                                <Field.Label color={colorPalette.text} fontSize="sm">
                                                    Title
                                                </Field.Label>
                                                <Input
                                                    {...inputStyles}
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
                                                <Field.Label color={colorPalette.text} fontSize="sm">
                                                    Description
                                                </Field.Label>
                                                <Textarea
                                                    {...inputStyles}
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
                                                <Field.Label color={colorPalette.text} fontSize="sm">
                                                    Image URL
                                                </Field.Label>
                                                <Input
                                                    {...inputStyles}
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
                                                    color={colorPalette.textMuted}
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
                                        {...sectionPanel}
                                        borderColor={locationError ? 'red.400' : colorPalette.border}
                                        boxSizing="border-box"
                                        rounded="lg"
                                        p={{ base: '3', md: '4' }}
                                        w="full"
                                        transition={transitions.smooth}
                                        _hover={{ borderColor: locationError ? 'red.400' : colorPalette.borderStrong }}
                                        _focusWithin={{
                                            borderColor: locationError ? 'red.400' : colorPalette.borderStrong,
                                            boxShadow: locationError
                                                ? `0 0 0 1px ${colorPalette.dangerFocus}`
                                                : `0 0 0 1px ${colorPalette.borderStrong}`,
                                        }}
                                    >
                                        <Stack gap={{ base: '3', md: '4' }}>
                                            <Text color={colorPalette.text} fontSize="sm" fontWeight="semibold">
                                                Location
                                            </Text>
                                            <Field.Root invalid={Boolean(locationError)} w="full">
                                                <Stack
                                                    align="stretch"
                                                    direction={{ base: 'column', md: 'row' }}
                                                    gap={{ base: '2', md: '3' }}
                                                    maxW={{ base: 'none', md: '56rem', lg: '64rem' }}
                                                    w="full"
                                                >
                                                    <Input
                                                        {...inputStyles}
                                                        aria-label="Location"
                                                        flex={{ base: 'none', md: '1 1 auto' }}
                                                        minW="0"
                                                        name="location"
                                                        onChange={handleChange}
                                                        placeholder="Amsterdam, The Netherlands"
                                                        size="sm"
                                                        value={formValues.location}
                                                        w="full"
                                                    />
                                                    <Button
                                                        {...primaryButton}
                                                        disabled={isSearchingLocation}
                                                        flexShrink={0}
                                                        onClick={() => void handleFindLocation()}
                                                        size="sm"
                                                        whiteSpace="nowrap"
                                                        type="button"
                                                        w={{ base: 'full', md: '12rem' }}
                                                    >
                                                        {isSearchingLocation ? 'Searching...' : 'Find location'}
                                                    </Button>
                                                </Stack>
                                                <Field.HelperText
                                                    color={colorPalette.textMuted}
                                                    fontSize={{ base: 'xs', md: 'sm' }}
                                                    maxW={{ md: '52rem' }}
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
                                        {...sectionPanel}
                                        borderColor={hasDateTimeSectionError ? 'red.400' : colorPalette.border}
                                        boxSizing="border-box"
                                        rounded="lg"
                                        p={{ base: '3', md: '4' }}
                                        w="full"
                                    >
                                        <Stack gap={{ base: '3', md: '4' }}>
                                            <Text color={colorPalette.text} fontSize="sm" fontWeight="semibold">
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
                                        {...sectionPanel}
                                        borderColor={isCategoryInvalid ? 'red.400' : colorPalette.border}
                                        boxSizing="border-box"
                                        rounded="lg"
                                        p={{ base: '3', md: '4' }}
                                        w="full"
                                        transition={transitions.smooth}
                                        _hover={{
                                            borderColor: isCategoryInvalid ? 'red.400' : colorPalette.borderStrong,
                                        }}
                                        _focusWithin={{
                                            borderColor: isCategoryInvalid ? 'red.400' : colorPalette.borderStrong,
                                            boxShadow: isCategoryInvalid
                                                ? `0 0 0 1px ${colorPalette.dangerFocus}`
                                                : `0 0 0 1px ${colorPalette.borderStrong}`,
                                        }}
                                    >
                                        <Fieldset.Root invalid={isCategoryInvalid} required>
                                            <Stack gap={{ base: '3', md: '4' }}>
                                                <Fieldset.Legend
                                                    color={colorPalette.text}
                                                    fontSize="sm"
                                                    fontWeight="semibold"
                                                >
                                                    Categories
                                                </Fieldset.Legend>
                                                <Text
                                                    color={colorPalette.textMuted}
                                                    fontSize={{ base: 'xs', md: 'sm' }}
                                                >
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
                                                                transition={transitions.smooth}
                                                                value={String(category.id)}
                                                                _hover={{
                                                                    bg: colorPalette.primarySoft,
                                                                    borderColor: colorPalette.borderStrong,
                                                                }}
                                                                _focusWithin={{
                                                                    borderColor: colorPalette.borderStrong,
                                                                    boxShadow: `0 0 0 3px ${colorPalette.focusRing}`,
                                                                }}
                                                            >
                                                                <Checkbox.HiddenInput />
                                                                <Checkbox.Control
                                                                    transition={transitions.smooth}
                                                                    _checked={{
                                                                        bg: colorPalette.primary,
                                                                        borderColor: colorPalette.primary,
                                                                        color: colorPalette.primaryText,
                                                                    }}
                                                                >
                                                                    <Checkbox.Indicator />
                                                                </Checkbox.Control>
                                                                <Checkbox.Label
                                                                    color={colorPalette.text}
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
                                borderColor={colorPalette.border}
                                pb={{ base: '4', md: '6' }}
                                pt={{ base: '3', md: '4' }}
                                px={{ base: '3', md: '6' }}
                            >
                                <SimpleGrid columns={2} gap={{ base: '2', md: '3' }} w="full">
                                    <Button
                                        {...secondaryButton}
                                        disabled={isSubmitting}
                                        onClick={handleCancel}
                                        size="sm"
                                        width="full"
                                    >
                                        Cancel
                                    </Button>
                                    <Button
                                        {...primaryButton}
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
        <DatePicker.Content {...datePickerPanel} css={datePickerCss}>
            <Stack gap={{ base: '1', sm: '4' }} p={{ base: '0.25', sm: '4' }}>
                <Box {...sectionPanel} borderRadius={radius.inner} p={{ base: '0.25', sm: '3' }}>
                    <DatePicker.View view="day">
                        <DatePicker.Header />
                        <DatePicker.DayTable />
                    </DatePicker.View>

                    <DatePicker.View view="month">
                        <DatePicker.Header />
                        <DatePicker.MonthTable />
                    </DatePicker.View>

                    <DatePicker.View view="year">
                        <DatePicker.Header />
                        <DatePicker.YearTable />
                    </DatePicker.View>
                </Box>

                <Stack
                    {...sectionPanel}
                    borderRadius={radius.inner}
                    gap={{ base: '1.25', md: '2' }}
                    p={{ base: '2', sm: '3' }}
                >
                    <Text color={colorPalette.text} fontSize={{ base: 'xs', sm: 'sm' }} fontWeight="medium">
                        Time
                    </Text>
                    <Input
                        {...inputStyles}
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
                    {...primaryButton}
                    disabled={!nextStoredValue}
                    fontSize={{ base: 'xs', sm: 'sm' }}
                    height={{ base: '8', sm: '9' }}
                    onClick={handleConfirm}
                    size="sm"
                    type="button"
                    transition="background-color 0.2s ease, border-color 0.2s ease, box-shadow 0.2s ease, color 0.2s ease"
                    width="full"
                    _hover={{
                        bg: colorPalette.primaryHover,
                        boxShadow: colorPalette.primaryShadowHover,
                        transform: 'none',
                    }}
                    _active={{
                        bg: colorPalette.primaryActive,
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
                sameWidth: true,
                strategy: 'fixed',
            }}
            required
            value={pickerValue}
            width="full"
        >
            <Stack gap={{ base: '1.5', md: '2' }} width="full">
                <Text color={colorPalette.text} fontSize="sm" fontWeight="medium" id={labelId}>
                    {label}
                </Text>
                <DatePicker.Control width="full">
                    <DatePicker.Trigger asChild>
                        <Button
                            aria-describedby={errorMessage ? errorId : undefined}
                            aria-invalid={Boolean(errorMessage)}
                            aria-labelledby={labelId}
                            aria-required="true"
                            bg={colorPalette.surfaceInset}
                            borderColor={colorPalette.border}
                            borderWidth="1px"
                            boxShadow={colorPalette.shadowInset}
                            color={isStoredDateTimeValid(value) ? colorPalette.text : colorPalette.textMuted}
                            fontSize="sm"
                            fontWeight="normal"
                            height={{ base: '9', md: '10' }}
                            justifyContent="flex-start"
                            px={{ base: '3', md: '4' }}
                            type="button"
                            transition="background-color 0.2s ease, border-color 0.2s ease, box-shadow 0.2s ease, color 0.2s ease"
                            width="full"
                            _hover={{ borderColor: colorPalette.primaryBorder }}
                            _focusVisible={{
                                borderColor: colorPalette.primary,
                                boxShadow: `0 0 0 3px ${colorPalette.focusRing}`,
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
