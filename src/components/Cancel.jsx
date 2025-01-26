import { Box, Typography, TextField, Button, Grid, Divider, Select, MenuItem, FormControlLabel, Checkbox } from '@mui/material';
import { AppEnv } from '../../config';

import Footer from "./Footer";
import { useState } from 'react';
import Snackbar from '@mui/material/Snackbar';
import Alert from '@mui/material/Alert';

const Cancel = () => {
  const [formData, setFormData] = useState({

    phone: '',
    waybill: ''


  });

  const [snackBarState, setSnackBarState] = useState(false);
  const [resultMessage, setResultMessage] = useState('');
  const handleClose = () => {
    setSnackBarState(false);
    setResultMessage('');
  };

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const createCancelOrder = async () => {
    try {


      console.log(formData, "eeeeeeeee");

      const response = await fetch(`${AppEnv.baseUrl}/order/cancel-order`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });
      const result = await response.json();
      console.log("customerData", result);

      if (result.message) {
        // alert('Order canceled successfully');
        // setInitiatePaymentData(result?.data);
        setSnackBarState(true);
        setResultMessage('Order canceled successfully');
      }
      else {
        // alert('failed to cancel Order');
        setSnackBarState(true);
        setResultMessage('Failed to cancel Order');
      }
    } catch (error) {
      console.error('Error creating customer:', error);
      // alert('Error creating customer.');
      setSnackBarState(true);
      setResultMessage('Error creating customer.');
    }
  }

  const snackBar = () => {
    return (
      <Snackbar open={snackBarState} autoHideDuration={1000} onClose={handleClose}
        anchorOrigin={{ vertical: "top", horizontal: "center" }}
        // key={vertical + horizontal}
        >
        <Alert
          onClose={handleClose}
          severity="success"
          variant="filled"
          sx={{ width: '100%' }}
        >
          {resultMessage}
        </Alert>
      </Snackbar>
    )
  }

  return (
    <>
      <div className="md:h-[80vh] flex items-center justify-center">
        <div className='w-[90%] md:w-[50%] h-[60vh] md:h-[60vh] pt-[15vh]'>

          <Typography variant="h5" textAlign='center' gutterBottom>
            Cancel Order
          </Typography>
          <Grid item xs={12} sm={6}>
            <TextField
              fullWidth
              label="Phone No"
              variant="outlined"
              name="phone"
              onChange={handleChange}
              required
            />
          </Grid>
          <Grid item xs={12} sm={6} sx={{ margin: '2vh 0' }}>
            <TextField
              fullWidth
              label="AWB"
              variant="outlined"
              onChange={handleChange}
              name="waybill"
              required
            />
          </Grid>

          <Typography variant="body1" textAlign='center' gutterBottom>
            *Note: your order can be canceled within 24 hours of placing the order.
          </Typography>
          <Box sx={{ textAlign: 'center' }}>
            <Button
              onClick={createCancelOrder}
              variant="contained"
              style={{ backgroundColor: '#056E3D' }}
              size="large"
              sx={{ mt: 3 }}
            >
              Cancel Order
            </Button>
          </Box>

        </div>
        {snackBar()}
      </div>
      <Footer width={100} />

    </>
  );
}

export default Cancel;