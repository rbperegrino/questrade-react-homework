import {
  Modal,
  Typography,
  TextField,
  Box,
  IconButton,
  Snackbar,
  Alert,
} from '@mui/material';
import { LoadingButton } from '@mui/lab';
import CloseIcon from '@mui/icons-material/Close';
import { useFormik } from 'formik';
import { useState } from 'react';
import { createLottery } from '../../services/lotteries';

export interface NewLotteryModalProps {
  open: boolean;
  onClose: () => void;
  onLotteryCreated: () => void;
}

const modalContentStyle = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  minHeight: 320,
  boxShadow: 24,
  bgcolor: '#fff',
  p: 4,
  borderRadius: 2,
};

export default function NewLotteryModal({
  open,
  onClose,
  onLotteryCreated,
}: NewLotteryModalProps) {
  const [isSnackbarOpen, setIsSnackbarOpen] = useState(false);

  const formik = useFormik({
    initialValues: {
      lotteryName: '',
      lotteryPrice: '',
    },
    validate: (values) => {
      const errors: {
        lotteryName?: string;
        lotteryPrice?: string;
      } = {};

      if (values.lotteryName.trim().length < 4) {
        errors.lotteryName = 'Lottery Name must be at least 4 characters.';
      }

      if (values.lotteryPrice.trim().length < 4) {
        errors.lotteryPrice = 'Lottery Price must be at least 4 characters.';
      }

      return errors;
    },
    onSubmit: async (values, { resetForm }) => {
      await createLottery({
        name: values.lotteryName.trim(),
        prize: values.lotteryPrice.trim(),
      });
      onLotteryCreated();
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
              Add a New Lottery
            </Typography>
            <TextField
              id="lottery-name"
              name="lotteryName"
              label="Lottery Name"
              variant="filled"
              value={formik.values.lotteryName}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              error={
                formik.touched.lotteryName && Boolean(formik.errors.lotteryName)
              }
              helperText={
                formik.touched.lotteryName && formik.errors.lotteryName
                  ? formik.errors.lotteryName
                  : ''
              }
              fullWidth
            />
            <TextField
              id="lottery-price"
              name="lotteryPrice"
              label="Lottery Price"
              variant="filled"
              value={formik.values.lotteryPrice}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              error={
                formik.touched.lotteryPrice && Boolean(formik.errors.lotteryPrice)
              }
              helperText={
                formik.touched.lotteryPrice && formik.errors.lotteryPrice
                  ? formik.errors.lotteryPrice
                  : ''
              }
              fullWidth
            />

            <LoadingButton
              variant="contained"
              color="primary"
              type="submit"
              loading={formik.isSubmitting}
              disabled={!formik.isValid}
              sx={{ mt: 'auto', alignSelf: 'flex-start' }}
            >
              Add Lottery
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
          New lottery added
        </Alert>
      </Snackbar>
    </>
  );
}
