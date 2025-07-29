import { Stack, Typography } from "@mui/material";
import { orange } from "@mui/material/colors";
import { Link } from "react-router";

export const Footer = () => {
  return (
    <>
      <Typography sx={{ color: "white", textAlign: "center" }}>
        Copyright © 2025
        <Link to="/"> Cryptonite Inc.</Link> <br />
        All Rights Reserved.
      </Typography>
      <Stack sx={{ flexDirection: "row", gap: 1, color: "white" }}>
        <Typography
          component={Link}
          to={"/"}
          variant="subtitle1"
          sx={{
            color: orange[100],
            transition: "all 0.1s ease-in-out",
            "&:hover": {
              color: orange[400],
            },
          }}
        >
          Home
        </Typography>
        |
        <Typography
          component={Link}
          to={"/exchanges"}
          variant="subtitle1"
          sx={{
            color: orange[100],
            transition: "all 0.1s ease-in-out",
            "&:hover": {
              color: orange[400],
            },
          }}
        >
          Exchanges
        </Typography>
        |
        <Typography
          component={Link}
          to={"/news"}
          variant="subtitle1"
          sx={{
            color: orange[100],
            transition: "all 0.1s ease-in-out",
            "&:hover": {
              color: orange[400],
            },
          }}
        >
          News
        </Typography>
      </Stack>
    </>
  );
};
