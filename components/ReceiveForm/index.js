import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Alert, Backdrop, FormHelperText, TextField, Box, Button, CircularProgress } from "@mui/material";
import { useWeb3React } from "@web3-react/core";
import { ethers } from "ethers";

import { requestfundsFromFaucet } from "../../store/receiveForm";
import { selectIsLoading } from "../../store/receiveForm/selectors";
import { MAXIMUM_AMOUNT_ALLOWED_PER_TX } from "../../constants/faucet";
import { hideSnackbar, selectSnackbarState, showSnackbar } from "../../store/snackbar";
import StatusSnackbar from "./StatusSnackbar";

const ReceiveForm = () => {
  const { account } = useWeb3React();
  const [amount, setAmount] = useState(0.001);
  const [address, setAddress] = useState("");
  const [invalidEthAddress, setInvalidEthAddress] = useState(false);
  const snackbar = useSelector(selectSnackbarState);
  const isLoading = useSelector(selectIsLoading);
  const dispatch = useDispatch();

  const handleAmountChange = (event) => {
    const { value: newValue } = event.target;

    const invalidAmountValue = !newValue || +newValue <= 0;
    if (invalidAmountValue) return;

    const overMaximumAllowed = newValue >= MAXIMUM_AMOUNT_ALLOWED_PER_TX;
    overMaximumAllowed ? setAmount(MAXIMUM_AMOUNT_ALLOWED_PER_TX) : setAmount(+newValue);
  };

  const handleSnackbarClose = (_event) => {
    dispatch(hideSnackbar());
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    setInvalidEthAddress(false);

    const validEthereumAddress = ethers.utils.isAddress(address);
    if (!validEthereumAddress) {
      setInvalidEthAddress(true);
      return;
    }

    const SigningTxAlert = <Alert severity="info">Signing transaction...</Alert>;
    dispatch(showSnackbar({ show: true, target: "receiveForm", content: SigningTxAlert }));
    dispatch(requestfundsFromFaucet({ amount, address }));
  };

  useEffect(() => {
    account ? setAddress(account) : setAddress("");
  }, [account]);

  return (
    <>
      <form onSubmit={handleSubmit}>
        <Box sx={{ paddingBottom: 2 }}>
          <TextField
            name="amount"
            value={amount}
            onChange={handleAmountChange}
            fullWidth
            label="Amount"
            variant="outlined"
            type="number"
            inputProps={{ step: 0.01 }}
          />
          <FormHelperText>Maximum allowed: {MAXIMUM_AMOUNT_ALLOWED_PER_TX}</FormHelperText>
        </Box>

        <Box sx={{ paddingBottom: 2 }}>
          <TextField
            name="address"
            error={invalidEthAddress}
            fullWidth
            label="Your Address"
            value={address}
            onChange={(e) => setAddress(e.target.value)}
            variant="outlined"
          />
          {invalidEthAddress && <FormHelperText error>Not a valid ethereum address</FormHelperText>}
        </Box>

        <Box sx={{ marginTop: 1, display: "flex", alignItems: "center", justifyContent: "center" }}>
          <Button type="submit" variant="contained">
            Receive
          </Button>
        </Box>
        <Backdrop sx={{ position: "absolute", display: "flex", flexDirection: "column", borderRadius: 5 }} open={isLoading}>
          <CircularProgress color="inherit" />
        </Backdrop>
      </form>

      {snackbar.target === "receiveForm" && (
        <StatusSnackbar show={snackbar.show} onClose={handleSnackbarClose}>
          <div>{snackbar.content}</div>
        </StatusSnackbar>
      )}
    </>
  );
};

export default ReceiveForm;
