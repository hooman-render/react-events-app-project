'use client'

import { ChakraProvider, defaultSystem } from '@chakra-ui/react'
import { ColorModeProvider } from './color-mode'

export function Provider(props) {
  return (
    <ChakraProvider
      value={defaultSystem}
      globalCss={{
        "html, body": {
          background: "#031414",
          color: "#f5f7fb",
        },
        "::selection": {
          background: "rgba(203, 184, 255, 0.28)",
        },
      }}
    >
      <ColorModeProvider {...props} />
    </ChakraProvider>
  )
}
