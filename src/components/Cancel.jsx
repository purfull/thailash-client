import { Box, Typography, TextField, Button, Grid, Divider, Select, MenuItem, FormControlLabel, Checkbox } from '@mui/material';

import Footer from "./Footer";

const Cancel = () => {
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
                            label="Email"
                            variant="outlined"
                            name="email"
                            required
                            />
                        </Grid>
                        <Grid item xs={12} sm={6} sx={{margin: '2vh 0'}}>
                            <TextField
                            fullWidth
                            label="Order Id"
                            variant="outlined"
                            name="orderId"
                            required
                            />
                        </Grid>
                        
      <Typography variant="body1" textAlign='center' gutterBottom>
        *Note: your order can be canceled within 24 hours of placing the order.
      </Typography>
      <Box sx={{ textAlign: 'center' }}>
        <Button
        //   onClick={handlePlaceOrder}
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