import { useState } from 'react';
import { Box, Button, Drawer, Flex, Link, Portal, Stack, Text } from '@chakra-ui/react';
import { NavLink, Outlet } from 'react-router-dom';
import { Navigation } from './Navigation';
import { EventFormDialog } from './EventFormDialog';
import { Toaster, toaster } from './ui/toaster';
import { useEvents } from '../context/EventsContext';
import {
    appColors,
    appDrawerSurfaceStyles,
    appLayout,
    appNeutralButtonStyles,
    appPlaceholderBadgeStyles,
    appPrimaryButtonStyles,
    appRadii,
    appTransitions,
} from '../theme/appTheme';

const dashboardItems = [
    { label: 'Overview', soon: true },
    { label: 'Events', to: '/' },
    { label: 'Calendar', soon: true },
    { label: 'Invites', soon: true },
    { label: 'Messages', soon: true },
    { label: 'Venues', soon: true },
    { label: 'Analytics', soon: true },
    { label: 'Settings', soon: true },
];

const secondaryItems = [{ label: 'About', to: '/about' }];

const drawerLinkStyles = ({ isActive }) => ({
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    gap: '0.75rem',
    padding: '0.875rem 1rem',
    borderRadius: '1rem',
    border: `1px solid ${isActive ? appColors.borderStrong : appColors.border}`,
    background: isActive ? 'rgba(203, 184, 255, 0.12)' : 'rgba(3, 16, 16, 0.76)',
    color: appColors.text,
    fontWeight: isActive ? '600' : '500',
    textDecoration: 'none',
    transition: appTransitions.smooth,
    boxShadow: isActive ? '0 12px 24px rgba(203, 184, 255, 0.14)' : 'none',
});

const placeholderItemStyles = {
    align: 'center',
    bg: 'rgba(3, 16, 16, 0.76)',
    borderRadius: '1rem',
    borderWidth: '1px',
    borderColor: appColors.border,
    justify: 'space-between',
    px: '4',
    py: '3.5',
};

