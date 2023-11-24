import FarmMan from "../images/farm-man.jpg";
import { Link, useNavigate } from "react-router-dom";
import MainLogo from "../images/agrotrust-logo-transparent.png";
import FarmLogo from "../images/farmdb-logo.png";
import EmertechLogo from "../images/Emertech_Logo.png";
import { useDispatch } from "react-redux";
import { login } from "../redux/actions/auth";
import { clearMessage } from "../redux/actions/message";
import { Formik } from "formik";
import * as Yup from "yup";

function Signin() {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  // const handleSubmit = (e) => {
  //   e.preventDefault();
  //   dispatch(login(inputVal))
  //     .then(() => {
  //       dispatch(clearMessage());
  //       navigate("/", { replace: true });
  //     })
  //     .catch(() => {});
  // };

  return (
    <>
      <div className="h-screen flex">
        <div
          style={{ marginTop: "3rem" }}
          className="flex-1 flex flex-col justify-center px-4 sm:px-6 lg:flex-none lg:px-20 xl:px-24"
        >
          <div className="mx-auto w-full max-w-sm lg:w-96">
            <div>
              <div className="flex justify-center">
                <img className="h-12 w-auto" src={MainLogo} alt="Workflow" />
              </div>
              <div className="flex justify-center">
                <img
                  style={{ height: "10rem" }}
                  className=" w-auto"
                  src={FarmLogo}
                  alt="Workflow"
                />
              </div>
              <h2 className="mt-6 text-3xl font-extrabold text-gray-900">
                Sign in to your account
              </h2>
            </div>

            <div className="mt-8">
              <div></div>

              <div className="mt-6">
                <Formik
                  initialValues={{ email: "", password: "" }}
                  onSubmit={(values) => {
                    dispatch(login(values))
                      .then(() => {
                        dispatch(clearMessage());
                        navigate("/", { replace: true });
                      })
                      .catch(() => {});
                  }}
                  validationSchema={Yup.object().shape({
                    email: Yup.string().email().required("Email is required"),
                    password: Yup.string().required("Password is required"),
                  })}
                >
                  {(props) => {
                    const {
                      values,
                      touched,
                      errors,
                      handleChange,
                      handleBlur,
                      handleSubmit,
                    } = props;
                    return (
                      <form onSubmit={handleSubmit} className="space-y-6">
                        <div>
                          <label
                            htmlFor="email"
                            className="block text-sm font-medium text-gray-700"
                          >
                            Email address
                          </label>
                          <div className="mt-1">
                            <input
                              id="email"
                              name="email"
                              type="email"
                              autoComplete="email"
                              value={values.email}
                              onChange={handleChange}
                              onBlur={handleBlur}
                              className={
                                errors.email && touched.email
                                  ? "appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-red-500 focus:border-red-500 sm:text-sm"
                                  : "appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-[#008542] focus:border-[#008542] sm:text-sm"
                              }
                            />
                            {errors.email && touched.email && (
                              <div className="text-red-500">{errors.email}</div>
                            )}
                          </div>
                        </div>

                        <div className="space-y-1">
                          <label
                            htmlFor="password"
                            className="block text-sm font-medium text-gray-700"
                          >
                            Password
                          </label>
                          <div className="mt-1">
                            <input
                              id="password"
                              name="password"
                              type="password"
                              autoComplete="current-password"
                              value={values.password}
                              onChange={handleChange}
                              onBlur={handleBlur}
                              className={
                                errors.password && touched.password
                                  ? "appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-red-500 focus:border-red-500 sm:text-sm"
                                  : "appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-[#008542] focus:border-[#008542] sm:text-sm"
                              }
                            />
                            {errors.password && touched.password && (
                              <div className="text-red-500">
                                {errors.password}
                              </div>
                            )}
                          </div>
                        </div>

                        <div className="flex items-center justify-between">
                          {/* <div className="flex items-center">
                    <input
                      id="remember-me"
                      name="remember-me"
                      type="checkbox"
                      className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded"
                    />
                    <label
                      htmlFor="remember-me"
                      className="ml-2 block text-sm text-gray-900"
                    >
                      Remember me
                    </label>
                  </div> */}

                          {/* <div className="text-sm">
                    <a
                      href="#"
                      className="font-medium text-indigo-600 hover:text-indigo-500"
                    >
                      Forgot your password?
                    </a>
                  </div> */}
                        </div>

                        <div>
                          <button
                            type="submit"
                            className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md text-sm font-medium text-white bg-[#00AB55] shadow-lg shadow-green-500/50 hover:bg-[#00AB55]  focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
                          >
                            Sign in
                          </button>
                        </div>
                        <div>
                          {/* <p>
                            Don't you have an account?{" "}
                            <Link className="text-blue-500" to="/signup">
                              Sign Up
                            </Link>
                          </p> */}
                        </div>
                      </form>
                    );
                  }}
                </Formik>
              </div>
            </div>
            <div className="text-center text-sm mt-20">
              <h5>Powered by</h5>
              <div className="flex justify-center">
                <a
                  href="https://emertech.io/"
                  target={"_blank"}
                  rel="noreferrer"
                >
                  <img
                    className="h-12 w-auto"
                    src={EmertechLogo}
                    alt="Workflow"
                  />
                </a>
              </div>
            </div>
            {/* <h6 className="text-xs">
              AgroTrust Invento ©2022 Created by Emertech Innovations
            </h6> */}
          </div>
        </div>
        <div className="hidden lg:block relative w-0 flex-1">
          <img
            className="absolute inset-0 h-full w-full object-cover"
            src={FarmMan}
            alt=""
          />
        </div>
      </div>
    </>
  );
}

export default Signin;
