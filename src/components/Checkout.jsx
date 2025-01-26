import {
  Box,
  Typography,
  TextField,
  Button,
  Grid,
  Divider,
  Select,
  MenuItem,
  FormControlLabel,
  Checkbox,
} from "@mui/material";
import { useEffect, useState } from "react";
import { CheckCircle, Cancel } from "@mui/icons-material";
import Footer from "./Footer";
import { load } from "@cashfreepayments/cashfree-js";
import "./Checkout";
import { AppEnv } from "../../config";
import Snackbar from '@mui/material/Snackbar';
import Alert from '@mui/material/Alert';

const Checkout = () => {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    address: "",
    city: "",
    postalCode: "",
    state: "",
    phone: "",
    email: "",
    cardNumber: "",
    expiryDate: "",
    cvv: "",
    productVariant: "",
    quantity: "",
    gstNumber: "", // Ensure GST number is included
  });

  const [isGstChecked, setIsGstChecked] = useState(false);
  const [isTermsChecked, setIsTermsChecked] = useState(false);
  const [pincode, setPinCode] = useState("");
  const [serviceable, setServiceable] = useState();
  const [productData, setProductData] = useState(null);
  const [singleProductData, setSingleProductData] = useState(null);
  const [stateData, setStateData] = useState(null);
  const [initiatePaymentData, setInitiatePaymentData] = useState(null);
  const [isSdkLoaded, setSdkLoaded] = useState(false);
  const [snackBarState, setSnackBarState] = useState(false);
  const [resultMessage, setResultMessage] = useState('');

  // const { vertical, horizontal, open } = snackBarState;

  const data = [
    { id: 1, name: "200ml mini bottle", actualPrice: 400, offerPrice: 200 },
    { id: 2, name: "500ml Regular bottle", actualPrice: 1000, offerPrice: 500 },
    { id: 3, name: "1000ml mini bottle", actualPrice: 2000, offerPrice: 1000 },
  ];

  const handleClose = () => {
    setSnackBarState(false);
    setResultMessage('');
  };

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    console.log("name", name, "value", value);

    if (name == "productVariant") {
      let findProductData = productData?.find((x) => x.name == value);
      console.log("findProductData", findProductData);
      setSingleProductData(findProductData);
    }
    // Update the state for the corresponding field
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));

    // If the checkbox for GST is toggled, update the isGstChecked state
    if (name === "isGstChecked") {
      setIsGstChecked(checked);
    }
    if (name === "isTermsChecked") {
      setIsTermsChecked(checked);
    }

    if (name === "postalCode") {
      setPinCode(value);
    }
  };

  const handlePlaceOrder = () => {
    console.log("Order Details:", formData);
    // Add logic to process the order
    // Navigate to the order success page
  };

  useEffect(() => {
    const abortController = new AbortController();
    if (pincode.length === 6) {
      fetch(`${AppEnv.baseUrl}/customer/check-serviceable/${pincode}`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: "Token 1493cc881fb601a6cfcb591ec7a4fbdaaab8d8be",
        },
        signal: abortController.signal,
      })
        .then((result) => {
          if (!result.ok) {
            throw new Error(`HTTP error! status: ${result.status}`);
          }
          return result.json();
        })
        .then((data) => {
          if (!abortController.signal.aborted) {
            console.log("Response data:", data);
            setServiceable(data.success);
          }
        })
        .catch((err) => {
          console.error("Fetch error:", err);
          setServiceable(false);
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
        gst: formData?.gstNumber ? formData?.gstNumber : "",
      };

      const response = await fetch(
        `${AppEnv.baseUrl}/customer/create-customer`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(customerData),
        }
      );
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
      console.error("Error creating customer:", error);
      // alert('Error creating customer.');
    }
  };

  const initiatePayment = async (customerData) => {
    if (!isSdkLoaded) {
      alert("Cashfree SDK not loaded yet.");
      return; // Exit if the SDK is not loaded
    }
    try {
      const random4DigitNumber = Math.floor(1000 + Math.random() * 9000)
        .toString()
        .padStart(4, "0");
      const today = new Date();
      const formattedDate = today.toLocaleDateString("en-CA").replace(/-/g, "");
      console.log("random4DigitNumber", random4DigitNumber, formattedDate);

      const orderId = `CUST_ORDER_${formattedDate}${random4DigitNumber}`;
      const isUnion = stateData?.find((item) => item?.name == formData?.state);
      console.log(isUnion, "isUnion");
      const paymentData = {
        orderAmount: formData?.quantity * singleProductData?.offer_price + 50,
        customerEmail: formData?.email,
        customerPhone: formData?.phone,
        customerId: customerData?.id.toString(),
      };
      const orderData = {
        shipments: {
          add: formData?.address,
          address_type: "home",
          phone: customerData?.phone,
          name: formData?.firstName + " " + formData?.lastName,
          pin: formData?.postalCode,
          order: orderId,
          payment_mode: "", //Pre-paid or COD
          country: "India",
          shipping_mode: "Surface",
          city: formData?.city,
          state: customerData?.state,
          cod_amount: formData?.quantity * singleProductData?.offer_price,
        },
        orderDetial: {
          state: customerData?.state,
          isUnion: false,
          quantity: formData?.quantity,
          invoiceNumber: `${formattedDate}${random4DigitNumber}`,
          invoiceAmount: formData?.quantity * singleProductData?.offer_price,
          buyerName: customerData?.first_name + " " + customerData?.last_name,
          total_product_cost:
            formData?.quantity * singleProductData?.offer_price,
          total_shipment_cost: "",
          sku: singleProductData?.sku,
          gst: customerData?.gst ? customerData?.gst : null,
        },
      };

      console.log("orderData==>", orderData);
      // Create the order via backend
      // order api
      const response = await fetch(`${AppEnv.baseUrl}/payment/create-order`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(paymentData),
      });

      if (!response.ok) {
        throw new Error("Failed to create order");
      }

      // const data = await response.json();
      const data = await response.json();

      console.log("data==>", data)
      // Load Cashfree SDK
      const cashfree = await load({
        // mode: "production", // or 'production' depending on your environment
        mode: "test",
      });

      const checkoutOptions = {
        paymentSessionId: data?.orderToken, // Use orderToken from your backend
        redirectTarget: "_modal", // Open payment page in a modal
        // redirectTarget: '_self', // Open payment page in a modal
        mode: "test"
      };

      // Trigger the checkout process
      cashfree.checkout(checkoutOptions).then((result) => {
        if (result.error) {
          console.log("Payment failed or user closed the popup:", result.error);
          alert("Payment failed");
        } else if (result.redirect) {
          console.log("Payment will be redirected after completion");
        } else if (result.paymentDetails) {
          console.log("Payment completed:", result.paymentDetails);

          // Determine the payment mode
          console.log("pppppaaaaa", result)
          const paymentMode =
            data?.order_meta?.payment_methods == "cc" ? "COD" : "Pre-paid";

          console.log("Payment Mode:", paymentMode);

          // Update orderData with the payment mode
          orderData.shipments.payment_mode = paymentMode;

          // Log orderData for verification
          console.log("Final Order Data:", orderData);

          // alert("Payment successful!");
          setSnackBarState(true);
          setResultMessage('Payment successful');


          // Send order data to backend
          fetch(`${AppEnv.baseUrl}/order/create-order`, {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(orderData),
          })
            .then((orderResponse) => {
              if (!orderResponse.ok) {
                throw new Error("Failed to create order");
              }
              return orderResponse.json();
            })
            .then((orderResult) => {
              console.log("Order created successfully:", orderResult);
            })
            .catch((orderError) => {
              console.error("Error creating order:", orderError);
              // alert("Error creating order.");
              setSnackBarState(true);
              setResultMessage('Error creating order.');
            });
        }
      });
    } catch (error) {
      console.error("Error initiating payment:", error);
      // alert("Error initiating payment.");
      setSnackBarState(true);
      setResultMessage('Error initiating payment.');
    }
  };

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
          {/* Payment Successful */}
          {resultMessage}
        </Alert>
      </Snackbar>
    )
  }

  useEffect(() => {
    // Dynamically load the Cashfree SDK
    const script = document.createElement("script");
    script.src = "https://sdk.cashfree.com/js/v3/cashfree.js"; // This can still be used to load the SDK
    script.async = true;

    script.onload = () => {
      console.log("Cashfree SDK loaded");
      setSdkLoaded(true);
    };

    script.onerror = () => {
      console.error("Error loading Cashfree SDK");
      alert("Error loading Cashfree SDK");
    };

    document.body.appendChild(script);

    return () => {
      document.body.removeChild(script);
    };
  }, []);

  console.log("productData", productData);
  const getProductApi = async () => {
    const response = await fetch(`${AppEnv.baseUrl}/admin/products`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });

    const result = await response.json();

    setProductData(result?.data);
  };

  const getStateAPi = async () => {
    const response = await fetch(`${AppEnv.baseUrl}/state/get-state`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });

    const result = await response.json();

    setStateData(result?.data);
  };

  useEffect(() => {
    getProductApi();
    getStateAPi();
    console.log(productData);
  }, []);

  return (
    <>
      <Box sx={{ p: 4, maxWidth: "950px", margin: "auto" }}>
        {/* Order Summary */}
        <Box sx={{ mb: 2 }} className="hidden sm:block">
          <div
            style={{
              display: "flex",
              flexWrap: "wrap", // Allows items to wrap to the next row
              gap: "16px", // Adds space between items
              justifyContent: "space-between", // Distributes items evenly
            }}
            className="mt-[15vh]"
          >
            {productData?.map((item) => {
              const discountPercentage =
                ((item.actual_price - item.offer_price) / item.actual_price) *
                100;

              return (
                <div
                  key={item.id}
                  className="rounded-md border border-[#046E3D40] py-4"
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "center",
                    textAlign: "center",
                    border: "2px solid #046E3D40",
                    borderRadius: "10px",
                    width: "30%", // Ensures three items per row
                    height: "30vh",
                  }}
                >
                  <Typography
                    variant="body2"
                    className="font-semibold"
                    sx={{ mt: 1, textAlign: "center" }}
                  >
                    <span className="text-red-600">
                      Now at {`-${Math.round(discountPercentage)}%`}
                    </span>
                  </Typography>
                  <Typography className="font-semibold text-lg px-2 my-2 ">
                    <span
                      className="text"
                      style={{
                        textDecoration: "line-through",
                        marginRight: "8px",
                      }}
                    >
                      ₹{item.actual_price}
                    </span>
                    <span className="text-xl font-semibold">
                      ₹{item.offer_price}
                    </span>
                  </Typography>

                  <Typography
                    className="text px-2 "
                    style={{
                      background: "#056E3D",
                      textAlign: "center",
                      margin: "0px 10px 4px 10px",
                      borderRadius: "10px",
                      color: "white",
                    }}
                  >
                    <span
                      className="text-xl font-semibold"
                      style={{ fontSize: "15px" }}
                    >
                      {item.name}
                    </span>
                  </Typography>

                  <Typography
                    className="text px-2 h-[8vh]"
                    style={{
                      overflow: "hidden",
                      whiteSpace: "normal",
                      textOverflow: "ellipsis",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                    }}
                  >
                    <p
                      className="text-xl"
                      style={{
                        fontSize: "15px",
                        wordBreak: "break-word",
                      }}
                    >
                      {item.title}
                    </p>
                  </Typography>
                </div>
              );
            })}
          </div>
        </Box>

        {/* Mobile view  */}
        <Box style={{ marginTop: "6vh" }} className="block  lg:hidden ">
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              flexDirection: "column",
            }}
          >
            {productData?.map((item) => {
              const discountPercentage =
                ((item.actual_price - item.offer_price) / item.actual_price) *
                100;
              return (
                <div
                  key={item.id}
                  style={{
                    display: "flex",
                    alignItems: "center",
                    background: "white",
                    padding: "10px",
                    borderRadius: "10px",
                    marginTop: "10px",
                    width: "100%",
                    border: "2px solid #046E3D40",
                  }}
                  className="border-[#046E3D40] py-4"
                >
                  <div className="">
                    {/* <img src={item.image} alt='' /> */}
                    <Typography
                      variant="body2"
                      className="font-semibold"
                      sx={{ mt: 1, textAlign: "center" }}
                    >
                      <span className="text-red-600">
                        Now at {`-${Math.round(discountPercentage)}%`}
                      </span>
                    </Typography>
                    <Typography className="font-semibold text-lg px-2 my-2 ">
                      <span
                        className="text"
                        style={{
                          textDecoration: "line-through",
                          marginRight: "8px",
                        }}
                      >
                        ₹{item.actual_price}
                      </span>
                      <span className="text-xl font-semibold">
                        ₹{item.offer_price}
                      </span>
                    </Typography>
                  </div>
                  <div className="">
                    <Typography
                      className="text px-2 "
                      style={{
                        background: "#056E3D",
                        textAlign: "center",
                        margin: "0px 10px 4px 10px",
                        borderRadius: "10px",
                        color: "white",
                      }}
                    >
                      <span
                        className="text-xl font-semibold"
                        style={{ fontSize: "15px" }}
                      >
                        {item.name}
                      </span>
                    </Typography>

                    <Typography
                      className="text px-2 "
                      style={{
                        overflow: "hidden",
                        whiteSpace: "normal",
                        textOverflow: "ellipsis",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                      }}
                    >
                      <p
                        className="text-xl"
                        style={{
                          fontSize: "15px",
                          wordBreak: "break-word",
                        }}
                      >
                        {item.title}
                      </p>
                    </Typography>
                  </div>
                </div>
              );
            })}
          </div>
        </Box>
        <Divider sx={{ mb: 4, mt: 4 }} />

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
                {/* Default option */}
                <MenuItem value="" disabled>
                  Select Product
                </MenuItem>
                {/* Dynamic options */}
                {productData?.map((item) => (
                  <MenuItem value={item?.name} key={item?.id}>
                    {item?.name}
                  </MenuItem>
                ))}
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
                id="state"
                name="state"
                fullWidth
                value={formData.state}
                onChange={handleChange}
                required
                displayEmpty
              >
                {/* Default option */}
                <MenuItem value="" disabled>
                  Select State
                </MenuItem>
                {/* Dynamic options */}
                {stateData?.map((item) => (
                  <MenuItem value={item?.state_name} key={item?.state_id}>
                    {item?.state_name}
                  </MenuItem>
                ))}
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
                    <Typography
                      variant="body1"
                      color="green"
                      sx={{ display: "flex", alignItems: "center" }}
                    >
                      <CheckCircle sx={{ mr: 1 }} /> Serviceable Area
                    </Typography>
                  ) : (
                    <Typography
                      variant="body1"
                      color="red"
                      sx={{ display: "flex", alignItems: "center" }}
                    >
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
        {/* {formData?.quantity && <>
          <Typography variant="body1" gutterBottom> Order Summary - ₹. {formData?.quantity * singleProductData?.offer_price}</Typography>
          <Typography variant="body1" gutterBottom> Shipment Cost - ₹. {50}</Typography></>} */}
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
            {/* <Grid item xs={12} sm={12}>
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
                    By placing order, you agree to our{" "}
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
            </Grid> */}
          </Grid>
        </Box>

        {/* Place Order Button */}
        <Box sx={{ textAlign: "center" }}>
          <Button
            // onClick={initiatePayment}
            onClick={createCustomer}
            variant="contained"
            style={{ backgroundColor: "#056E3D" }}
            size="large"
            sx={{ mb: 3 }}
          >
            Place Order
          </Button>
        </Box>
        <Grid item xs={12} sm={12} className=" sm:text-center ">
          <span className="cursor-default text-sm">
            By placing an order, you agree to our{" "}
            <a
              href="/terms"
              target="_blank"
              rel="noopener noreferrer"
              style={{ color: "#6200ed" }}
            >
              Terms and Conditions
            </a>{" "}
            and{" "}
            <a
              href="/privacy-policy"
              target="_blank"
              rel="noopener noreferrer"
              style={{ color: "#6200ed" }}
            >
              Privacy Policy
            </a>
            .
          </span>
        </Grid>
      </Box>
      {snackBar()}
      <Footer width={100} />
    </>
  );
};

export default Checkout;