export const Root = () => {
    const { categories, createEvent, isServerAvailable } = useEvents();
    const [isCreateDialogOpen, setIsCreateDialogOpen] = useState(false);
    const [isDrawerOpen, setIsDrawerOpen] = useState(false);
    const [isCreating, setIsCreating] = useState(false);
    const openCreateDialog = () => {
        if (!isServerAvailable) {
            toaster.create({
                title: 'Server unavailable',
                description: 'Event data is unavailable right now. Please check whether the server is running and try again.',
                type: 'error',
            });
            return;
        }

        setIsCreateDialogOpen(true);
    };

    const openDrawer = () => {
        setIsDrawerOpen(true);
    };

    const handleDrawerOpenChange = (details) => {
        setIsDrawerOpen(details.open);
    };

    const handleOpenCreateFromDrawer = () => {
        setIsDrawerOpen(false);
        setIsCreateDialogOpen(true);
    };

    const handleCreateEvent = async (eventData) => {
        setIsCreating(true);

        try {
            await createEvent(eventData);
            toaster.create({
                title: 'Event created',
                description: 'The new event was added successfully.',
                type: 'success',
            });
            setIsCreateDialogOpen(false);
        } catch {
            toaster.create({
                title: 'Create failed',
                description: 'We could not create the event. Please make sure the server is running and try again.',
                type: 'error',
            });
        } finally {
            setIsCreating(false);
        }
    };

    return (
        <Box
            minH="100vh"
            bg={`radial-gradient(circle at top, ${appColors.appBgAccent} 0%, ${appColors.appBg} 48%, #010909 100%)`}
            color={appColors.text}
        >
            <Navigation addEventDisabled={!isServerAvailable} onAddEventOpen={openCreateDialog} onMenuOpen={openDrawer} />
            <Drawer.Root open={isDrawerOpen} onOpenChange={handleDrawerOpenChange} placement="start">
                <Portal>
                    <Drawer.Backdrop bg="rgba(1, 8, 8, 0.82)" />
                    <Drawer.Positioner>
                        <Drawer.Content
                            {...appDrawerSurfaceStyles}
                            display="flex"
                            flexDirection="column"
                            h="100dvh"
                            overflow="hidden"
                            w={appLayout.drawerWidth}
                        >
                            <Drawer.Header borderBottomWidth="1px" borderColor={appColors.border} px="5" py="4">
                                <Flex align="center" justify="space-between" gap="4">
                                    <Stack gap="1">
                                        <Drawer.Title color={appColors.text} fontSize="lg" fontWeight="bold">
                                            Navigation
                                        </Drawer.Title>
                                        <Drawer.Description color={appColors.textMuted} fontSize="sm">
                                            Dashboard shortcuts and app sections.
                                        </Drawer.Description>
                                    </Stack>
                                    <Drawer.CloseTrigger
                                        {...appNeutralButtonStyles}
                                        aria-label="Close navigation menu"
                                        px="3"
                                        size="sm"
                                    >
                                        Close
                                    </Drawer.CloseTrigger>
                                </Flex>
                            </Drawer.Header>
                            <Drawer.Body minH="0" overflowY="auto" px="5" py="5">
                                <Stack gap="5">
                                    <Box
                                        bg="rgba(203, 184, 255, 0.10)"
                                        borderRadius={appRadii.inner}
                                        borderWidth="1px"
                                        borderColor={appColors.borderStrong}
                                        px="4"
                                        py="4"
                                    >
                                        <Text
                                            color={appColors.textMuted}
                                            fontSize="xs"
                                            letterSpacing="0.08em"
                                            textTransform="uppercase"
                                        >
                                            Workspace
                                        </Text>
                                        <Text color={appColors.text} fontSize="lg" fontWeight="semibold" mt="1">
                                            Welcome user
                                        </Text>
                                        <Text color={appColors.textMuted} fontSize="sm" mt="1">
                                            Navigate the app or preview upcoming dashboard sections.
                                        </Text>
                                    </Box>

                                    <Stack gap="3">
                                        <Text
                                            color={appColors.textMuted}
                                            fontSize="xs"
                                            letterSpacing="0.08em"
                                            textTransform="uppercase"
                                        >
                                            Dashboard
                                        </Text>
                                        <Stack gap="2">
                                            {dashboardItems.map((item) =>
                                                item.to ? (
                                                    <Link
                                                        as={NavLink}
                                                        end={item.to === '/'}
                                                        key={item.label}
                                                        onClick={() => setIsDrawerOpen(false)}
                                                        style={drawerLinkStyles}
                                                        to={item.to}
                                                        _hover={{
                                                            borderColor: appColors.borderStrong,
                                                            bg: 'rgba(203, 184, 255, 0.08)',
                                                            transform: 'translateY(-1px)',
                                                        }}
                                                        _focusVisible={{
                                                            boxShadow: `0 0 0 3px ${appColors.focusRing}`,
                                                        }}
                                                    >
                                                        <span>{item.label}</span>
                                                    </Link>
                                                ) : (
                                                    <Flex key={item.label} {...placeholderItemStyles}>
                                                        <Text color={appColors.text} fontWeight="500">
                                                            {item.label}
                                                        </Text>
                                                        <Box {...appPlaceholderBadgeStyles}>Coming soon</Box>
                                                    </Flex>
                                                ),
                                            )}
                                        </Stack>
                                    </Stack>

                                    <Stack gap="3">
                                        <Text
                                            color={appColors.textMuted}
                                            fontSize="xs"
                                            letterSpacing="0.08em"
                                            textTransform="uppercase"
                                        >
                                            App
                                        </Text>
                                        <Stack gap="2">
                                            {secondaryItems.map((item) => (
                                                <Link
                                                    as={NavLink}
                                                    key={item.label}
                                                    onClick={() => setIsDrawerOpen(false)}
                                                    style={drawerLinkStyles}
                                                    to={item.to}
                                                    _hover={{
                                                        borderColor: appColors.borderStrong,
                                                        bg: 'rgba(203, 184, 255, 0.08)',
                                                        transform: 'translateY(-1px)',
                                                    }}
                                                    _focusVisible={{
                                                        boxShadow: `0 0 0 3px ${appColors.focusRing}`,
                                                    }}
                                                >
                                                    <span>{item.label}</span>
                                                </Link>
                                            ))}
                                        </Stack>
                                    </Stack>
                                </Stack>
                            </Drawer.Body>
                            <Drawer.Footer borderTopWidth="1px" borderColor={appColors.border} px="5" py="4">
                                <Stack gap="2" w="full">
                                    <Button
                                        {...appPrimaryButtonStyles}
                                        disabled={!isServerAvailable}
                                        onClick={handleOpenCreateFromDrawer}
                                        size="sm"
                                        width="full"
                                    >
                                        Add Event
                                    </Button>
                                    <Text color={appColors.textMuted} fontSize="xs" textAlign="center">
                                        Real navigation stays in the header. Extra sections are visual placeholders.
                                    </Text>
                                </Stack>
                            </Drawer.Footer>
                        </Drawer.Content>
                    </Drawer.Positioner>
                </Portal>
            </Drawer.Root>
            <Box as="main">
                <Outlet />
            </Box>
            <EventFormDialog
                categories={categories}
                initialEvent={null}
                isSubmitting={isCreating}
                mode="create"
                onOpenChange={setIsCreateDialogOpen}
                onSubmit={handleCreateEvent}
                open={isCreateDialogOpen}
            />
            <Toaster />
        </Box>
    );
};
