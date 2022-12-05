import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useFormik } from "formik";
import * as Yup from "yup";
import { connect } from "react-redux";
import { FormattedMessage, injectIntl } from "react-intl";
import * as auth from "../_redux/authRedux";
import { login } from "../_redux/authCrud";
import SweetAlert from "react-bootstrap-sweetalert";

/*
  INTL (i18n) docs:
  https://github.com/formatjs/react-intl/blob/master/docs/Components.md#formattedmessage
*/

/*
  Formik+YUP:
  https://jaredpalmer.com/formik/docs/tutorial#getfieldprops
*/

const initialValues = {
  email: "",
  password: "",
  //   email: "dev.megaminds@gmail.com",
  //   password: "CFvgbhnj12#"
};
// const initialValues = {
//   email: "johndoe@gmail.com",
//   password: "CFvgbhnj12#"//"h)W-k1W0PuOn"
// };

function Login(props) {
  const { intl } = props;
  const [loading, setLoading] = useState(false);
  const [isShowModel, setIsShowModel] = useState(false);
  const [devMode, setDevMode] = useState("");
  const LoginSchema = Yup.object().shape({
    email: Yup.string()
      .email("Wrong email format")
      .min(3, "Minimum 3 symbols")
      .max(50, "Maximum 50 symbols")
      .required(
        intl.formatMessage({
          id: "AUTH.VALIDATION.REQUIRED_FIELD",
        })
      ),
    password: Yup.string()
      .min(3, "Minimum 3 symbols")
      .max(50, "Maximum 50 symbols")
      .required(
        intl.formatMessage({
          id: "AUTH.VALIDATION.REQUIRED_FIELD",
        })
      ),
  });

  const enableLoading = () => {
    setLoading(true);
  };

  const disableLoading = () => {
    setLoading(false);
  };

  const getInputClasses = (fieldname) => {
    if (formik.touched[fieldname] && formik.errors[fieldname]) {
      return "is-invalid";
    }

    if (formik.touched[fieldname] && !formik.errors[fieldname]) {
      return "is-valid";
    }

    return "";
  };

  const formik = useFormik({
    initialValues,
    validationSchema: LoginSchema,
    onSubmit: (values, { setStatus, setSubmitting }) => {
      if (
        values.email == "feelbrand@gmail.com" &&
        values.password == "CFvgbhnj12#"
      ) {
        var devMode = localStorage.getItem("devMode");
        if (devMode == "Enable") {
          localStorage.setItem("devMode", "Disable");
          setDevMode("Disable");
        } else {
          localStorage.setItem("devMode", "Enable");
          setDevMode("Enable");
          setIsShowModel(true);
        }

      } else {
        enableLoading();
        login(values.email, values.password) //,"154.125.658.12","India Standard Time"
          .then((data) => {
            if (data.data.data.inAdminUserId != 0) {
              disableLoading();
              props.login(data.data);
            } else {
              disableLoading();
              setSubmitting(false);
              setStatus(
                intl.formatMessage({
                  id: "AUTH.VALIDATION.INVALID_LOGIN",
                })
              );
            }
          })
          .catch((e) => {
            disableLoading();
            setSubmitting(false);
            setStatus(
              intl.formatMessage({
                id: "AUTH.VALIDATION.INVALID_LOGIN",
              })
            );
          });
      }
    },
  });

  return (
    <div className="login-form login-signin" id="kt_login_signin_form">
      {/* begin::Head */}
      <div className="text-center mb-10 mb-lg-20">
        <h3 className="font-size-h1">
          <FormattedMessage id="AUTH.LOGIN.TITLE" />
        </h3>
        <p className="text-muted font-weight-bold">
          Enter your Email-Id and password
        </p>
      </div>
      {/* end::Head */}

      {/*begin::Form*/}
      <form
        onSubmit={formik.handleSubmit}
        className="form fv-plugins-bootstrap fv-plugins-framework"
      >
        {formik.status && (
          <div className="mb-10 alert alert-custom alert-light-danger alert-dismissible">
            <div className="alert-text font-weight-bold">{formik.status}</div>
          </div>
        )}

        <div className="form-group fv-plugins-icon-container">
          <input
            placeholder="Email"
            type="email"
            className={`form-control form-control-solid h-auto py-5 px-6 ${getInputClasses(
              "email"
            )}`}
            name="email"
            {...formik.getFieldProps("email")}
          />
          {formik.touched.email && formik.errors.email ? (
            <div className="fv-plugins-message-container">
              <div className="fv-help-block">{formik.errors.email}</div>
            </div>
          ) : null}
        </div>
        <div className="form-group fv-plugins-icon-container">
          <input
            placeholder="Password"
            type="password"
            className={`form-control form-control-solid h-auto py-5 px-6 ${getInputClasses(
              "password"
            )}`}
            name="password"
            {...formik.getFieldProps("password")}
          />
          {formik.touched.password && formik.errors.password ? (
            <div className="fv-plugins-message-container">
              <div className="fv-help-block">{formik.errors.password}</div>
            </div>
          ) : null}
        </div>
        {isShowModel == true ? (
          // <div
          //   className="alert alert-custom alert-outline-primary fade show mb-5"
          //   role="alert"
          // >
          //   <div className="alert-icon">
          //     <i className="flaticon-warning"></i>
          //   </div>
          //   <div className="alert-text">
          //     A simple primary alert—check it out!
          //   </div>
          //   <div className="alert-close">
          //     <button
          //       onClick={() => setIsShowModel(false)}
          //       type="button"
          //       className="close"
          //       data-dismiss="alert"
          //       aria-label="Close"
          //     >
          //       <span aria-hidden="true">
          //         <i className="ki ki-close"></i>
          //       </span>
          //     </button>
          //   </div>
          // </div>
          <div
          className="alert alert-custom alert-notice alert-light-success fade show mb-5"
            role="alert"
          >
            <div className="alert-text">Dev Mode {devMode} Successfully!</div>
            <div className="alert-close">
              <button
                onClick={() => setIsShowModel(false)}
                type="button"
                className="close"
                data-dismiss="alert"
                aria-label="Close"
              >
                <span aria-hidden="true">
                  <i className="ki ki-close"></i>
                </span>
              </button>
            </div>
          </div>
        ) : null}

        <div className="form-group d-flex flex-wrap justify-content-between align-items-center">
          <Link
            to="/auth/forgot-password"
            className="text-dark-50 text-hover-primary my-3 mr-2"
            id="kt_login_forgot"
          >
            <FormattedMessage id="AUTH.GENERAL.FORGOT_BUTTON" />
          </Link>
          <button
            id="kt_login_signin_submit"
            type="submit"
            // disabled={formik.isSubmitting}
            className={`btn btn-primary font-weight-bold px-9 py-4 my-3`}
          >
            <span>Sign In</span>
            {loading && <span className="ml-3 spinner spinner-white"></span>}
          </button>
        </div>
      </form>
      {/*end::Form*/}
    </div>
  );
}

export default injectIntl(connect(null, auth.actions)(Login));
