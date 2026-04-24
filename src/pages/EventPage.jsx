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
import { toaster } from '../components/ui/toaster';
import { useEvents } from '../context/EventsContext';
import { formatEventDateTime } from '../utils/event-utils';
import {
    appColors,
    appCardImageOverlay,
    appDangerButtonStyles,
    appHeroStyles,
    appPrimaryButtonStyles,
    appRaisedSurfaceStyles,
    appRadii,
    appTransitions,
} from '../theme/appTheme';

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
                description: 'We could not save the event changes. Please make sure the server is running and try again.',
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
                    <Box {...appHeroStyles} borderRadius={appRadii.panel} overflow="hidden" p={{ base: '5', md: '8' }}>
                        <Stack gap="6">
                            <Skeleton height={{ base: '240px', md: '360px' }} borderRadius={appRadii.inner} />
                            <Stack gap="3">
                                <Skeleton height="12px" width="20%" />
                                <Skeleton height="36px" width={{ base: '70%', md: '44%' }} />
                                <Skeleton height="22px" width={{ base: '48%', md: '24%' }} />
                            </Stack>
                            <SimpleGrid columns={{ base: 1, md: 3 }} gap="4">
                                <Skeleton height="92px" borderRadius={appRadii.inner} />
                                <Skeleton height="92px" borderRadius={appRadii.inner} />
                                <Skeleton height="92px" borderRadius={appRadii.inner} />
                            </SimpleGrid>
                            <Box {...appRaisedSurfaceStyles} borderRadius={appRadii.inner} p="5">
                                <Skeleton height="14px" mb="4" width="16%" />
                                <SkeletonText noOfLines={4} />
                            </Box>
                        </Stack>
                    </Box>
                </Stack>
            ) : null}

            {!isLoading && hasLoadError ? (
                <Box {...appHeroStyles} borderRadius={appRadii.panel} p={{ base: '6', md: '8' }}>
                    <Stack gap="4" maxW="lg">
                        <Badge
                            alignSelf="start"
                            bg="rgba(248, 113, 113, 0.14)"
                            borderColor="rgba(248, 113, 113, 0.28)"
                            borderRadius={appRadii.pill}
                            borderWidth="1px"
                            color={appColors.text}
                            px="3"
                            py="1"
                        >
                            Data unavailable
                        </Badge>
                        <Heading color={appColors.text} size="lg">Unable to load event</Heading>
                        <Text color={appColors.textMuted}>
                            We can&apos;t load this event right now. Please check whether the server is running and try again.
                        </Text>
                        <Button {...appPrimaryButtonStyles} alignSelf="start" asChild mt="2">
                            <Link to="/">Back to events</Link>
                        </Button>
                    </Stack>
                </Box>
            ) : null}

            {!isLoading && !hasLoadError && !event ? (
                <Box {...appHeroStyles} borderRadius={appRadii.panel} p={{ base: '6', md: '8' }}>
                    <Stack gap="4" maxW="lg">
                        <Badge
                            alignSelf="start"
                            bg="rgba(203, 184, 255, 0.14)"
                            borderColor={appColors.borderStrong}
                            borderRadius={appRadii.pill}
                            borderWidth="1px"
                            color={appColors.text}
                            px="3"
                            py="1"
                        >
                            Event details
                        </Badge>
                        <Heading color={appColors.text} size="lg">Event not found</Heading>
                        <Text color={appColors.textMuted}>
                            The requested event could not be found.
                        </Text>
                        <Button {...appPrimaryButtonStyles} alignSelf="start" asChild mt="2">
                            <Link to="/">Back to events</Link>
                        </Button>
                    </Stack>
                </Box>
            ) : null}

            {!isLoading && event ? (
                <>
                    <Stack gap={{ base: '6', md: '8' }}>
                        <Box {...appHeroStyles} borderRadius={appRadii.panel} overflow="hidden" p={{ base: '5', md: '8' }}>
                            <Stack gap={{ base: '6', lg: '8' }}>
                                <SimpleGrid columns={{ base: 1, xl: 2 }} gap={{ base: '6', lg: '8' }} alignItems="start">
                                    <Box
                                        {...appRaisedSurfaceStyles}
                                        borderRadius={appRadii.panel}
                                        overflow="hidden"
                                        position="relative"
                                        transition={appTransitions.smooth}
                                        _hover={{
                                            borderColor: appColors.borderStrong,
                                            boxShadow: '0 18px 36px rgba(0, 0, 0, 0.24), 0 0 26px rgba(24, 214, 199, 0.08)',
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
                                            transition={appTransitions.smooth}
                                            width="100%"
                                        />
                                        <Box
                                            {...appCardImageOverlay}
                                            inset="0"
                                            pointerEvents="none"
                                            position="absolute"
                                        />
                                    </Box>

                                    <Stack gap="5">
                                        <Stack gap="3">
                                            <Text
                                                color={appColors.textMuted}
                                                fontSize="xs"
                                                fontWeight="semibold"
                                                letterSpacing="0.08em"
                                                textTransform="uppercase"
                                            >
                                                Event details
                                            </Text>
                                            <Heading color={appColors.text} fontSize={{ base: '2xl', md: '4xl' }} lineHeight="shorter">
                                                {event.title}
                                            </Heading>
                                            <CategoryTags categories={categories} categoryIds={event.categoryIds} />
                                        </Stack>

                                        <SimpleGrid columns={{ base: 1, sm: 2 }} gap="3" w={{ base: 'full', sm: 'auto' }}>
                                            <Button
                                                {...appPrimaryButtonStyles}
                                                onClick={() => setIsEditDialogOpen(true)}
                                                size="sm"
                                                width="full"
                                            >
                                                Edit Event
                                            </Button>
                                            <Button
                                                {...appDangerButtonStyles}
                                                onClick={() => setIsDeleteDialogOpen(true)}
                                                size="sm"
                                                variant="outline"
                                                width="full"
                                            >
                                                Delete Event
                                            </Button>
                                        </SimpleGrid>

                                        <SimpleGrid columns={{ base: 1, sm: 3, xl: 1 }} gap="3">
                                            <Box
                                                {...appRaisedSurfaceStyles}
                                                bg="linear-gradient(180deg, rgba(11, 31, 31, 0.96) 0%, rgba(7, 23, 23, 0.96) 100%)"
                                                borderRadius={appRadii.inner}
                                                p="4"
                                                transition={appTransitions.smooth}
                                                _hover={{ borderColor: appColors.borderStrong }}
                                            >
                                                <Stack gap="1">
                                                    <Text color={appColors.textMuted} fontSize="sm" fontWeight="medium">
                                                        Starts
                                                    </Text>
                                                    <Text color={appColors.text} lineHeight="tall">{formatEventDateTime(event.startTime)}</Text>
                                                </Stack>
                                            </Box>

                                            <Box
                                                {...appRaisedSurfaceStyles}
                                                bg="linear-gradient(180deg, rgba(11, 31, 31, 0.96) 0%, rgba(7, 23, 23, 0.96) 100%)"
                                                borderRadius={appRadii.inner}
                                                p="4"
                                                transition={appTransitions.smooth}
                                                _hover={{ borderColor: appColors.borderStrong }}
                                            >
                                                <Stack gap="1">
                                                    <Text color={appColors.textMuted} fontSize="sm" fontWeight="medium">
                                                        Ends
                                                    </Text>
                                                    <Text color={appColors.text} lineHeight="tall">{formatEventDateTime(event.endTime)}</Text>
                                                </Stack>
                                            </Box>

                                            <Box
                                                {...appRaisedSurfaceStyles}
                                                bg="linear-gradient(180deg, rgba(11, 31, 31, 0.96) 0%, rgba(7, 23, 23, 0.96) 100%)"
                                                borderRadius={appRadii.inner}
                                                p="4"
                                                transition={appTransitions.smooth}
                                                _hover={{ borderColor: appColors.borderStrong }}
                                            >
                                                <Stack gap="1">
                                                    <Text color={appColors.textMuted} fontSize="sm" fontWeight="medium">
                                                        Location
                                                    </Text>
                                                    <Text color={location ? appColors.text : appColors.textMuted} lineHeight="tall">
                                                        {location || 'Not specified'}
                                                    </Text>
                                                </Stack>
                                            </Box>
                                        </SimpleGrid>
                                    </Stack>
                                </SimpleGrid>

                                <Box
                                    {...appRaisedSurfaceStyles}
                                    bg="linear-gradient(180deg, rgba(11, 31, 31, 0.96) 0%, rgba(7, 23, 23, 0.96) 100%)"
                                    borderRadius={appRadii.inner}
                                    p={{ base: '5', md: '6' }}
                                    transition={appTransitions.smooth}
                                    _hover={{ borderColor: appColors.borderStrong }}
                                >
                                    <Stack gap="3" maxW="4xl">
                                        <Text
                                            color={appColors.textMuted}
                                            fontSize="xs"
                                            fontWeight="semibold"
                                            letterSpacing="0.08em"
                                            textTransform="uppercase"
                                        >
                                            Description
                                        </Text>
                                        <Text color={appColors.text} fontSize={{ base: 'md', md: 'lg' }} lineHeight="tall">
                                            {event.description}
                                        </Text>
                                    </Stack>
                                </Box>
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
