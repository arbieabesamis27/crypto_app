import React from "react";
import { Box, Typography } from "@mui/material";
import SentimentDissatisfiedIcon from "@mui/icons-material/SentimentDissatisfied";

interface NoDataFoundProps {
  message?: string;
}

export const NoDataFound: React.FC<NoDataFoundProps> = ({ message }) => {
  return (
    <Box
      display="flex"
      flexDirection="column"
      alignItems="center"
      justifyContent="center"
      textAlign="center"
      height="100%"
      py={6}
    >
      <SentimentDissatisfiedIcon sx={{ fontSize: 64, color: "gray" }} />
      <Typography variant="h6" sx={{ mt: 2 }}>
        {message || "No data found."}
      </Typography>
    </Box>
  );
};
