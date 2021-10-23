import { Alert, Button, Snackbar } from "@mui/material";
import { useWeb3React } from "@web3-react/core";
import { injected } from "../utils/connectors";
import { UnsupportedChainIdError } from "@web3-react/core";
import { useEffect, useState } from "react";

type Props = {
  connectText: string;
};

const WalletConnector = ({ connectText }: Props) => {
  const { account, activate, deactivate } = useWeb3React();
  const { error } = useWeb3React();
  const [showSnackbar, setShowSnackbar] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  useEffect(() => {
    if (error) {
      error instanceof UnsupportedChainIdError
        ? setErrorMessage("Your wallet is connected to an unsupported network.")
        : setErrorMessage("Could not connect to wallet");
      setShowSnackbar(true);
    }
  }, [error]);

  return (
    <>
      {account ? (
        <Button variant="outlined" onClick={() => deactivate()}>
          {`Disconnect: ${account.substring(0, 6)}...${account.substring(account.length - 4)}`}
        </Button>
      ) : (
        <Button variant="outlined" onClick={() => activate(injected)}>
          {connectText}
        </Button>
      )}

      <Snackbar
        anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
        open={showSnackbar}
        autoHideDuration={2000}
        onClose={() => setShowSnackbar(false)}>
        <Alert severity="error">{errorMessage}</Alert>
      </Snackbar>
    </>
  );
};

export default WalletConnector;
