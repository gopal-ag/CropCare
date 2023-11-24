import React, { useEffect } from "react";
import { Routes, Route, useLocation } from "react-router-dom";
import Layout from "./components/Layout";
import "./css/styles.scss";

// Import pages
import Dashboard from "./pages/Dashboard";
import Farmers from "./pages/Farmers";
import Onboarding from "./pages/Onboarding";
import SignIn from "./pages/SignIn";
import { Provider } from "react-redux";
import { ToastContainer } from "react-toastify";
import store from "./redux/store";
import { PrivateRoute, AuthRoute } from "./components/ProtectedRoute";
import "react-toastify/dist/ReactToastify.css";
import IndividualUser from "./pages/IndividualUser";
import Farm from "./pages/Farm";
import Field from "./pages/Field";
import Plot from "./pages/Plot";
import Crop from "./pages/Crop";
// import InstallPopup from "./components/InstallPopup";

function App() {
  const location = useLocation();

  useEffect(() => {
    document.querySelector("html").style.scrollBehavior = "auto";
    window.scroll({ top: 0 });
    document.querySelector("html").style.scrollBehavior = "";
  }, [location.pathname]); // triggered on route change

  return (
    <>
      <Provider store={store}>
        <ToastContainer />

        <Routes>
          <Route path="/signin" element={<AuthRoute />}>
            <Route path="/signin" element={<SignIn />} />
          </Route>
          <Route path="/" element={<PrivateRoute />}>
            <Route
              exact
              path="/"
              element={
                <Layout>
                  <Dashboard />
                </Layout>
              }
            />
          </Route>
          <Route
            exact
            path="/onboarding"
            element={
              <Layout>
                <Onboarding />
              </Layout>
            }
          />
          <Route
            exact
            path="/users"
            element={
              <Layout>
                <Farmers />
              </Layout>
            }
          />
          <Route
            exact
            path="/crop"
            element={
              <Layout>
                <Crop />
              </Layout>
            }
          />
          <Route
            exact
            path="/user/:id"
            element={
              <Layout>
                <IndividualUser />
              </Layout>
            }
          />
          <Route
            exact
            path="/farm/:id"
            element={
              <Layout>
                <Farm />
              </Layout>
            }
          />
          <Route
            exact
            path="/field/:id"
            element={
              <Layout>
                <Field />
              </Layout>
            }
          />
          <Route
            exact
            path="/plot/:id"
            element={
              <Layout>
                <Plot />
              </Layout>
            }
          />
        </Routes>
      </Provider>
    </>
  );
}

export default App;
