import { useState } from "react";
import { Link } from "react-router";
import {
  Typography,
  Avatar,
  MenuItem,
  ListItemIcon,
  ListItemText,
  MenuList,
  Stack,
  IconButton,
  Drawer,
  Box,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import {
  HomeOutlined,
  LightbulbOutline,
  CurrencyExchange,
  BarChart,
  Menu as MenuIcon,
} from "@mui/icons-material";
import icon from "../images/cryptocurrency.png";
import { orange, teal } from "@mui/material/colors";

const navLinks = [
  {
    page: "Home",
    link: "/",
    icon: <HomeOutlined fontSize="small" sx={{ color: "white" }} />,
  },
  {
    page: "Cryptocurrencies",
    link: "/cryptocurrencies",
    icon: <BarChart fontSize="small" sx={{ color: "white" }} />,
  },
  {
    page: "exchanges",
    link: "/Exchanges",
    icon: <CurrencyExchange fontSize="small" sx={{ color: "white" }} />,
  },
  {
    page: "News",
    link: "/news",
    icon: <LightbulbOutline fontSize="small" sx={{ color: "white" }} />,
  },
];

export const Navbar = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));
  const [drawerOpen, setDrawerOpen] = useState(false);

  const menuItems = (
    <MenuList sx={{ color: teal[100] }}>
      {navLinks.map((nav, idx) => (
        <MenuItem
          key={idx}
          component={Link}
          to={nav.link}
          onClick={() => setDrawerOpen(false)}
          sx={{
            "&:hover": {
              borderStyle: "solid",
              borderLeftWidth: 2,
              borderLeftColor: orange[200],
              backgroundColor: orange[800],
              color: "white",
              transition: "all 0.1s ease-out",
            },
          }}
        >
          <ListItemIcon>{nav.icon}</ListItemIcon>
          <ListItemText primary={nav.page} />
        </MenuItem>
      ))}
    </MenuList>
  );
  return (
    <>
      <Stack
        sx={{
          flexDirection: isMobile ? "row" : "column",
          justifyContent: isMobile ? "space-between" : "start",
          height: "100%",
          bgcolor: teal[900],
        }}
      >
        <Stack direction="row" padding={2} alignItems="center" spacing={1}>
          <Avatar src={icon} sx={{ width: 32, height: 32 }} />
          <Typography
            variant="h6"
            sx={{
              color: orange[500],
              "&:hover": {
                color: orange[800],
                transition: "all 0.1s ease-out",
              },
            }}
            component={Link}
            to="/"
          >
            Cryptonite
          </Typography>
        </Stack>

        {isMobile ? (
          <IconButton
            onClick={() => setDrawerOpen(true)}
            sx={{ color: "white" }}
          >
            <MenuIcon />
          </IconButton>
        ) : (
          <Stack>{menuItems}</Stack>
        )}
      </Stack>

      <Drawer
        anchor="right"
        open={drawerOpen}
        onClose={() => setDrawerOpen(false)}
        sx={{ "& .MuiDrawer-paper": { bgcolor: teal[900] } }}
      >
        <Box sx={{ width: 250 }}>{menuItems}</Box>
      </Drawer>
    </>
  );
};
