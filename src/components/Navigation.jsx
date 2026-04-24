import { Button, Flex, Grid, Heading, Link } from '@chakra-ui/react';
import { NavLink } from 'react-router-dom';
import {
    appColors,
    appHeaderSurfaceStyles,
    appNeutralButtonStyles,
    appPrimaryButtonStyles,
    appTransitions,
} from '../theme/appTheme';

const navLinkStyles = ({ isActive }) => ({
    display: 'inline-flex',
    alignItems: 'center',
    justifyContent: 'center',
    color: isActive ? appColors.primary : appColors.textMuted,
    fontWeight: isActive ? '600' : '500',
    textDecoration: 'none',
    padding: '0.5rem 0.75rem',
    borderRadius: '999px',
    border: `1px solid ${isActive ? appColors.borderStrong : 'transparent'}`,
    background: isActive ? 'rgba(203, 184, 255, 0.08)' : 'transparent',
    boxShadow: isActive ? '0 10px 20px rgba(203, 184, 255, 0.10)' : 'none',
    transition: appTransitions.smooth,
});

// Holds the main navigation links and Add Event action.
export const Navigation = ({ addEventDisabled = false, onAddEventOpen, onMenuOpen }) => {
    return (
        <Flex
            align={{ base: 'stretch', md: 'center' }}
            as="header"
            {...appHeaderSurfaceStyles}
            direction={{ base: 'column', md: 'row' }}
            justify="space-between"
            px={{ base: '4', md: '8' }}
            py="4"
            position="sticky"
            top="0"
            zIndex="10"
            gap="4"
        >
            <Flex align="center" gap="3" justify={{ base: 'space-between', md: 'flex-start' }}>
                <Button
                    {...appNeutralButtonStyles}
                    aria-label="Open navigation menu"
                    onClick={onMenuOpen}
                    px="3"
                    size={{ base: 'sm', md: 'md' }}
                >
                    Menu
                </Button>
                <Heading color={appColors.text} size="md" textAlign={{ base: 'left', md: 'left' }}>
                    Event Manager App
                </Heading>
            </Flex>
            <Grid
                alignItems="center"
                columnGap={{ base: '2', md: '6' }}
                justifyItems="center"
                templateColumns={{ base: 'repeat(3, minmax(0, 1fr))', md: 'auto auto auto' }}
                width={{ base: 'full', md: 'auto' }}
            >
                <Link
                    as={NavLink}
                    end
                    style={navLinkStyles}
                    to="/"
                    _hover={{ color: appColors.text, bg: 'rgba(203, 184, 255, 0.08)' }}
                    _focusVisible={{
                        boxShadow: `0 0 0 3px ${appColors.focusRing}`,
                        color: appColors.text,
                    }}
                >
                    Events
                </Link>
                <Link
                    as={NavLink}
                    style={navLinkStyles}
                    to="/about"
                    _hover={{ color: appColors.text, bg: 'rgba(203, 184, 255, 0.08)' }}
                    _focusVisible={{
                        boxShadow: `0 0 0 3px ${appColors.focusRing}`,
                        color: appColors.text,
                    }}
                >
                    About
                </Link>
                <Button
                    {...appPrimaryButtonStyles}
                    disabled={addEventDisabled}
                    onClick={onAddEventOpen}
                    px={{ base: '3', md: '4' }}
                    size={{ base: 'sm', md: 'md' }}
                >
                    Add Event
                </Button>
            </Grid>
        </Flex>
    );
};
