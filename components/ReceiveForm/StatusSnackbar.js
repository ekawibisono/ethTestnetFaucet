import Snackbar from "@mui/material/Snackbar";

const StatusSnackbar = ({ show, children, onClose }) => {
  return (
    <Snackbar
      open={show}
      autoHideDuration={6000}
      onClose={onClose}
      anchorOrigin={{
        vertical: "bottom",
        horizontal: "center",
      }}>
      <div>{children}</div>
    </Snackbar>
  );
};

export default StatusSnackbar;
