import React from "react";
import { Line } from "react-chartjs-2";
import { Box, Typography, Grid } from "@mui/material";
import type { CoinHistory } from "../services/types";
import {
  Chart as ChartJS,
  LineElement,
  PointElement,
  LinearScale,
  CategoryScale,
} from "chart.js";

ChartJS.register(LineElement, PointElement, LinearScale, CategoryScale);

interface LineChartProps {
  coinHistory?: CoinHistory;
  currentPrice: string;
  coinName: string;
}

export const LineChart: React.FC<LineChartProps> = ({
  coinHistory,
  currentPrice,
  coinName,
}) => {
  const coinPrice: number[] = [];
  const coinTimestamp: string[] = [];

  coinHistory?.data?.history
    ?.slice()
    .reverse()
    .forEach((entry) => {
      if (entry?.price && entry?.timestamp) {
        coinPrice.push(Number(entry.price));
        coinTimestamp.push(
          new Date(entry.timestamp * 1000).toLocaleDateString(undefined, {
            month: "short",
            day: "numeric",
            year: "2-digit",
          })
        );
      }
    });

  const data = {
    labels: coinTimestamp,
    datasets: [
      {
        label: "Price in USD",
        data: coinPrice,
        fill: false,
        backgroundColor: "#0071bd",
        borderColor: "#0071bd",
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      legend: {
        display: true,
      },
    },
    scales: {
      y: {
        beginAtZero: false,
      },
    },
  };

  return (
    <Box sx={{ mt: 4 }}>
      <Grid container justifyContent="space-between" alignItems="center" mb={2}>
        <Typography variant="h5" fontWeight="bold">
          {coinName} Price Chart
        </Typography>
        <Box>
          <Typography variant="subtitle1" color="text.secondary">
            Change: {coinHistory?.data?.change}%
          </Typography>
          <Typography variant="subtitle1" color="text.secondary">
            Current {coinName} Price: $ {currentPrice}
          </Typography>
        </Box>
      </Grid>
      <Line key={coinName + currentPrice} data={data} options={options} />
    </Box>
  );
};
