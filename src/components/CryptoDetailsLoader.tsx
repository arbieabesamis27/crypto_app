import { Box, Grid, Skeleton, Stack } from "@mui/material";

export const CryptoDetailsLoader = () => {
  return (
    <Box p={3}>
      {/* Title */}
      <Skeleton variant="text" width="60%" height={50} />

      {/* Description */}
      <Skeleton variant="text" width="80%" height={30} />
      <Skeleton variant="text" width="50%" height={30} sx={{ mb: 3 }} />

      {/* Time period + Chart */}
      <Skeleton variant="rectangular" height={40} width={150} sx={{ mb: 2 }} />
      <Skeleton variant="rectangular" height={300} sx={{ mb: 4 }} />

      <Grid container spacing={4}>
        {[1, 2].map((section) => (
          <Grid sx={{ xs: 12, md: 6 }} key={section}>
            <Skeleton variant="text" width="60%" height={30} />
            <Skeleton variant="text" width="90%" height={25} sx={{ mb: 2 }} />

            {[...Array(5)].map((_, index) => (
              <Box
                key={index}
                display="flex"
                justifyContent="space-between"
                alignItems="center"
                py={1}
              >
                <Stack direction="row" alignItems="center" spacing={2}>
                  <Skeleton variant="circular" width={24} height={24} />
                  <Skeleton variant="text" width={120} height={20} />
                </Stack>
                <Skeleton variant="text" width={60} height={20} />
              </Box>
            ))}
          </Grid>
        ))}
      </Grid>

      <Box mt={4}>
        <Skeleton variant="text" width="40%" height={30} />
        <Skeleton variant="rectangular" height={120} />
      </Box>

      <Box mt={4}>
        <Skeleton variant="text" width="40%" height={30} />
        {[...Array(3)].map((_, i) => (
          <Box
            key={i}
            display="flex"
            justifyContent="space-between"
            alignItems="center"
            py={2}
          >
            <Skeleton variant="text" width={100} height={20} />
            <Skeleton variant="text" width={150} height={20} />
          </Box>
        ))}
      </Box>
    </Box>
  );
};
