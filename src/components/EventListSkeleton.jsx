import { Box, Skeleton, SkeletonText, Stack } from "@chakra-ui/react";
import {
  appRaisedSurfaceStyles,
  appRadii,
  appSurfaceStyles,
} from "../theme/appTheme";

// Uses the same shape as the event cards while loading.
export const EventListSkeleton = () => (
  <Box
    {...appSurfaceStyles}
    borderRadius={appRadii.panel}
    overflow="hidden"
  >
    <Skeleton height="220px" startColor="rgba(18, 45, 45, 0.98)" endColor="rgba(44, 88, 88, 0.98)" />
    <Stack gap="4" p="5">
      <Stack gap="3">
        <Skeleton height="12px" startColor="rgba(18, 45, 45, 0.98)" endColor="rgba(44, 88, 88, 0.98)" width="22%" />
        <Skeleton height="24px" startColor="rgba(18, 45, 45, 0.98)" endColor="rgba(44, 88, 88, 0.98)" width="62%" />
        <Skeleton height="22px" startColor="rgba(170, 152, 214, 0.28)" endColor="rgba(203, 184, 255, 0.40)" width="44%" />
        <SkeletonText
          noOfLines={3}
          startColor="rgba(18, 45, 45, 0.98)"
          endColor="rgba(44, 88, 88, 0.98)"
        />
      </Stack>
      <Box {...appRaisedSurfaceStyles} borderRadius={appRadii.inner} p="3.5">
        <Stack gap="3">
          <Skeleton height="16px" startColor="rgba(18, 45, 45, 0.98)" endColor="rgba(44, 88, 88, 0.98)" width="74%" />
          <Skeleton height="16px" startColor="rgba(18, 45, 45, 0.98)" endColor="rgba(44, 88, 88, 0.98)" width="68%" />
          <Skeleton height="16px" startColor="rgba(18, 45, 45, 0.98)" endColor="rgba(44, 88, 88, 0.98)" width="52%" />
        </Stack>
      </Box>
      <Skeleton height="36px" startColor="rgba(170, 152, 214, 0.30)" endColor="rgba(203, 184, 255, 0.42)" width="132px" />
    </Stack>
  </Box>
);
