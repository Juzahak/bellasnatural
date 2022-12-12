import { useEffect } from "react";

import "../styles/globals.css";

import "../assets/css/plugins/animate.css";
import "../assets/css/plugins/swiper-bundle.min.css";
import "../assets/css/plugins/slick.min.css";

import "bootstrap/dist/css/bootstrap.min.css";

import "../assets/css/custom.css";

import "../assets/css/index.css";

import "../assets/css/demo2.css";
import "../assets/css/ekka.css";
import "../assets/plugins/simplebar/simplebar.css";

/* PAGES STYLES */
import "../styles/aboutUsPage.css";
import "../styles/allProductsPage.css";
import "../styles/contactPage.css";
import "../styles/storesPage.css";
import "../styles/doubtsPage.css";
import "../styles/userProfilePage.css";
import "../styles/cartPage.css";
import "../styles/trackOrderPage.css";
import "../styles/checkoutPage.css";
import "../styles/productPage.css";
import "../styles/loginPage.css";
import "../styles/registerPage.css";

import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function MyApp({ Component, pageProps }) {
  
  useEffect(() => {
    require("bootstrap/dist/js/bootstrap.bundle.min.js");
    require("jquery/dist/jquery.min.js");

  }, []);

  return (
    <>
      <Component {...pageProps} />
      <ToastContainer
        position="top-right"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
      />
    </>
  );
}

export default MyApp
