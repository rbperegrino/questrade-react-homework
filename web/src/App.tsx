import { useEffect, useState } from 'react';
import { Fab, InputAdornment, TextField, Typography } from '@mui/material';
import CasinoIcon from '@mui/icons-material/Casino';
import SearchIcon from '@mui/icons-material/Search';
import './App.css';
import NewLotteryModal from './components';
import LotteryList from './components/lotteryList/lotteryList';
import RegisterModal from './components/registerModal/registerModal';
function App() {
  const [openLotteryModal, setOpenLotteryModal] = useState(false);
  const [openRegisterModal, setOpenRegisterModal] = useState(false);
  const [refreshTrigger, setRefreshTrigger] = useState(0);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedLotteryKey, setSelectedLotteryKey] = useState<string | null>(
    null,
  );
  const [selectedLotteryId, setSelectedLotteryId] = useState<string | null>(null);

  const handleSelectLottery = (
    lotteryKey: string | null,
    lotteryId: string | null,
  ) => {
    setSelectedLotteryKey(lotteryKey);
    setSelectedLotteryId(lotteryId);
  };

  useEffect(() => {
    const handleDocumentClick = (event: MouseEvent) => {
      if (openRegisterModal) {
        return;
      }

      if (!(event.target instanceof Element)) {
        return;
      }

      const clickedLotteryCard = event.target.closest('[data-lottery-card="true"]');
      if (!clickedLotteryCard) {
        setSelectedLotteryKey(null);
        setSelectedLotteryId(null);
      }
    };

    document.addEventListener('click', handleDocumentClick);

    return () => {
      document.removeEventListener('click', handleDocumentClick);
    };
  }, [openRegisterModal]);

  return (
    <>
      <div className="lotteries-container">
        <Typography className="lotteries-title" variant="h2" component="h2">
          Lotteries
          <CasinoIcon sx={{ marginLeft: '10px' }} fontSize="large" />
        </Typography>
        <TextField
          id="lottery-search"
          placeholder="Search lotteries"
          value={searchTerm}
          onChange={(event) => setSearchTerm(event.target.value)}
          sx={{ width: '100%', maxWidth: 600 }}
          slotProps={{
            input: {
              endAdornment: (
                <InputAdornment position="end">
                  <SearchIcon />
                </InputAdornment>
              ),
            },
          }}
        />
        <LotteryList
          refreshTrigger={refreshTrigger}
          searchTerm={searchTerm}
          selectedLotteryKey={selectedLotteryKey}
          onSelectLottery={handleSelectLottery}
        />
      </div>

      <NewLotteryModal
        open={openLotteryModal}
        onClose={() => setOpenLotteryModal(false)}
        onLotteryCreated={() => setRefreshTrigger((current) => current + 1)}
      />
      <RegisterModal
        open={openRegisterModal}
        selectedLotteryId={selectedLotteryId}
        onClose={() => setOpenRegisterModal(false)}
      />
      <div id="button-container">
        <Fab
          id="register-button"
          color="secondary"
          variant="extended"
          disabled={!selectedLotteryId}
          onClick={() => setOpenRegisterModal(true)}
        >
          Register
        </Fab>
        <Fab
          id="add-lottery-button"
          color="primary"
          variant="extended"
          onClick={() => setOpenLotteryModal(true)}
        >
          + Add Lottery
        </Fab>
      </div>
    </>
  );
}

export default App;
