import React from "react";
import {
  AppBar,
  Toolbar,
  Typography,
  Drawer,
  List,
  ListItem,
  ListItemText,
  IconButton,
  Box,
  Button,
  Badge,
  Divider,
  ListItemIcon,
} from "@mui/material";
import LogoutIcon from "@mui/icons-material/Logout";
import NotificationsIcon from "@mui/icons-material/Notifications";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import DashboardIcon from "@mui/icons-material/Dashboard";
import ScreenSearchDesktopIcon from "@mui/icons-material/ScreenSearchDesktop";
import NewspaperIcon from "@mui/icons-material/Newspaper";
import AccountBalanceIcon from "@mui/icons-material/AccountBalance";
import TrendingUpIcon from "@mui/icons-material/TrendingUp";
import MenuIcon from "@mui/icons-material/Menu";
import { useNavigate, useLocation } from "react-router-dom";
import { useAuthStore } from "../features/auth/authStore";

const drawerWidth = 240;

export default function MainLayout({ children }: { children: React.ReactNode }) {
  const navigate = useNavigate();
  const location = useLocation();
  const currentPath = location.pathname;
  const logout = useAuthStore((state) => state.logout);

  const [open, setOpen] = React.useState(true); // sidebar open/close state

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  const menuItems = [
    { text: "Dashboard", icon: <DashboardIcon />, path: "/dashboard" },
    { text: "Screener", icon: <ScreenSearchDesktopIcon />, path: "/screener" },
    { text: "News", icon: <NewspaperIcon />, path: "/news" },
    { text: "Portfolio", icon: <AccountBalanceIcon />, path: "/portfolio" },
    { text: "Heatmap", icon: <TrendingUpIcon />, path: "/heatmap" },
  ];

  return (
    <Box sx={{ display: "flex" }}>
      {/* Drawer Sidebar */}
      {open && (
        <Drawer
          variant="permanent"
          sx={{
            width: drawerWidth,
            flexShrink: 0,
            "& .MuiDrawer-paper": {
              width: drawerWidth,
              boxSizing: "border-box",
              backgroundColor: "background.paper",
              borderRight: "1px solid",
              borderColor: "divider",
            },
          }}
        >
          <Toolbar />
          <List sx={{ px: 2 }}>
            {menuItems.map((item) => (
              <ListItem
                key={item.text}
                button
                onClick={() => navigate(item.path)}
                sx={{
                  borderRadius: 1,
                  mb: 1,
                  bgcolor: currentPath === item.path ? "primary.main" : "transparent",
                  color: currentPath === item.path ? "white" : "inherit",
                  "&:hover": {
                    bgcolor:
                      currentPath === item.path ? "primary.dark" : "action.hover",
                  },
                  "& .MuiListItemIcon-root": {
                    color: currentPath === item.path ? "white" : "inherit",
                  },
                }}
              >
                <ListItemIcon>{item.icon}</ListItemIcon>
                <ListItemText primary={item.text} />
              </ListItem>
            ))}
          </List>

          <Divider sx={{ mx: 2 }} />

          <Box sx={{ flexGrow: 1 }} />

          <Button
            variant="outlined"
            color="error"
            startIcon={<LogoutIcon />}
            sx={{ m: 2 }}
            onClick={handleLogout}
          >
            Logout
          </Button>
        </Drawer>
      )}

      {/* AppBar */}
      <AppBar
        position="fixed"
        sx={{
          zIndex: (theme) => theme.zIndex.drawer + 1,
          background: "#1a237e",
        }}
      >
        <Toolbar>
          <IconButton
            color="inherit"
            edge="start"
            onClick={() => setOpen(!open)}
            sx={{ mr: 2 }}
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" noWrap sx={{ flexGrow: 1 }}>
            Vrinda IQ
          </Typography>
          <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
            <IconButton color="inherit">
              <Badge badgeContent={4} color="error">
                <NotificationsIcon />
              </Badge>
            </IconButton>
            <IconButton color="inherit">
              <AccountCircleIcon />
            </IconButton>
          </Box>
        </Toolbar>
      </AppBar>

      {/* Main Content */}
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          p: 3,
          marginLeft: open ? `${drawerWidth}px` : 0,
          transition: "margin-left 0.3s ease",
        }}
      >
        <Toolbar />
        {children}
      </Box>
    </Box>
  );
}
