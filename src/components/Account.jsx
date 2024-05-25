import axios from 'axios'
import React, { useState, useEffect } from 'react'
import { Box, CircularProgress, Typography } from '@mui/material'

const ProfilePage = () => {
  const [userData, setUserData] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const token = localStorage.getItem('token')

    if (token) {
      axios
        .get('http://localhost:3000/profile', {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        })
        .then((response) => {
          setUserData(response.data)
          setLoading(false)
        })
        .catch((error) => {
          console.error(error)
          setLoading(false)
        })
    } else {
      setLoading(false)
    }
  }, [])

  return (
    <Box display="flex" justifyContent="center" alignItems="center">
      {loading ? (
        <CircularProgress />
      ) : userData ? (
        <Box
          sx={{
            width: '100%',
            maxWidth: 480,
            bgcolor: 'background.paper',
            p: 3,
            borderRadius: 2,
            boxShadow: 3,
          }}
        >
          <Typography
            variant="h5"
            component="div"
            gutterBottom
            sx={{ fontFamily: 'Kanit, sans-serif' }}
          >
            ข้อมูลบัญชีผู้ใช้
          </Typography>
          <Typography variant="body1" sx={{ fontFamily: 'Kanit, sans-serif' }}>
            <strong>ID:</strong> {userData._id}
          </Typography>
          <Typography variant="body1" sx={{ fontFamily: 'Kanit, sans-serif' }}>
            <strong>ชื่อบัญชีผู้ใช้:</strong> {userData.name}
          </Typography>
          <Typography variant="body1" sx={{ fontFamily: 'Kanit, sans-serif' }}>
            <strong>Email:</strong> {userData.email}
          </Typography>
        </Box>
      ) : (
        <Typography variant="body1" sx={{ fontFamily: 'Kanit, sans-serif' }}>
          ไม่มีข้อมูลผู้ใช้
        </Typography>
      )}
    </Box>
  )
}

export default ProfilePage
