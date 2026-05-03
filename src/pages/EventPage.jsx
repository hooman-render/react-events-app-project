import { useState } from 'react';
import {
    Badge,
    Box,
    Button,
    Container,
    Heading,
    Image,
    SimpleGrid,
    Skeleton,
    SkeletonText,
    Stack,
    Text,
} from '@chakra-ui/react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { DeleteEventDialog } from '../components/DeleteEventDialog';
import { EventFormDialog } from '../components/EventFormDialog';
import { CategoryTags } from '../components/CategoryTags';
import { Tooltip } from '../components/ui/tooltip';
import { toaster } from '../components/ui/toaster';
import { useEvents } from '../context/EventsContext';
import { formatEventDateTime } from '../utils/event-utils';
import {
    colorPalette,
    cardImageOverlay,
    dangerButton,
    eventMetaPanel,
    heroPanel,
    primaryButton,
    raisedSurface,
    radius,
    transitions,
} from '../theme/theme';

export const EventPage = () => {
    const navigate = useNavigate();
    const { eventId } = useParams();
    const { categories, deleteEvent, error, events, isLoading, updateEvent } = useEvents();

    const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
    const [isDeleting, setIsDeleting] = useState(false);
    const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
    const [isSaving, setIsSaving] = useState(false);

    const numericEventId = Number(eventId);
    const event = events.find((currentEvent) => currentEvent.id === numericEventId);
    const location = event?.location?.trim();

    // Saves the edited event through the shared data flow.
    const handleUpdateEvent = async (eventData) => {
        setIsSaving(true);

        try {
            await updateEvent(numericEventId, eventData);
            toaster.create({
                title: 'Event updated',
                description: 'The event changes were saved successfully.',
                type: 'success',
            });
            setIsEditDialogOpen(false);
        } catch {
            toaster.create({
                title: 'Update failed',
                description:
                    'We could not save the event changes. Please make sure the server is running and try again.',
                type: 'error',
            });
        } finally {
            setIsSaving(false);
        }
    };

    // Deletes the event and sends the user back to the list.
    const handleDeleteEvent = async () => {
        setIsDeleting(true);

        try {
            await deleteEvent(numericEventId);
            toaster.create({
                title: 'Event deleted',
                description: 'The event was removed successfully.',
                type: 'success',
            });
            navigate('/');
        } catch {
            toaster.create({
                title: 'Delete failed',
                description: 'We could not delete the event. Please make sure the server is running and try again.',
                type: 'error',
            });
        } finally {
            setIsDeleting(false);
            setIsDeleteDialogOpen(false);
        }
    };

    // Shows a server error before falling back to not found.
    const hasLoadError = Boolean(error);

    return (
        <Container maxW="6xl" py={{ base: '8', md: '12' }}>
            {isLoading ? (
                <Stack gap="6">
                    <Box {...heroPanel} borderRadius={radius.panel} overflow="hidden" p={{ base: '5', md: '8' }}>
                        <Stack gap="6">
                            <Skeleton height={{ base: '240px', md: '360px' }} borderRadius={radius.inner} />
                            <Stack gap="3">
                                <Skeleton height="12px" width="20%" />
                                <Skeleton height="36px" width={{ base: '70%', md: '44%' }} />
                                <Skeleton height="22px" width={{ base: '48%', md: '24%' }} />
                            </Stack>
                            <SimpleGrid columns={{ base: 1, md: 3 }} gap="4">
                                <Skeleton height="92px" borderRadius={radius.inner} />
                                <Skeleton height="92px" borderRadius={radius.inner} />
                                <Skeleton height="92px" borderRadius={radius.inner} />
                            </SimpleGrid>
                            <Box {...raisedSurface} borderRadius={radius.inner} p="5">
                                <Skeleton height="14px" mb="4" width="16%" />
                                <SkeletonText noOfLines={4} />
                            </Box>
                        </Stack>
                    </Box>
                </Stack>
            ) : null}

            {!isLoading && hasLoadError ? (
                <Box {...heroPanel} borderRadius={radius.panel} p={{ base: '6', md: '8' }}>
                    <Stack gap="4" maxW="lg">
                        <Badge
                            alignSelf="start"
                            bg={colorPalette.dangerSoft}
                            borderColor={colorPalette.dangerBorder}
                            borderRadius={radius.pill}
                            borderWidth="1px"
                            color={colorPalette.text}
                            px="3"
                            py="1"
                        >
                            Data unavailable
                        </Badge>
                        <Heading color={colorPalette.text} size="lg">
                            Unable to load event
                        </Heading>
                        <Text color={colorPalette.textMuted}>
                            We can&apos;t load this event right now. Please check whether the server is running and try
                            again.
                        </Text>
                        <Button {...primaryButton} alignSelf="start" asChild mt="2">
                            <Link to="/">Back to events</Link>
                        </Button>
                    </Stack>
                </Box>
            ) : null}

            {!isLoading && !hasLoadError && !event ? (
                <Box {...heroPanel} borderRadius={radius.panel} p={{ base: '6', md: '8' }}>
                    <Stack gap="4" maxW="lg">
                        <Badge
                            alignSelf="start"
                            bg={colorPalette.primarySoft}
                            borderColor={colorPalette.borderStrong}
                            borderRadius={radius.pill}
                            borderWidth="1px"
                            color={colorPalette.text}
                            px="3"
                            py="1"
                        >
                            Event details
                        </Badge>
                        <Heading color={colorPalette.text} size="lg">
                            Event not found
                        </Heading>
                        <Text color={colorPalette.textMuted}>The requested event could not be found.</Text>
                        <Button {...primaryButton} alignSelf="start" asChild mt="2">
                            <Link to="/">Back to events</Link>
                        </Button>
                    </Stack>
                </Box>
            ) : null}

            {!isLoading && event ? (
                <>
                    <Stack gap={{ base: '6', md: '8' }}>
                        <Box {...heroPanel} borderRadius={radius.panel} overflow="hidden" p="20px" w="full" mx="auto">
                            <Stack gap={{ base: '6', md: '8' }}>
                                <SimpleGrid
                                    columns={{ base: 1, md: 2 }}
                                    gap={{ base: '6', md: '8' }}
                                    alignItems="start"
                                >
                                    <Stack gap={{ base: '6', md: '5' }}>
                                        <Stack display={{ base: 'flex', md: 'none' }} gap="3">
                                            <Text
                                                color={colorPalette.textMuted}
                                                fontSize="xs"
                                                fontWeight="semibold"
                                                letterSpacing="0.08em"
                                                textTransform="uppercase"
                                            >
                                                Event details
                                            </Text>
                                            <Heading
                                                color={colorPalette.text}
                                                fontSize={{ base: '2xl', md: '4xl' }}
                                                lineHeight="shorter"
                                            >
                                                {event.title}
                                            </Heading>
                                            <CategoryTags categories={categories} categoryIds={event.categoryIds} />
                                        </Stack>

                                        <Box
                                            {...raisedSurface}
                                            borderRadius={radius.panel}
                                            justifySelf={{ base: 'stretch', md: 'start' }}
                                            maxW={{ base: 'full', md: '42rem' }}
                                            overflow="hidden"
                                            position="relative"
                                            transition={transitions.smooth}
                                            w="full"
                                            _hover={{
                                                borderColor: colorPalette.borderStrong,
                                                boxShadow: colorPalette.shadowCardHover,
                                            }}
                                        >
                                            <Image
                                                alt={event.title}
                                                aspectRatio={16 / 10}
                                                decoding="async"
                                                fetchPriority="high"
                                                fit="cover"
                                                loading="eager"
                                                referrerPolicy="no-referrer"
                                                sizes="(min-width: 1280px) 50vw, 100vw"
                                                src={event.image}
                                                transition={transitions.smooth}
                                                width="100%"
                                            />
                                            <Box
                                                {...cardImageOverlay}
                                                inset="0"
                                                pointerEvents="none"
                                                position="absolute"
                                            />
                                        </Box>

                                        <Box
                                            {...raisedSurface}
                                            bg={colorPalette.eventMetaGradient}
                                            borderRadius={radius.inner}
                                            p={{ base: '5', md: '6' }}
                                            transition={transitions.smooth}
                                            _hover={{ borderColor: colorPalette.borderStrong }}
                                        >
                                            <Stack gap="3">
                                                <Text
                                                    color={colorPalette.textMuted}
                                                    fontSize="xs"
                                                    fontWeight="semibold"
                                                    letterSpacing="0.08em"
                                                    textTransform="uppercase"
                                                >
                                                    Description
                                                </Text>
                                                <Text
                                                    color={colorPalette.text}
                                                    fontSize={{ base: 'md', md: 'lg' }}
                                                    lineHeight="tall"
                                                >
                                                    {event.description}
                                                </Text>
                                            </Stack>
                                        </Box>
                                    </Stack>

                                    <Stack gap="5">
                                        <Stack display={{ base: 'none', md: 'flex' }} gap="3">
                                            <Text
                                                color={colorPalette.textMuted}
                                                fontSize="xs"
                                                fontWeight="semibold"
                                                letterSpacing="0.08em"
                                                textTransform="uppercase"
                                            >
                                                Event details
                                            </Text>
                                            <Heading
                                                color={colorPalette.text}
                                                fontSize={{ base: '2xl', md: '4xl' }}
                                                lineHeight="shorter"
                                            >
                                                {event.title}
                                            </Heading>
                                            <CategoryTags categories={categories} categoryIds={event.categoryIds} />
                                        </Stack>

                                        <SimpleGrid columns={{ base: 1, md: 1 }} gap="3">
                                            <Box {...eventMetaPanel} p="4">
                                                <Stack gap="1">
                                                    <Text
                                                        color={colorPalette.textMuted}
                                                        fontSize="sm"
                                                        fontWeight="medium"
                                                    >
                                                        Starts
                                                    </Text>
                                                    <Text color={colorPalette.text} lineHeight="tall">
                                                        {formatEventDateTime(event.startTime)}
                                                    </Text>
                                                </Stack>
                                            </Box>

                                            <Box {...eventMetaPanel} p="4">
                                                <Stack gap="1">
                                                    <Text
                                                        color={colorPalette.textMuted}
                                                        fontSize="sm"
                                                        fontWeight="medium"
                                                    >
                                                        Ends
                                                    </Text>
                                                    <Text color={colorPalette.text} lineHeight="tall">
                                                        {formatEventDateTime(event.endTime)}
                                                    </Text>
                                                </Stack>
                                            </Box>

                                            <Box {...eventMetaPanel} p="4">
                                                <Stack gap="1">
                                                    <Text
                                                        color={colorPalette.textMuted}
                                                        fontSize="sm"
                                                        fontWeight="medium"
                                                    >
                                                        Location
                                                    </Text>
                                                    <Text
                                                        color={location ? colorPalette.text : colorPalette.textMuted}
                                                        lineHeight="tall"
                                                    >
                                                        {location || 'Not specified'}
                                                    </Text>
                                                </Stack>
                                            </Box>
                                        </SimpleGrid>
                                    </Stack>
                                </SimpleGrid>

                                <SimpleGrid columns={{ base: 1, sm: 2 }} gap="3" w={{ base: 'full', md: 'sm' }}>
                                    <Tooltip content="Edit this event">
                                        <Button
                                            {...primaryButton}
                                            onClick={() => setIsEditDialogOpen(true)}
                                            size="sm"
                                            width="full"
                                        >
                                            Edit Event
                                        </Button>
                                    </Tooltip>
                                    <Tooltip content="Delete this event">
                                        <Button
                                            {...dangerButton}
                                            onClick={() => setIsDeleteDialogOpen(true)}
                                            size="sm"
                                            width="full"
                                        >
                                            Delete Event
                                        </Button>
                                    </Tooltip>
                                </SimpleGrid>
                            </Stack>
                        </Box>
                    </Stack>

                    <EventFormDialog
                        categories={categories}
                        initialEvent={event}
                        isSubmitting={isSaving}
                        mode="edit"
                        onOpenChange={setIsEditDialogOpen}
                        onSubmit={handleUpdateEvent}
                        open={isEditDialogOpen}
                    />

                    <DeleteEventDialog
                        eventTitle={event.title}
                        isDeleting={isDeleting}
                        onConfirm={handleDeleteEvent}
                        onOpenChange={setIsDeleteDialogOpen}
                        open={isDeleteDialogOpen}
                    />
                </>
            ) : null}
        </Container>
    );
};
