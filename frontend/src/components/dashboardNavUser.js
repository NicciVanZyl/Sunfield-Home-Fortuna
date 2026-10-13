import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import CssBaseline from "@mui/material/CssBaseline";
import Divider from "@mui/material/Divider";
import Drawer from "@mui/material/Drawer";
import IconButton from "@mui/material/IconButton";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import MenuIcon from "@mui/icons-material/Menu";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import DashboardIcon from "@mui/icons-material/Dashboard";
import ProfileIcon from "@mui/icons-material/Person";
import OverviewPage from "./UDOverview";
import Donations from "./UDDonations";
import Profile from "./UDProfile";
import Logo from "../assets/images/Logo.svg";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { Link } from "react-router-dom";
import CartIcon from "@mui/icons-material/ShoppingBagRounded";


const theme = createTheme({
  components: {
    MuiDrawer: {
      styleOverrides: {
        root: {
          "& .MuiBackdrop-root": {
            backgroundColor: "rgba(0, 0, 0, 0.2)", // overlay on page when burger menu clicked
          },
        },
        // Mobile/Desktop variant
        paper: {
          backgroundColor: "#FBF6DA",
          width: 300,
          borderRight: "2px solid #ef9f27",
          borderRadius: "0 16px 16px 0",
          boxShadow: "4px 0 24px rgba(0,0,0,0.3)",
          padding: "8px",
          overflowX: "hidden",
        },

        // Desktop variant
        docked: {
          "& .MuiDrawer-paper": {
            borderRight: "1px solid #FBF6DA",
          },
        },
      },

      defaultProps: {
        elevation: 4,
      },
    },

    // Header
    MuiToolbar: {
      styleOverrides: {
        root: {
          color: "#000",
          borderRadius: "8px",
          marginBottom: "8px",
          minHeight: "56px !important",
        },
      },
    },

    // List Items
    MuiList: {
      styleOverrides: {
        root: {
          padding: "8px",
          gap: "4px",
          display: "flex",
          flexDirection: "column",
        },
      },
    },

    // Specific items
    MuiListItem: {
      styleOverrides: {
        root: {
          padding: 0,
          borderRadius: "8px",
          overflow: "hidden",
        },
      },
    },

    // Item Buttons
    MuiListItemButton: {
      styleOverrides: {
        root: {
          borderRadius: "8px",
          padding: "10px 16px",
          color: "#000",
          transition: "all 0.2s ease",
          "& .MuiListItemIcon-root": {
            color: "#000",
          },

          // hover state
          "&:hover": {
            backgroundColor: "#ef9f2746",
            color: "#000",
            "& .MuiListItemIcon-root": {
              color: "#000",
            },
          },

          // active state
          "&.Mui-selected": {
            borderRadius: 0,
            borderBottom: "2px solid #ef9f27",
            backgroundColor: "#ffffff00",
            color: "#000",
            fontWeight: 600,
            "& .MuiListItemIcon-root": {
              color: "#000",
            },
            "&:hover": {
              backgroundColor: "#ef9f2770",
              color: "#000",
              "& .MuiListItemIcon-root": {
                color: "#000",
              },
            },
          },
        },
      },
    },

    // Icons
    MuiListItemIcon: {
      styleOverrides: {
        root: {
          color: "rgba(255,255,255,0.5)",
          minWidth: "40px",
          "& .MuiSvgIcon-root": {
            fontSize: "22px",
            transition: "color 0.2s ease",
          },
        },
      },
    },

    // Item text
    MuiListItemText: {
      styleOverrides: {
        primary: {
          fontSize: "14px",
          fontWeight: 500,
          letterSpacing: "0.02em",
          fontFamily: '"Poppins", sans-serif',
        },
        secondary: {
          fontSize: "12px",
          color: "rgba(255,255,255,0.4)",
        },
      },
    },

    // Any text
    MuiTypography: {
      styleOverrides: {
        h6: {
          fontSize: "16px",
          fontWeight: 700,
          color: "#000",
          letterSpacing: "0.05em",
          fontFamily: '"Poppins", sans-serif',
        },
      },
    },

    // Burger menu
    MuiIconButton: {
      styleOverrides: {
        root: {
          color: "#000",
          borderRadius: "8px",
          padding: "8px",
          "&:hover": {
            backgroundColor: "#ef9f2770",
            color: "#000",
          },
        },
      },
    },

    // Bar at the top of the screen
    MuiAppBar: {
      styleOverrides: {
        root: {
          backgroundColor: "#FBF6DA",
          color: "#000",
          boxShadow: "none",
          borderBottom: "1px solid #ef9f2770",
        },
      },
    },
  },
});

