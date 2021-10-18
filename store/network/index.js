import { createAction, createReducer } from "@reduxjs/toolkit";

export const changeNetwork = createAction("network/change network");
export const changeNetworkFullfilled = createAction("network/change network fullfilled");
export const refreshFaucetBalance = createAction("network/refresh faucet balance");

// createReducer comes with immer
export const networkReducer = createReducer(
  {
    selectedNetwork: {},
    faucetBalance: null,
    isLoading: false,
  },
  (builder) => {
    builder
      .addCase(changeNetwork, (state, action) => {
        state.isLoading = true;
        state.selectedNetwork = action.payload;
      })
      .addCase(refreshFaucetBalance, (state, action) => {
        state.isLoading = true;
      })
      .addCase(changeNetworkFullfilled, (state, action) => {
        state.isLoading = false;
        state.faucetBalance = action.payload;
      });
  }
);
