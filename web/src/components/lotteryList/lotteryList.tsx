import { useEffect, useMemo, useState } from 'react';
import { Box, Typography } from '@mui/material';
import SentimentDissatisfiedIcon from '@mui/icons-material/SentimentDissatisfied';
import LotteryCard from '../lotteryCard/lotteryCard';
import { getLotteries, type LotteryResponse } from '../../services/lotteries';

interface LotteryListProps {
  refreshTrigger: number;
  searchTerm: string;
  selectedLotteryKey: string | null;
  onSelectLottery: (
    lotteryKey: string | null,
    lotteryId: string | null,
  ) => void;
}

export default function LotteryList({
  refreshTrigger,
  searchTerm,
  selectedLotteryKey,
  onSelectLottery,
}: LotteryListProps) {
  const [lotteries, setLotteries] = useState<LotteryResponse[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [errorMessage, setErrorMessage] = useState('');
  const normalizedSearchTerm = searchTerm.trim().toLowerCase();
  const filteredLotteries = useMemo(
    () =>
      lotteries
        .map((lottery, index) => ({
          lottery,
          lotterySelectionKey: `${lottery.id}-${index}`,
        }))
        .filter(({ lottery }) => {
          if (!normalizedSearchTerm) {
            return true;
          }
          return lottery.name.toLowerCase().includes(normalizedSearchTerm);
        }),
    [lotteries, normalizedSearchTerm],
  );

  useEffect(() => {
    const fetchLotteries = async () => {
      setIsLoading(true);
      setErrorMessage('');

      try {
        const data = await getLotteries();
        setLotteries(data);
      } catch (error) {
        if (error instanceof Error) {
          setErrorMessage(error.message);
        } else {
          setErrorMessage('Failed to fetch lotteries');
        }
      } finally {
        setIsLoading(false);
      }
    };

    fetchLotteries();
  }, [refreshTrigger]);

  useEffect(() => {
    if (!selectedLotteryKey) {
      return;
    }

    const selectedLottery = filteredLotteries.find(
      ({ lotterySelectionKey }) => lotterySelectionKey === selectedLotteryKey,
    );

    if (!selectedLottery || selectedLottery.lottery.status === 'finished') {
      onSelectLottery(null, null);
    }
  }, [filteredLotteries, onSelectLottery, selectedLotteryKey]);

  if (isLoading) {
    return <Typography>Loading lotteries...</Typography>;
  }

  if (errorMessage) {
    return <Typography color="error">{errorMessage}</Typography>;
  }

  if (lotteries.length === 0) {
    return (
      <Typography
        sx={{
          width: '100%',
          display: 'flex',
          flexDirection: 'column',
          justifyItems: 'center',
          alignItems: 'center',
          gap: 2,
          marginTop: '20px',
        }}
      >
        <SentimentDissatisfiedIcon sx={{ verticalAlign: 'middle', mr: 0.5 }} />
        There are no lotteries yet.
      </Typography>
    );
  }

  if (normalizedSearchTerm && filteredLotteries.length === 0) {
    return <Typography>No search results found.</Typography>;
  }

  return (
    <Box
      sx={{
        display: 'grid',
        gridTemplateColumns: {
          xs: '1fr',
          sm: 'repeat(2, minmax(0, 1fr))',
          md: 'repeat(3, minmax(0, 1fr))',
        },
        gap: 2,
      }}
    >
      {filteredLotteries.map(({ lottery, lotterySelectionKey }) => {
        const isFinished = lottery.status === 'finished';

        return (
          <LotteryCard
            key={lotterySelectionKey}
            name={lottery.name}
            prize={lottery.prize}
            identifier={String(lottery.id)}
            isSelected={
              !isFinished && selectedLotteryKey === lotterySelectionKey
            }
            isDisabled={isFinished}
            onSelect={() =>
              onSelectLottery(lotterySelectionKey, String(lottery.id))
            }
          />
        );
      })}
    </Box>
  );
}
