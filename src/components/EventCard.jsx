import { Box, Button, Heading, Image, LinkBox, LinkOverlay, Stack, Text } from "@chakra-ui/react";
import { Link as RouterLink } from "react-router-dom";
import { CategoryTags } from "./CategoryTags";
import { formatEventDateTime } from "../utils/event-utils";
import {
  appColors,
  appCardImageOverlay,
  appPrimaryButtonStyles,
  appRaisedSurfaceStyles,
  appRadii,
  appShadows,
  appSurfaceStyles,
  appTransitions,
} from "../theme/appTheme";

export const EventCard = ({ categories, event, prioritizeImage = false }) => {
  const location = event.location?.trim();

  return (
    // Turns the event card into the link to its detail page.
    <LinkBox
      as="article"
      {...appSurfaceStyles}
      borderRadius={appRadii.panel}
      className="group"
      display="flex"
      flexDirection="column"
      height="100%"
      overflow="hidden"
      transition={appTransitions.smooth}
      _hover={{
        borderColor: appColors.borderStrong,
        boxShadow: appShadows.cardHover,
        transform: "translateY(-3px)",
      }}
      _focusWithin={{
        outline: "3px solid",
        outlineColor: appColors.primary,
        outlineOffset: "2px",
      }}
    >
      <Box overflow="hidden" position="relative">
        <Image
          alt={event.title}
          aspectRatio={16 / 9}
          decoding="async"
          fetchPriority={prioritizeImage ? "high" : "low"}
          fit="cover"
          loading={prioritizeImage ? "eager" : "lazy"}
          referrerPolicy="no-referrer"
          sizes="(min-width: 1280px) 33vw, (min-width: 768px) 50vw, 100vw"
          src={event.image}
          width="100%"
          transition={appTransitions.smooth}
          _groupHover={{ transform: "scale(1.02)" }}
        />
        <Box
          {...appCardImageOverlay}
          inset="0"
          pointerEvents="none"
          position="absolute"
        />
      </Box>

      <Stack flex="1" gap="4" p={{ base: "4", md: "5" }}>
        <Stack gap="3">
          <Stack gap="2">
            <Text
              color={appColors.textMuted}
              fontSize="xs"
              fontWeight="semibold"
              letterSpacing="0.08em"
              textTransform="uppercase"
            >
              Discover
            </Text>
            <Heading
              color={appColors.text}
              fontSize={{ base: "lg", md: "xl" }}
              lineHeight="shorter"
            >
              <LinkOverlay asChild>
                <RouterLink to={`/event/${event.id}`}>{event.title}</RouterLink>
              </LinkOverlay>
            </Heading>
          </Stack>

          <CategoryTags categories={categories} categoryIds={event.categoryIds} />

          <Text
            color={appColors.textMuted}
            fontSize="sm"
            lineClamp={3}
            lineHeight="tall"
          >
            {event.description}
          </Text>
        </Stack>

        <Box
          {...appRaisedSurfaceStyles}
          bg="linear-gradient(180deg, rgba(11, 31, 31, 0.96) 0%, rgba(7, 23, 23, 0.96) 100%)"
          borderRadius={appRadii.inner}
          p="3.5"
          transition={appTransitions.smooth}
          _groupHover={{
            borderColor: appColors.borderStrong,
            boxShadow: appShadows.glow,
          }}
        >
          <Stack gap="3">
            <Text color={appColors.textMuted} fontSize="sm" lineHeight="tall">
              <Text as="span" color={appColors.text} fontWeight="semibold">
                Starts:
              </Text>{" "}
              {formatEventDateTime(event.startTime)}
            </Text>

            <Text color={appColors.textMuted} fontSize="sm" lineHeight="tall">
              <Text as="span" color={appColors.text} fontWeight="semibold">
                Ends:
              </Text>{" "}
              {formatEventDateTime(event.endTime)}
            </Text>

            {location ? (
              <Text color={appColors.textMuted} fontSize="sm" lineHeight="tall">
                <Text as="span" color={appColors.text} fontWeight="semibold">
                  Location:
                </Text>{" "}
                {location}
              </Text>
            ) : null}
          </Stack>
        </Box>

        <Button
          {...appPrimaryButtonStyles}
          alignSelf="start"
          asChild
          mt="auto"
          size="sm"
        >
          <RouterLink to={`/event/${event.id}`}>View details</RouterLink>
        </Button>
      </Stack>
    </LinkBox>
  );
};
