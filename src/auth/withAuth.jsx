import React, { Component, useEffect, useState } from "react";
import { compose } from "redux";
import { connect, useDispatch, useSelector } from "react-redux";
import { withRouter } from "react-router-dom";
import { authorize } from "../store/actions";

const withAuth = (Component) => (props) => {
  useEffect(() => {
    props.authorize();
    if (props.redirectTo) {
      props.history.push("/login");
    }
  }, [props.redirectTo]);
  return <Component {...props} />;
};

const composedAuthHOC = compose(
  connect(
    (state) => {
      return {
        authorized: state.authorized,
        redirectTo: state.redirectTo,
      };
    },
    (dispatch) => ({
      authorize: () => dispatch(authorize()),
    })
  ),
  withRouter,
  withAuth
);
export default composedAuthHOC;
