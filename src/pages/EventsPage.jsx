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
} from "@chakra-ui/react";
import { EventCard } from "../components/EventCard";
import { EventListSkeleton } from "../components/EventListSkeleton";
import { useEvents } from "../context/EventsContext";
import { matchesEventFilters } from "../utils/event-utils";
import {
  appColors,
  appHeroStyles,
  appInputStyles,
  appRaisedSurfaceStyles,
  appRadii,
  appTransitions,
} from "../theme/appTheme";

export const EventsPage = () => {
  const { categories, error, events, isLoading } = useEvents();
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategoryIds, setSelectedCategoryIds] = useState([]);

  // Filters events by title and selected categories.
  const filteredEvents = useMemo(
    () =>
      events.filter((event) =>
        matchesEventFilters(event, searchTerm, selectedCategoryIds),
      ),
    [events, searchTerm, selectedCategoryIds],
  );

  // Shows the server error before any empty result message.
  const hasServerError = Boolean(error);

  return (
    <Container maxW="6xl" py={{ base: "8", md: "12" }}>
      <Stack gap={{ base: "6", md: "8" }}>
        <Box
          {...appHeroStyles}
          borderRadius={appRadii.panel}
          overflow="hidden"
          position="relative"
          px={{ base: "5", md: "8" }}
          py={{ base: "6", md: "8" }}
        >
          <Box
            bg="rgba(24, 214, 199, 0.14)"
            borderRadius="full"
            filter="blur(30px)"
            h={{ base: "160px", md: "240px" }}
            pointerEvents="none"
            position="absolute"
            right={{ base: "-14", md: "-10" }}
            top={{ base: "-10", md: "-14" }}
            w={{ base: "160px", md: "240px" }}
          />
          <Box
            border="1px solid rgba(24, 214, 199, 0.18)"
            borderRadius="full"
            h={{ base: "150px", md: "220px" }}
            pointerEvents="none"
            position="absolute"
            right={{ base: "-10", md: "2" }}
            top={{ base: "-8", md: "-2" }}
            w={{ base: "150px", md: "220px" }}
          />
          <Box
            border="1px solid rgba(203, 184, 255, 0.18)"
            borderRadius="full"
            h={{ base: "110px", md: "160px" }}
            pointerEvents="none"
            position="absolute"
            right={{ base: "4", md: "16" }}
            top={{ base: "10", md: "12" }}
            w={{ base: "110px", md: "160px" }}
          />

          <Stack gap="3" maxW={{ base: "full", md: "3xl" }} position="relative" zIndex="1">
            <Text
              color={appColors.textMuted}
              fontSize="xs"
              fontWeight="semibold"
              letterSpacing="0.1em"
              textTransform="uppercase"
            >
              Event manager
            </Text>
            <Heading color={appColors.text} fontSize={{ base: "2xl", md: "4xl" }} lineHeight="shorter">
              Discover events
            </Heading>
            <Text color={appColors.textMuted} fontSize={{ base: "sm", md: "md" }} maxW={{ base: "full", md: "2xl" }}>
              Browse all events, search by title, and filter by multiple categories.
            </Text>
          </Stack>
        </Box>

        <Box
          {...appRaisedSurfaceStyles}
          borderRadius={appRadii.panel}
          p={{ base: "3", md: "6" }}
        >
          <Grid
            alignItems="start"
            gap={{ base: "4", lg: "6" }}
            templateColumns={{ base: "1fr", lg: "minmax(260px, 360px) minmax(0, 1fr)" }}
          >
            <Field.Root w="full">
              <Field.Label color={appColors.text} fontSize="sm">
                Search events
              </Field.Label>
              <Input
                {...appInputStyles}
                name="search"
                onChange={(event) => setSearchTerm(event.target.value)}
                placeholder="Search by event title"
                size="md"
                value={searchTerm}
                w="full"
              />
            </Field.Root>

            <Fieldset.Root minW="0" w="full">
              <Fieldset.Legend color={appColors.text} fontSize="sm">
                Filter categories
              </Fieldset.Legend>
              <CheckboxGroup
                value={selectedCategoryIds.map(String)}
                onValueChange={(values) => setSelectedCategoryIds(values.map(Number))}
              >
                <Flex
                  align="center"
                  columnGap={{ base: "2", sm: "3", md: "4" }}
                  justify="flex-start"
                  mt="3"
                  rowGap={{ base: "2", md: "3" }}
                  wrap={{ base: "nowrap", sm: "wrap" }}
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
                      gap={{ base: "1.5", md: "2" }}
                      key={category.id}
                      minW="0"
                      px={{ base: "0", sm: "1" }}
                      py="1"
                      transition={appTransitions.smooth}
                      value={String(category.id)}
                      _hover={{
                        bg: "rgba(203, 184, 255, 0.08)",
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
                          color: "#120f1e",
                        }}
                      >
                        <Checkbox.Indicator />
                      </Checkbox.Control>
                      <Checkbox.Label
                        color={appColors.text}
                        cursor="pointer"
                        fontSize={{ base: "sm", md: "md" }}
                        fontWeight="semibold"
                        lineHeight="1"
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
          <Box {...appRaisedSurfaceStyles} borderRadius={appRadii.inner} p="4">
            <Heading color={appColors.text} size="sm">Unable to load events</Heading>
            <Text color={appColors.textMuted} mt="2">
              We can&apos;t load the events right now. Please check whether the server is running and try again.
            </Text>
          </Box>
        ) : null}

        {isLoading ? (
          <SimpleGrid columns={{ base: 1, md: 2, xl: 3 }} gap={{ base: "5", md: "6" }}>
            {Array.from({ length: 6 }, (_, index) => (
              <EventListSkeleton key={index} />
            ))}
          </SimpleGrid>
        ) : null}

        {!isLoading && !error ? (
          filteredEvents.length > 0 ? (
            <SimpleGrid columns={{ base: 1, md: 2, xl: 3 }} gap={{ base: "5", md: "6" }}>
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
            <Box {...appRaisedSurfaceStyles} borderRadius={appRadii.inner} p="6">
              <Heading color={appColors.text} size="md">No events match your filters</Heading>
              <Text color={appColors.textMuted} mt="2">
                Try a different search term or change the selected categories.
              </Text>
            </Box>
          )
        ) : null}
      </Stack>
    </Container>
  );
};
