import {
  AppBar,
  Toolbar,
  Button,
  Box,
  useTheme,
  useMediaQuery,
} from '@mui/material';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/Authcontext';

const NavBar = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  const navigate = useNavigate();
  const { user, logout } = useAuth();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <AppBar position="static" color="primary" elevation={1}>
      <Toolbar sx={{ justifyContent: 'space-between' }}>
        <Box
          component={Link}
          to="/"
          sx={{
            fontWeight: 'bold',
            fontSize: 24,
            color: '#fff',
            textDecoration: 'none',
          }}
        >
          STRMLY
        </Box>

        <Box>
          <Button
            component={Link}
            to="/feed"
            color="inherit"
            sx={{
              fontWeight: 500,
              textTransform: 'none',
              fontSize: isMobile ? 14 : 16,
              ml: 2,
            }}
          >
            Feed
          </Button>

          <Button
            component={Link}
            to="/upload"
            color="inherit"
            sx={{
              fontWeight: 500,
              textTransform: 'none',
              fontSize: isMobile ? 14 : 16,
              ml: 2,
            }}
          >
            Upload
          </Button>

          {user && (
            <Button
              component={Link}
              to="/profile"
              color="inherit"
              sx={{
                fontWeight: 500,
                textTransform: 'none',
                fontSize: isMobile ? 14 : 16,
                ml: 2,
              }}
            >
              My Profile
            </Button>
          )}

          {user ? (
            <Button
              onClick={handleLogout}
              color="inherit"
              sx={{
                fontWeight: 500,
                textTransform: 'none',
                fontSize: isMobile ? 14 : 16,
                ml: 2,
              }}
            >
              Logout
            </Button>
          ) : (
            <Button
              component={Link}
              to="/login"
              color="inherit"
              sx={{
                fontWeight: 500,
                textTransform: 'none',
                fontSize: isMobile ? 14 : 16,
                ml: 2,
              }}
            >
              Login
            </Button>
          )}
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default NavBar;
