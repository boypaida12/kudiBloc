import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  budget: [],
  enabledCardId: null,
  isBudgetButtonEnabled: false,
  allLoans: 0,
  allPayments: 0,
  hasPaid: false,
  searchQuery: "",
  //other states...
};

export const addFinanceData = (payload) => {
  return {
    type: "budgetExpense/addFinanceData",
    payload,
  };
};

export const setSearchQuery = (searchQuery) => ({
  type: "budgetExpense/setSearchQuery",
  payload: searchQuery,
});

const functionSlice = createSlice({
  name: "budgetExpense",
  initialState,
  reducers: {
    addFinanceData: (state, action) => {
      const { budgetId, financeData } = action.payload;
      const budget = state.budget.find((budget) => budget.id === budgetId);

      if (budget) {
        budget.finance += financeData.financeAmount;
        if (!budget.financeDetails) {
          budget.financeDetails = []; // Initialize if financeDetails doesn't exist
        }
        budget.financeDetails.push(financeData);
      }
    },
    updateHasPaid: (state, action) => {
      state.hasPaid = action.payload;
    },
    enableCard: (state, action) => {
      state.enabledCardId = action.payload;
      state.isBudgetButtonEnabled = true;
    },
    clearEnabledCard: (state) => {
      state.enabledCardId = null;
      state.isBudgetButtonEnabled = false;
    },
    addFunction: (state, action) => {
      state.budget = [...state.budget, action.payload];
    },
    updateFunction: (state, action) => {
      state.budget = state.budget.map((budget) =>
        budget.id === action.payload.id ? action.payload : budget
      );
    },
    deleteFunction: (state, action) => {
      state.budget = state.budget.filter(
        (budget) => budget.id !== action.payload
      );
      console.log("budget deleted");
      alert("budget deleted");
    },
    calculateAllLoans: (state) => {
      state.allLoans = state.budget.reduce(
        (total, budget) => total + parseInt(budget.totalLoan),
        0
      );
    },
    calculateAllPayments: (state) => {
      state.allPayments = state.budget.reduce(
        (total, budget) => total + parseInt(budget.paymentEstimate),
        0
      );
    },
    setSearchQuery: (state, action) => {
      state.searchQuery = action.payload;
    },
    calculateTotalLoan: (state) => {
      state.budget.forEach((budget) => {
        const principal = parseFloat(budget.loanAmount);
        const rate = parseFloat(budget.loanRate) / 100 / 12;
        budget.totalLoan = principal + principal * rate;
        // console.log(`Calculating total loan for budget ${budget.totalLoan}`);
      });
    },
    calculatePaymentEstimate: (state) => {
      state.budget.forEach((budget) => {
        if (budget.paymentFrequency === "Weekly") {
          budget.paymentEstimate = (budget.totalLoan / 52).toFixed(2);
        } else {
          budget.paymentEstimate = (budget.totalLoan / 12).toFixed(2);
        }
        // console.log(`Calculating payment estimate for budget ${budget.paymentEstimate}`);
        // console.log(`Payment Frequency: ${budget.paymentFrequency}`)
      });
    },
    updatePaymentPercentage: (state, action) => {
      const budgetId = action.payload;
      const budget = state.budget.find((budget) => budget.id === budgetId);
      if (budget) {
        const paymentEstimate = parseFloat(budget.paymentEstimate);
        const totalLoanAmount = parseFloat(budget.totalLoan);
        const currentLoanPercentage = parseFloat(budget.loanPercentagePaid);

        // Calculate the additional percentage paid for this payment
        const additionalPercentage = (paymentEstimate / totalLoanAmount) * 100;

        // Update the loanPercentagePaid by accumulating the additional percentage
        budget.loanPercentagePaid = Math.min(
          currentLoanPercentage + additionalPercentage,
          100
        ).toFixed(0);

        if (budget.loanPercentagePaid > 0 && budget.loanPercentagePaid < 100) {
          budget.status = "In Progress";
        } else if (budget.loanPercentagePaid === 100) {
          budget.status = "Paid";
        }
      }
    },
   

    updateAllpayments: (state, action) => {
      state.allPayments = state.allPayments + action.payload;
    },

     //   other actions.
  },
});

export const {
  addFunction,
  updateFunction,
  deleteFunction,
  enableCard,
  updateHasPaid,
  clearEnabledCard,
  enableBudgetButton,
  disableBudgetButton,
  calculateAllLoans,
  calculateAllPayments,
  updatePaymentPercentage,
  calculateTotalLoan,
  calculatePaymentEstimate,
  updateAllpayments,
} = functionSlice.actions;

export default functionSlice.reducer;
