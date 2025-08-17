import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom'; // Import useNavigate for navigation
import {
  Drawer,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  IconButton,
  Box,
  Avatar,
  Typography,
  Divider,
} from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import DashboardIcon from '@mui/icons-material/Dashboard';
import ScienceIcon from '@mui/icons-material/Science'; // For laboratory
import InfoIcon from '@mui/icons-material/Info'; // For directorsInfo and about
import WorkIcon from '@mui/icons-material/Work'; // For jobs
import SettingsIcon from '@mui/icons-material/Settings';
import LogoutIcon from '@mui/icons-material/Logout';

// Tailwind CSS classes for responsive adjustments and general styling
const sidebarWidth = 240;
const collapsedWidth = 60; // Width when sidebar is closed

export default function Sidebar() {
  const [open, setOpen] = useState(true); // State to manage sidebar open/close
  const navigate = useNavigate(); // Initialize useNavigate hook

  const handleDrawerToggle = () => {
    setOpen(!open);
  };

  // Logout function
  const handleLogout = () => {
    localStorage.removeItem("token"); // Remove the token from localStorage
    navigate("/"); // Navigate to the home page
    // You might also want to clear any user-related state in your application here
  };

  const navItems = [
    { text: 'Dashboard', icon: <DashboardIcon />, path: '/admin/' }, // Assuming admin dashboard is at /admin
    { text: 'Explore Plants', icon: <WorkIcon />, path: '/admin/explore-plants' },
    { text: 'Laboratory', icon: <ScienceIcon />, path: '/admin/laboratory' }, // Changed to admin path if applicable
    { text: 'Directors Info', icon: <InfoIcon />, path: '/admin/directorsInfo' }, // Changed to admin path if applicable
    { text: 'About', icon: <InfoIcon />, path: '/admin/about' },
    { text: 'Jobs', icon: <WorkIcon />, path: '/admin/jobs' },
  ];

  return (
    <Box sx={{ display: 'flex' }}>
      <Drawer
        variant="permanent"
        open={open}
        sx={{
          width: open ? sidebarWidth : collapsedWidth,
          flexShrink: 0,
          whiteSpace: 'nowrap',
          boxSizing: 'border-box',
          transition: (theme) =>
            theme.transitions.create('width', {
              easing: theme.transitions.easing.sharp,
              duration: theme.transitions.duration.enteringScreen,
            }),
          '& .MuiDrawer-paper': {
            width: open ? sidebarWidth : collapsedWidth,
            boxSizing: 'border-box',
            backgroundColor: '#FFFFFF',
            color: '#2c3e50',
            transition: (theme) =>
              theme.transitions.create('width', {
                easing: theme.transitions.easing.sharp,
                duration: theme.transitions.duration.enteringScreen,
              }),
            overflowX: 'hidden',
          },
        }}
      >
        <Box
          sx={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: open ? 'flex-end' : 'center',
            padding: 1,
            minHeight: '64px',
            backgroundColor: '#FFFFFF',
          }}
        >
          {open ? (
            <img
              className="h-16 w-auto"
              src="https://i.ibb.co.com/sd4bz8Dr/logotusuka.jpg"
              alt="Company Logo"
            />
          ) : (
            <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', width: '100%' }}>
              <MenuIcon sx={{ color: '#2c3e50' }} />
            </Box>
          )}
          <IconButton onClick={handleDrawerToggle} sx={{ color: '#2c3e50', position: 'absolute', right: 5 }}>
            {open ? <ChevronLeftIcon /> : <MenuIcon />}
          </IconButton>
        </Box>
        <Divider sx={{ borderColor: '#FFFFFF' }} />

        <List>
          {navItems.map((item) => (
            <ListItem key={item.text} disablePadding sx={{ display: 'block' }}>
              <ListItemButton
                component={Link}
                to={item.path}
                sx={{
                  minHeight: 48,
                  justifyContent: open ? 'initial' : 'center',
                  px: 2.5,
                  '&:hover': {
                    backgroundColor: '#e0e0e0', // Lighter grey on hover for white background
                  },
                  '&.Mui-selected': {
                    backgroundColor: '#3498db',
                    '&:hover': {
                      backgroundColor: '#2980b9',
                    },
                  },
                }}
              >
                <ListItemIcon
                  sx={{
                    minWidth: 0,
                    mr: open ? 3 : 'auto',
                    justifyContent: 'center',
                    color: '#2c3e50',
                  }}
                >
                  {item.icon}
                </ListItemIcon>
                <ListItemText primary={item.text} sx={{ opacity: open ? 1 : 0 }} />
              </ListItemButton>
            </ListItem>
          ))}
        </List>
        <Divider sx={{ borderColor: '#FFFFFF' }} />

        <Box sx={{ mt: 'auto', p: 2, display: 'flex', flexDirection: 'column', alignItems: open ? 'flex-start' : 'center' }}>
          <Box sx={{ display: 'flex', alignItems: 'center', mb: 2, width: '100%', justifyContent: open ? 'flex-start' : 'center' }}>
            <Avatar alt="User Name" src="https://via.placeholder.com/150/0000FF/808080?text=User" sx={{ width: 40, height: 40, mr: open ? 2 : 0 }} />
            {open && (
              <Typography variant="body1" sx={{ color: '#2c3e50', flexGrow: 1 }}>
                John Doe
              </Typography>
            )}
          </Box>
          <List sx={{ width: '100%' }}>
            <ListItem disablePadding sx={{ display: 'block' }}>
              <ListItemButton
                component={Link} // Use Link for Settings if it's a defined route
                to="/admin" // Example path for settings
                sx={{
                  minHeight: 48,
                  justifyContent: open ? 'initial' : 'center',
                  px: 2.5,
                  '&:hover': {
                    backgroundColor: '#e0e0e0',
                  },
                }}
              >
                <ListItemIcon
                  sx={{
                    minWidth: 0,
                    mr: open ? 3 : 'auto',
                    justifyContent: 'center',
                    color: '#2c3e50',
                  }}
                >
                  <SettingsIcon />
                </ListItemIcon>
                <ListItemText primary="Settings" sx={{ opacity: open ? 1 : 0 }} />
              </ListItemButton>
            </ListItem>
            <ListItem disablePadding sx={{ display: 'block' }}>
              <ListItemButton
                onClick={handleLogout} // Attach the logout function here
                sx={{
                  minHeight: 48,
                  justifyContent: open ? 'initial' : 'center',
                  px: 2.5,
                  '&:hover': {
                    backgroundColor: '#e0e0e0',
                  },
                }}
              >
                <ListItemIcon
                  sx={{
                    minWidth: 0,
                    mr: open ? 3 : 'auto',
                    justifyContent: 'center',
                    color: '#2c3e50',
                  }}
                >
                  <LogoutIcon />
                </ListItemIcon>
                <ListItemText primary="Logout" sx={{ opacity: open ? 1 : 0 }} />
              </ListItemButton>
            </ListItem>
          </List>
        </Box>
      </Drawer>
    </Box>
  );
}