import { configureStore } from "@reduxjs/toolkit";
import { expensesReducer } from "./slice/expenses";
import { expensesApi } from "./apis/expenses";

const store = configureStore({
  reducer: {
    expenses: expensesReducer,
    [expensesApi.reducerPath]: expensesApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(expensesApi.middleware),
});

export { store };
export { 
  useFetchexpensesQuery, 
  useAddExpenseMutation, 
  useDeleteExpenseMutation, 
  useUpdateExpenseMutation 
} from './apis/expenses';
