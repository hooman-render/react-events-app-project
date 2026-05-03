'use client';

import { ChakraProvider, defaultSystem } from '@chakra-ui/react';
import { ColorModeProvider } from './color-mode';
import { colorPalette } from '../../theme/theme';

export function Provider(props) {
    return (
        <ChakraProvider
            value={defaultSystem}
            globalCss={{
                'html, body': {
                    background: colorPalette.background,
                    color: colorPalette.text,
                },
                '::selection': {
                    background: colorPalette.primaryBorder,
                },
            }}
        >
            <ColorModeProvider {...props} />
        </ChakraProvider>
    );
}
