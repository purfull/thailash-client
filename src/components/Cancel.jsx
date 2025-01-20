import { Box, Typography, TextField, Button, Grid, Divider, Select, MenuItem, FormControlLabel, Checkbox } from '@mui/material';
import { AppEnv } from '../../config';

import Footer from "./Footer";
import { useState } from 'react';

const Cancel = () => {
  const [formData, setFormData] = useState({
      
      phone: '',
      waybill: ''
  
      
    });
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
        if (result.success) {
          alert('Order canceled successfully');
          // setInitiatePaymentData(result?.data);
        }
        else {
          alert('failed to cancel Order')
        }
      } catch (error) {
        console.error('Error creating customer:', error);
        alert('Error creating customer.');
      }
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
                        <Grid item xs={12} sm={6} sx={{margin: '2vh 0'}}>
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
                
            </div>
            <Footer width={100} />

        </>
     );
}
 
export default Cancel;