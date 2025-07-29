import { Link } from "react-router";
import millify from "millify";
import { Cryptocurrencies, Loader, News, NoDataFound } from "../components";
import { useGetCryptosQuery } from "../services/cyptoApi";
import { data as coinsData } from "../services/fakeData";
import { Typography, Grid, Paper, Stack } from "@mui/material";
import { grey, orange } from "@mui/material/colors";
import type { GlobalStats, Statistics } from "../services/types";

export const Homepage = () => {
  const { data, error, isFetching } = useGetCryptosQuery(10);

  const stats =
    ((error ? coinsData.data.stats : data?.data.stats) as GlobalStats) || {};
  let statistics: Statistics[] = [];
  if (Object.keys(stats).length) {
    statistics = [
      { title: "Total Cryptocurrencies", value: millify(stats.total) },

      { title: "Total Exchanges", value: millify(stats.totalExchanges) },
      {
        title: "Total Market Cap",
        value: `$${millify(+stats.totalMarketCap)}`,
      },
      {
        title: "Total 24h Volume",
        value: `$${millify(+stats.total24hVolume)}`,
      },
      { title: "Total Markets", value: millify(stats.totalMarkets) },
    ];
  }

  return (
    <>
      <Typography
        variant="h1"
        sx={{
          fontSize: { xs: 30, sm: 40 },
          pb: { sm: 1 },
          m: { xs: 1, sm: 2 },
        }}
      >
        Global Crypto Stats
      </Typography>
      {isFetching && <Loader />}
      {statistics.length > 0 ? (
        <Grid container spacing={{ xs: 1, sm: 1 }}>
          {statistics.map((stat, idx) => (
            <Grid size={{ xs: 6, sm: 4, md: 4, lg: 3, xl: 2 }} key={idx}>
              <Paper
                elevation={2}
                sx={{
                  margin: { xs: 0, sm: 1 },
                  padding: 2,
                  backgroundColor: grey[100],
                  transition: "all 0.3s ease-in-out",
                  "&:hover": {
                    backgroundColor: orange[100],
                    transform: "translateY(-1px)",
                  },
                }}
              >
                <Typography variant="subtitle2" color="textSecondary">
                  {stat.title}
                </Typography>
                <Typography variant="h5" fontWeight={600}>
                  {stat.value}
                </Typography>
              </Paper>
            </Grid>
          ))}
        </Grid>
      ) : (
        <NoDataFound message="No Crypto Statistics found." />
      )}

      <Stack
        sx={{
          flexDirection: { xs: "column", sm: "row" },
          alignItems: { xs: "flex-start", sm: "center" },
          paddingX: { xs: 1, sm: 2 },
          justifyContent: "space-between",
        }}
      >
        <Typography
          sx={{ fontSize: { xs: 30, sm: 40 }, paddingTop: { xs: 3 } }}
          variant="h1"
        >
          Top 10 Cryptos In The World
        </Typography>
        <Typography
          component={Link}
          to={"/cryptocurrencies"}
          variant="subtitle2"
          color="textSecondary"
          sx={{
            paddingX: { xs: 1 },
            transition: "all 0.1s ease-in-out",
            "&:hover": {
              color: orange[400],
            },
          }}
        >
          Show more
        </Typography>
      </Stack>
      {isFetching ? (
        <Loader />
      ) : data || coinsData ? (
        <Cryptocurrencies
          simplified
          data={data}
          error={error}
          isFetching={isFetching}
        />
      ) : (
        <NoDataFound message="No Crypto Currencies found." />
      )}

      <Stack
        sx={{
          flexDirection: { xs: "column", sm: "row" },
          alignItems: { xs: "flex-start", sm: "center" },
          paddingX: { xs: 1, sm: 2 },
          justifyContent: "space-between",
        }}
      >
        <Typography
          sx={{ fontSize: { xs: 30, sm: 40 }, paddingTop: { xs: 3 } }}
          variant="h1"
        >
          Latest Crypto News
        </Typography>
        <Typography
          component={Link}
          to={"/news"}
          variant="subtitle2"
          color="textSecondary"
          sx={{
            paddingX: { xs: 1 },
            transition: "all 0.1s ease-in-out",
            "&:hover": {
              color: orange[400],
            },
          }}
        >
          Show more
        </Typography>
      </Stack>
      {isFetching ? (
        <Loader />
      ) : data || coinsData ? (
        <News simplified data={data} error={error} isFetching={isFetching} />
      ) : (
        <NoDataFound message="No Crypto Currencies found." />
      )}
    </>
  );
};
