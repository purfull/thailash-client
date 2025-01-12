import { Box, Typography, TextField, Button, Grid, Divider, Select, MenuItem, FormControlLabel, Checkbox } from '@mui/material';
import { useEffect, useState } from 'react';
import { CheckCircle, Cancel } from '@mui/icons-material';
import Footer from './Footer';
import { load } from '@cashfreepayments/cashfree-js';
import "./Checkout";
import { AppEnv } from '../../config';

const Checkout = () => {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    address: '',
    city: '',
    postalCode: '',
    phone: '',
    email: '',
    cardNumber: '',
    expiryDate: '',
    cvv: '',
    productVariant: '',
    quantity: '',
    gstNumber: '',  // Ensure GST number is included
  });

  const [isGstChecked, setIsGstChecked] = useState(false);
  const [isTermsChecked, setIsTermsChecked] = useState(false);
  const [pincode, setPinCode] = useState('');
  const [serviceable, setServiceable] = useState();
  const [productData, setProductData] = useState(null);
  const [singleProductData, setSingleProductData] = useState(null);
  const [stateData, setStateData] = useState(null);
  const [initiatePaymentData, setInitiatePaymentData] = useState(null);
  const data = [
    { id: 1, name: '200ml mini bottle', actualPrice: 400, offerPrice: 200 },
    { id: 2, name: '500ml Regular bottle', actualPrice: 1000, offerPrice: 500 },
    { id: 3, name: '1000ml mini bottle', actualPrice: 2000, offerPrice: 1000 },
  ];

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    console.log("name", name, "value", value);

    if (name == "productVariant") {
      let findProductData = productData?.find(x => x.name == value);
      console.log("findProductData", findProductData)
      setSingleProductData(findProductData);
    }
    // Update the state for the corresponding field
    setFormData((prev) => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value,
    }));

    // If the checkbox for GST is toggled, update the isGstChecked state
    if (name === 'isGstChecked') {
      setIsGstChecked(checked);
    }
    if (name === 'isTermsChecked') {
      setIsTermsChecked(checked);
    }

    if (name === 'postalCode') {
      setPinCode(value);
    }
  };

  const handlePlaceOrder = () => {
    console.log('Order Details:', formData);
    // Add logic to process the order
    // Navigate to the order success page
  };

  useEffect(() => {
    const abortController = new AbortController();
    if (pincode.length === 6) {
      fetch(`${AppEnv.baseUrl}/customer/check-serviceable/${pincode}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': 'Token 1493cc881fb601a6cfcb591ec7a4fbdaaab8d8be'
        },
        signal: abortController.signal,
      })
        .then(result => {
          if (!result.ok) {
            throw new Error(`HTTP error! status: ${result.status}`);
          }
          return result.json();
        })
        .then(data => {
          if (!abortController.signal.aborted) {
            console.log('Response data:', data);
            setServiceable(data.success)
          }
        })
        .catch(err => {
          console.error('Fetch error:', err);
          setServiceable(false)
        });

    }

    // Cleanup function: Abort only when component unmounts or dependencies change
    return () => {
      if (abortController) {
        abortController.abort(); // Safely abort fetch on unmount or editingRow change
      }
    };
  }, [pincode]);

  const createCustomer = async () => {
    try {
      let customerData = {
        first_name: formData?.firstName,
        last_name: formData?.lastName,
        address: formData?.address,
        city: formData?.city,
        state: formData?.state,
        postal_code: formData?.postalCode,
        country: "IND",
        phone: formData?.phone,
        email: formData?.email,
        gst: formData?.gstNumber ? formData?.gstNumber : ""
      }

      const response = await fetch(`${AppEnv.baseUrl}/customer/create-customer`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(customerData),
      });
      const result = await response.json();
      console.log("customerData", result);
      if (result?.data?.id) {
        await initiatePayment(result?.data)
        // setInitiatePaymentData(result?.data);
      }
      else {
        alert('Unable to create order')
      }
    } catch (error) {
      console.error('Error creating customer:', error);
      alert('Error creating customer.');
    }
  }


  const initiatePayment = async (customerData) => {
    try {
      // await createCustomer()
      // const orderId = `ORDER_${Date.now()}`;

      const random4DigitNumber = (Math.floor(1000 + Math.random() * 9000)).toString().padStart(4, '0');
      const today = new Date();
      const formattedDate = today.toLocaleDateString('en-CA').replace(/-/g, '');
      // console.log(formattedDate);
      console.log("random4DigitNumber", random4DigitNumber, formattedDate);

      const orderId = `CUST_ORDER_${formattedDate}${random4DigitNumber}`
      const isUnion = stateData?.find((item) => item?.name == formData?.state);
      console.log(isUnion, "isUnion")
      const paymentData = {
        orderAmount: formData?.quantity * singleProductData?.offer_price + 50,
        customerEmail: formData?.email,
        customerPhone: formData?.phone,
        customerId: customerData?.id.toString()
      }
      const orderData = {
        // orderId,
        // orderAmount: formData?.quantity * singleProductData?.offer_price + 50,
        // customerEmail: formData?.email,
        // customerPhone: formData?.phone,
        // customerId: 'CUSTOMER_ID_123'
        shipments: {
          add: formData?.address,
          address_type: "home",
          phone: customerData?.phone,
          name: formData?.firstName + " " + formData?.lastName,
          pin: formData?.postalCode,
          order: orderId,
          payment_mode: "Pre-paid",//Pre-paid or COD
          country: "India",
          shipping_mode: "Surface",
          // invoiceNumber: `${formattedDate}${random4DigitNumber}`,
          // quantity: formData?.quantity,
          // sku: singleProductData?.sku,
          city: formData?.city,
          state: customerData?.state,
          // customerId: customerData?.id.toString(),
          // invoiceAmount: formData?.quantity * singleProductData?.offer_price + 50,//total amount
          // taxExclusiveGross: 130.00,
          // totalTaxAmount: 20.75,
          // buyerName: "John Doe",
          // orderAmount: formData?.quantity * singleProductData?.offer_price + 50,
          // total_product_cost: formData?.quantity * singleProductData?.offer_price,
          // total_shipment_cost: 50
          cod_amount: formData?.quantity * singleProductData?.offer_price + 50,

        },
        orderDetial: {
          state: customerData?.state,
          isUnion: false,
          quantity: formData?.quantity,
          invoiceNumber: `${formattedDate}${random4DigitNumber}`,
          invoiceAmount: formData?.quantity * singleProductData?.offer_price + 50,
          buyerName: customerData?.first_name + " " + customerData?.last_name,
          total_product_cost: formData?.quantity * singleProductData?.offer_price,
          total_shipment_cost: 50,
          sku: singleProductData?.sku,
          gst: customerData?.gst ? customerData?.gst : ""
        }


      };

      console.log("orderData==>", orderData)
      // Create the order via backend 
      // order api 
      const response = await fetch(`${AppEnv.baseUrl}/payment/create-order`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(paymentData),
      });

      if (!response.ok) {
        throw new Error('Failed to create order');
      }

      const { orderToken } = await response.json();

      // Load Cashfree SDK
      const cashfree = await load({
        mode: 'sandbox', // or 'production' depending on your environment
      });

      const checkoutOptions = {
        paymentSessionId: orderToken,  // Use orderToken from your backend
        redirectTarget: '_modal', // Open payment page in a modal
        // redirectTarget: '_self', // Open payment page in a modal
      };

      // Trigger the checkout process
      cashfree.checkout(checkoutOptions).then((result) => {
        if (result.error) {
          console.log('Payment failed or user closed the popup:', result.error);
          alert('Payment failed');
        } else if (result.redirect) {
          console.log('Payment will be redirected after completion');
        } else if (result.paymentDetails) {
          console.log('Payment completed:', result.paymentDetails.paymentMessage);
          // initiatePayment(initiatePaymentData)
          alert('Payment successful!');

          const response = fetch(`${AppEnv.baseUrl}/order/create-order`, {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify(orderData),
          });

          if (!response.ok) {
            throw new Error('Failed to create order');
          }

        }
      });

    } catch (error) {
      console.error('Error initiating payment:', error);
      alert('Error initiating payment.');
    }
  };

  useEffect(() => {
    // Dynamically load the Cashfree SDK
    const script = document.createElement('script');
    script.src = 'https://sdk.cashfree.com/js/v3/cashfree.js';  // This can still be used to load the SDK
    script.async = true;

    script.onload = () => {
      console.log('Cashfree SDK loaded');
    };

    script.onerror = () => {
      console.error('Error loading Cashfree SDK');
      alert('Error loading Cashfree SDK');
    };

    document.body.appendChild(script);

    return () => {
      document.body.removeChild(script);
    };
  }, []);

  console.log("productData", productData)
  const getProductApi = async () => {
    const response = await fetch(`${AppEnv.baseUrl}/admin/products`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      }
    });

    const result = await response.json();

    setProductData(result?.data)

  }

  const getStateAPi = async () => {
    const response = await fetch(`${AppEnv.baseUrl}/state/get-state`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json'
      }
    })

    const result = await response.json();

    setStateData(result?.data)
  }



  useEffect(() => {

    getProductApi();
    getStateAPi();
  }, [])

  return (
    <>

      <Box sx={{ p: 4, maxWidth: '950px', margin: '15vh auto' }}>
        {/* Order Summary */}
        <Box sx={{ mb: 2 }} className="hidden sm:block">
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
            {productData?.map((item) => {

              const discountPercentage = ((item.actual_price - item.offer_price) / item.actual_price) * 100;

              return (
                <div
                  key={item.id}
                  className="rounded-md border border-[#046E3D40] h-[8vw] md:w-[16vw]"
                  style={{
                    display: 'flex', flexDirection: 'column', justifyContent: 'center', textAlign: "center", border: "3px solid #046E3D40",
                    borderRadius: "10px"
                  }}
                >
                  <Typography
                    variant="body2"
                    className="font-semibold"
                    sx={{ mt: 1, textAlign: 'center' }}
                  >
                    {/* {item.name} */}
                    <span className="text-red-600">Now at {`-${Math.round(discountPercentage)}%`}</span>
                  </Typography>
                  <Typography className="font-semibold text-lg px-2 mt-4">
                    {/* Now at <span className="text-red-600">{`-${Math.round(discountPercentage)}%`}</span> */}
                    {/* <span
                      className="text"
                      style={{ textDecoration: 'line-through', marginRight: '8px' }}
                    >
                      ₹{item.actual_price}
                    </span> */}
                    <span className="text-xl font-semibold">₹{item.offer_price}</span>
                  </Typography>
                  <Typography className="text px-2">
                    <span
                      className="text"
                      style={{ textDecoration: 'line-through', marginRight: '8px' }}
                    >
                      ₹{item.actual_price}
                    </span>
                    {/* <span className="text-xl font-semibold">₹{item.offer_price}</span> */}
                  </Typography>

                  <Typography className="text px-2" style={{
                    background: "green",
                    textAlign: "center",
                    margin: "0px 10px 4px 10px",
                    borderRadius: "10px",
                    color: "white"
                  }}>
                    <span className="text-xl font-semibold" style={{ fontSize: "15px" }}>₹{item.bottle_size}</span>
                  </Typography>
                </div>
              );
            })}
          </div>
        </Box>

        {/* Mobile view  */}
        <Box style={{ marginTop: '0px' }} className="block  lg:hidden">
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexDirection: "column" }}>
            {productData?.map((item) => {
              return (
                <div
                  key={item.id}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    background: 'white',
                    padding: '10px',
                    borderRadius: '10px',
                    marginTop: '10px'
                  }}
                >
                  <img src={item.image} alt='' />
                  <div style={{ color: 'green', marginLeft: '10px', fontSize: '20px' }}>
                    <div className="text-xl font-semibold">
                      {item?.bottle_size}
                    </div>
                    <div className="text" style={{ color: 'green', marginBottom: '10px', fontSize: '15px' }}>
                      ₹.{item?.offer_price}/item
                    </div>
                    <div className="text" style={{ color: 'green', marginBottom: '10px', fontSize: '15px' }}>
                      {item?.description}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </Box>
        <Divider sx={{ mb: 4 }} />

        <Typography variant="h6" gutterBottom>
          Product Information
        </Typography>
        <Box component="form" sx={{ mb: 4 }}>
          <Grid container spacing={2}>
            <Grid item xs={6}>
              <Select
                labelId="product-variant-label"
                id="product-variant"
                name="productVariant"
                fullWidth
                value={formData.productVariant}
                onChange={handleChange}
                required
                displayEmpty
              >
                {/* <MenuItem value="" disabled>Select Product</MenuItem>
                <MenuItem value="200ml">200ml Mini Bottle</MenuItem>
                <MenuItem value="500ml">500ml Regular Bottle</MenuItem>
                <MenuItem value="1000ml">1000ml Mini Bottle</MenuItem> */}
                {
                  productData?.map((item) => {
                    return (
                      <MenuItem value={item?.name} key={item?.id}>{item?.name}</MenuItem>
                    )
                  })
                }
              </Select>
            </Grid>
            <Grid item xs={6}>
              <TextField
                fullWidth
                label="Quantity"
                variant="outlined"
                name="quantity"
                value={formData.quantity}
                onChange={handleChange}
                required
              />
            </Grid>
          </Grid>
        </Box>

        {/* Shipping Information */}
        <Typography variant="h6" gutterBottom sx={{ mt: 4 }}>
          Shipping Information
        </Typography>
        <Box component="form" sx={{ mb: 4 }}>
          <Grid container spacing={2}>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="First Name"
                variant="outlined"
                name="firstName"
                value={formData.firstName}
                onChange={handleChange}
                required
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="Last Name"
                variant="outlined"
                name="lastName"
                value={formData.lastName}
                onChange={handleChange}
                required
              />
            </Grid>
            <Grid item xs={6}>
              <TextField
                fullWidth
                label="Address"
                variant="outlined"
                name="address"
                value={formData.address}
                onChange={handleChange}
                required
              />
            </Grid>
            <Grid item xs={6}>
              <Select
                labelId="product-variant-label"
                id="statet"
                name="state"
                fullWidth
                value={formData.state}
                onChange={handleChange}
                required
                displayEmpty
              >
                {
                  stateData?.map((item) => {
                    return (
                      <MenuItem value={item?.state_name} key={item?.state_id}>{item?.state_name}</MenuItem>
                    )
                  })
                }
              </Select>
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="Postal Code"
                variant="outlined"
                name="postalCode"
                value={formData.postalCode}
                onChange={handleChange}
                required
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="City"
                variant="outlined"
                name="city"
                value={formData.city}
                onChange={handleChange}
                required
              />
            </Grid>
            <Grid container spacing={2} item xs={12} sm={12}>
              {pincode.length === 6 && (
                <Grid item xs={12} sm={12}>
                  {serviceable ? (
                    <Typography variant="body1" color="green" sx={{ display: 'flex', alignItems: 'center' }}>
                      <CheckCircle sx={{ mr: 1 }} /> Serviceable Area
                    </Typography>
                  ) : (
                    <Typography variant="body1" color="red" sx={{ display: 'flex', alignItems: 'center' }}>
                      <Cancel sx={{ mr: 1 }} /> This area is not serviceable
                    </Typography>
                  )}
                </Grid>
              )}
            </Grid>



          </Grid>
        </Box>

        {/* Contact Information */}
        <Typography variant="h6" gutterBottom>
          Contact Information
        </Typography>
        <Box component="form" sx={{ mb: 4 }}>
          <Grid container spacing={2}>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="Phone"
                variant="outlined"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                required
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="Email"
                variant="outlined"
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
              />
            </Grid>

          </Grid>
        </Box>
        {/* <Box>
          <Grid item container spacing={2}>
            Order Summary - {250}
          </Grid> */}
        {formData?.quantity && <>
          <Typography variant="body1" gutterBottom> Order Summary - ₹. {formData?.quantity * singleProductData?.offer_price}</Typography>
          <Typography variant="body1" gutterBottom> Shipment Cost - ₹. {50}</Typography></>}
        {/* </Box> */}
        <Box component="form" sx={{ mb: 4 }}>
          <Grid container spacing={2}>
            <Grid item xs={12} sm={12}>
              <FormControlLabel
                control={
                  <Checkbox
                    // checked={isGstChecked}
                    onChange={handleChange}
                    name="isGstChecked"
                  />
                }
                label="Select if you have GST"
              />
            </Grid>

            {isGstChecked && (
              <Grid item xs={12} sm={12}>
                <TextField
                  fullWidth
                  label="GST Number"
                  variant="outlined"
                  name="gstNumber"
                  value={formData.gstNumber}
                  onChange={handleChange}
                  required
                />
              </Grid>
            )}
            <Grid item xs={12} sm={12}>
              <FormControlLabel
                control={
                  <Checkbox
                    checked={isTermsChecked}
                    onChange={handleChange}
                    name="isTermsChecked"
                  />
                }
                label={
                  <span className='cursor-default '>
                    {/* hereby acknowledge that I have read, understood, and */}
                    I agreed to the{" "}
                    <a href="/terms" target="_blank" rel="noopener noreferrer" style={{ color: "#6200ed" }}>
                      Terms and Conditions
                    </a>{" "}
                    and{" "}
                    <a href="/privacy-policy" target="_blank" rel="noopener noreferrer" style={{ color: "#6200ed" }}>
                      Privacy Policy
                    </a>
                    .
                  </span>
                }
              />
            </Grid>
          </Grid>
        </Box>

        {/* Place Order Button */}
        <Box sx={{ textAlign: 'center' }}>
          <Button
            // onClick={initiatePayment}
            onClick={createCustomer}
            variant="contained"
            style={{ backgroundColor: '#056E3D' }}
            size="large"
            sx={{ mt: 3 }}
          >
            Place Order
          </Button>
        </Box>
      </Box >


      <Footer width={100} />
    </>
  );
};

export default Checkout;
