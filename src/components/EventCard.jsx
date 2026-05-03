import { Box, Button, Heading, Image, LinkBox, LinkOverlay, Stack, Text } from '@chakra-ui/react';
import { Link as RouterLink } from 'react-router-dom';
import { CategoryTags } from './CategoryTags';
import { Tooltip } from './ui/tooltip';
import { formatEventDateTime } from '../utils/event-utils';
import {
    colorPalette,
    cardImageOverlay,
    eventMetaPanel,
    primaryButton,
    radius,
    shadows,
    surface,
    transitions,
    typography,
} from '../theme/theme';

export const EventCard = ({ categories, event, prioritizeImage = false }) => {
    const location = event.location?.trim();

    return (
        // Turns the event card into the link to its detail page.
        <LinkBox
            as="article"
            {...surface}
            borderRadius={radius.panel}
            className="group"
            display="flex"
            flexDirection="column"
            height="100%"
            overflow="hidden"
            transition={transitions.smooth}
            _hover={{
                borderColor: colorPalette.borderStrong,
                boxShadow: shadows.cardHover,
                transform: 'translateY(-3px)',
            }}
            _focusWithin={{
                outline: '3px solid',
                outlineColor: colorPalette.primary,
                outlineOffset: '2px',
            }}
        >
            <Box overflow="hidden" position="relative">
                <Image
                    alt={event.title}
                    aspectRatio={16 / 9}
                    decoding="async"
                    fetchPriority={prioritizeImage ? 'high' : 'low'}
                    fit="cover"
                    loading={prioritizeImage ? 'eager' : 'lazy'}
                    referrerPolicy="no-referrer"
                    sizes="(min-width: 1280px) 33vw, (min-width: 768px) 50vw, 100vw"
                    src={event.image}
                    width="100%"
                    transition={transitions.smooth}
                    _groupHover={{ transform: 'scale(1.02)' }}
                />
                <Box {...cardImageOverlay} inset="0" pointerEvents="none" position="absolute" />
            </Box>

            <Stack flex="1" gap="4" p={{ base: '4', md: '5' }}>
                <Stack gap="3">
                    <Stack gap="2">
                        <Text {...typography.heroEyebrow}>Discover</Text>
                        <Heading {...typography.cardTitle}>
                            <LinkOverlay asChild>
                                <RouterLink to={`/event/${event.id}`}>{event.title}</RouterLink>
                            </LinkOverlay>
                        </Heading>
                    </Stack>

                    <CategoryTags categories={categories} categoryIds={event.categoryIds} />

                    <Text {...typography.body} fontSize="sm" lineClamp={3}>
                        {event.description}
                    </Text>
                </Stack>

                <Box
                    {...eventMetaPanel}
                    p="3.5"
                    _groupHover={{
                        borderColor: colorPalette.borderStrong,
                        boxShadow: shadows.glow,
                    }}
                >
                    <Stack gap="3">
                        <Text color={colorPalette.textMuted} fontSize="sm" lineHeight="tall">
                            <Text as="span" color={colorPalette.text} fontWeight="semibold">
                                Starts:
                            </Text>{' '}
                            {formatEventDateTime(event.startTime)}
                        </Text>

                        <Text color={colorPalette.textMuted} fontSize="sm" lineHeight="tall">
                            <Text as="span" color={colorPalette.text} fontWeight="semibold">
                                Ends:
                            </Text>{' '}
                            {formatEventDateTime(event.endTime)}
                        </Text>

                        {location ? (
                            <Text color={colorPalette.textMuted} fontSize="sm" lineHeight="tall">
                                <Text as="span" color={colorPalette.text} fontWeight="semibold">
                                    Location:
                                </Text>{' '}
                                {location}
                            </Text>
                        ) : null}
                    </Stack>
                </Box>

                <Tooltip content="Open event details">
                    <Button {...primaryButton} alignSelf="start" asChild mt="auto" size="sm">
                        <RouterLink to={`/event/${event.id}`}>View details</RouterLink>
                    </Button>
                </Tooltip>
            </Stack>
        </LinkBox>
    );
};
