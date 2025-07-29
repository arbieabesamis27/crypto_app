import { useState } from "react";
import moment from "moment";
import { Loader, NoDataFound } from "../components";
import { useGetCryptoNewsQuery } from "../services/cryptoNewsApi";
import { useGetCryptosQuery } from "../services/cyptoApi";
import { newsData, data as fakeData } from "../services/fakeData";
import type { CoinProps } from "../services/types";
import {
  Avatar,
  Card,
  CardContent,
  CardMedia,
  FormControl,
  Grid,
  InputLabel,
  MenuItem,
  Select,
  Stack,
  Typography,
} from "@mui/material";

const demoImage =
  "https://www.techfunnel.com/wp-content/uploads/2021/10/cryptocurrency_trends.png";

export const News = ({
  simplified,
  data,
  error,
  isFetching: coinFetching,
}: CoinProps) => {
  const query = simplified
    ? { data, error, coinFetching }
    : useGetCryptosQuery(100);
  const [newsCategory, setNewsCategory] = useState("Cryptocurrency");
  const {
    data: cryptoNews,
    error: errorNews,
    isFetching,
  } = useGetCryptoNewsQuery(newsCategory);

  const newsList = errorNews ? newsData.items : cryptoNews?.items;
  const dataNewsList = simplified ? newsList?.slice(0, 6) : newsList;

  const coinList = query.error
    ? fakeData?.data?.coins
    : query.data?.data?.coins;

  return (
    <Stack sx={{ padding: { xs: 1, sm: 2, md: 3 } }}>
      <Stack sx={{ maxWidth: 500 }}>
        {!simplified && (
          <FormControl variant="standard" size="small" sx={{ mb: 3 }}>
            <InputLabel id="crypto-select-label">Select a Crypto</InputLabel>
            <Select
              labelId="crypto-select-label"
              value={newsCategory}
              label="Select a Crypto"
              onChange={(e) => setNewsCategory(e.target.value)}
            >
              <MenuItem value="Cryptocurrency">Cryptocurrency</MenuItem>
              {coinList?.map((currency) => (
                <MenuItem key={currency.name} value={currency.name}>
                  {currency.name}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        )}
      </Stack>

      {isFetching ? (
        <Loader />
      ) : dataNewsList && dataNewsList.length > 0 ? (
        <Grid container spacing={3}>
          {dataNewsList?.map((news, i) => (
            <Grid
              sx={{ padding: { xl: 1 } }}
              size={{ xs: 12, sm: 6, md: 6, lg: 4 }}
              key={i}
            >
              <Card
                component="a"
                href={news.newsUrl}
                target="_blank"
                rel="noreferrer"
                sx={{
                  padding: { xs: 1, xl: 2 },
                  display: "flex",
                  flexDirection: "column",
                }}
              >
                <CardMedia
                  component="img"
                  height="140"
                  image={demoImage}
                  alt={news.title}
                />
                <CardContent sx={{ flexGrow: 1 }}>
                  <Typography variant="h6" gutterBottom>
                    {news.title.length > 80
                      ? news.title.substring(0, 80) + "..."
                      : news.title}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    {news.snippet.length > 100
                      ? news.snippet.substring(0, 100) + "..."
                      : news.snippet}
                  </Typography>

                  <Grid
                    container
                    justifyContent="space-between"
                    alignItems="center"
                    mt={2}
                  >
                    <Grid
                      size={{ xs: 12, sm: 8, md: 6, lg: 4, xl: 2 }}
                      display="flex"
                      alignItems="center"
                      gap={1}
                    >
                      <Avatar
                        src={news.images?.thumbnailProxied || demoImage}
                        sx={{ width: 24, height: 24 }}
                      />
                      <Typography variant="caption">
                        {news.publisher}
                      </Typography>
                    </Grid>
                    <Grid>
                      <Typography variant="caption" color="text.secondary">
                        {moment(Number(news.timestamp)).fromNow()}
                      </Typography>
                    </Grid>
                  </Grid>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      ) : (
        <NoDataFound />
      )}
    </Stack>
  );
};