const drawerWidth = 300;

// But the items in the list
const navItems = [
  {
    text: "Overview",
    icon: <DashboardIcon />,
    component: (setActivePage) => (
      <OverviewPage setActivePage={setActivePage} />
    ),
  },
  {
    text: "Profile",
    icon: <ProfileIcon />,
    component: (setActivePage) => <Profile setActivePage={setActivePage} />,
  },
  {
    text: "My Donations",
    icon: <CartIcon />,
    component: (setActivePage) => <Donations setActivePage={setActivePage} />,
  },
];

function DashboardNav() {
  const [mobileOpen, setMobileOpen] = React.useState(false);
  const [isClosing, setIsClosing] = React.useState(false);
  const [activePage, setActivePage] = React.useState("Overview");

  const handleDrawerClose = () => {
    setIsClosing(true);
    setMobileOpen(false);
  };

  const handleDrawerTransitionEnd = () => setIsClosing(false);

  const handleDrawerToggle = () => {
    if (!isClosing) setMobileOpen(!mobileOpen);
  };

  // Render the correct page
  const activeComponent = navItems
    .find((item) => item.text === activePage)
    ?.component(setActivePage);

  const drawer = (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        height: "100%",
      }}
    >
      <Toolbar className="DashboardLogo">
        <img className="" src={Logo}></img>
      </Toolbar>
      <List sx={{ flex: 1 }}>
        {navItems.map(({ text, icon }) => (
          <ListItem key={text} disablePadding>
            <ListItemButton
              selected={activePage === text}
              onClick={() => {
                setActivePage(text);
                setMobileOpen(false);
              }}
            >
              <ListItemIcon>{icon}</ListItemIcon>
              <ListItemText primary={text} />
            </ListItemButton>
          </ListItem>
        ))}
        <Link to="/Contact" className="footerLink">
          Contact Us
        </Link>
        <Link to="/Donate" className="footerLink">
          Donate
        </Link>
      </List>
      <div className="mb-4">
        <button className="userLogout">Log Out</button>
      </div>
    </div>
  );

  return (
    <ThemeProvider theme={theme}>
      <Box sx={{ display: "flex", height: "100%", overflow: "hidden" }}>
        <CssBaseline />

        <AppBar
          position="absolute"
          sx={{
            display: { xs: "flex", md: "none" },
            alignItems: "center",
            flexDirection: "row",
            padding: "0 16px",
            height: "48px",
          }}
        >
          <IconButton edge="start" onClick={handleDrawerToggle}>
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" sx={{ ml: 1 }}>
            {activePage}
          </Typography>
        </AppBar>

        {/* sidebar */}
        <Box
          component="nav"
          sx={{
            width: { md: drawerWidth },
            flexShrink: { md: 0 },
            height: "100%",
          }}
        >
          {/* Mobile drawer */}
          <Drawer
            variant="temporary"
            open={mobileOpen}
            onTransitionEnd={handleDrawerTransitionEnd}
            onClose={handleDrawerClose}
            sx={{
              display: { xs: "block", md: "none" },
              "& .MuiDrawer-paper": {
                width: drawerWidth,
                position: "absolute",
                top: 0,
                bottom: 0,
                height: "100%",
              },
            }}
            slotProps={{
              root: {
                keepMounted: true,
                style: { position: "absolute" },
              },
            }}
          >
            {drawer}
          </Drawer>

          {/* Desktop side nav */}
          <Drawer
            variant="permanent"
            sx={{
              display: { xs: "none", md: "block" },
              height: "100%",
              "& .MuiDrawer-paper": {
                width: drawerWidth,
                position: "relative",
                height: "100%",
              },
            }}
            open
          >
            {drawer}
          </Drawer>
        </Box>

        {/* main content */}
        <Box
          component="main"
          sx={{
            flexGrow: 1,
            p: 3,
            overflow: "auto",
            mt: { xs: "48px", md: 0 },
            background: "#fac775",
            background:
              "radial-gradient(circle,rgba(250, 199, 117, 1) 0%,rgba(255, 221, 158, 1) 45%,rgba(251, 246, 218, 1) 100%  )",
          }}
        >
          {activeComponent}
        </Box>
      </Box>
    </ThemeProvider>
  );
}

export default DashboardNav;
