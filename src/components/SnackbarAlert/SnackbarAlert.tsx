import { Alert, IconButton, Snackbar } from '@mui/material'
import { CloseIcon } from 'next/dist/client/components/react-dev-overlay/internal/icons/CloseIcon'
import { ReactNode } from 'react'

interface SnackbarAlertProps {
  isOpen: boolean
  handleSnackbarClose: (_: unknown, reason?: string) => void
  children: ReactNode
}

export const SnackbarAlert = ({
  isOpen,
  handleSnackbarClose,
  children,
}: SnackbarAlertProps) => {
  const snackbarAction = (
    <IconButton
      size="small"
      aria-label="close"
      color="inherit"
      onClick={handleSnackbarClose}
    >
      <CloseIcon />
    </IconButton>
  )

  return (
    <Snackbar
      open={isOpen}
      autoHideDuration={4500}
      onClose={handleSnackbarClose}
      action={snackbarAction}
    >
      <Alert
        onClose={handleSnackbarClose}
        severity="error"
        sx={{
          background: (theme) => theme.palette.error.main,
          color: (theme) => theme.palette.primary.main,
          '& .MuiAlert-icon': {
            color: (theme) => theme.palette.primary.main,
          },
        }}
      >
        {children}
      </Alert>
    </Snackbar>
  )
}
