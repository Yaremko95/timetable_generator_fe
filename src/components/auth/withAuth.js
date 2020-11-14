import React, { Component, useEffect, useState } from "react";
import { compose } from "redux";
import { connect } from "react-redux";
import { withRouter, Redirect } from "react-router-dom";
import { setUser, authorize } from "../../store/actions";

const withAuth = (Component) => (props) => {
  const { authorized, authorize, redirect, loading } = props;

  useEffect(() => {
    // const authorize = async () => {
    //   const res = await authAxios.get(`/profile/me`, {
    //     withCredentials: true,
    //     httpOnly: true,
    //     sameSite: "none",
    //     secure: true,
    //   });
    //   let user = {};
    //   if (!res) {
    //     const secondRes = await axios.get(`/profile/me`, {
    //       withCredentials: true,
    //       httpOnly: true,
    //       sameSite: "none",
    //       secure: true,
    //     });
    //
    //     if (secondRes.status !== 200) {
    //     } else {
    //       // sessionStorage.setItem("accessToken", secondRes.data.accessToken);
    //       setUser(secondRes.data);
    //     }
    //   } else {
    //     if (res.status !== 200) {
    //     } else {
    //       // sessionStorage.setItem("accessToken", res.data.accessToken);
    //
    //       setUser(res.data);
    //     }
    //   }
    // };
    //
    // authorize();
    authorize();
  }, []);
  if (!loading) {
    if (!authorized) {
      return <Redirect to={"/login"} />;
    } else {
      return <Component {...props} />;
    }
  } else {
    return <div>Loading</div>;
  }
};

const composedAuthHOC = compose(
  connect(
    (state) => {
      return {
        loading: state.loading,
        redirect: state.redirectTo,
        authorized: state.authorized,
      };
    },
    (dispatch) => ({
      setUser: (data) => dispatch(setUser(data)),
      authorize: () => dispatch(authorize()),
    })
  ),
  withRouter,
  withAuth
);
export default composedAuthHOC;
