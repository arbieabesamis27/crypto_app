import { Routes, Route } from "react-router";
import {
  Cryptocurrencies,
  CryptoDetails,
  Exchanges,
  Footer,
  Homepage,
  Navbar,
  News,
} from "./components";
import "./App.css";
import { Stack, useMediaQuery, useTheme } from "@mui/material";
import { teal } from "@mui/material/colors";
function App() {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));

  return (
    <Stack sx={{ minHeight: "100vh", bgcolor: teal[50] }}>
      <Stack
        direction={isMobile ? "column" : "row"}
        sx={{ width: "100%", height: "100%" }}
      >
        <Stack
          sx={{
            width: isMobile ? "100%" : "auto",
            minHeight: isMobile ? "100%" : "100vh",
            zIndex: 1,
          }}
        >
          <Navbar />
        </Stack>

        <Stack
          sx={{
            flexGrow: 1,
            flexDirection: "column",
            overflow: "auto",
            px: 2,
            py: 4,
          }}
        >
          <Routes>
            <Route path="/" element={<Homepage />} />
            <Route path="/exchanges" element={<Exchanges />} />
            <Route
              path="/cryptocurrencies"
              element={<Cryptocurrencies simplified={false} />}
            />
            <Route path="/crypto/:coinId" element={<CryptoDetails />} />
            <Route path="/news" element={<News simplified={false} />} />
          </Routes>
        </Stack>
      </Stack>

      <Stack
        sx={{
          width: "100%",
          p: 4,
          alignItems: "center",
          bgcolor: teal[900],
          mt: "auto",
        }}
      >
        <Footer />
      </Stack>
    </Stack>
  );
}

export default App;
