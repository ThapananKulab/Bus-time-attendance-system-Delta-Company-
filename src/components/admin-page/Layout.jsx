import React from 'react'
import Sidebar from './navbar.jsx'
import { Toolbar, Grid } from '@mui/material'

const Layout = ({ children }) => {
  return (
    <Grid container>
      <Grid item xs={12} md={3}>
        <Sidebar />
      </Grid>
      <Grid item xs={12} md={8.5}>
        <main
          style={{
            flexGrow: 1,
            padding: '24px',
            marginLeft: 'auto',
          }}
        >
          <Toolbar />
          {children}
        </main>
      </Grid>
    </Grid>
  )
}

export default Layout
