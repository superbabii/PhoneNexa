import React, { useContext, useEffect } from "react";
import axios from 'axios';
import GlobalStyles from 'styles/GlobalStyles';
import { css } from "styled-components/macro"; //eslint-disable-line

import MainLandingPage from "./pages/landing/MainLandingPage";

import LoginPage from "pages/Login.js";
import SignupPage from "pages/Signup.js";
import PricingPage from "pages/Pricing.js";
import AboutUsPage from "pages/AboutUs.js";
import ContactUsPage from "pages/ContactUs.js";
import ReviewPage from "pages/Testimonials";
import TermsOfServicePage from "pages/TermsOfService.js";
import PrivacyPolicyPage from "pages/PrivacyPolicy.js";

import DashboardPage from "pages/admin/Dashboard";
import UserManagementPage from "pages/admin/UserManagement";
import UserPage from "pages/admin/User";
import NewUserPage from "pages/admin/NewUser";
import ProductListPage from "pages/admin/ProductList";
import ProductPage from "pages/admin/Product";
import NewProductPage from "pages/admin/NewProduct";

import CommunicationPage from "pages/communications/index";

import { BrowserRouter as Router, Routes, Route, Navigate} from "react-router-dom";
import { UserContext } from "contexts/userContext";

const App = () => {

  const { userName } = useContext(UserContext);

  console.log("App.js : ", userName);

  axios.defaults.baseURL = 'https://phonenexa-server.vercel.app';
  // axios.defaults.baseURL = 'http://localhost:3030';
  axios.defaults.withCredentials = true;

  return (
    <>
      <GlobalStyles />
      <Router>
        <Routes>
          <Route path="/" element={<MainLandingPage />} />
          <Route
            path="/login"
            element={
              userName === null ? (
                <LoginPage />
              ) : (
                <Navigate to={userName === 'admin' ? '/admin' : '/communications'} />
              )
            }
          />
          <Route
            path="/signup"
            element={userName === null ? <SignupPage /> : <Navigate to="/communications" />}
          />
          <Route path="/pricing" element={<PricingPage />} />
          <Route path="/features" element={<AboutUsPage />} />
          <Route path="/contact" element={<ContactUsPage />} />
          <Route path="/reviews" element={<ReviewPage />} />
          <Route path="/terms-of-service" element={<TermsOfServicePage />} />
          <Route path="/privacy-policy" element={<PrivacyPolicyPage />} />

          <Route path="/admin" element={userName === 'admin' ? <DashboardPage /> : <Navigate to ="/communications"/>} />
          <Route path="/usermanagement" element={<UserManagementPage />} />
          <Route path="/usermanagement/:userId" element={<UserPage />} />
          <Route path="/admin/newuser" element={<NewUserPage />} />
          <Route path="/admin/productlist" element={<ProductListPage />} />
          <Route path="/admin/product/:productId" element={<ProductPage />} />
          <Route path="/admin/newproduct" element={<NewProductPage />} />

          <Route
            path="/communications"
            element={userName !== null ? <CommunicationPage /> : <Navigate to="/login" />}
          />
        </Routes>
      </Router>
    </>
  );
}

export default App;

