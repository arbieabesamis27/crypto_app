import { Skeleton, Box, Grid } from "@mui/material";

export const Loader = () => {
  const array = new Array(6).fill(null);

  return (
    <Grid container spacing={2}>
      {array.map((_, i) => (
        <Grid size={{ xs: 12, sm: 6, md: 6, lg: 4, xl: 3 }} key={i}>
          <Box>
            <Skeleton variant="text" width="60%" height={30} />
            <Skeleton variant="rectangular" height={160} sx={{ my: 1 }} />
            <Skeleton variant="text" width="80%" height={20} />
          </Box>
        </Grid>
      ))}
    </Grid>
  );
};
