import { useState } from "react";
import millify from "millify";
import HTMLReactParser from "html-react-parser";
import { skipToken } from "@reduxjs/toolkit/query";
import { Link, useParams } from "react-router";
import { CryptoDetailsLoader, LineChart, NoDataFound } from "../components";
import {
  useGetCryptoDetailsQuery,
  useGetCryptoHistoryQuery,
} from "../services/cyptoApi";
import { coinHistory, cryptoDetails } from "../services/fakeData";
import type { Coin } from "../services/types";
import {
  Box,
  Grid,
  Typography,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
} from "@mui/material";
import {
  PaymentsOutlined,
  PaidOutlined,
  ShowChartOutlined,
  ErrorOutline,
  DoNotDisturbOffOutlined,
  EmojiEventsOutlined,
  CheckOutlined,
  NumbersOutlined,
  BoltOutlined,
} from "@mui/icons-material";

import { orange } from "@mui/material/colors";

export const CryptoDetails = () => {
  const { coinId } = useParams();
  const [timeperiod, setTimeperiod] = useState("7d");
  const { data, error, isFetching } = useGetCryptoDetailsQuery(coinId);
  const { data: cryptoHistory, error: errorHistory } = useGetCryptoHistoryQuery(
    coinId && timeperiod ? { coinId, timeperiod } : skipToken
  );

  const coinDetails: Coin =
    (error ? cryptoDetails?.data?.coin : data?.data?.coin) || ({} as Coin);

  const history = errorHistory ? coinHistory : cryptoHistory;

  if (isFetching) return <CryptoDetailsLoader />;
  if (!coinDetails) return <NoDataFound />;

  const time = ["3h", "24h", "7d", "30d", "1y", "3m", "3y", "5y"];

  const stats = [
    {
      title: "Price to USD",
      value: `$ ${coinDetails?.price && millify(+coinDetails?.price)}`,
      icon: <PaidOutlined />,
    },
    { title: "Rank", value: coinDetails?.rank, icon: <NumbersOutlined /> },
    {
      title: "24h Volume",
      value: `$ ${coinDetails?.volume && millify(+coinDetails?.volume)}`,
      icon: <BoltOutlined />,
    },
    {
      title: "Market Cap",
      value: `$ ${coinDetails?.marketCap && millify(+coinDetails?.marketCap)}`,
      icon: <PaidOutlined />,
    },
    {
      title: "All-time-high(daily avg.)",
      value: `$ ${
        coinDetails?.allTimeHigh?.price &&
        millify(+coinDetails?.allTimeHigh?.price)
      }`,
      icon: <EmojiEventsOutlined />,
    },
  ];

  const genericStats = [
    {
      title: "Number Of Markets",
      value: coinDetails?.numberOfMarkets,
      icon: <ShowChartOutlined />,
    },
    {
      title: "Number Of Exchanges",
      value: coinDetails?.numberOfExchanges,
      icon: <PaymentsOutlined />,
    },
    {
      title: "Approved Supply",
      value: coinDetails?.supply?.confirmed ? (
        <CheckOutlined />
      ) : (
        <DoNotDisturbOffOutlined />
      ),
      icon: <ErrorOutline />,
    },
    {
      title: "Total Supply",
      value: `$ ${
        coinDetails?.supply?.total && millify(+coinDetails?.supply?.total)
      }`,
      icon: <ErrorOutline />,
    },
    {
      title: "Circulating Supply",
      value: `$ ${
        coinDetails?.supply?.circulating &&
        millify(+coinDetails?.supply?.circulating)
      }`,
      icon: <ErrorOutline />,
    },
  ];

  return (
    <Box p={3}>
      <Box mb={3}>
        <Typography variant="h4" gutterBottom>
          {coinDetails?.name} ({coinDetails?.symbol}) Price
        </Typography>
        <Typography>
          {coinDetails?.name} live price in US Dollar (USD). View value
          statistics, market cap and supply.
        </Typography>
      </Box>

      <FormControl sx={{ minWidth: 120 }}>
        <InputLabel id="time-period-label">Time Period</InputLabel>
        <Select
          labelId="time-period-label"
          value={timeperiod}
          label="Time Period"
          onChange={(e) => setTimeperiod(e.target.value)}
        >
          {time.map((date) => (
            <MenuItem key={date} value={date}>
              {date}
            </MenuItem>
          ))}
        </Select>
      </FormControl>

      <LineChart
        coinHistory={history}
        currentPrice={millify(+coinDetails?.price)}
        coinName={coinDetails?.name}
      />

      <Grid container spacing={6} mt={4}>
        <Grid size={{ xs: 12, lg: 6 }}>
          <Typography variant="h5" gutterBottom>
            {coinDetails?.name} Value Statistics
          </Typography>
          <Typography variant="body2" mb={2}>
            An overview showing the statistics of {coinDetails?.name}, such as
            the base and quote currency, the rank, and trading volume.
          </Typography>
          {stats.map(({ icon, title, value }) => (
            <Box
              display="flex"
              justifyContent="space-between"
              alignItems="center"
              py={1}
              key={title}
            >
              <Box display="flex" alignItems="center" gap={1}>
                {icon}
                <Typography>{title}</Typography>
              </Box>
              <Typography>{value}</Typography>
            </Box>
          ))}
        </Grid>

        <Grid size={{ xs: 12, lg: 6 }}>
          <Typography variant="h5" gutterBottom>
            Other Stats Info
          </Typography>
          <Typography variant="body2" mb={2}>
            An overview showing the statistics of {coinDetails?.name}, such as
            the base and quote currency, the rank, and trading volume.
          </Typography>
          {genericStats.map(({ icon, title, value }) => (
            <Box
              display="flex"
              justifyContent="space-between"
              alignItems="center"
              py={1}
              key={title}
            >
              <Box display="flex" alignItems="center" gap={1}>
                {icon}
                <Typography>{title}</Typography>
              </Box>
              <Typography>{value}</Typography>
            </Box>
          ))}
        </Grid>
      </Grid>

      <Grid container spacing={6} mt={4}>
        <Grid size={{ xs: 12, lg: 6 }}>
          <Box mt={4}>
            <Typography variant="h5" gutterBottom>
              What is {coinDetails?.name}?
            </Typography>
            <Box>{HTMLReactParser(coinDetails?.description)}</Box>
          </Box>
        </Grid>
        <Grid size={{ xs: 12, lg: 6 }}>
          <Box mt={4}>
            <Typography variant="h5" gutterBottom>
              {coinDetails?.name} Links
            </Typography>
            <Box>
              {coinDetails?.links?.map((link) => (
                <Box
                  key={link.url}
                  display="flex"
                  justifyContent="space-between"
                  alignItems={"center"}
                  padding={2}
                >
                  <Typography variant="subtitle1">{link.type}</Typography>
                  <Typography
                    component={Link}
                    to={link.url}
                    variant="subtitle1"
                    color="textSecondary"
                    target="_blank"
                    sx={{
                      padding: 2,
                      color: orange[400],
                      transition: "all 0.1s ease-in-out",
                      "&:hover": {
                        color: orange[800],
                      },
                    }}
                  >
                    {link.name}
                  </Typography>
                </Box>
              ))}
            </Box>
          </Box>
        </Grid>
      </Grid>
    </Box>
  );
};
