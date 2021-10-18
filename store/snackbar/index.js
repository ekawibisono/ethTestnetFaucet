import { createAction, createReducer } from "@reduxjs/toolkit";

export const showSnackbar = createAction("snackbar/show snackbar");
export const hideSnackbar = createAction("snackbar/hide snackbar");

export const selectSnackbarState = (state) => state.snackbar;

export const snackbarReducer = createReducer(
  {
    show: false,
    target: "",
    content: null,
  },
  (builder) => {
    builder
      .addCase(showSnackbar, (state, action) => {
        state.show = true;
        state.target = action.payload.target;
        state.content = action.payload.content;
      })
      .addCase(hideSnackbar, (state) => {
        state.show = false;
      });
  }
);
