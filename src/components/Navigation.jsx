import { Box, Button, Flex, Grid, Heading, Link } from '@chakra-ui/react';
import { FiMenu } from 'react-icons/fi';
import { NavLink } from 'react-router-dom';
import { Tooltip } from './ui/tooltip';
import { colorPalette, headerSurface, secondaryButton, primaryButton, transitions, typography } from '../theme/theme';

const navLinkStyles = ({ isActive }) => ({
    display: 'inline-flex',
    alignItems: 'center',
    justifyContent: 'center',
    color: isActive ? colorPalette.primary : colorPalette.textMuted,
    fontWeight: isActive ? '600' : '500',
    textDecoration: 'none',
    padding: '0.5rem 0.75rem',
    borderRadius: '999px',
    border: `1px solid ${isActive ? colorPalette.borderStrong : 'transparent'}`,
    background: isActive ? colorPalette.primarySoft : 'transparent',
    boxShadow: isActive ? colorPalette.shadowPrimary : 'none',
    transition: transitions.smooth,
});

// Holds the main navigation links and Add Event action.
export const Navigation = ({ addEventDisabled = false, onAddEventOpen, onMenuOpen }) => {
    return (
        <Flex
            align={{ base: 'stretch', md: 'center' }}
            as="header"
            {...headerSurface}
            direction={{ base: 'column', md: 'row' }}
            justify="space-between"
            px={{ base: '4', md: '8' }}
            py="4"
            position="sticky"
            top="0"
            zIndex="10"
            gap="4"
        >
            <Grid alignItems="center" gap="3" templateColumns={{ base: '2rem minmax(0, 1fr) 2rem', md: 'auto auto' }}>
                <Tooltip content="Open navigation">
                    <Button
                        {...secondaryButton}
                        aria-label="Open navigation menu"
                        boxSize={{ base: '8', md: '10' }}
                        onClick={onMenuOpen}
                        px="0"
                        size={{ base: 'sm', md: 'md' }}
                    >
                        <FiMenu aria-hidden="true" focusable="false" size="1.35rem" />
                    </Button>
                </Tooltip>
                <Heading {...typography.appTitle} justifySelf={{ base: 'center', md: 'start' }} textAlign="center">
                    Event Manager App
                </Heading>
                <Box aria-hidden="true" display={{ base: 'block', md: 'none' }} />
            </Grid>
            <Grid
                alignItems="center"
                columnGap={{ base: '2', md: '6' }}
                justifyItems="center"
                templateColumns={{ base: 'repeat(3, minmax(0, 1fr))', md: 'auto auto auto' }}
                width={{ base: 'full', md: 'auto' }}
            >
                <Tooltip content="View all events">
                    <Link
                        as={NavLink}
                        end
                        style={navLinkStyles}
                        to="/"
                        _hover={{ color: colorPalette.text, bg: colorPalette.primarySoft }}
                        _focusVisible={{
                            boxShadow: `0 0 0 3px ${colorPalette.focusRing}`,
                            color: colorPalette.text,
                        }}
                    >
                        Events
                    </Link>
                </Tooltip>
                <Tooltip content="Read about this project">
                    <Link
                        as={NavLink}
                        style={navLinkStyles}
                        to="/about"
                        _hover={{ color: colorPalette.text, bg: colorPalette.primarySoft }}
                        _focusVisible={{
                            boxShadow: `0 0 0 3px ${colorPalette.focusRing}`,
                            color: colorPalette.text,
                        }}
                    >
                        About
                    </Link>
                </Tooltip>
                <Tooltip content="Create a new event">
                    <Button
                        {...primaryButton}
                        disabled={addEventDisabled}
                        onClick={onAddEventOpen}
                        px={{ base: '3', md: '4' }}
                        size={{ base: 'sm', md: 'md' }}
                    >
                        Add Event
                    </Button>
                </Tooltip>
            </Grid>
        </Flex>
    );
};
