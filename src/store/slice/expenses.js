import { createSlice } from "@reduxjs/toolkit";

const storeslice = createSlice({
  name: "expenses",
  initialState: [],
  reducers: {
    addexpenses(state, action) {
      state.push(action.payload);
    },
    rmexpenses(state, action) {
      return state.filter((expense) => expense.id !== action.payload);
    },
    updateExpense(state, action) {
      const { id, name, amount } = action.payload;
      const existingExpense = state.find((expense) => expense.id === id);
      if (existingExpense) {
        existingExpense.name = name;
        existingExpense.amount = amount;
      }
    },
  },
});

export const { addexpenses, rmexpenses, updateExpense } = storeslice.actions;
export const expensesReducer = storeslice.reducer;
