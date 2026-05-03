import { useMemo, useState } from 'react';
import {
    Box,
    Checkbox,
    CheckboxGroup,
    Container,
    Field,
    Fieldset,
    Flex,
    Grid,
    Heading,
    Input,
    SimpleGrid,
    Stack,
    Text,
} from '@chakra-ui/react';
import { EventCard } from '../components/EventCard';
import { EventListSkeleton } from '../components/EventListSkeleton';
import { useEvents } from '../context/EventsContext';
import { matchesEventFilters } from '../utils/event-utils';
import { colorPalette, heroPanel, inputStyles, raisedSurface, radius, transitions, typography } from '../theme/theme';

export const EventsPage = () => {
    const { categories, error, events, isLoading } = useEvents();
    const [searchTerm, setSearchTerm] = useState('');
    const [selectedCategoryIds, setSelectedCategoryIds] = useState([]);

    // Filters events by title and selected categories.
    const filteredEvents = useMemo(
        () => events.filter((event) => matchesEventFilters(event, searchTerm, selectedCategoryIds)),
        [events, searchTerm, selectedCategoryIds],
    );

    // Shows the server error before any empty result message.
    const hasServerError = Boolean(error);

    return (
        <Container maxW="88rem" py={{ base: '8', md: '12' }}>
            <Stack gap={{ base: '6', md: '8' }}>
                <Box
                    {...heroPanel}
                    borderRadius={radius.panel}
                    overflow="hidden"
                    position="relative"
                    px={{ base: '5', md: '8' }}
                    py={{ base: '6', md: '8' }}
                >
                    <Box
                        bg={colorPalette.primarySoft}
                        borderRadius="full"
                        filter="blur(30px)"
                        h={{ base: '160px', md: '240px' }}
                        pointerEvents="none"
                        position="absolute"
                        right={{ base: '-14', md: '-10' }}
                        top={{ base: '-10', md: '-14' }}
                        w={{ base: '160px', md: '240px' }}
                    />
                    <Box
                        border={`1px solid ${colorPalette.primaryBorder}`}
                        borderRadius="full"
                        h={{ base: '150px', md: '220px' }}
                        pointerEvents="none"
                        position="absolute"
                        right={{ base: '-10', md: '2' }}
                        top={{ base: '-8', md: '-2' }}
                        w={{ base: '150px', md: '220px' }}
                    />
                    <Box
                        border={`1px solid ${colorPalette.primaryBorder}`}
                        borderRadius="full"
                        h={{ base: '110px', md: '160px' }}
                        pointerEvents="none"
                        position="absolute"
                        right={{ base: '4', md: '16' }}
                        top={{ base: '10', md: '12' }}
                        w={{ base: '110px', md: '160px' }}
                    />

                    <Stack gap="3" maxW={{ base: 'full', md: '3xl' }} position="relative" zIndex="1">
                        <Text {...typography.heroEyebrow}>Event manager</Text>
                        <Heading {...typography.heroTitle}>Discover events</Heading>
                        <Text {...typography.body} maxW={{ base: 'full', md: '2xl' }}>
                            Browse all events, search by title, and filter by multiple categories.
                        </Text>
                    </Stack>
                </Box>

                <Box {...raisedSurface} borderRadius={radius.panel} p={{ base: '3', md: '6' }}>
                    <Grid
                        alignItems="start"
                        gap={{ base: '4', lg: '6' }}
                        templateColumns={{ base: '1fr', lg: 'minmax(260px, 360px) minmax(0, 1fr)' }}
                    >
                        <Field.Root w="full">
                            <Field.Label {...typography.label}>Search events</Field.Label>
                            <Input
                                {...inputStyles}
                                name="search"
                                onChange={(event) => setSearchTerm(event.target.value)}
                                placeholder="Search by event title"
                                size="md"
                                value={searchTerm}
                                w="full"
                            />
                        </Field.Root>

                        <Fieldset.Root minW="0" w="full">
                            <Fieldset.Legend {...typography.label}>Filter categories</Fieldset.Legend>
                            <CheckboxGroup
                                value={selectedCategoryIds.map(String)}
                                onValueChange={(values) => setSelectedCategoryIds(values.map(Number))}
                            >
                                <Flex
                                    align="center"
                                    columnGap={{ base: '2', sm: '3', md: '4' }}
                                    justify="flex-start"
                                    mt="0.5"
                                    rowGap={{ base: '2', md: '3' }}
                                    wrap={{ base: 'nowrap', sm: 'wrap' }}
                                >
                                    {categories.map((category) => (
                                        <Checkbox.Root
                                            alignItems="center"
                                            borderColor="transparent"
                                            borderRadius="full"
                                            borderWidth="1px"
                                            display="inline-flex"
                                            flex="0 0 auto"
                                            flexShrink={0}
                                            gap={{ base: '1.5', md: '2' }}
                                            key={category.id}
                                            minW="0"
                                            px={{ base: '0', sm: '1' }}
                                            py="1"
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
                                                bg={colorPalette.neutralSoft}
                                                borderColor={colorPalette.border}
                                                borderWidth="3px"
                                                boxSize={{ base: '4', md: '5' }}
                                                transition={transitions.smooth}
                                                _checked={{
                                                    bg: colorPalette.primary,
                                                    borderColor: colorPalette.primary,
                                                    color: colorPalette.primaryText,
                                                }}
                                                _hover={{
                                                    borderColor: colorPalette.borderStrong,
                                                }}
                                            >
                                                <Checkbox.Indicator />
                                            </Checkbox.Control>
                                            <Checkbox.Label
                                                color={colorPalette.text}
                                                cursor="pointer"
                                                fontSize={{ base: 'sm', md: 'md' }}
                                                fontWeight="bold"
                                                lineHeight="0.5"
                                                textTransform="capitalize"
                                                whiteSpace="nowrap"
                                            >
                                                {category.name}
                                            </Checkbox.Label>
                                        </Checkbox.Root>
                                    ))}
                                </Flex>
                            </CheckboxGroup>
                        </Fieldset.Root>
                    </Grid>
                </Box>

                {hasServerError ? (
                    <Box {...raisedSurface} borderRadius={radius.inner} p="4">
                        <Heading color={colorPalette.text} size="sm">
                            Unable to load events
                        </Heading>
                        <Text color={colorPalette.textMuted} mt="2">
                            We can&apos;t load the events right now. Please check whether the server is running and try
                            again.
                        </Text>
                    </Box>
                ) : null}

                {isLoading ? (
                    <SimpleGrid columns={{ base: 1, md: 2, xl: 3 }} gap={{ base: '5', md: '6' }}>
                        {Array.from({ length: 6 }, (_, index) => (
                            <EventListSkeleton key={index} />
                        ))}
                    </SimpleGrid>
                ) : null}

                {!isLoading && !error ? (
                    filteredEvents.length > 0 ? (
                        <SimpleGrid columns={{ base: 1, md: 2, xl: 3 }} gap={{ base: '5', md: '6' }}>
                            {filteredEvents.map((event, index) => (
                                <EventCard
                                    key={event.id}
                                    categories={categories}
                                    event={event}
                                    prioritizeImage={index === 0}
                                />
                            ))}
                        </SimpleGrid>
                    ) : (
                        <Box {...raisedSurface} borderRadius={radius.inner} p="6">
                            <Heading color={colorPalette.text} size="md">
                                No events match your filters
                            </Heading>
                            <Text color={colorPalette.textMuted} mt="2">
                                Try a different search term or change the selected categories.
                            </Text>
                        </Box>
                    )
                ) : null}
            </Stack>
        </Container>
    );
};
