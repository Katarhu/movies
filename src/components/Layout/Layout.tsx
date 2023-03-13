import { ReactNode } from 'react'
import {Box, Container} from '@mui/material'
import { Navbar } from '@components'

interface LayoutProps {
  children: ReactNode
}

export const Layout = ({ children }: LayoutProps) => {
  return (
    <Box
      sx={{
        background: (theme) => theme.palette.primary.dark,
        minHeight: '100vh',
      }}
    >
      <Navbar />
      <Container component="main" sx={{ height: '100%', py: { xs: 2, sm: 3 }, px: 5 }}>
        {children}
      </Container>
    </Box>
  )
}
