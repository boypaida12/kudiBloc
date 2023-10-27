/* eslint-disable no-unused-vars */
import React from "react";
/*import Footer from "./component/Footer";*/
import DashBoard from "./pages/dashboard/DashBoard";
import Loans from "./pages/Loans";
import Payment from "./pages/Payment";
import Calendar from "./pages/Calendar";
import CreditScore from "./pages/CreditScore";
import {
  Route,
  createBrowserRouter,
  createRoutesFromElements,
  RouterProvider,
  Navigate,
} from "react-router-dom";
import RootLayout from "./layout/RootLayout";
import SignInForm from "./pages/signup/SignInForm";
import SignUpForm from "./pages/signup/SignUpForm";
import { useAuth } from "./config/firebase";
import ErrorPage from "./pages/ErrorPage";
import LoadingIndicator from "./component/LoadingIndicator";
import Vendors from "./pages/Vendors";

function App() {
  //get user from firebase config
  const currentUser = useAuth();

  // Determine if the user is authenticated
  const isAuthenticated = !!currentUser;

  // Determine if the user is logged out
  const isLoggedOut = currentUser === null;

  const router = createBrowserRouter(
    createRoutesFromElements(
      <>
        <Route
          path="/"
          element={
              <RootLayout />
          }
        >
          <Route index element={ <DashBoard />} />
          <Route exact path="loans" element={<Loans />} />
          <Route exact path="loan-documents" element={<Payment />} />
          <Route exact path="calendar" element={<Calendar />} />
          <Route exact path="vendors" element={<Vendors />} />
        </Route>
        <Route path="*" element={<ErrorPage />} />
      </>
    )
  );
  return <RouterProvider router={router} />;
}

export default App;
