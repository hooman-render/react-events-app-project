import { Button, Dialog, Portal, SimpleGrid, Stack, Text } from "@chakra-ui/react";
import {
  appColors,
  appDangerButtonStyles,
  appDangerSurfaceStyles,
  appDialogSurfaceStyles,
  appNeutralButtonStyles,
  appRadii,
} from "../theme/appTheme";

export const DeleteEventDialog = ({
  eventTitle,
  isDeleting,
  onConfirm,
  onOpenChange,
  open,
}) => (
  // Asks for confirmation before deleting an event.
  <Dialog.Root open={open} onOpenChange={(details) => onOpenChange(details.open)}>
    <Portal>
      <Dialog.Backdrop bg="rgba(1, 8, 8, 0.82)" />
      <Dialog.Positioner padding={{ base: "3", md: "4" }}>
        <Dialog.Content
          {...appDialogSurfaceStyles}
          borderRadius={appRadii.panel}
          maxW={{ base: "calc(100vw - 1.5rem)", sm: "md" }}
          overflow="hidden"
          w="full"
        >
          <Dialog.Header
            borderBottomWidth="1px"
            borderColor={appColors.border}
            pb="3"
            pt={{ base: "4", md: "5" }}
            px={{ base: "4", md: "5" }}
          >
            <Stack gap="1">
              <Dialog.Title color={appColors.text} fontSize={{ base: "lg", md: "xl" }} fontWeight="bold">
                Delete event
              </Dialog.Title>
              <Dialog.Description color={appColors.textMuted} fontSize="sm">
                Confirm that you want to permanently remove this event.
              </Dialog.Description>
            </Stack>
          </Dialog.Header>
          <Dialog.Body px={{ base: "4", md: "5" }} pb="4">
            <Stack gap="3">
              <Text
                color={appColors.textMuted}
                fontSize="xs"
                fontWeight="semibold"
                letterSpacing="0.08em"
                textTransform="uppercase"
              >
                Danger zone
              </Text>
              <Stack {...appDangerSurfaceStyles} borderRadius={appRadii.inner} gap="2" p="4">
                <Text color={appColors.text} fontWeight="semibold">
                  Are you sure you want to delete <strong>{eventTitle}</strong>?
                </Text>
                <Text color={appColors.textMuted} lineHeight="tall">
                  This action cannot be undone.
                </Text>
              </Stack>
            </Stack>
          </Dialog.Body>
          <Dialog.Footer
            borderTopWidth="1px"
            borderColor={appColors.border}
            pb={{ base: "4", md: "5" }}
            pt="4"
            px={{ base: "4", md: "5" }}
          >
            <SimpleGrid columns={2} gap="3" w="full">
              <Button
                {...appNeutralButtonStyles}
                onClick={() => onOpenChange(false)}
                disabled={isDeleting}
                size="sm"
                width="full"
              >
                Cancel
              </Button>
              <Button
                {...appDangerButtonStyles}
                onClick={onConfirm}
                disabled={isDeleting}
                size="sm"
                width="full"
              >
                {isDeleting ? "Deleting..." : "Delete"}
              </Button>
            </SimpleGrid>
          </Dialog.Footer>
        </Dialog.Content>
      </Dialog.Positioner>
    </Portal>
  </Dialog.Root>
);
