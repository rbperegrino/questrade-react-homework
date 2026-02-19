import {
  Alert,
  Box,
  IconButton,
  Modal,
  Snackbar,
  TextField,
  Typography,
} from '@mui/material';
import { LoadingButton } from '@mui/lab';
import CloseIcon from '@mui/icons-material/Close';
import { useFormik } from 'formik';
import { useState } from 'react';
import { registerLottery } from '../../services/lotteries';

export interface RegisterModalProps {
  open: boolean;
  selectedLotteryId: string | null;
  onClose: () => void;
}

const modalContentStyle = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  minHeight: 260,
  boxShadow: 24,
  bgcolor: '#fff',
  p: 4,
  borderRadius: 2,
};

export default function RegisterModal({
  open,
  selectedLotteryId,
  onClose,
}: RegisterModalProps) {
  const [isSnackbarOpen, setIsSnackbarOpen] = useState(false);

  const formik = useFormik({
    initialValues: {
      name: '',
    },
    validate: (values) => {
      const errors: {
        name?: string;
      } = {};

      if (values.name.trim().length < 3) {
        errors.name = 'Name must be at least 3 characters.';
      }

      return errors;
    },
    onSubmit: async (values, { resetForm }) => {
      if (!selectedLotteryId) {
        return;
      }

      await registerLottery({
        lotteryId: selectedLotteryId,
        name: values.name.trim(),
      });

      resetForm();
      setIsSnackbarOpen(true);
      onClose();
    },
    validateOnMount: true,
  });

  return (
    <>
      <Modal open={open} onClose={onClose}>
        <Box sx={modalContentStyle}>
          <IconButton
            aria-label="close"
            onClick={onClose}
            sx={{ position: 'absolute', top: 12, right: 12 }}
          >
            <CloseIcon />
          </IconButton>
          <form
            onSubmit={formik.handleSubmit}
            style={{
              display: 'flex',
              flexDirection: 'column',
              gap: '16px',
              height: '100%',
            }}
          >
            <Typography variant="h6" component="h2">
              Register to Lottery
            </Typography>
            <TextField
              id="participant-name"
              name="name"
              label="Name"
              variant="filled"
              value={formik.values.name}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              error={formik.touched.name && Boolean(formik.errors.name)}
              helperText={
                formik.touched.name && formik.errors.name
                  ? formik.errors.name
                  : ''
              }
              fullWidth
            />
            <LoadingButton
              variant="contained"
              color="secondary"
              type="submit"
              loading={formik.isSubmitting}
              disabled={!selectedLotteryId || !formik.isValid}
              sx={{ mt: 'auto', alignSelf: 'flex-start' }}
            >
              REGISTER
            </LoadingButton>
          </form>
        </Box>
      </Modal>
      <Snackbar
        open={isSnackbarOpen}
        autoHideDuration={3000}
        onClose={() => setIsSnackbarOpen(false)}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'left' }}
      >
        <Alert
          severity="success"
          variant="filled"
          onClose={() => setIsSnackbarOpen(false)}
        >
          Registered to lottery
        </Alert>
      </Snackbar>
    </>
  );
}
