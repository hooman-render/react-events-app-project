import { Box, Container, Heading, Stack, Text } from "@chakra-ui/react";
import { appColors, appRadii, appSurfaceStyles } from "../theme/appTheme";

// Adds the required third page to the app.
export const AboutPage = () => {
  return (
    <Container maxW="5xl" py={{ base: "8", md: "12" }}>
      <Box
        {...appSurfaceStyles}
        borderRadius={appRadii.panel}
        p={{ base: "6", md: "8" }}
      >
        <Stack gap="4">
          <Heading color={appColors.text} size={{ base: "lg", md: "xl" }}>About this project</Heading>
          <Text color={appColors.textMuted} lineHeight="tall">
            This event management app was built for the React Advanced Final
            Assignment. It lets users browse events, filter by category, and
            manage event details with a responsive Chakra UI interface.
          </Text>
          <Text color={appColors.textMuted} lineHeight="tall">
            The app uses React Context for shared events and categories data,
            React Router for navigation, and simple refetch-based updates after
            create, edit, and delete actions.
          </Text>
        </Stack>
      </Box>
    </Container>
  );
};
