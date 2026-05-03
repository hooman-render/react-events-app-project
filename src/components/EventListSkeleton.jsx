import { Box, Flex, Skeleton, Stack } from '@chakra-ui/react';
import { eventMetaPanel, radius, skeletonAccent, skeletonBase, surface } from '../theme/theme';

// Uses the same shape as the event cards while loading.
export const EventListSkeleton = () => (
    <Box {...surface} borderRadius={radius.panel} display="flex" flexDirection="column" height="100%" overflow="hidden">
        <Skeleton {...skeletonBase} aspectRatio={16 / 9} width="100%" />

        <Stack flex="1" gap="4" p={{ base: '4', md: '5' }}>
            <Stack gap="3">
                <Stack gap="2">
                    <Skeleton {...skeletonBase} height="12px" width="5rem" />
                    <Skeleton
                        {...skeletonBase}
                        height={{ base: '22px', md: '24px' }}
                        width={{ base: '68%', md: '62%' }}
                    />
                </Stack>

                <Flex gap="2" wrap="wrap">
                    <Skeleton {...skeletonAccent} borderRadius={radius.pill} height="22px" width="4.75rem" />
                    <Skeleton {...skeletonAccent} borderRadius={radius.pill} height="22px" width="5.5rem" />
                </Flex>

                <Stack gap="3">
                    <Skeleton {...skeletonBase} height="12px" width="100%" />
                    <Skeleton {...skeletonBase} height="12px" width="92%" />
                    <Skeleton {...skeletonBase} height="12px" width="74%" />
                </Stack>
            </Stack>

            <Box {...eventMetaPanel} p="3.5">
                <Stack gap="3">
                    <Skeleton {...skeletonBase} height="16px" width="78%" />
                    <Skeleton {...skeletonBase} height="16px" width="72%" />
                    <Skeleton {...skeletonBase} height="16px" width="58%" />
                </Stack>
            </Box>

            <Skeleton {...skeletonAccent} borderRadius="md" height="36px" mt="auto" width="132px" />
        </Stack>
    </Box>
);
