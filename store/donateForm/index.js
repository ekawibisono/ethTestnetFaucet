import { createAction, createReducer } from "@reduxjs/toolkit";

export const donateFundsToFaucet = createAction("donateForm/donate funds to faucet");
export const txSubmittedToNetwork = createAction("donateForm/tx submitted to network");
export const donateTxMined = createAction("donateForm/tx mined");
export const providerError = createAction("donateForm/provider error");

// createReducer comes with immer
export const donateFormReducer = createReducer(
  {
    txHash: null,
    isLoading: false,
    errorMessage: null,
  },
  (builder) => {
    builder
      .addCase(donateFundsToFaucet, (state) => {
        state.errorMessage = null;
      })
      .addCase(txSubmittedToNetwork, (state, action) => {
        state.isLoading = true;
        state.txHash = action.payload;
      })
      .addCase(donateTxMined, (state) => {
        state.txHash = null;
        state.isLoading = false;
      })
      .addCase(providerError, (state, action) => {
        state.status = "error";
        state.isLoading = false;
        state.errorMessage = action.payload;
      });
  }
);
