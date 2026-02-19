import RefreshIcon from '@mui/icons-material/Refresh';
import { IconButton, Typography } from '@mui/material';

export default function LotteryCard({
  name,
  prize,
  identifier,
  isSelected,
  isDisabled,
  onSelect,
}: {
  name: string;
  prize: string;
  identifier: string;
  isSelected: boolean;
  isDisabled: boolean;
  onSelect: () => void;
}) {
  return (
    <div
      data-lottery-card="true"
      role="button"
      tabIndex={isDisabled ? -1 : 0}
      aria-pressed={isSelected}
      aria-disabled={isDisabled}
      onClick={() => {
        if (!isDisabled) {
          onSelect();
        }
      }}
      onKeyDown={(event) => {
        if (isDisabled) {
          return;
        }

        if (event.key === 'Enter' || event.key === ' ') {
          event.preventDefault();
          onSelect();
        }
      }}
      style={{
        border: '2px solid',
        borderColor: isSelected ? '#1976d2' : '#d0d7de',
        padding: '10px',
        paddingTop: '16px',
        paddingRight: '42px',
        display: 'flex',
        flexDirection: 'column',
        gap: '10px',
        cursor: isDisabled ? 'not-allowed' : 'pointer',
        borderRadius: '8px',
        backgroundColor: 'transparent',
        color: 'inherit',
        opacity: isDisabled ? 0.8 : 1,
        position: 'relative',
      }}
    >
      <IconButton
        aria-label="reload lottery"
        size="small"
        onClick={(event) => event.stopPropagation()}
        style={{
          position: 'absolute',
          top: '4px',
          right: '4px',
        }}
      >
        <RefreshIcon fontSize="small" />
      </IconButton>
      <Typography variant="h6" component="h2">
        {name}
      </Typography>
      <p>{prize}</p>
      <p>{identifier}</p>
    </div>
  );
}
