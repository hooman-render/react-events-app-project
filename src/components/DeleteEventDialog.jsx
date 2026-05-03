import { Button, Dialog, Portal, SimpleGrid, Stack, Text } from '@chakra-ui/react';
import { Tooltip } from './ui/tooltip';
import {
    colorPalette,
    dangerButton,
    dangerPanel,
    dialogBackdrop,
    dialogPanel,
    secondaryButton,
    radius,
} from '../theme/theme';

export const DeleteEventDialog = ({ eventTitle, isDeleting, onConfirm, onOpenChange, open }) => (
    // Asks for confirmation before deleting an event.
    <Dialog.Root open={open} onOpenChange={(details) => onOpenChange(details.open)}>
        <Portal>
            <Dialog.Backdrop {...dialogBackdrop} />
            <Dialog.Positioner padding={{ base: '3', md: '4' }}>
                <Dialog.Content
                    {...dialogPanel}
                    borderRadius={radius.panel}
                    maxW={{ base: 'calc(100vw - 1.5rem)', sm: 'md' }}
                    overflow="hidden"
                    w="full"
                >
                    <Dialog.Header
                        borderBottomWidth="1px"
                        borderColor={colorPalette.border}
                        pb="3"
                        pt={{ base: '4', md: '5' }}
                        px={{ base: '4', md: '5' }}
                    >
                        <Stack gap="1">
                            <Dialog.Title
                                color={colorPalette.text}
                                fontSize={{ base: 'lg', md: 'xl' }}
                                fontWeight="bold"
                            >
                                Delete event
                            </Dialog.Title>
                            <Dialog.Description color={colorPalette.textMuted} fontSize="sm">
                                Confirm that you want to permanently remove this event.
                            </Dialog.Description>
                        </Stack>
                    </Dialog.Header>
                    <Dialog.Body px={{ base: '4', md: '5' }} pb="4">
                        <Stack gap="3">
                            <Text
                                color={colorPalette.danger}
                                fontSize="xl"
                                fontWeight="bold"
                                letterSpacing="0.5em"
                                textTransform="uppercase"
                            >
                                Danger zone
                            </Text>

                            <Stack {...dangerPanel} borderRadius={radius.inner} gap="3" p={{ base: '4', md: '5' }}>
                                <Stack gap="1">
                                    <Text
                                        color={colorPalette.text}
                                        fontSize={{ base: 'md', md: 'lg' }}
                                        fontWeight="bold"
                                    >
                                        Delete this event?
                                    </Text>
                                    <Text color={colorPalette.textMuted} lineHeight="tall">
                                        You are about to permanently remove{' '}
                                        <Text as="span" color={colorPalette.text} fontWeight="bold">
                                            {eventTitle}
                                        </Text>
                                        .
                                    </Text>
                                </Stack>

                                <Text color={colorPalette.textMuted} fontSize="sm" lineHeight="tall">
                                    This action cannot be undone.
                                </Text>
                            </Stack>
                        </Stack>
                    </Dialog.Body>

                    <Dialog.Footer
                        borderTopWidth="1px"
                        borderColor={colorPalette.border}
                        pb={{ base: '4', md: '5' }}
                        pt="4"
                        px={{ base: '4', md: '5' }}
                    >
                        <SimpleGrid columns={{ base: 1, sm: 2 }} gap="3" w="full">
                            <Tooltip content="Close without deleting">
                                <Button
                                    {...secondaryButton}
                                    onClick={() => onOpenChange(false)}
                                    disabled={isDeleting}
                                    size="sm"
                                    width="full"
                                >
                                    Keep event
                                </Button>
                            </Tooltip>
                            <Tooltip content="Permanently delete this event">
                                <Button
                                    {...dangerButton}
                                    onClick={onConfirm}
                                    disabled={isDeleting}
                                    size="sm"
                                    width="full"
                                >
                                    {isDeleting ? 'Deleting...' : 'Delete event'}
                                </Button>
                            </Tooltip>
                        </SimpleGrid>
                    </Dialog.Footer>
                </Dialog.Content>
            </Dialog.Positioner>
        </Portal>
    </Dialog.Root>
);
