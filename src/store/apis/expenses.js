import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const expensesApi = createApi({
  reducerPath: "expenseslist",
  baseQuery: fetchBaseQuery({
    baseUrl: "http://localhost:3001"
  }),
  endpoints(builder) {
    return {
      fetchexpenses: builder.query({
        query: () => ({
          url: "/expenses",
          method: "GET",
        }),
      }),
      addExpense: builder.mutation({
        query: (expense) => ({
          url: "/expenses",
          method: "POST",
          body: expense,
        }),
      }),
      deleteExpense: builder.mutation({
        query: (id) => ({
          url: `/expenses/${id}`,
          method: "DELETE",
        }),
      }),
      updateExpense: builder.mutation({
        query: (expense) => ({
          url: `/expenses/${expense.id}`,
          method: "PUT",
          body: expense,
        }),
      }),
    };
  }
});

export const { 
  useFetchexpensesQuery, 
  useAddExpenseMutation, 
  useDeleteExpenseMutation, 
  useUpdateExpenseMutation 
} = expensesApi;

export { expensesApi };
