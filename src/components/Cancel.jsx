import { Box, Typography, TextField, Button, Grid, Divider, Select, MenuItem, FormControlLabel, Checkbox, CircularProgress } from '@mui/material';
import { AppEnv } from '../../config';

import Footer from "./Footer";
import { useEffect, useState } from 'react';
import Snackbar from '@mui/material/Snackbar';
import Alert from '@mui/material/Alert';

const Cancel = () => {
  const [formData, setFormData] = useState({

    phone: '',
    waybill: ''


  });

  const [snackBarState, setSnackBarState] = useState(false);
  const [resultMessage, setResultMessage] = useState('');
  const [loading, setLoading] = useState(false);
  const [alertType, setAlertType] = useState()
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

  useEffect(() => {
    
    window.scrollTo(0, 0); 
  },[])
  const createCancelOrder = async () => {
    if(!formData.phone || !formData.waybill){

    setSnackBarState(true);
    setAlertType('error')
    setResultMessage('Oops! Some fields are missing. Fill them out to continue.');
    return
    }
    try {



      setLoading(true)
      const response = await fetch(`${AppEnv.baseUrl}/order/cancel-order`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });
      const result = await response.json();

      if (result.success) {
        // alert('Order canceled successfully');
        // setInitiatePaymentData(result?.data);
      setLoading(false)
        setSnackBarState(true);
        setAlertType('success')
        setResultMessage('Order canceled successfully');
      }
      else {
        // alert('failed to cancel Order');
        setSnackBarState(true);
        setAlertType('error')
        setLoading(false)
        setResultMessage('Failed to cancel order, Please try again or contact support.');
      }
    } catch (error) {
      console.error('Error creating customer:', error);
      // alert('Error creating customer.');
      setLoading(false)
      setSnackBarState(true);
      setAlertType('error')
      setResultMessage('Error cancel Order, Please try again or contact support.');
    }
  }

  const snackBar = () => {
    return (
      <Snackbar open={snackBarState} autoHideDuration={3000} onClose={handleClose}
        anchorOrigin={{ vertical: "top", horizontal: "center" }}
        // key={vertical + horizontal}
        >
        <Alert
          onClose={handleClose}
          severity= {alertType}
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
            Note: You can cancel your order on the same day of purchase.
          </Typography>
          <Box sx={{ textAlign: 'center' }}>
            <Button
              onClick={createCancelOrder}
              variant="contained"
              style={{ backgroundColor: '#056E3D' }}
              size="large"
              sx={{ mt: 3 }}
              disabled={loading ? true : false}
            >
              
            {loading ? <CircularProgress size={24} color={"#fff"} /> : "Cancel Order"}
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