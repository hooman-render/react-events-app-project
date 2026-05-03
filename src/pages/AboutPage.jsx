import { Box, Container, Heading, Stack, Text } from '@chakra-ui/react';
import { colorPalette, radius, surface } from '../theme/theme';

// Adds the required third page to the app.
export const AboutPage = () => {
    return (
        <Container maxW="88rem" py={{ base: '8', md: '12' }}>
            <Stack gap={{ base: '5', md: '6' }}>
                <Box {...surface} borderRadius={radius.panel} p={{ base: '6', md: '8' }}>
                    <Stack gap="4" maxW="4xl">
                        <Text
                            color={colorPalette.primary}
                            fontSize="xl"
                            fontWeight="bold"
                            letterSpacing="0.09em"
                            textTransform="uppercase"
                        >
                            React Advanced Final Assignment
                        </Text>

                        <Heading color={colorPalette.text} size={{ base: 'lg', md: 'xl' }}>
                            About this project
                        </Heading>

                        <Text color={colorPalette.textMuted} fontSize={{ base: 'md', md: 'lg' }} lineHeight="tall">
                            Event Manager App is a responsive React application built for the Winc Academy React
                            Advanced Final Assignment. The app lets users browse events, search by title, filter by
                            category, and manage event details through create, edit, and delete flows.
                        </Text>

                        <Text color={colorPalette.textMuted} lineHeight="tall">
                            The project focuses on practical React patterns such as React Router, Context, reusable
                            components, controlled form state, API communication with JSON Server, loading skeletons,
                            modal dialogs, toast feedback, and responsive Chakra UI layouts.
                        </Text>
                    </Stack>
                </Box>

                <Box {...surface} borderRadius={radius.panel} p={{ base: '6', md: '8' }}>
                    <Stack gap="4">
                        <Heading color={colorPalette.text} size={{ base: 'md', md: 'lg' }}>
                            What the app can do
                        </Heading>

                        <Stack as="ul" color={colorPalette.textMuted} gap="3" lineHeight="tall" pl="5">
                            <Text as="li">Browse all available events from the local JSON Server API.</Text>
                            <Text as="li">Search events by title and filter them by one or more categories.</Text>
                            <Text as="li">
                                Open a detail page with image, category, date, time, location, and description.
                            </Text>
                            <Text as="li">Create new events with a validated form and clear feedback.</Text>
                            <Text as="li">Edit existing events without changing the underlying API structure.</Text>
                            <Text as="li">
                                Delete events only after a confirmation step, so destructive actions stay intentional.
                            </Text>
                        </Stack>
                    </Stack>
                </Box>

                <Box {...surface} borderRadius={radius.panel} p={{ base: '6', md: '8' }}>
                    <Stack gap="4">
                        <Heading color={colorPalette.text} size={{ base: 'md', md: 'lg' }}>
                            Navigation and future sections
                        </Heading>

                        <Text color={colorPalette.textMuted} lineHeight="tall">
                            The drawer menu is designed as a preview of a larger dashboard structure. Some sections are
                            marked as coming soon, such as Calendar, Invites, Messages, Venues, Analytics, and Settings.
                            These links are visual placeholders for possible future features and are not part of the
                            current assignment requirements.
                        </Text>

                        <Text color={colorPalette.textMuted} lineHeight="tall">
                            This keeps the current app focused on the required event management flow, while still
                            showing how the interface could grow into a larger event dashboard later.
                        </Text>
                    </Stack>
                </Box>

                <Box {...surface} borderRadius={radius.panel} p={{ base: '6', md: '8' }}>
                    <Stack gap="4">
                        <Heading color={colorPalette.text} size={{ base: 'md', md: 'lg' }}>
                            Technical approach
                        </Heading>

                        <Stack as="ul" color={colorPalette.textMuted} gap="3" lineHeight="tall" pl="5">
                            <Text as="li">
                                React Router handles the Events page, About page, and individual event detail pages.
                            </Text>
                            <Text as="li">React Context keeps events and categories available across the app.</Text>
                            <Text as="li">JSON Server is used as the local back end for event and category data.</Text>
                            <Text as="li">
                                Chakra UI 3 provides the responsive layout, dialogs, buttons, fields, and skeletons.
                            </Text>
                            <Text as="li">
                                Shared visual styling is centralized in the theme file to keep colors and reusable
                                styles easier to maintain.
                            </Text>
                        </Stack>
                    </Stack>
                </Box>

                <Box {...surface} borderRadius={radius.panel} p={{ base: '6', md: '8' }}>
                    <Stack gap="4">
                        <Heading color={colorPalette.text} size={{ base: 'md', md: 'lg' }}>
                            Project focus
                        </Heading>

                        <Stack gap="3">
                            <Text color={colorPalette.textMuted} lineHeight="tall">
                                The focus of this version is a clear event management flow:
                            </Text>

                            <Stack as="ul" color={colorPalette.textMuted} gap="2" lineHeight="tall" pl="5">
                                <Text as="li">Browsing events.</Text>
                                <Text as="li">Filtering results by category.</Text>
                                <Text as="li">Opening event details.</Text>
                                <Text as="li">Creating, editing, and deleting events.</Text>
                            </Stack>

                            <Text color={colorPalette.textMuted} lineHeight="tall">
                                The layout and navigation are structured so the app can be extended later without
                                changing the core flow.
                            </Text>
                        </Stack>
                    </Stack>
                </Box>
            </Stack>
        </Container>
    );
};
