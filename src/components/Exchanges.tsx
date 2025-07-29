import { Link } from "react-router";
import millify from "millify";
import HTMLReactParser from "html-react-parser";
import { useGetExchangesQuery } from "../services/cyptoApi";
import { exchangesData } from "../services/fakeData";
import { Loader } from "../components";
import {
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Avatar,
  Grid,
  Typography,
  useMediaQuery,
  useTheme,
  CardContent,
  Card,
  CardHeader,
  Stack,
  Box,
} from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { orange } from "@mui/material/colors";

export const Exchanges = () => {
  const { data, error, isFetching } = useGetExchangesQuery();

  const exchangesList = error
    ? exchangesData?.data?.exchanges
    : data?.data?.exchanges;

  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

  return (
    <Box
      sx={{
        paddingX: {
          sm: 2,
          lg: 3,
          xl: 6,
        },
      }}
    >
      <Typography
        sx={{ fontSize: { xs: 30, sm: 40 }, paddingY: { xs: 3 } }}
        variant="h1"
        fontWeight="bold"
      >
        Top Exchanges
      </Typography>
      {isFetching ? (
        <Loader />
      ) : !isMobile ? (
        <>
          <Grid
            container
            sx={{
              mb: 2,
            }}
          >
            <Grid size={3}>
              <Typography variant="subtitle2" fontWeight="bold">
                Exchanges
              </Typography>
            </Grid>
            <Grid size={3}>
              <Typography variant="subtitle2" fontWeight="bold">
                24h Trade Volume
              </Typography>
            </Grid>

            <Grid size={3}>
              {" "}
              <Typography variant="subtitle2" fontWeight="bold">
                Markets
              </Typography>
            </Grid>

            <Grid size={3}>
              <Typography variant="subtitle2" fontWeight="bold">
                Change
              </Typography>
            </Grid>
          </Grid>
          {exchangesList &&
            exchangesList?.map((exchange) => (
              <Accordion
                key={exchange.uuid}
                TransitionProps={{ unmountOnExit: true }}
              >
                <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                  <Grid
                    container
                    spacing={2}
                    alignItems="center"
                    width={"100%"}
                  >
                    <Grid size={3}>
                      <Box display="flex" alignItems="center" gap={1}>
                        <Typography variant="body2" fontWeight="bold">
                          {exchange.rank}.
                        </Typography>
                        <Avatar
                          src={exchange.iconUrl || undefined}
                          alt={exchange.name}
                          sx={{ width: 24, height: 24 }}
                        />
                        <Typography variant="body2" noWrap>
                          {exchange.name}
                        </Typography>
                      </Box>
                    </Grid>
                    <Grid size={3}>
                      <Typography variant="body2">
                        ${millify(Number(exchange["24hVolume"]))}
                      </Typography>
                    </Grid>
                    <Grid size={3}>
                      <Typography variant="body2">
                        {millify(exchange.numberOfMarkets)}
                      </Typography>
                    </Grid>
                    <Grid size={3}>
                      <Typography variant="body2">
                        {millify(Number(exchange.marketShare))}%
                      </Typography>
                    </Grid>
                  </Grid>
                </AccordionSummary>
                <AccordionDetails>
                  {HTMLReactParser(
                    exchange.description || "No description available."
                  )}
                  <Typography
                    component={Link}
                    to={`/crypto/${exchange.uuid}`}
                    variant="caption"
                    color="textSecondary"
                    sx={{
                      paddingLeft: 1,
                      transition: "all 0.1s ease-in-out",
                      "&:hover": {
                        color: orange[400],
                      },
                    }}
                  >
                    read more
                  </Typography>
                </AccordionDetails>
              </Accordion>
            ))}
        </>
      ) : (
        <Grid container spacing={2}>
          {exchangesList &&
            exchangesList.map((ex) => (
              <Grid size={{ xs: 12 }} key={ex.uuid}>
                <Card sx={{ display: "flex", flexDirection: "column" }}>
                  <Stack
                    flexDirection={"row"}
                    justifyContent={"space-between"}
                    alignItems={"center"}
                    paddingLeft={3}
                  >
                    <Stack>
                      <Typography paddingRight={1} variant="h6">
                        <strong>{`${ex.rank}. ${ex.name}`}</strong>
                      </Typography>
                    </Stack>
                    <CardHeader
                      avatar={
                        <Avatar
                          src={ex.iconUrl || undefined}
                          alt={ex.name}
                          sx={{ width: 50, height: 50, marginRight: 0 }}
                        />
                      }
                    />
                  </Stack>

                  <CardContent>
                    <Stack
                      display={"flex"}
                      flexDirection={"row"}
                      paddingLeft={1}
                    >
                      <Stack marginRight={4}>
                        <Typography variant="body2">
                          <strong>Market Share</strong>
                        </Typography>
                        <Typography variant="body2">
                          {millify(Number(ex.marketShare))}%
                        </Typography>
                      </Stack>
                      <Stack marginRight={4}>
                        <Typography variant="body2">
                          <strong>24h Volume</strong>
                        </Typography>
                        <Typography variant="body2">
                          ${millify(Number(ex["24hVolume"]))}
                        </Typography>
                      </Stack>
                      <Stack marginRight={4}>
                        <Typography variant="body2">
                          <strong>Markets</strong>
                        </Typography>
                        <Typography variant="body2">
                          {millify(ex.numberOfMarkets)}
                        </Typography>
                      </Stack>
                    </Stack>
                  </CardContent>
                  <Typography
                    component={Link}
                    to={`/crypto/${ex.uuid}`}
                    variant="caption"
                    color="textSecondary"
                    sx={{
                      padding: 2,
                      transition: "all 0.1s ease-in-out",
                      "&:hover": {
                        color: orange[400],
                      },
                    }}
                  >
                    read more
                  </Typography>
                </Card>
              </Grid>
            ))}
        </Grid>
      )}
    </Box>
  );
};
