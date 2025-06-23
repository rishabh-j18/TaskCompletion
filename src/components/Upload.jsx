import { useState } from 'react';
import {
  Box,
  Button,
  TextField,
  Typography,
  Paper,
  CircularProgress,
  Snackbar,
  Alert
} from '@mui/material';
import axios from 'axios';
import { useAuth } from '../context/Authcontext';

const Upload = () => {
  const { token } = useAuth();

  const [formData, setFormData] = useState({
    title: '',
    description: '',
    file: null
  });

  const [loading, setLoading] = useState(false);
  const [feedback, setFeedback] = useState({ open: false, success: true, message: '' });

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: files ? files[0] : value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.file || !['video/mp4', 'video/quicktime'].includes(formData.file.type)) {
      setFeedback({ open: true, success: false, message: 'Only .mp4 or .mov files are allowed.' });
      return;
    }

    const payload = new FormData();
    payload.append('title', formData.title);
    payload.append('description', formData.description);
    payload.append('video', formData.file);

    try {
      setLoading(true);
      const res = await axios.post('http://localhost:5000/media/upload', payload, {
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'multipart/form-data'
        }
      });

      setFeedback({ open: true, success: true, message: res.data.message || 'Upload successful!' });
      setFormData({ title: '', description: '', file: null });
    } catch (error) {
      console.error(error);
      setFeedback({
        open: true,
        success: false,
        message: error?.response?.data?.message || 'Upload failed.'
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <Box maxWidth="sm" mx="auto" mt={8}>
      <Paper elevation={3} sx={{ p: 4 }}>
        <Typography variant="h5" mb={3}>
          Upload a Video
        </Typography>
        <form onSubmit={handleSubmit}>
          <TextField
            label="Title"
            name="title"
            fullWidth
            required
            margin="normal"
            value={formData.title}
            onChange={handleChange}
          />
          <TextField
            label="Description"
            name="description"
            fullWidth
            required
            margin="normal"
            multiline
            minRows={3}
            value={formData.description}
            onChange={handleChange}
          />
          <Button variant="contained" component="label" sx={{ mt: 2 }}>
            Select Video File
            <input
              type="file"
              name="file"
              accept="video/mp4,video/quicktime"
              hidden
              onChange={handleChange}
            />
          </Button>
          {formData.file && (
            <Typography mt={1} variant="body2">
              Selected: {formData.file.name}
            </Typography>
          )}
          <Box mt={3} textAlign="right">
            <Button
              type="submit"
              variant="contained"
              color="primary"
              disabled={loading}
            >
              {loading ? <CircularProgress size={24} /> : 'Upload'}
            </Button>
          </Box>
        </form>
      </Paper>

      <Snackbar
        open={feedback.open}
        autoHideDuration={4000}
        onClose={() => setFeedback((prev) => ({ ...prev, open: false }))}
      >
        <Alert
          severity={feedback.success ? 'success' : 'error'}
          onClose={() => setFeedback((prev) => ({ ...prev, open: false }))}
          sx={{ width: '100%' }}
        >
          {feedback.message}
        </Alert>
      </Snackbar>
    </Box>
  );
};

export default Upload;
