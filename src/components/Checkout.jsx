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
import Snackbar from "@mui/material/Snackbar";
import Alert from "@mui/material/Alert";
import banner from "../assets/icons/banner.png";
import CircularProgress from "@mui/material/CircularProgress";
import { FaBullseye } from "react-icons/fa6";

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
    productVariant: "",
    quantity: "",
    gstNumber: "", // Ensure GST number is included
  });

  const [isGstChecked, setIsGstChecked] = useState(false);
  const [isTermsChecked, setIsTermsChecked] = useState(false);
  const [pincode, setPinCode] = useState("");
  const [serviceable, setServiceable] = useState(null);
  const [productData, setProductData] = useState(null);
  const [singleProductData, setSingleProductData] = useState(null);
  const [stateData, setStateData] = useState(null);
  const [initiatePaymentData, setInitiatePaymentData] = useState(null);
  const [isSdkLoaded, setSdkLoaded] = useState(false);
  const [snackBarState, setSnackBarState] = useState(false);
  const [alertType, setAlertType] = useState();
  const [resultMessage, setResultMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState(false);
  const [loading, setLoading] = useState(false);
  const [serviceLoading, setServieLoading] = useState(false);
  // const { vertical, horizontal, open } = snackBarState;

  const data = [
    { id: 1, name: "200ml mini bottle", actualPrice: 400, offerPrice: 200 },
    { id: 2, name: "500ml Regular bottle", actualPrice: 1000, offerPrice: 500 },
    { id: 3, name: "1000ml mini bottle", actualPrice: 2000, offerPrice: 1000 },
  ];

  const handleClose = () => {
    setSnackBarState(false);
    setResultMessage("");
  };

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;

    if (name == "productVariant") {
      let findProductData = productData?.find((x) => x.name == value);
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
    // Add logic to process the order
    // Navigate to the order success page
  };

  useEffect(() => {
    const abortController = new AbortController();
    if (pincode.length !== 6) {
      setServiceable(null);
      setServieLoading(false);
      return;
    }
    if (pincode.length === 6) {
      setServieLoading(true);
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
            setServiceable(data.success);
          }
        })
        .catch((err) => {
          console.error("Fetch error:", err);
          setServiceable(false);
        })
        .finally(() => {
          setServieLoading(false);
        });
    }

    // Cleanup function: Abort only when component unmounts or dependencies change
    return () => {
      if (abortController) {
        abortController.abort(); // Safely abort fetch on unmount or editingRow change
      }
    };
  }, [pincode]);

  const createCustomer = async (order) => {
    if (
      !formData.phone ||
      !formData.state ||
      !formData.address ||
      !formData.productVariant ||
      !formData.firstName ||
      !formData.email ||
      !formData.quantity
    ) {
      setErrorMessage(true);
      // setSnackBarState(true);
      // setAlertType('error')
      // setResultMessage('Oops! Some fields are missing. Fill them out to continue.');
      return;
    }
    setLoading(true);
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
      if (result?.data?.id) {
        const requestData = { ...customerData, id: result?.data?.id };
        order
          ? await initiateCod(requestData)
          : await initiatePayment(requestData);
        // setInitiatePaymentData(result?.data);
      } else {
        setSnackBarState(true);
        setAlertType("error");
        setResultMessage(
          "Cannot process order at this time. Please try again later or contact support."
        );
      }
    } catch (error) {
      console.error("Error creating customer:", error);
      setSnackBarState(true);
      setAlertType("error");
      setResultMessage(
        "Cannot process order at this time. Please try again later or contact support."
      );
      // alert('Error creating customer.');
    }
  };

  const initiatePayment = async (customerData) => {
    if (!isSdkLoaded) {
      // alert("Cashfree SDK not loaded yet.");
      return; // Exit if the SDK is not loaded
    }
    try {
      const random4DigitNumber = Math.floor(1000 + Math.random() * 9000)
        .toString()
        .padStart(4, "0");
      const today = new Date();
      const formattedDate = today.toLocaleDateString("en-CA").replace(/-/g, "");

      const orderId = `CUST_ORDER_${formattedDate}${random4DigitNumber}`;
      const isUnion = stateData?.find((item) => item?.name == formData?.state);
      const paymentData = {
        orderAmount: formData?.quantity * singleProductData?.offer_price * 0.9,
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
          payment_mode: "Pre-paid", //Pre-paid or COD
          country: "India",
          shipping_mode: "Surface",
          city: formData?.city,
          state: customerData?.state,
          cod_amount: formData?.quantity * singleProductData?.offer_price * 0.9,
        },
        orderDetial: {
          state: customerData?.state,
          isUnion: stateData.find((el) => el.state_name == formData?.state)
            ?.is_union,
          quantity: formData?.quantity,
          invoiceNumber: `${formattedDate}${random4DigitNumber}`,
          invoiceAmount:
            formData?.quantity * singleProductData?.offer_price * 0.9,
          buyerName: customerData?.first_name + " " + customerData?.last_name,
          total_product_cost:
            formData?.quantity * singleProductData?.offer_price * 0.9,
          product_price: singleProductData?.offer_price,
          total_shipment_cost: "",
          sku: singleProductData?.sku,
          gst: customerData?.gst ? customerData?.gst : null,
        },
      };

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
        setSnackBarState(true);
        setAlertType("error");
        setResultMessage(
          "Cannot process order at this time. Please try again later or contact support."
        );
        throw new Error("Failed to create order");
      }

      // const data = await response.json();
      const data = await response.json();

      // Load Cashfree SDK
      const cashfree = await load({
        mode: "production", // or 'production' depending on your environment
        // mode: "test",
      });

      const checkoutOptions = {
        paymentSessionId: data?.orderToken, // Use orderToken from your backend
        redirectTarget: "_modal", // Open payment page in a modal
        // redirectTarget: '_self', // Open payment page in a modal
        mode: "production",
      };

      // Trigger the checkout process
      cashfree.checkout(checkoutOptions).then((result) => {
        if (result.error) {
          setSnackBarState(true);
          setAlertType("error");
          setResultMessage(
            "Cannot process order at this time. Please try again later or contact support."
          );
        } else if (result.redirect) {
          setSnackBarState(true);
          setAlertType("error");
          setResultMessage(
            "Cannot process order at this time. Please try again later or contact support."
          );
        } else if (result.paymentDetails) {
          // Determine the payment mode

          // console.log("Payment Mode:", paymentMode);

          // Update orderData with the payment mode
          // orderData.shipments.payment_mode = paymentMode;

          // Log orderData for verification

          // alert("Payment successful!");
          setSnackBarState(true);
          setAlertType("success");
          setResultMessage("Payment successful!!");

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
              setSnackBarState(true);
              setAlertType("success");
              setErrorMessage(false);
              setLoading(false);
              setResultMessage("Your order has been created successfully! 🎉");
            })
            .catch((orderError) => {
              console.error("Error creating order:", orderError);
              // alert("Error creating order.");

              setSnackBarState(true);
              setLoading(false);
              setAlertType("error");
              setResultMessage(
                "Cannot process order at this time. Please try again later or contact support."
              );
            });
        }
      });
    } catch (error) {
      console.error("Error initiating payment:", error);
      // alert("Error initiating payment.");
      setSnackBarState(true);
      setAlertType("error");
      setResultMessage(
        "Error initiating payment at this time. Please try again later or contact support."
      );
    }
  };

  const initiateCod = async (customerData) => {
    try {
      const random4DigitNumber = Math.floor(1000 + Math.random() * 9000)
        .toString()
        .padStart(4, "0");
      const today = new Date();
      const formattedDate = today.toLocaleDateString("en-CA").replace(/-/g, "");

      const orderId = `CUST_ORDER_${formattedDate}${random4DigitNumber}`;
      const isUnion = stateData?.find((item) => item?.name == formData?.state);

      const paymentData = {
        orderAmount: formData?.quantity * singleProductData?.offer_price,
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
          payment_mode: "COD",
          country: "India",
          shipping_mode: "Surface",
          city: formData?.city,
          state: customerData?.state,
          cod_amount: formData?.quantity * singleProductData?.offer_price,
        },
        orderDetial: {
          state: customerData?.state,
          isUnion: stateData.find((el) => el.state_name == formData?.state)
            ?.is_union,
          quantity: formData?.quantity,
          invoiceNumber: `${formattedDate}${random4DigitNumber}`,
          invoiceAmount: formData?.quantity * singleProductData?.offer_price,
          buyerName: customerData?.first_name + " " + customerData?.last_name,
          total_product_cost:
            formData?.quantity * singleProductData?.offer_price,
          product_price: singleProductData?.offer_price,
          total_shipment_cost: "",
          sku: singleProductData?.sku,
          gst: customerData?.gst ? customerData?.gst : null,
        },
      };

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
          setServiceable(true);
          setSnackBarState(true);
          setAlertType("success");
          setLoading(false);
          setResultMessage("Your order has been created successfully! 🎉");
        })
        .catch((orderError) => {
          setLoading(false);
          setSnackBarState(true);
          setAlertType("error");
          setResultMessage(
            "Cannot process order at this time. Please try again later or contact support."
          );
        });
    } catch (error) {
      console.error("Error initiating payment:", error);
      setLoading(false);

      setSnackBarState(true);
      setAlertType("error");
      setResultMessage(
        "Cannot process order at this time. Please try again later or contact support."
      );
    }
  };

  const snackBar = () => {
    return (
      <Snackbar
        open={snackBarState}
        autoHideDuration={3000}
        onClose={handleClose}
        anchorOrigin={{ vertical: "top", horizontal: "center" }}
        // key={vertical + horizontal}
      >
        <Alert
          onClose={handleClose}
          severity={alertType}
          variant="filled"
          sx={{ width: "100%" }}
        >
          {/* Payment Successful */}
          {resultMessage}
        </Alert>
      </Snackbar>
    );
  };

  useEffect(() => {
    // Dynamically load the Cashfree SDK
    const script = document.createElement("script");
    script.src = "https://sdk.cashfree.com/js/v3/cashfree.js"; // This can still be used to load the SDK
    script.async = true;

    script.onload = () => {
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

        <img src={banner} alt="" />
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
                error={errorMessage && !formData.productVariant}
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
                type="number"
                value={formData.quantity}
                onChange={handleChange}
                required
                error={errorMessage && !formData.quantity}
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
                error={errorMessage && !formData.firstName}
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
                error={errorMessage && !formData.lastName}
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
                error={errorMessage && !formData.lastName}
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
                error={errorMessage && !formData.state}
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
                type="number"
                value={formData.postalCode}
                onChange={handleChange}
                required
                error={errorMessage && !formData.postalCode}
                InputProps={{
                  inputProps: { style: { appearance: "textfield" } },
                }}
                sx={{
                  "& input::-webkit-outer-spin-button, & input::-webkit-inner-spin-button":
                    {
                      display: "none",
                    },
                  "& input[type=number]": {
                    MozAppearance: "textfield",
                  },
                }}
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
                error={errorMessage && !formData.city}
              />
            </Grid>
            <Grid container spacing={2} item xs={12} sm={12}>
              {pincode.length === 6 && (
                <Grid item xs={12} sm={12}>
                  {serviceLoading ? (
                    <CircularProgress size={24} sx={{ color: "#056E3D" }} />
                  ) : serviceable ? (
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
                type="number"
                onChange={handleChange}
                required
                InputProps={{
                  inputProps: { style: { appearance: "textfield" } },
                }}
                sx={{
                  "& input::-webkit-outer-spin-button, & input::-webkit-inner-spin-button":
                    {
                      display: "none",
                    },
                  "& input[type=number]": {
                    MozAppearance: "textfield",
                  },
                }}
                error={errorMessage && !formData.phone}
                helperText={
                  errorMessage && formData.phone?.length != 10
                    ? "Phone number must be at least 10 digits "
                    : ""
                }
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
                error={errorMessage && !formData.email}
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
                  error={errorMessage && !formData.gstNumber}
                  helperText={
                    errorMessage && formData.gstNumber?.length != 16
                      ? "GST number should be 16 character"
                      : ""
                  }
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
        <Box
          sx={{
            textAlign: "center",
            display: "flex",
            flexDirection: { xs: "column", sm: "row" },
            justifyContent: "center",
          }}
        >
          <Button
            // onClick={initiatePayment}
            onClick={() => createCustomer(false)}
            variant="contained"
            style={{
              backgroundColor: serviceable ? "#056E3D" : "#D3D3D3", // Light gray when disabled
              color: serviceable ? "white" : "#FFFFFF", // White text when disabled
            }}
            size="large"
            sx={{
              mb: 3,
              mr: { sm: 2 },
              paddingY: { xs: "10px", sm: "6px" },
            }}
            disabled={serviceable && !loading ? false : true}
          >
            Pay Now
          </Button>
          <p>{resultMessage}</p>
          <Button
            // onClick={initiatePayment}
            onClick={() => createCustomer(true)}
            variant="outlined"
            style={{
              borderColor: serviceable ? "#056E3D" : "#D3D3D3", // Light gray border when disabled
              color: serviceable ? "#056E3D" : "#D3D3D3", // Light gray text when disabled
            }}
            size="large"
            sx={{
              mb: 3,
              mr: { sm: 2 },
              paddingY: { xs: "10px", sm: "6px" },
              minWidth: "8vw",
            }}
            disabled={serviceable && !loading ? false : true}
          >
            {loading ? (
              <CircularProgress size={24} color={"#056E3D"} />
            ) : (
              "Pay COD"
            )}
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
