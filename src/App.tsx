import {
  ChakraProvider,
  theme,
  extendTheme
} from "@chakra-ui/react"
import '@fontsource/poppins'

import { BrowserRouter, Route, Routes } from "react-router-dom"
import Home from "./pages/Home"

const customTheme = extendTheme({
  fonts: {
    heading: 'Poppins',
    body: 'Poppins'
  }
})

export const App = () => (
  <ChakraProvider theme={customTheme}>
    <BrowserRouter>
    <div>
      <Routes>
        <Route path="/" element={<Home />} />
      </Routes>
    </div>
    </BrowserRouter>
  </ChakraProvider>
)
