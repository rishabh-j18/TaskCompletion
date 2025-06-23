import React, { useEffect, useState } from 'react';
import { Box, Typography, Paper, CircularProgress } from '@mui/material';
import axios from 'axios';
import { useAuth } from '../context/Authcontext';

const MyProfile = () => {
  const { token } = useAuth();
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const res = await axios.get('http://localhost:5000/auth/profile', {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setProfile(res.data.userdata);
      } catch (err) {
        console.error('Error fetching profile:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchProfile();
  }, [token]);

  if (loading) {
    return (
      <Box textAlign="center" mt={10}>
        <CircularProgress />
      </Box>
    );
  }

  if (!profile) {
    return (
      <Box textAlign="center" mt={10}>
        <Typography variant="h6">Unable to load profile.</Typography>
      </Box>
    );
  }

  return (
    <Box maxWidth="sm" mx="auto" mt={8}>
      <Paper elevation={3} sx={{ padding: 4 }}>
        <Typography variant="h5" gutterBottom>
          My Profile
        </Typography>
        <Typography variant="body1" sx={{ mt: 2 }}>
          <strong>User ID:</strong> {profile._id}
        </Typography>
        <Typography variant="body1" sx={{ mt: 2 }}>
          <strong>Name:</strong> {profile.name}
        </Typography>
        <Typography variant="body1" sx={{ mt: 2 }}>
          <strong>Email:</strong> {profile.email}
        </Typography>
      </Paper>
    </Box>
  );
};

export default MyProfile;
