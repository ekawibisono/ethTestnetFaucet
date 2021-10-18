import { createAction, createReducer } from "@reduxjs/toolkit";

export const requestfundsFromFaucet = createAction("receiveForm/request funds from faucet");
export const sendSignedTxToMempool = createAction("receiveForm/send signed transaction to the mempool");
export const notifyWhenTxMined = createAction("receiveForm/notify whent transaction mined");
export const txMined = createAction("receiveForm/transaction mined notification");
export const txError = createAction("receiveForm/error during tx execution");

// createReducer comes with immer
export const receiveFormReducer = createReducer(
  {
    isLoading: false,
  },
  (builder) => {
    builder
      .addCase(requestfundsFromFaucet, (state) => {
        state.isLoading = true;
      })
      .addCase(txMined, (state) => {
        state.isLoading = false;
      })
      .addCase(txError, (state) => {
        state.isLoading = false;
      });
  }
);
