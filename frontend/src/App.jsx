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
            isAuthenticated ? (
              <RootLayout isAuthenticated={isAuthenticated} />
            ) : isLoggedOut ? (
              <Navigate to="/signin" /> // Redirect to login when logged out
            ) : (
              <LoadingIndicator />
            )
          }
        >
          <Route index element={isAuthenticated ? <DashBoard /> : null} />
          <Route exact path="loans" element={<Loans />} />
          <Route exact path="payment" element={<Payment />} />
          <Route exact path="calendar" element={<Calendar />} />
          <Route exact path="creditScore" element={<CreditScore />} />
        </Route>
        <Route path="*" element={<ErrorPage />} />
        <Route
          path="signin"
          element={isAuthenticated ? <Navigate to="/" /> : <SignInForm />}
        />
        <Route exact path="signup" element={<SignUpForm />} />
      </>
    )
  );
  return <RouterProvider router={router} />;
}

export default App;
