import { useState } from 'react';
import { Box, Button, CloseButton, Drawer, Flex, Link, Portal, Stack, Text } from '@chakra-ui/react';
import { NavLink, Outlet } from 'react-router-dom';
import { Navigation } from './Navigation';
import { EventFormDialog } from './EventFormDialog';
import { Toaster, toaster } from './ui/toaster';
import { Tooltip } from './ui/tooltip';
import { useEvents } from '../context/EventsContext';
import {
    colorPalette,
    drawerCloseButton,
    drawerSurface,
    layout,
    placeholderBadge,
    primaryButton,
    radius,
    transitions,
} from '../theme/theme';

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
    border: `1px solid ${isActive ? colorPalette.borderStrong : colorPalette.border}`,
    background: isActive ? colorPalette.primarySoft : colorPalette.surfaceInset,
    color: colorPalette.text,
    fontWeight: isActive ? '600' : '500',
    textDecoration: 'none',
    transition: transitions.smooth,
    boxShadow: isActive ? colorPalette.shadowPrimary : 'none',
});

const placeholderItemStyles = {
    align: 'center',
    bg: colorPalette.surfaceInset,
    borderRadius: '1rem',
    borderWidth: '1px',
    borderColor: colorPalette.border,
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
                description:
                    'Event data is unavailable right now. Please check whether the server is running and try again.',
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
        <Box minH="100vh" bg={colorPalette.appBackground} color={colorPalette.text}>
            <Navigation
                addEventDisabled={!isServerAvailable}
                onAddEventOpen={openCreateDialog}
                onMenuOpen={openDrawer}
            />
            <Drawer.Root open={isDrawerOpen} onOpenChange={handleDrawerOpenChange} placement="start">
                <Portal>
                    <Drawer.Backdrop bg={colorPalette.overlayDark} />
                    <Drawer.Positioner>
                        <Drawer.Content
                            {...drawerSurface}
                            display="flex"
                            flexDirection="column"
                            h="100dvh"
                            overflow="hidden"
                            w={layout.drawerWidth}
                        >
                            <Drawer.Header borderBottomWidth="1px" borderColor={colorPalette.border} px="5" py="4">
                                <Flex align="center" justify="space-between" gap="4">
                                    <Stack gap="1">
                                        <Drawer.Title color={colorPalette.text} fontSize="lg" fontWeight="bold">
                                            Navigation
                                        </Drawer.Title>
                                        <Drawer.Description color={colorPalette.textMuted} fontSize="sm">
                                            Dashboard.
                                        </Drawer.Description>
                                    </Stack>
                                    <Tooltip content="Close navigation">
                                        <Drawer.CloseTrigger asChild>
                                            <CloseButton {...drawerCloseButton} aria-label="Close navigation" />
                                        </Drawer.CloseTrigger>
                                    </Tooltip>
                                </Flex>
                            </Drawer.Header>
                            <Drawer.Body minH="0" overflowY="auto" px="5" py="5">
                                <Stack gap="5">
                                    <Box
                                        bg={colorPalette.primarySoft}
                                        borderRadius={radius.inner}
                                        borderWidth="1px"
                                        borderColor={colorPalette.borderStrong}
                                        px="4"
                                        py="4"
                                    >
                                        <Text
                                            color={colorPalette.textMuted}
                                            fontSize="xs"
                                            letterSpacing="0.08em"
                                            textTransform="uppercase"
                                        >
                                            Workspace
                                        </Text>
                                        <Text color={colorPalette.text} fontSize="lg" fontWeight="semibold" mt="1">
                                            Welcome user
                                        </Text>
                                        <Text color={colorPalette.textMuted} fontSize="sm" mt="1">
                                            Navigate the app or preview upcoming dashboard sections.
                                        </Text>
                                    </Box>

                                    <Stack gap="3">
                                        <Text
                                            color={colorPalette.textMuted}
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
                                                            borderColor: colorPalette.borderStrong,
                                                            bg: colorPalette.primarySoft,
                                                            transform: 'translateY(-1px)',
                                                        }}
                                                        _focusVisible={{
                                                            boxShadow: `0 0 0 3px ${colorPalette.focusRing}`,
                                                        }}
                                                    >
                                                        <span>{item.label}</span>
                                                    </Link>
                                                ) : (
                                                    <Flex key={item.label} {...placeholderItemStyles}>
                                                        <Text color={colorPalette.text} fontWeight="500">
                                                            {item.label}
                                                        </Text>
                                                        <Box {...placeholderBadge}>Coming soon</Box>
                                                    </Flex>
                                                ),
                                            )}
                                        </Stack>
                                    </Stack>

                                    <Stack gap="3">
                                        <Text
                                            color={colorPalette.textMuted}
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
                                                        borderColor: colorPalette.borderStrong,
                                                        bg: colorPalette.primarySoft,
                                                        transform: 'translateY(-1px)',
                                                    }}
                                                    _focusVisible={{
                                                        boxShadow: `0 0 0 3px ${colorPalette.focusRing}`,
                                                    }}
                                                >
                                                    <span>{item.label}</span>
                                                </Link>
                                            ))}
                                        </Stack>
                                    </Stack>
                                </Stack>
                            </Drawer.Body>
                            <Drawer.Footer borderTopWidth="1px" borderColor={colorPalette.border} px="5" py="4">
                                <Stack gap="2" w="full">
                                    <Tooltip content="Create a new event">
                                        <Button
                                            {...primaryButton}
                                            disabled={!isServerAvailable}
                                            onClick={handleOpenCreateFromDrawer}
                                            size="sm"
                                            width="full"
                                        >
                                            Add Event
                                        </Button>
                                    </Tooltip>
                                    <Text color={colorPalette.textMuted} fontSize="xs" textAlign="center">
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
