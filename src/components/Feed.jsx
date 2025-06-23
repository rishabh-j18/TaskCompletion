import React, { useEffect, useState } from 'react';
import {
  Box,
  Typography,
  Pagination,
  CircularProgress,
  Grid,
  useMediaQuery,
  Avatar
} from '@mui/material';
import { useTheme } from '@mui/material/styles';

const Feed = () => {
  const [videos, setVideos] = useState([]);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [loading, setLoading] = useState(true);

  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

  const fetchVideos = async (pageNumber = 1) => {
    try {
      setLoading(true);
      const res = await fetch(`https://taskcompletionbackend.onrender.com/media/video?page=${pageNumber}`);
      const result = await res.json();

      setVideos(result.data || []);
      setTotalPages(result.paginationData?.totalPage || 1);
    } catch (error) {
      console.error('Failed to fetch videos:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchVideos(page);
  }, [page]);

  return (
    <Box sx={{ p: 2 }}>
      <Box sx={{ mb: 4, textAlign: 'center' }}>
        <Typography variant="h4" gutterBottom>
          Feed
        </Typography>
        <Pagination
          count={totalPages}
          page={page}
          onChange={(e, value) => setPage(value)}
          color="primary"
          size={isMobile ? 'small' : 'medium'}
        />
      </Box>

      {loading ? (
        <Box sx={{ display: 'flex', justifyContent: 'center', mt: 4 }}>
          <CircularProgress />
        </Box>
      ) : (
        <Grid container spacing={4} direction="column">
          {videos.map((video) => (
            <Grid item key={video._id}>
              <Box
                sx={{
                  width: '80%',
                  maxWidth: 400,
                  mx: 'auto',
                  borderRadius: 2,
                  overflow: 'hidden',
                  boxShadow: 3
                }}
              >
                <video
                  src={video.url}
                  controls
                  loop
                  autoPlay
                  muted
                  style={{ width: '100%', height: 'auto' }}
                />
                <Box sx={{ p: 2 }}>
                  <Typography variant="h6">
                    {video.title}
                  </Typography>
                  <Typography variant="body2" color="text.secondary" sx={{ mt: 1 }}>
                    {video.description}
                  </Typography>
                  {video.ownerdata && (
                    <Box sx={{ display: 'flex', alignItems: 'center', mt: 2 }}>
                      <Avatar sx={{ width: 32, height: 32, mr: 1 }}>
                        {video.ownerdata.name.charAt(0)}
                      </Avatar>
                      <Typography variant="body2">
                        Uploaded by <strong>{video.ownerdata.name}</strong>
                      </Typography>
                    </Box>
                  )}
                </Box>
              </Box>
            </Grid>
          ))}
        </Grid>
      )}
    </Box>
  );
};

export default Feed;
