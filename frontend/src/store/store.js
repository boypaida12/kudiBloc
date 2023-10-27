import { configureStore } from '@reduxjs/toolkit'
import loanReducer from '../slices/functionSlice'

export const store = configureStore({
  reducer: {
    loanReducer,
  },
})