import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import millify from "millify";
import { debounce } from "lodash";
import { Loader } from "../components";
import { useGetCryptosQuery } from "../services/cyptoApi";
import { data as coinsData } from "../services/fakeData";
import type { CoinProps, Coins } from "../services/types";
import {
  Avatar,
  Card,
  CardContent,
  CardHeader,
  Grid,
  Input,
  Stack,
  Typography,
} from "@mui/material";
import { orange } from "@mui/material/colors";

export const Cryptocurrencies = ({
  simplified,
  data,
  error,
  isFetching,
}: CoinProps) => {
  const query = simplified
    ? { data, error, isFetching }
    : useGetCryptosQuery(100);

  const source = query.error ? coinsData?.data?.coins : query.data?.data?.coins;
  const finalSource = simplified ? source?.slice(0, 10) : source;

  const [cryptos, setCryptos] = useState<Coins[] | undefined>([]);
  const [searchTerm, setSearchTerm] = useState("");

  const handleSearch = debounce((value: string) => {
    setSearchTerm(value.toLowerCase());
  }, 300);

  useEffect(() => {
    if (!source) {
      setCryptos([]);
      return;
    }
    const filtered = finalSource?.filter((coin) =>
      coin.name.toLowerCase().includes(searchTerm)
    );
    setCryptos(filtered);
  }, [source, searchTerm]);
  return (
    <>
      {!simplified && (
        <Stack sx={{ padding: 2, maxWidth: 500 }}>
          <Input
            placeholder="Search Cryptocurrency"
            onChange={(e) => handleSearch(e.target.value)}
          />
        </Stack>
      )}
      {query.isFetching ? (
        <Loader />
      ) : cryptos && cryptos.length > 0 ? (
        <Grid padding={3} container spacing={3}>
          {cryptos?.map((currency) => (
            <Grid
              size={{ xs: 12, sm: 6, md: 6, lg: 4, xl: 3 }}
              key={currency.uuid}
            >
              <Link to={`/crypto/${currency.uuid}`}>
                <Card
                  sx={{
                    height: "100%",
                    transition: "all 0.3s ease-in-out",
                    "&:hover": {
                      boxShadow: 3,
                      transform: "translateY(-1px)",
                      backgroundColor: orange[50],
                    },
                  }}
                >
                  <CardHeader
                    avatar={
                      <Avatar
                        src={currency.iconUrl}
                        alt={currency.name}
                        sx={{ width: 32, height: 32 }}
                      />
                    }
                    title={
                      <Typography variant="h6" fontWeight={600}>
                        {`${currency.rank}. ${currency.name}`}
                      </Typography>
                    }
                  />
                  <CardContent>
                    <Typography variant="body2">
                      <strong>Price: </strong> {millify(Number(currency.price))}
                    </Typography>
                    <Typography variant="body2">
                      <strong>Market Cap:</strong>{" "}
                      {millify(Number(currency.marketCap))}
                    </Typography>
                    <Typography variant="body2">
                      <strong>Daily Change: </strong> {currency.change}%
                    </Typography>
                  </CardContent>
                </Card>
              </Link>
            </Grid>
          ))}
        </Grid>
      ) : (
        <Loader />
      )}
    </>
  );
};
